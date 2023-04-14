import { DEFAULT_LOCALE } from '../constants'
import { createContext, useState } from 'react'

export const FiltersContext = createContext()

export const FiltersProvider = ({ children }) => {
  const [filters, setFilters] = useState({
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
  })
  const [showSubFilters, setShowSubFilters] = useState(false)
  const [page, setPage] = useState(1)

  return (
    <FiltersContext.Provider value={{
      filters,
      setFilters,
      showSubFilters,
      setShowSubFilters,
      page,
      setPage
    }}
    >
      {children}
    </FiltersContext.Provider>
  )
}
