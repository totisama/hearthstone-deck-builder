import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { HEROS_NAME } from '../constants'
import { useDeck } from '../hooks/useDeck'
import DeckCard from './DeckCard'
import RunesDisplay from './RunesDisplay'
import '../Styles/HamburgerDeck.scss'
import CardPack from './CardPack'

const HamburgerDeck = () => {
  const { hero } = useParams()
  const [deckOpen, setDeckOpen] = useState(false)
  const { deckSize, currentDeckSize, isDeathKnigth, deck, copyDeckCode } = useDeck()

  return (
    <>
      {!deckOpen
        ? <CardPack setDeckOpen={setDeckOpen} />
        : (
          <div className='hamburgerDeck'>
            <div className='topContainer'>
              <div className='top'>
                <button type='button' onClick={() => { setDeckOpen(false) }} className='hamburgerClose' />
                <div className='topBorder' />
                <div className='hamburgerTitleContainer'>
                  <h3 className='heroTitle'>Standard {HEROS_NAME[hero]} Deck</h3>
                  <h3 className='cardsCount'>{currentDeckSize} / {deckSize}</h3>
                </div>
                <div style={{ backgroundImage: `url(../src/assets/classesBackground/${hero}.jpg)` }} className='heroBackground' />
              </div>
            </div>
            {isDeathKnigth
              ? (
                <RunesDisplay />)
              : null}
            <div className='hamburgerCenter' style={{ height: isDeathKnigth ? '62%' : '70%' }}>
              {deck.map((card) => (
                <DeckCard key={card.id} card={card} />
              ))}
            </div>
            <div className='deckBottom'>
              <button type='button' className='copyDeckButton' onClick={() => { copyDeckCode() }}>Copy deck code</button>
            </div>
          </div>
          )}
    </>
  )
}

export default HamburgerDeck
