import { useFilters } from './useFilters'
import { useEffect, useState } from 'react'
import { getCards } from '../services'

export const useCards = () => {
  const { filters, generateQueryParams, setPage, page } = useFilters()
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

  const getNewCards = async (inView) => {
    if (!inView || page >= totalPageCount) {
      return
    }
    const newPage = page + 1

    setPage(newPage)
    getNextPageCards(newPage)
  }

  useEffect(() => {
    setPage(1)
    retrieveCards()
  }, [filters])

  return {
    cards, getNextPageCards, totalPageCount, getNewCards
  }
}
