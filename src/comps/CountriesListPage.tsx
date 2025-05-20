import Countries from "./Countries";
import Filter from "./Filter";
import Search from "./Search";

interface Props{
    isDarkMode: boolean
}

export default function CountriesListPage({ isDarkMode }: Props){
    return (
        <>
            <div className="flex flex-col sm:flex-row sm:gap-4">
                <div className="mt-4 py-1.5 px-2 border-2 border-gray-600 rounded flex items-center gap-2 w-full">
                    <Search />
                </div>
                <div className="mt-4 py-1.5 px-2 border-2 border-gray-600 rounded w-[30ch]">
                    <Filter />
                </div>
            </div>  
            <Countries isDarkMode={isDarkMode} />
        </>
    )
}