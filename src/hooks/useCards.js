import { useFilters } from './useFilters'
import { useEffect, useState } from 'react'
import { getCards } from '../services'

export const useCards = () => {
  const { filters, generateQueryParams, setPage } = useFilters()
  const [cards, setCards] = useState([])
  const [totalPageCount, setTotalPageCount] = useState(null)

  const retrieveCards = async () => {
    const data = await getCards(generateQueryParams())
    const { cards, pageCount } = data

    if (!cards) {
      throw new Error('Error getting Cards')
    }

    setTotalPageCount(pageCount)
    setCards(cards)
  }

  const getNextPageCards = async (page) => {
    const data = await getCards(generateQueryParams(), true, page)
    const { cards, pageCount } = data

    if (!cards) {
      throw new Error('Error getting Cards')
    }

    setTotalPageCount(pageCount)
    setCards(prevState => [...prevState, ...cards])
  }

  useEffect(() => {
    setPage(1)
    retrieveCards()
  }, [filters])

  return {
    cards, getNextPageCards, totalPageCount
  }
}
