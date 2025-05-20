import MoonSvg from "../assets/MoonSvg"
import SunSvg from "../assets/SunSvg"

interface Props{
    isDarkMode: boolean
    setIsDarkMode: React.Dispatch<React.SetStateAction<boolean>>
}

export default function Navbar({ isDarkMode, setIsDarkMode }: Props){
    return(
        <nav className={`absolute top-0 left-0 w-full h-14 px-4 sm:px-8 flex items-center justify-between transition-colors duration-300 ${isDarkMode ? 'bg-[hsl(209,23%,22%)]' : 'bg-white'}'`}>
            <h2 className='font-semibold text-lg'>Where in the world?</h2>
            {isDarkMode ? (
                <button onClick={() => setIsDarkMode(false)} className="cursor-pointer">
                    <SunSvg />
                </button>
            ) : (
                <button onClick={() => setIsDarkMode(true)} className="cursor-pointer">
                    <MoonSvg />
                </button>
            )}
        </nav>
    )   
}