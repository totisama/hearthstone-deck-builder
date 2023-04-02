import '../Styles/Filters.scss'
import { MANA_COSTS } from '../constants'

const Filters = () => {
  const setMana = (event) => {
    console.log(event.target.value)
  }

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
      <div className='mana'>
        {MANA_COSTS.map((mana) => (
          <button className='manaIcon' value={mana.value} key={mana.value} onClick={setMana}>
            {mana.label}
          </button>
        ))}
      </div>
      <input type='text' placeholder='Search' />
    </section>
  )
}

export default Filters
