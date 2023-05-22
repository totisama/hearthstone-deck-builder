import { useParams } from 'react-router-dom'
import { useDeck } from '../hooks/useDeck'
import '../Styles/CardPack.scss'

const CardPack = ({ setDeckOpen }) => {
  const { hero } = useParams()
  const { deckSize, currentDeckSize } = useDeck()

  return (
    <div className='cardPackContainer' onClick={() => { setDeckOpen(true) }}>
      <div className='cardPack' />
      <div className={`cardPackIcon ${hero}Icon`} />
      <div className='deckSizeValues'>
        {currentDeckSize} / {deckSize}
      </div>
    </div>
  )
}

export default CardPack
