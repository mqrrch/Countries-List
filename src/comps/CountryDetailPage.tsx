import { useNavigate, useParams } from "react-router-dom"
import LeftArrowSvg from "../assets/LeftArrowSvg";
import { useReduxSelector } from "../hooks/useReduxSelector";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { endLoading, startLoading } from "../features/loadingSlice";
import { setFilter, setSearch } from "../features/searchFilter";

interface Props{
    isDarkMode: boolean
}

export default function CountryDetailPage({ isDarkMode }: Props){
    const fullData = useReduxSelector(state => state.data.data);
    const { countryName } = useParams();
    const data = fullData.find((country) => country.name.toLowerCase() === String(countryName));
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    useEffect(() => {
        if (!data){
            dispatch(startLoading());
        } else{
            dispatch(endLoading());
        }
    }, [data, dispatch])

    function findCountryFromBorder(border: string){
        const countryData = fullData.find((country) => country.alpha3Code === border);
        return countryData?.name;
    }

    function handleBackBtn(){
        dispatch(setSearch(""));
        dispatch(setFilter("Any"));
        navigate('/');
    }

    return(
        <div className={`${isDarkMode ? 'text-white' : 'text-[hsl(200,15%,8%)]'} w-[80%] mx-auto my-14 max-w-[800px]`}>
            <button 
                className={`-mx-4 my-4 flex items-center gap-2 shadow-sm shadow-black py-1 px-3 cursor-pointer transition-colors duration-300 ${isDarkMode ? 'bg-[hsl(209,23%,22%)] hover:bg-[hsl(210,9%,27%)]' : 'bg-[hsl(0,0%,90%)] hover:bg-[hsl(0,0%,85%)]'}`}
                onClick={handleBackBtn}
            >
                <LeftArrowSvg />
                <p>Back</p>
            </button>

            <div className="text-[14px] lg:flex lg:gap-4 overflow-hidden">
                <div className="w-[250px] h-[150px] md:w-[300px] md:h-[200px] mx-auto">
                    <img src={data?.flag} className="w-full h-full"></img>
                </div>
                
                <div className="">
                    <p className="font-semibold text-center text-xl mt-4 lg:text-left lg:mt-1/2">{data?.name}</p>

                    <div className="flex flex-col [@media(min-width:480px)]:flex-row justify-center gap-4 sm:gap-10">
                        <div className="max-w-[28ch]">
                            <p className="">
                                Native Name: &nbsp;
                                <span className={`${isDarkMode ? 'text-[hsl(208,10%,69%)]' : 'text-[hsl(214,16%,36%)]'}`}>
                                    {data?.nativeName || "N/A"}
                                </span>
                            </p>
                            <p>
                                Population: &nbsp;
                                <span className={`${isDarkMode ? 'text-[hsl(208,10%,69%)]' : 'text-[hsl(214,16%,36%)]'}`}>
                                    {data?.population || "N/A"}
                                </span>
                            </p>
                            <p>
                                Region: &nbsp;
                                <span className={`${isDarkMode ? 'text-[hsl(208,10%,69%)]' : 'text-[hsl(214,16%,36%)]'}`}>
                                    {data?.region || "N/A"}
                                </span>
                            </p>
                            <p>
                                Sub Region: &nbsp;
                                <span className={`${isDarkMode ? 'text-[hsl(208,10%,69%)]' : 'text-[hsl(214,16%,36%)]'}`}>
                                    {data?.subregion || "N/A"}
                                </span>
                            </p>
                            <p>
                                Capital: &nbsp;
                                <span className={`${isDarkMode ? 'text-[hsl(208,10%,69%)]' : 'text-[hsl(214,16%,36%)]'}`}>
                                    {data?.capital || "N/A"}
                                </span>
                            </p>
                        </div>

                        <div className="max-w-[28ch]">
                            <p>
                                Top Level Domain: &nbsp;
                                <span className={`${isDarkMode ? 'text-[hsl(208,10%,69%)]' : 'text-[hsl(214,16%,36%)]'}`}>
                                    {data?.topLevelDomain || "N/A"}
                                </span>
                            </p>
                            <p className="flex">
                                Currencies: &nbsp;
                                <span className={`${isDarkMode ? 'text-[hsl(208,10%,69%)]' : 'text-[hsl(214,16%,36%)]'}`}>
                                    {data?.currencies?.map((currency, index) => (
                                        <span key={index} className="block">{currency.name}</span>
                                    )) || "N/A"}
                                </span>
                            </p>
                            <p className="flex">
                                Languages: &nbsp;
                                <span className={`${isDarkMode ? 'text-[hsl(208,10%,69%)]' : 'text-[hsl(214,16%,36%)]'}`}>
                                    {data?.languages?.map((language, index) => (
                                        <span key={index} className="block">{language.name}</span>
                                    )) || "N/A"}
                                </span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="text-[16px] flex flex-col items-center justify-center font-semibold mt-4">
                <p>Border Countries:</p>
                <div 
                    className="flex flex-wrap gap-2 mt-1"
                >
                    {!data?.borders?.length && (
                        <p className="font-normal">No bordering countries</p>
                    )}
                    {data?.borders?.map((border, index) => (
                        <button 
                            key={index}
                            className={`border-2 border-gray-300 rounded outline-none py-0.5 px-1 cursor-pointer transition-colors duration-300 ${isDarkMode ? 'hover:bg-[hsl(210,9%,27%)]' : 'hover:bg-[hsl(0,0%,80%)]'}`}
                            onClick={() => navigate(`/${findCountryFromBorder(border)?.toLowerCase()}`)}
                        >
                            {border}
                        </button>
                    ))}
                </div>
            </div>
            
        </div>
    )
}