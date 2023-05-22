import { useParams } from 'react-router-dom'
import { HEROS_NAME, WINDOW_SIZES } from '../constants'
import Filters from './Filters'

import Loader from './Loader'
import DeckCards from './DeckCards'
import DeckCard from './DeckCard'
import RunesDisplay from './RunesDisplay'
import { useScroll } from '../hooks/useScroll'
import { useResizeWindow } from '../hooks/useResizeWindow'
import { useDeck } from '../hooks/useDeck'
import HamburgerDeck from './HamburgerDeck'
import '../Styles/DeckBuilder.scss'

const DeckBuilder = () => {
  const { hero } = useParams()
  const {
    deck,
    deckSize,
    isDeathKnigth,
    copyDeckCode,
    currentDeckSize,
    loading
  } = useDeck(true)
  const { pastBreakPoint } = useScroll()
  const { screenSize } = useResizeWindow()

  const setClass = (type) => {
    let className = ''

    if (pastBreakPoint) {
      if (type === 'top') {
        className = 'deckContainerPastBreakpoint'
      } else if (type === 'heigth') {
        className = 'deckPastBreakPoint'
      }
    }

    return className
  }

  return !loading
    ? (
      <>
        <Filters deckBuilder />
        <main className='deckBuilderContainer'>
          <DeckCards />

          {screenSize === WINDOW_SIZES.LARGE || screenSize === WINDOW_SIZES.MEDIUM
            ? (
              <div className={`deckContainer ${setClass('top')}`}>
                <div className='topContainer'>
                  <div className='top'>
                    <div className='topBorder' />
                    <div className='titleContainer'>
                      <h3 className='heroTitle'>Standard {HEROS_NAME[hero]} Deck</h3>
                      <h3 className='cardsCount'>{currentDeckSize} / {deckSize}</h3>
                    </div>
                    <div className={`heroBackground ${hero}Background`} />
                  </div>
                </div>
                {isDeathKnigth
                  ? (
                    <RunesDisplay />)
                  : null}
                <div className={`deck ${setClass('heigth')}`}>
                  {deck.map((card) => (
                    <DeckCard key={card.id} card={card} />
                  ))}
                </div>
                <div className='deckBottom'>
                  <button type='button' className='copyDeckButton' onClick={() => { copyDeckCode() }}>Copy deck code</button>
                </div>
              </div>)
            : <HamburgerDeck />}
        </main>
      </>)
    : <Loader />
}

export default DeckBuilder
