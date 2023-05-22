import { useParams } from 'react-router-dom'
import { useDeck } from '../hooks/useDeck'
import { ASSETS_PATH } from '../constants'
import '../Styles/CardPack.scss'

const CardPack = ({ setDeckOpen }) => {
  const { hero } = useParams()
  const { deckSize, currentDeckSize } = useDeck()

  return (
    <div className='cardPackContainer' onClick={() => { setDeckOpen(true) }}>
      <div className='cardPack' />
      <div className='cardPackIcon' style={{ backgroundImage: `url(${ASSETS_PATH}deckHamburger/${hero}Icon.png)` }} />
      <div className='deckSizeValues'>
        {currentDeckSize} / {deckSize}
      </div>
    </div>
  )
}

export default CardPack
