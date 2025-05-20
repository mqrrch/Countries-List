import { useEffect, useRef, useState } from "react";
import { useReduxSelector } from "../hooks/useReduxSelector";
import { useDispatch } from "react-redux";
import { setFilter } from "../features/searchFilter";

export default function Filter(){
    const [selectedRegion, setSelectedRegion] = useState<string>("Filter by Region");
    const [isRegionDropdownOpen, setIsRegionDropdownOpen] = useState<boolean>(false);
    const regionDropdownRef = useRef<HTMLDivElement>(null);
    const data = useReduxSelector(state => state.data.data);
    const dispatch = useDispatch();

    const regionList: string[] = ["Any", ...new Set(data.map((c) => c.region))];

    const filteredRegionList: string[] = regionList.filter((region) => region !== selectedRegion);

    useEffect(() => {
        const handleClickOutsideDropdown = (e: MouseEvent) => {
            if (regionDropdownRef.current && !regionDropdownRef.current.contains(e.target as Node)) {
                setIsRegionDropdownOpen(false);
            };
        };

        const listener = (e: globalThis.MouseEvent) => handleClickOutsideDropdown(e);

        if (isRegionDropdownOpen){
            document.addEventListener('mousedown', listener);
        } 
        
        return () => document.removeEventListener('mousedown', listener);
    }, [isRegionDropdownOpen]);

    const handleChangeRegion = (region: string) => {
        setSelectedRegion(region);
        setIsRegionDropdownOpen(false);
        dispatch(setFilter(region));
    };

    return(
        <div className="relative rounded-lg mx-auto select-none w-full" ref={regionDropdownRef}>
            <button
                type="button"
                onClick={() => setIsRegionDropdownOpen(!isRegionDropdownOpen)}
                className={`flex justify-between items-center w-full rounded-lg p-0.5 px-2 pr-3 select-none outline-none cursor-pointer`}
            >
                {selectedRegion}
                <div className={`border-r-2 border-b-2 ml-2 p-1 ${isRegionDropdownOpen ? 'rotate-[-135deg] mb-[-3px]' : 'rotate-45 mb-[3px]'}`}></div>
            </button>

            {isRegionDropdownOpen && (
                <div className="absolute mt-1 w-full bg-blue-900 shadow-lg rounded-md z-[3]">
                    <ul className="max-h-60 overflow-auto">
                        {filteredRegionList.map((region, index) => (
                            <li
                                key={index}
                                onClick={() => handleChangeRegion(region)}
                                className="px-4 py-1.5 cursor-pointer hover:bg-blue-700 first-of-type:hover:rounded-t-md last-of-type:hover:rounded-b-md"
                            >
                                {region}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    )
}