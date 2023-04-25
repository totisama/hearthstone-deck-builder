import NavBar from './Components/Navbar'
import Filters from './Components/Filters'
import Cards from './Components/Cards'
import StatusBar from './Components/StatusBar'
import { Route, Routes } from 'react-router-dom'
import { useMetadata } from './hooks/useMetadata'
import Loader from './Components/Loader'
import { useEffect } from 'react'
import InProgress from './Components/InProgress'

function App () {
  const { getMetadata, loading = false } = useMetadata()

  useEffect(() => {
    getMetadata()
  }, [])

  return loading
    ? <Loader />
    : (
      <>
        <NavBar />
        <Filters />
        <StatusBar />
        <Routes>
          <Route path='/' element={<Cards />} />
          <Route path='/hero' element={<InProgress />} />
        </Routes>
      </>
      )
}

export default App
