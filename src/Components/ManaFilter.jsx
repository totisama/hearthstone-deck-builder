
import { MANA_COSTS, MANA_COSTS_SELECT, LARGE } from '../constants'
import '../Styles/ManaFilter.scss'
import { useResizeWindow } from './../hooks/useResizeWindow'

const ManaFilter = () => {
  const { screenSize } = useResizeWindow()

  const setMana = (event) => {
    console.log(event.target.value)
  }

  return (
    <div className='manaFilter'>
      {screenSize === LARGE
        ? (
          <div className='mana'>
            {MANA_COSTS.map((mana) => (
              <button className='manaIcon' value={mana.slug} key={mana.slug} onClick={setMana}>
                {mana.label}
              </button>
            ))}
          </div>
          )
        : (
          <select className='hidden'>
            {MANA_COSTS_SELECT.map((mana) => (
              <option value={mana.slug} key={mana.slug}>{mana.label}</option>
            ))}
          </select>
          )}
    </div>
  )
}

export default ManaFilter
