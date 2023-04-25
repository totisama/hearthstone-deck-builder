import '../Styles/NavBar.scss'
import hearthstoneLogo from '../assets/hearthstone.webp'
import { Link } from 'react-router-dom'

const NavBar = () => {
  return (
    <header className='container'>
      <div className='navbar'>
        <Link to='/'>Cards Library</Link>
        <img src={hearthstoneLogo} alt='Hearthstone logo' />
        <Link to='/hero'>Deck Builder</Link>
      </div>
    </header>
  )
}

export default NavBar
