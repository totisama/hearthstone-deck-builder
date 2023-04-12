import { useState } from 'react'
import '../Styles/Filters.scss'
import ManaFilter from './ManaFilter'
import SubFilters from './SubFilters'
import { useMetadata } from '../hooks/useMetadata'

const Filters = () => {
  const { metadata } = useMetadata()
  const [showSubFilters, setShowSubFilters] = useState(false)
  const {
    classes = [],
    sets = []
  } = metadata

  return (
    <section className='filters'>
      <div className='mainFilters'>
        <div className='inputFilters'>
          <select className='hidden'>
            <option key={1} value='standard'>Standard</option>
            <option key={2} value='wild'>Wild Cards</option>
            {sets.map((set) => (
              <option key={set.id} value={set.slug}>{set.name}</option>
            ))}
          </select>
          <select className='hidden'>
            <option key={0} value=''>All Classes</option>
            {classes.map((heroClass) => (
              <option key={heroClass.id} value={heroClass.slug}>{heroClass.name}</option>
            ))}
          </select>
          <ManaFilter />
          <input type='text' placeholder='Search' />
        </div>
        <div className='subFiltersbutton'>
          <button onClick={() => setShowSubFilters(!showSubFilters)}>More Filters</button>
        </div>
      </div>
      {showSubFilters
        ? (
          <SubFilters setShowSubFilters={setShowSubFilters} />
          )
        : null}
    </section>
  )
}

export default Filters
