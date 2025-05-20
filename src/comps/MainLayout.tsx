import Navbar from "./Navbar"
import type React from "react"
import { Outlet } from "react-router-dom"

interface Props{
    isDarkMode: boolean
    setIsDarkMode: React.Dispatch<React.SetStateAction<boolean>>
}

export default function MainLayout({ isDarkMode, setIsDarkMode }: Props){
    return(
        <div className={`mt-18 mb-10 mx-auto w-[90%] max-w-[1200px] transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-[hsl(200,15%,8%)]'}`}>
            <Navbar isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
            <Outlet />
        </div>
    )
}