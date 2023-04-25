import NavBar from './Components/Navbar'
import Filters from './Components/Filters'
import Cards from './Components/Cards'
import StatusBar from './Components/StatusBar'
import { Route, Routes } from 'react-router-dom'
import { useMetadata } from './hooks/useMetadata'
import Loading from './Components/Loading'
import { useEffect } from 'react'

function App () {
  const { getMetadata, loading = false } = useMetadata()

  useEffect(() => {
    getMetadata()
  }, [])

  return loading
    ? <Loading />
    : (
      <>
        <NavBar />
        <Filters />
        <StatusBar />
        <Routes>
          <Route path='/' element={<Cards />} />
        </Routes>
      </>
      )
}

export default App
