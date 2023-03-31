import NavBar from './Components/Navbar'
import Cards from './Components/Cards'
import { Route, Routes } from 'react-router-dom'

function App () {
  return (
    <main>
      <NavBar />
      <Routes>
        <Route path='/' element={<Cards />} />
      </Routes>
    </main>
  )
}

export default App
