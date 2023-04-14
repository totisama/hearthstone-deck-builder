import { useState, useEffect } from 'react'
import '../Styles/Filters.scss'
import ManaFilter from './ManaFilter'
import SubFilters from './SubFilters'
import { useMetadata } from '../hooks/useMetadata'
import { useFilters } from '../hooks/useFilters'
import { useDebounce } from '../hooks/useDebounce'

const Filters = () => {
  const { setFilters, showSubFilters, setShowSubFilters } = useFilters()
  const { metadata } = useMetadata()
  const [search, setSearch] = useState('')
  const debouncedFromTextFilter = useDebounce(search, 500)
  const {
    classes = [],
    sets = []
  } = metadata

  const handleOnChangeSet = (event) => {
    setFilters(prevState => ({
      ...prevState,
      set: event.target.value
    }))
  }

  const handleOnChangeClass = (event) => {
    setFilters(prevState => ({
      ...prevState,
      class: event.target.value
    }))
  }

  useEffect(() => {
    setFilters(prevState => ({
      ...prevState,
      textFilter: debouncedFromTextFilter
    }))
  }, [debouncedFromTextFilter])

  return (
    <section className='filters'>
      <div className='mainFilters'>
        <div className='inputFilters'>
          <select className='hidden' onChange={handleOnChangeSet}>
            <option key={1} value='standard'>Standard</option>
            <option key={2} value='wild'>Wild Cards</option>
            {sets.map((set) => (
              <option key={set.id} value={set.slug}>{set.name}</option>
            ))}
          </select>
          <select className='hidden' onChange={handleOnChangeClass}>
            <option key={0} value=''>All Classes</option>
            {classes.map((heroClass) => (
              <option key={heroClass.id} value={heroClass.slug}>{heroClass.name}</option>
            ))}
          </select>
          <ManaFilter />
          <input type='text' placeholder='Search' onChange={(event) => setSearch(event.target.value)} />
        </div>
        <div className='subFiltersbutton'>
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
