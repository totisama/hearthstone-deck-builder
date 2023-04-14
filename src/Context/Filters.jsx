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
    page: 1,
    pageSize: 250,
    sort: 'manaCost:asc,name:asc,classes:asc,groupByClass:asc'
  })
  const [showSubFilters, setShowSubFilters] = useState(false)

  return (
    <FiltersContext.Provider value={{
      filters,
      setFilters,
      showSubFilters,
      setShowSubFilters
    }}
    >
      {children}
    </FiltersContext.Provider>
  )
}
