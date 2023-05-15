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
  const [currentRunes, setCurrentRunes] = useState({ blood: 0, frost: 0, unholy: 0 })
  const [isDeathKnigth, setIsDeathKnigth] = useState(false)
  const [loading, setLoading] = useState(true)

  const addCard = (card) => {
    const cardId = card.id
    let localDeckSize = deckSize

    // Specific condition to when this card is added
    if (cardId === 79767) {
      localDeckSize = 40
      setDeckSize(40)
    }

    if (getDeckSize() >= localDeckSize) {
      return
    }

    const cardAmount = addedCardsAmount[cardId]

    // rarityId = 5 (Legendary card)
    // Dont add the card if is already on the deck and has 2 copies of it
    // or the card is legendary and it has a copy already
    if (cardAmount && (cardAmount >= 2 || card.rarityId === 5)) {
      return
    }

    const runeCost = card.runeCost
    if (isDeathKnigth && runeCost) {
      const canAddCard = compareIncomingRunes(runeCost)

      if (!canAddCard) {
        return
      }

      const currentRunesCopy = { ...currentRunes }

      for (const [name, value] of Object.entries(runeCost)) {
        if (value === 0 || value < currentRunesCopy[name]) {
          continue
        }

        currentRunesCopy[name] = value
      }

      setCurrentRunes(currentRunesCopy)
    }

    const deckCopy = [...deck]
    const addedCardsAmountCopy = { ...addedCardsAmount }

    if (cardAmount) {
      addedCardsAmountCopy[cardId] += 1
    } else {
      addedCardsAmountCopy[cardId] = 1
      deckCopy.push(card)
    }

    setAddedCardsAmount(addedCardsAmountCopy)
    setDeck(deckCopy)
  }

  const compareIncomingRunes = (incomingRunes) => {
    let canAdd = true

    for (const [incomingName, incomingValue] of Object.entries(incomingRunes)) {
      if (incomingValue === 0) {
        continue
      }

      for (const [currentRuneName, currentRuneValue] of Object.entries(currentRunes)) {
        if ((incomingName !== currentRuneName && currentRuneValue + incomingValue > 3) ||
          (getRunesAmount() === 3 && incomingValue > currentRunes[incomingName])
        ) {
          canAdd = false
          break
        }
      }
    }

    return canAdd
  }

  const getRunesAmount = () => {
    let runesSize = 0

    Object.values(currentRunes).forEach((amount) => {
      runesSize += amount
    })

    return runesSize
  }

  const removeCard = (card) => {
    const cardId = card.id

    if (!addedCardsAmount[cardId] || addedCardsAmount[cardId] === 0) {
      return
    }

    const isRenathal = cardId === 79767

    if (isRenathal && getDeckSize() > 30) {
      // WIP: Add alert
      return
    }

    // Specific condition to when this card is added
    if (isRenathal) {
      setDeckSize(30)
    }

    const addedCardsAmountCopy = { ...addedCardsAmount }
    let deckCopy = [...deck]

    addedCardsAmountCopy[cardId] -= 1

    if (addedCardsAmountCopy[cardId] === 0) {
      deckCopy = deckCopy.filter(card => card.id !== cardId)
    }

    setAddedCardsAmount(addedCardsAmountCopy)
    setDeck(deckCopy)
  }

  const getDeckSize = () => {
    let deckSize = 0

    Object.values(addedCardsAmount).forEach((cardAmount) => {
      deckSize += cardAmount
    })

    return deckSize
  }

  const getCardAmountClasses = (cardId, cardRarity) => {
    let classes = 'cardAmount'

    if (addedCardsAmount[cardId] >= 2 || cardRarity === 5) {
      classes += ' locked'
    }

    return classes
  }

  const cardAddedFilter = (id, rarityId, runeCost) => {
    let className = ''

    if ((addedCardsAmount[id] === 1 && rarityId === 5) ||
      addedCardsAmount[id] === 2
    ) {
      className = 'amountLimit'
    }

    return className
  }

  useEffect(() => {
    if (!HEROS_LIST.includes(hero)) {
      navigate('/deckbuilder')

      return
    }

    const classFilter = hero + ',neutral'
    setFilter('class', classFilter)

    if (hero === 'deathknight') {
      setIsDeathKnigth(true)
    }

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
                            <img src={card.image} alt={card.name} className={cardAddedFilter(card.id, card.rarityId, card?.runeCost)} />
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
                  <h3 className='cardsCount'>{getDeckSize()} / {deckSize}</h3>
                </div>
                <div style={{ backgroundImage: `url(../src/assets/classesBackground/${hero}.jpg)` }} className='heroBackground' />
              </div>
            </div>
            <div className='deck'>
              {deck.map((card) => (
                <div key={card.id} className='deckCardContainer'>
                  <span className='deckCardMana'>{card.manaCost}</span>
                  <span className='deckCardName'>{card.name}</span>
                  <img src={card.cropImage} alt={card.name} />
                  <span className='deckCardAmount'>{addedCardsAmount[card.id]}</span>
                  <div className='deckCardActions'>
                    <span className='deckCardAction leftAction' onClick={() => addCard(card)}>+</span>
                    <span className='deckCardAction rightAction' onClick={() => removeCard(card)}>-</span>
                  </div>
                </div>
              ))}
            </div>
            <div className='deckBottom' />
          </div>
        </main>
      </>)
    : <Loader />
}

export default DeckBuilder
