import { useFilters } from './useFilters'
import { useEffect, useState, useContext } from 'react'
import { getCards } from '../services'
import { useMetadata } from './useMetadata'
import { CardsContext } from '../Context/Cards'

export const useCards = (updateCards = true) => {
  const { cards, setCards, cardCount, setCardCount } = useContext(CardsContext)
  const { filters, generateQueryParams, setPage, page } = useFilters()
  const [totalPageCount, setTotalPageCount] = useState(null)
  const { classesIdsValue } = useMetadata()

  const retrieveCards = async (orderCards = true) => {
    const data = await getCards(generateQueryParams())
    const { cards: cardsData, pageCount, cardCount } = data

    if (!cardsData) {
      throw new Error('Error getting Cards')
    }

    let obtainedCards = cardsData

    setCardCount(cardCount)
    if (orderCards) {
      obtainedCards = getOrderedCards(obtainedCards, true)
    }

    setTotalPageCount(pageCount)
    setCards(obtainedCards)
  }

  const getNextPageCards = async (page, orderCards = true) => {
    const data = await getCards(generateQueryParams(), true, page)
    const { cards: cardsData, pageCount, cardCount } = data

    if (!cardsData) {
      throw new Error('Error getting Cards')
    }

    let obtainedCards = cardsData

    setCardCount(cardCount)
    if (orderCards) {
      obtainedCards = getOrderedCards(obtainedCards)
    }

    setTotalPageCount(pageCount)
    setCards(prevState => ({
      ...prevState,
      ...obtainedCards
    }))
  }

  const getOrderedCards = (obtainedCards, filtersChanged = false) => {
    const orderedCardsObject = {}

    if (Object.keys(classesIdsValue).length === 0) {
      return {}
    }

    obtainedCards.forEach(card => {
      const { classId } = card
      const currentClass = classesIdsValue[classId]

      if (!orderedCardsObject[currentClass]) {
        orderedCardsObject[currentClass] = []
      }

      orderedCardsObject[currentClass].push(card)
    })

    if (filtersChanged) {
      return orderedCardsObject
    }

    const existingCardsKeys = Object.keys(cards)

    if (existingCardsKeys.length > 0 && existingCardsKeys[0]) {
      const orderedCardsKeys = Object.keys(orderedCardsObject)

      orderedCardsKeys.forEach(key => {
        if (existingCardsKeys.includes(key)) {
          orderedCardsObject[key] = [...cards[key], ...orderedCardsObject[key]]
        }
      })
    }

    return orderedCardsObject
  }

  const getNewCards = async (inView) => {
    if (!inView || page >= totalPageCount) {
      return
    }
    const newPage = page + 1

    getNextPageCards(newPage)
    setPage(newPage)
  }

  const resetCards = () => {
    setCards({})
    setPage(1)
  }

  useEffect(() => {
    if (updateCards) {
      setPage(1)
      retrieveCards()
    }
  }, [filters])

  return {
    cards, getNextPageCards, totalPageCount, getNewCards, cardCount, resetCards
  }
}
