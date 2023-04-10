import NavBar from './Components/Navbar'
import Filters from './Components/Filters'
import Cards from './Components/Cards'
import { Route, Routes } from 'react-router-dom'
import { useMetadata } from './hooks/useMetadata'
import Loading from './Components/Loading'

function App () {
  const { data, loading } = useMetadata()

  return loading
    ? <Loading />
    : (
      <main>
        <NavBar />
        <Filters metadata={data} />
        <Routes>
          <Route path='/' element={<Cards />} />
        </Routes>
      </main>
      )
}

export default App
