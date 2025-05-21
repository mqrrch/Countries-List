import { useNavigate } from "react-router-dom"

export default function ErrorPage(){
    const navigate = useNavigate();

    return (
        <div className="w-full h-screen text-gray-200 flex flex-col justify-center items-center">
            <p className="text-4xl font-bold">404</p>
            <p className="text-xl mt-2">Page not found</p>
            <button 
                className="mt-10 border-2 border-gray-200 hover:bg-[hsl(209,22%,33%)] transition-colors duration-300 py-1 px-3 rounded cursor-pointer"
                onClick={() => navigate('/')}
            >
                Go back
            </button>
        </div>
    )
}