import { useEffect, useState } from 'react'
import '../Styles/DeckBuilder.scss'
import { useParams, useNavigate } from 'react-router-dom'
import { HEROS_LIST, HEROS_NAME } from '../constants'
import Filters from './Filters'
import { useFilters } from '../hooks/useFilters'
import Loader from './Loader'
import DeckCards from './DeckCards'

const DeckBuilder = () => {
  const { hero } = useParams()
  const navigate = useNavigate()
  const { setFilter } = useFilters()
  const [deck, setDeck] = useState([])
  const [addedCardsAmount, setAddedCardsAmount] = useState({})
  const [deckSize, setDeckSize] = useState(30)
  const [currentRunes, setCurrentRunes] = useState({ blood: 0, frost: 0, unholy: 0 })
  const [currentRunesName, setCurrentRunesName] = useState(['', '', ''])
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
      const canAddCard = cardAvailableToAdd(runeCost)

      if (!canAddCard) {
        return
      }

      updateCurrentRunes(runeCost)
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

  const updateCurrentRunes = (runeCost) => {
    const currentRunesCopy = { ...currentRunes }
    const runeAmount = getCurrentRunesAmount()
    let currentRunesNameCopy = [...currentRunesName]

    for (const [name, value] of Object.entries(runeCost)) {
      if (value === 0 || value <= currentRunesCopy[name]) {
        continue
      }

      if (runeAmount < 3) {
        for (let index = 0; index < value - currentRunes[name]; index++) {
          const emptyIndex = currentRunesNameCopy.findIndex((element) => element === '')

          if (emptyIndex >= 0) {
            currentRunesNameCopy = currentRunesNameCopy.with(emptyIndex, name).sort()
          }
        }
      }

      currentRunesCopy[name] = value
    }

    setCurrentRunesName(currentRunesNameCopy)
    setCurrentRunes(currentRunesCopy)
  }

  const cardAvailableToAdd = (incomingRunes) => {
    const currentRuneAmount = getCurrentRunesAmount()

    if (currentRuneAmount === 0) {
      return true
    }

    for (const [incomingName, incomingValue] of Object.entries(incomingRunes)) {
      if (incomingValue === 0) {
        continue
      }

      let canAdd = true

      for (const [currentRuneName, currentRuneValue] of Object.entries(currentRunes)) {
        if (
          (incomingName !== currentRuneName && currentRuneValue + incomingValue > 3 && currentRuneValue !== 0) ||
          (currentRuneAmount === 3 && incomingValue > currentRunes[incomingName]) ||
          (currentRuneValue === 3 && incomingValue > currentRunes[incomingName] && incomingName !== currentRuneName)
        ) {
          canAdd = false
          break
        }
      }

      if (!canAdd) {
        return canAdd
      }
    }

    return true
  }

  const getCurrentRunesAmount = () => {
    const runesSize = Object.values(currentRunes).reduce(
      (accumulator, value) => accumulator + value,
      0
    )

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

    const runeCost = card.runeCost
    if (isDeathKnigth && runeCost) {
      removeRunesFromCard(runeCost, cardId)
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

  const removeRunesFromCard = (runeCost, cardId) => {
    const localRunes = { blood: 0, frost: 0, unholy: 0 }

    if (getDeckSize() === 1) {
      setCurrentRunesName(['', '', ''])
      setCurrentRunes(localRunes)
      return
    }

    const removeRunesOfType = (runeType, count) => {
      for (let index = 0; index < count; index++) {
        const runeIndex = currentRunesNameCopy.findIndex((element) => element === runeType)

        currentRunesNameCopy[runeIndex] = ''
      }
    }

    const currentRunesNameCopy = [...currentRunesName]

    // Find the highest rune for each type left on the deck
    for (const card of deck) {
      if (!card.runeCost || (card.id === cardId && addedCardsAmount[cardId] === 1)) {
        continue
      }

      const { blood, frost, unholy } = card.runeCost

      if (blood > localRunes.blood) {
        localRunes.blood = blood
      }
      if (frost > localRunes.frost) {
        localRunes.frost = frost
      }
      if (unholy > localRunes.unholy) {
        localRunes.unholy = unholy
      }
    }

    // Conditions to remove the amount of runes for each type depending on the highest rune left
    if (localRunes.blood < runeCost.blood) {
      const bloodAmount = currentRunesNameCopy.filter((element) => element === 'blood').length
      const bloodToRemove = Math.max(0, bloodAmount - localRunes.blood)
      removeRunesOfType('blood', bloodToRemove)
    }

    if (localRunes.frost < runeCost.frost) {
      const frostAmount = currentRunesNameCopy.filter((element) => element === 'frost').length
      const frostToRemove = Math.max(0, frostAmount - localRunes.frost)
      removeRunesOfType('frost', frostToRemove)
    }

    if (localRunes.unholy < runeCost.unholy) {
      const unholyAmount = currentRunesNameCopy.filter((element) => element === 'unholy').length
      const unholyToRemove = Math.max(0, unholyAmount - localRunes.unholy)
      removeRunesOfType('unholy', unholyToRemove)
    }

    setCurrentRunes(localRunes)
    setCurrentRunesName(currentRunesNameCopy.sort())
  }

  const getDeckSize = () => {
    let deckSize = 0

    Object.values(addedCardsAmount).forEach((cardAmount) => {
      deckSize += cardAmount
    })

    return deckSize
  }

  const getRuneClass = (value, index) => {
    const className = `rune ${value}`

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
          <DeckCards addCard={addCard} addedCardsAmount={addedCardsAmount} isDeathKnigth={isDeathKnigth} cardAvailableToAdd={cardAvailableToAdd} />
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
            {isDeathKnigth
              ? (
                <div className='runesContainer'>
                  <div className='runes'>
                    {currentRunesName.map((value, index) =>
                      <div key={index} className={getRuneClass(value, index)} />
                    )}
                  </div>
                </div>)
              : null}
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
