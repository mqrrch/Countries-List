import { useState } from "react";
import MagnifierSvg from "../assets/MagnifierSvg";
import { useDispatch } from "react-redux";
import { setSearch } from "../features/searchFilter";

export default function Search(){
    const [searchInput, setSearchInput] = useState<string>("");
    const dispatch = useDispatch();

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchInput(e.currentTarget.value);
        dispatch(setSearch(e.currentTarget.value));
    }

    return(
        <>
            <label 
                className=""
                htmlFor="search-input"
            >
                <MagnifierSvg />
            </label>
            <input 
                className="outline-none w-full placeholder-gray-400"
                name="search-input"
                id="search-input"
                placeholder="Search"
                autoComplete="off"
                onChange={(e) => handleInputChange(e)}
                value={searchInput}
            ></input>
        </>
    )
}