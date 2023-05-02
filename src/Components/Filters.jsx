import { useState, useEffect } from 'react'
import '../Styles/Filters.scss'
import ManaFilter from './ManaFilter'
import SubFilters from './SubFilters'
import { useMetadata } from '../hooks/useMetadata'
import { useFilters } from '../hooks/useFilters'
import { useDebounce } from '../hooks/useDebounce'

const Filters = ({ deckBuilder = false }) => {
  const { setFilter, showSubFilters, setShowSubFilters, filters } = useFilters()
  const { metadata } = useMetadata()
  const [search, setSearch] = useState('')
  const debouncedFromTextFilter = useDebounce(search, 500)
  const {
    classes = [],
    sets = []
  } = metadata

  const handleOnChange = (event, key) => {
    setFilter(key, event.target.value)
  }

  useEffect(() => {
    setFilter('textFilter', debouncedFromTextFilter)
  }, [debouncedFromTextFilter])

  return (
    <section className='filters'>
      <div className='mainFilters'>
        <div className='inputFilters'>
          {/* {deckBuilder
            ? (
              <h1>deckBuilder</h1>
              )
            : null} */}
          {!deckBuilder
            ? (
              <select className='hidden' value={filters.set} onChange={(e) => handleOnChange(e, 'set')}>
                <option key={1} value='standard'>Standard</option>
                <option key={2} value='wild'>Wild Cards</option>
                {sets.map((set) => (
                  <option key={set.id} value={set.slug}>{set.name}</option>
                ))}
              </select>
              )
            : null}
          {!deckBuilder
            ? (
              <select className='hidden' value={filters.class} onChange={(e) => handleOnChange(e, 'class')}>
                <option key={0} value=''>All Classes</option>
                {classes.map((heroClass) => (
                  <option key={heroClass.id} value={heroClass.slug}>{heroClass.name}</option>
                ))}
              </select>
              )
            : null}
          <ManaFilter />
          <input type='text' defaultValue={filters.textFilter} placeholder='Search' onChange={(event) => setSearch(event.target.value)} />
        </div>
        <div className='subFiltersButton'>
          <button onClick={() => setShowSubFilters(!showSubFilters)}>More Filters</button>
        </div>
      </div>
      {showSubFilters
        ? (
          <SubFilters />
          )
        : null}
    </section>
  )
}

export default Filters
