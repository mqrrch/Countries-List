import { useDispatch } from 'react-redux'
import './App.css'
import { useReduxSelector } from './hooks/useReduxSelector'
import { setData } from './features/dataSlice'
import { useEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import MainLayout from './comps/MainLayout'
import CountryDetailPage from './comps/CountryDetailPage'
import { endLoading } from './features/loadingSlice'
import CountriesListPage from './comps/CountriesListPage'
import ErrorPage from './comps/ErrorPage'

// - Blue 900 (Dark Mode Elements): hsl(209, 23%, 22%)
// - Blue 950 (Dark Mode Background): hsl(207, 26%, 17%)
// - Grey 950 (Light Mode Text): hsl(200, 15%, 8%)
// - Grey 400 (Light Mode Input): hsl(0, 0%, 50%)
// - Grey 50 (Light Mode Background): hsl(0, 0%, 99%)
// - White (Dark Mode Text & Light Mode Elements): hsl(0, 100%, 100%)

export default function App() {
  const data = useReduxSelector(state => state.data.data);
  const isLoading = useReduxSelector(state => state.loading.loadingCounter) > 0;
  const [isDarkMode, setIsDarkMode] = useState<boolean>(true);
  const dispatch = useDispatch();

  useEffect(() => {
    if (data.length > 0) return;
    fetch('/Countries-List/data.json')
      .then(response => {
        if (!response.ok) throw new Error("Error");
        return response.json();
      })
      .then(data => {
        dispatch(endLoading());
        dispatch(setData(data));
      })
  }, [data, dispatch])

  return (
    <>
      {isLoading && (
        <div className='fixed top-0 left-0 w-full h-screen bg-[hsl(207,26%,17%)] z-10'></div>
      )}
      <div className={`fixed top-0 left-0 w-full h-screen transition-colors duration-300 ${isDarkMode ? 'bg-[hsl(207,26%,17%)]' : 'bg-[hsl(0,0%,90%)]'} z-[-2]`}></div>
      <Routes>
        <Route path='/' element={<MainLayout isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />}>
          <Route index element={<CountriesListPage isDarkMode={isDarkMode} />} />
          <Route path='/country/:countryName' element={<CountryDetailPage isDarkMode={isDarkMode} />} />
        </Route>
        <Route path='*' element={<ErrorPage />}></Route>
      </Routes>
    </>
  )
}