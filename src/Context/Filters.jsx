import { DEFAULT_LOCALE } from '../constants'
import { createContext, useState } from 'react'

const initialFilters = {
  locale: DEFAULT_LOCALE,
  set: 'standard',
  class: '',
  manaCost: '',
  attack: '',
  health: '',
  rarity: '',
  type: '',
  minionType: '',
  keyword: '',
  textFilter: '',
  spellSchool: '',
  pageSize: 250,
  sort: 'manaCost:asc,name:asc,classes:asc,groupByClass:asc'
}

export const FiltersContext = createContext()

export const FiltersProvider = ({ children }) => {
  const [filters, setFilters] = useState(initialFilters)
  const [showSubFilters, setShowSubFilters] = useState(false)
  const [page, setPage] = useState(1)

  const setFilter = (key, value) => {
    const newFilter = {}
    newFilter[key] = value

    setFilters(prevState => ({
      ...prevState,
      ...newFilter
    }))
  }

  const removeFilter = (filterKey) => {
    const newFilter = {}
    newFilter[filterKey] = ''

    setFilters(prevState => ({
      ...prevState,
      ...newFilter
    }))
  }

  const removeAllFilters = (deckbuilder) => {
    if (!deckbuilder) {
      setFilters(initialFilters)

      return
    }

    const deckbuilderFilters = initialFilters

    deckbuilderFilters.class = filters.class

    setFilters(initialFilters)
  }

  return (
    <FiltersContext.Provider value={{
      filters,
      setFilter,
      showSubFilters,
      setShowSubFilters,
      page,
      setPage,
      removeFilter,
      removeAllFilters
    }}
    >
      {children}
    </FiltersContext.Provider>
  )
}
