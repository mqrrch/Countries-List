import { useNavigate } from "react-router-dom";
import { useReduxSelector } from "../hooks/useReduxSelector"
import { useMemo } from "react";

interface Props{
    isDarkMode: boolean
}

export default function Countries({ isDarkMode }: Props){
    const data = useReduxSelector(state => state.data.data);
    const searchInput = useReduxSelector(state => state.searchFilter.search);
    const regionFilter = useReduxSelector(state => state.searchFilter.filter);
    const navigate = useNavigate();

    const searchedList = useMemo(() => {
        if (!data) return []
        if (!searchInput) return data;
        return data.filter((country) => country.name.toLowerCase().includes(searchInput));
    }, [data, searchInput])

    const filteredList = useMemo(() => {
        if (!regionFilter || regionFilter === "Any") return searchedList;
        const searched = [...searchedList];
        return searched.filter((country) => country.region === regionFilter);
    }, [searchedList, regionFilter])

    return (
        <div className="grid grid-col-1 max-w-[320px] sm:max-w-none sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 mx-auto gap-10 mt-4">
            {filteredList.map((country, index) => (
                <figure 
                    key={index}
                    className={`${isDarkMode ? 'bg-[hsl(209,23%,22%)]' : 'bg-white'} pb-5 rounded-xl overflow-hidden cursor-pointer`}
                    onClick={() => navigate(`country/${country.name.toLowerCase()}`)}
                >
                    <img 
                        src={country.flag}
                        className="w-full h-[200px] object-cover object-center"
                    ></img>
                    <div className="mt-3 pl-5">
                        <figcaption className="font-semibold text-lg mb-2">{country.name}</figcaption>
                        <figcaption>Capital: {country.capital}</figcaption>
                        <figcaption>Region: {country.region}</figcaption>
                        <figcaption>Population: {country.population}</figcaption>
                    </div>
                </figure>
            ))}
        </div>
    )
}