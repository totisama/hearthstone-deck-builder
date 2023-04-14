import NavBar from './Components/Navbar'
import Filters from './Components/Filters'
import Cards from './Components/Cards'
import { Route, Routes } from 'react-router-dom'
import { useMetadata } from './hooks/useMetadata'
import Loading from './Components/Loading'

function App () {
  const { loading = false } = useMetadata()

  return loading
    ? <Loading />
    : (
      <>
        <NavBar />
        <Filters />
        <Routes>
          <Route path='/' element={<Cards />} />
        </Routes>
      </>
      )
}

export default App
