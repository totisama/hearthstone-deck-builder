
import { MANA_COSTS, MANA_COSTS_SELECT, WINDOW_SIZES } from '../constants'
import { useFilters } from '../hooks/useFilters'
import '../Styles/ManaFilter.scss'
import { useResizeWindow } from './../hooks/useResizeWindow'

const ManaFilter = () => {
  const { setFilter, filters } = useFilters()
  const { screenSize } = useResizeWindow()

  const handleManaChange = (event) => {
    setFilter('manaCost', event.target.value)
  }

  return (
    <div className='manaFilter'>
      {screenSize === WINDOW_SIZES.LARGE
        ? (
          <div className='mana'>
            {MANA_COSTS.map((mana) => (
              <button className='manaIcon' value={mana.slug} key={mana.slug} onClick={handleManaChange}>
                {mana.label}
              </button>
            ))}
          </div>
          )
        : (
          <select className='hidden' value={filters.manaCost} onChange={handleManaChange}>
            {MANA_COSTS_SELECT.map((mana) => (
              <option value={mana.slug} key={mana.slug}>{mana.label}</option>
            ))}
          </select>
          )}
    </div>
  )
}

export default ManaFilter
