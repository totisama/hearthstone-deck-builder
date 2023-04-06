import '../Styles/Filters.scss'
import ManaFilter from './ManaFilter'

const Filters = () => {
  return (
    <section className='filters'>
      <div className='mainFilters'>
        <div className='inputFilters'>
          <select className='hidden'>
            <option value='standard-cards'>Standard Cards</option>
            <option value='path-of-arthas'>Path of Arthas</option>
          </select>
          <select className='hidden'>
            <option value='all-classes'>All Classes</option>
            <option value='death-knight'>Death Knight</option>
          </select>
          <ManaFilter />
          <input type='text' placeholder='Search' />
        </div>
        <div className='subFiltersbutton'>
          <button>More Filters</button>
        </div>
      </div>
    </section>
  )
}

export default Filters
