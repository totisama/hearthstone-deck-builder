import NavBar from './Components/Navbar'
import Cards from './Components/Cards'
import { Route, Routes } from 'react-router-dom'
import { useMetadata } from './hooks/useMetadata'
import Loader from './Components/Loader'
import { useEffect } from 'react'
import InProgress from './Components/InProgress'
import HeroSelect from './Components/HeroSelect'

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
        <Routes>
          <Route path='/' element={<Cards />} />
          <Route path='/deckbuilder' element={<HeroSelect />} />
          <Route path='/deckbuilder/:id' element={<InProgress />} />
        </Routes>
      </>
      )
}

export default App
