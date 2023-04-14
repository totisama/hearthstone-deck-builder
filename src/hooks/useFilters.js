import { useContext } from 'react'
import { FiltersContext } from '../Context/Filters'

export const useFilters = () => {
  const {
    filters,
    setFilters,
    showSubFilters,
    setShowSubFilters,
    page,
    setPage
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

  return {
    filters,
    setFilters,
    showSubFilters,
    setShowSubFilters,
    generateQueryParams,
    page,
    setPage
  }
}
