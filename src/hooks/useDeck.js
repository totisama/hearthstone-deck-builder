import { useEffect, useState, useContext } from 'react'
import { getDeckCodeCardsId } from '../services'
import { useParams, useNavigate } from 'react-router-dom'
import { useMetadata } from './useMetadata'
import { DeckContext } from '../Context/Deck'
import { useFilters } from './useFilters'
import { HEROS_LIST } from '../constants'

export const useDeck = (updateFilters = false) => {
  const { hero } = useParams()
  const navigate = useNavigate()
  const { setFilter } = useFilters()
  const {
    deck,
    addedCardsAmount,
    deckSize,
    currentRunes,
    currentRunesName,
    isDeathKnigth,
    setIsDeathKnigth,
    addCard,
    currentDeckSize,
    removeCard,
    cardAvailableToAdd
  } = useContext(DeckContext)
  const { getClassIdByName } = useMetadata()
  const [loading, setLoading] = useState(false)

  const copyDeckCode = async () => {
    const idsList = Object.entries(addedCardsAmount).reduce(
      (accumulator, [id, amount]) => {
        accumulator.push(id)

        if (amount === 2) {
          accumulator.push(id)
        }

        return accumulator
      },
      []
    )

    const classId = getClassIdByName(hero)
    const deckCode = await getDeckCodeCardsId(idsList, classId)

    navigator.clipboard.writeText(deckCode)
  }

  useEffect(() => {
    if (updateFilters) {
      setLoading(true)
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
    }
  }, [])

  return {
    addCard,
    removeCard,
    deck,
    addedCardsAmount,
    deckSize,
    currentRunes,
    currentRunesName,
    isDeathKnigth,
    setIsDeathKnigth,
    currentDeckSize,
    copyDeckCode,
    cardAvailableToAdd,
    loading
  }
}
