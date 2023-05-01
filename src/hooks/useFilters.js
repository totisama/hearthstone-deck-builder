import { useContext } from 'react'
import { FiltersContext } from '../Context/Filters'

export const useFilters = () => {
  const {
    filters,
    setFilters,
    showSubFilters,
    setShowSubFilters,
    page,
    setPage,
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

  const getStatusFilters = () => {
    const notShownFilters = ['locale', 'set', 'pageSize', 'sort']
    const statusFilters = {}

    Object.entries(filters).forEach(([key, value]) => {
      if (value !== '' && !notShownFilters.includes(key)) {
        statusFilters[key] = value
      }
    })

    return statusFilters
  }

  const removeFilter = (filterKey) => {
    const newFilter = {}
    newFilter[filterKey] = ''

    setFilters(prevState => ({
      ...prevState,
      ...newFilter
    }))
  }

  return {
    filters,
    setFilters,
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
