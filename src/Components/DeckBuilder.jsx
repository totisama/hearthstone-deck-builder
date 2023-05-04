import { useEffect, useState } from 'react'
import '../Styles/DeckBuilder.scss'
import { useParams, useNavigate } from 'react-router-dom'
import { HEROS_LIST, HEROS_NAME } from '../constants'
import NoCards from './NoCards'
import Filters from './Filters'
import StatusBar from './StatusBar'
import { useCards } from '../hooks/useCards'
import { useFilters } from '../hooks/useFilters'
import { InView } from 'react-intersection-observer'
import Loader from './Loader'

const DeckBuilder = () => {
  const { hero } = useParams()
  const navigate = useNavigate()
  const { setFilter } = useFilters()
  const { cards, getNewCards } = useCards()
  const cardsEntries = Object.entries(cards)
  const [deck, setDeck] = useState([])
  const [addedCardsAmount, setAddedCardsAmount] = useState({})
  const [deckSize, setDeckSize] = useState(30)
  const [loading, setLoading] = useState(true)

  const addCard = (card) => {
    let localDeckSize = deckSize

    // Specific condition to when this card is added
    if (card.id === 79767) {
      localDeckSize = 40
      setDeckSize(40)
    }

    if (getDeckLength() >= localDeckSize) {
      return
    }

    const cardId = card.id
    const cardExists = addedCardsAmount[cardId]

    // rarityId = 5 (Legendary card)
    // Dont add the card if is already on the deck and has 2 copies of it
    // or the card is legendary and it has a copy already
    if (cardExists && (cardExists >= 2 || card.rarityId === 5)) {
      return
    }

    const deckCopy = [...deck]
    const cardAddedAmountCopy = { ...addedCardsAmount }

    if (cardExists) {
      cardAddedAmountCopy[cardId] += 1
    } else {
      cardAddedAmountCopy[cardId] = 1
      deckCopy.push(card)
    }

    setAddedCardsAmount(prevState => ({
      ...prevState,
      ...cardAddedAmountCopy
    }))
    setDeck(deckCopy)
  }

  const getDeckLength = () => {
    let deckLength = 0

    Object.values(addedCardsAmount).forEach((cardAmount) => {
      deckLength += cardAmount
    })

    return deckLength
  }

  const getCardAmountClasses = (cardId, cardRarity) => {
    let classes = 'cardAmount'

    if (addedCardsAmount[cardId] >= 2 || cardRarity === 5) {
      classes += ' locked'
    }

    return classes
  }

  useEffect(() => {
    if (!HEROS_LIST.includes(hero)) {
      navigate('/deckbuilder')

      return
    }

    const classFilter = hero + ',neutral'
    setFilter('class', classFilter)

    setLoading(false)
  }, [])

  return !loading
    ? (
      <>
        <Filters deckBuilder />
        <main className='deckBuilderContainer'>
          <div className='heroCardsContainer'>
            {cardsEntries.length > 0
              ? (
                <>
                  <StatusBar deckBuilder />
                  {cardsEntries.map(([value, cards]) => (
                    <div key={value}>
                      <h2 className='title'>{value}</h2>
                      <div className='cards'>
                        {cards.map((card) => (
                          <div key={card.id} className='cardContainer' onClick={() => addCard(card)}>
                            <img src={card.image} alt={card.name} />
                            {addedCardsAmount[card.id]
                              ? (
                                <div className={getCardAmountClasses(card.id, card.rarityId)}>
                                  <span className='cardAmountText'>
                                    {addedCardsAmount[card.id]}/{card.rarityId === 5 ? 1 : 2}
                                  </span>
                                </div>
                                )
                              : null}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                  <InView as='div' onChange={(inView) => { getNewCards(inView) }} />
                </>)
              : <NoCards />}
          </div>
          <div className='deckContainer'>
            <div className='topContainer'>
              <div className='top'>
                <div className='topBorder' />
                <div className='titleContainer'>
                  <h3 className='heroTitle'>Standard {HEROS_NAME[hero]} Deck</h3>
                  <h3 className='cardsCount'>{getDeckLength()} / {deckSize}</h3>
                </div>
                <div style={{ backgroundImage: `url(../src/assets/classesBackground/${hero}.jpg)` }} className='heroBackground' />
              </div>
            </div>
            <div className='deck'>
              {deck.map((card) => (
                <img key={card.id} src={card.cropImage} alt={card.name} />
              ))}
            </div>
            <div className='deckBottom' />
          </div>
        </main>
      </>)
    : <Loader />
}

export default DeckBuilder
