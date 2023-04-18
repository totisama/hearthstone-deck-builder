import { useEffect, useState } from 'react'
import { useFilters } from './useFilters'
import { useCards } from './useCards'

export const useStatusBar = () => {
  const [status, setStatus] = useState({ cardCount: 0, statusFilters: {}, set: '' })
  const { filters, getStatusFilters } = useFilters()
  const { cardCount } = useCards(false)

  const updateStatus = () => {
    const statusFilters = getStatusFilters()
    const newStatus = { statusFilters, cardCount, set: filters.set }
    setStatus(newStatus)
  }

  useEffect(() => {
    updateStatus()
  }, [filters, cardCount])

  return {
    status
  }
}
