import '../Styles/Filters.scss'
import ManaFilter from './ManaFilter'

const Filters = () => {
  return (
    <section className='filters'>
      <select>
        <option value='standard-cards'>Standard Cards</option>
        <option value='path-of-arthas'>Path of Arthas</option>
      </select>
      <select>
        <option value='all-classes'>All Classes</option>
        <option value='death-knight'>Death Knight</option>
      </select>
      <ManaFilter />
      <input type='text' placeholder='Search' />
    </section>
  )
}

export default Filters
