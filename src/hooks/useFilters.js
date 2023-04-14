import { useContext } from 'react'
import { FiltersContext } from '../Context/Filters'

export const useFilters = () => {
  const { filters, setFilters, showSubFilters, setShowSubFilters } = useContext(FiltersContext)

  return {
    filters, setFilters, showSubFilters, setShowSubFilters
  }
}
