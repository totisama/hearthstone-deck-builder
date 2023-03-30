import '../Styles/NavBar.scss'
import hearthstoneLogo from '../Assets/hearthstone.webp'

export const NavBar = () => {
  return (
    <main className='container'>
      <div className='navbar'>
        <a href='/'>Cards Library</a>
        <img src={hearthstoneLogo} alt='Hearthstone logo' />
        <a href='/deck-builder'>Deck Builder</a>
      </div>
    </main>
  )
}
