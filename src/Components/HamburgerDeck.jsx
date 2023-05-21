import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { HEROS_NAME } from '../constants'
import DeckCard from './DeckCard'
import RunesDisplay from './RunesDisplay'
import '../Styles/HamburgerDeck.scss'

const HamburgerDeck = ({
  deckSize, getDeckSize, isDeathKnigth, currentRunesName, deck, addedCardsAmount,
  addCard, removeCard, copyDeckCode
}) => {
  const { hero } = useParams()
  const [deckOpen, setDeckOpen] = useState(false)

  return (
    <>
      {!deckOpen
        ? (
          <div className='cardPackContainer' onClick={() => { setDeckOpen(true) }}>
            <div className='cardPack' />
            <div className='cardPackIcon' style={{ backgroundImage: `url(../src/assets/deckHamburger/${hero}Icon.png)` }} />
            <div className='deckSizeValues'>
              {getDeckSize()} / {deckSize}
            </div>

          </div>
          )
        : (
          <div className='hamburgerDeck'>
            <div className='topContainer'>
              <div className='top'>
                <button type='button' onClick={() => { setDeckOpen(false) }} className='hamburgerClose' />
                <div className='topBorder' />
                <div className='hamburgerTitleContainer'>
                  <h3 className='heroTitle'>Standard {HEROS_NAME[hero]} Deck</h3>
                  <h3 className='cardsCount'>{getDeckSize()} / {deckSize}</h3>
                </div>
                <div style={{ backgroundImage: `url(../src/assets/classesBackground/${hero}.jpg)` }} className='heroBackground' />
              </div>
            </div>
            {isDeathKnigth
              ? (
                <RunesDisplay currentRunesName={currentRunesName} />)
              : null}
            <div className='hamburgerCenter' style={{ height: isDeathKnigth ? '62%' : '70%' }}>
              {deck.map((card) => (
                <DeckCard key={card.id} card={card} addedCardsAmount={addedCardsAmount} addCard={addCard} removeCard={removeCard} />
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
