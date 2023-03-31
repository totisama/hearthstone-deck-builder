import '../Styles/NavBar.scss'
import hearthstoneLogo from '../Assets/hearthstone.webp'
import { Link } from 'react-router-dom'

const NavBar = () => {
  return (
    <section className='container'>
      <div className='navbar'>
        <Link to='/'>Cards Library</Link>
        <img src={hearthstoneLogo} alt='Hearthstone logo' />
        <Link to='/'>Deck Builder</Link>
      </div>
    </section>
  )
}

export default NavBar
