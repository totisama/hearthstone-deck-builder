import NavBar from './Components/Navbar'
import Filters from './Components/Filters'
import Cards from './Components/Cards'
import { Route, Routes } from 'react-router-dom'

function App () {
  return (
    <main>
      <NavBar />
      <Filters />
      <Routes>
        <Route path='/' element={<Cards />} />
      </Routes>
    </main>
  )
}

export default App
