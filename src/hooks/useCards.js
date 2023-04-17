import { useFilters } from './useFilters'
import { useEffect, useState } from 'react'
import { getCards } from '../services'
import { useMetadata } from './useMetadata'

export const useCards = () => {
  const { filters, generateQueryParams, setPage, page } = useFilters()
  const [cards, setCards] = useState({})
  const [totalPageCount, setTotalPageCount] = useState(null)
  const { classesIdsValue } = useMetadata()

  const retrieveCards = async (orderCards = true) => {
    const data = await getCards(generateQueryParams())
    const { cards: cardsData, pageCount } = data

    if (!cardsData) {
      throw new Error('Error getting Cards')
    }

    let obtainedCards = cardsData

    if (orderCards) {
      obtainedCards = getOrderedCards(obtainedCards)
    }

    setTotalPageCount(pageCount)
    setCards(obtainedCards)
  }

  const getNextPageCards = async (page, orderCards = true) => {
    const data = await getCards(generateQueryParams(), true, page)
    const { cards: cardsData, pageCount } = data

    if (!cardsData) {
      throw new Error('Error getting Cards')
    }

    let obtainedCards = cardsData

    if (orderCards) {
      obtainedCards = getOrderedCards(obtainedCards)
    }

    setTotalPageCount(pageCount)
    setCards(prevState => ({
      ...prevState,
      ...obtainedCards
    }))
  }

  const getOrderedCards = (obtainedCards) => {
    const orderedCardsObject = {}

    obtainedCards.forEach(card => {
      const { classId } = card
      const currentClass = classesIdsValue[classId]

      if (!orderedCardsObject[currentClass]) {
        orderedCardsObject[currentClass] = []
      }

      orderedCardsObject[currentClass].push(card)
    })

    const existingCardsKeys = Object.keys(cards)

    if (existingCardsKeys.length > 0) {
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

  useEffect(() => {
    setPage(1)
    retrieveCards()
  }, [filters])

  return {
    cards, getNextPageCards, totalPageCount, getNewCards
  }
}
