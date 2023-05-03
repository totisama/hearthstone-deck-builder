import { useContext } from 'react'
import { FiltersContext } from '../Context/Filters'

export const useFilters = () => {
  const {
    filters,
    setFilter,
    showSubFilters,
    setShowSubFilters,
    page,
    setPage,
    removeFilter,
    removeAllFilters
  } = useContext(FiltersContext)

  const generateQueryParams = () => {
    const queryParams = new URLSearchParams({})
    const entries = Object.entries(filters)

    entries.forEach(entry => {
      if (entry[1] !== '') {
        queryParams.append(entry[0], entry[1])
      }
    })

    return queryParams.toString()
  }

  const getStatusFilters = (deckBuilder = false) => {
    const notShownFilters = ['locale', 'set', 'pageSize', 'sort']
    const statusFilters = {}

    if (deckBuilder) {
      notShownFilters.push('class')
    }

    Object.entries(filters).forEach(([key, value]) => {
      if (value !== '' && !notShownFilters.includes(key)) {
        statusFilters[key] = value
      }
    })

    return statusFilters
  }

  return {
    filters,
    setFilter,
    showSubFilters,
    setShowSubFilters,
    generateQueryParams,
    page,
    setPage,
    getStatusFilters,
    removeFilter,
    removeAllFilters
  }
}
