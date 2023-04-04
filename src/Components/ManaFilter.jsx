
import { MANA_COSTS, MANA_COSTS_SELECT } from '../constants'
import '../Styles/ManaFilter.scss'
import { useResize } from './hooks/useResize'

const ManaFilter = () => {
  const { isDesktop } = useResize()

  const setMana = (event) => {
    console.log(event.target.value)
  }

  return (
    <div className='manaFilter'>
      {isDesktop
        ? (
          <div className='mana'>
            {MANA_COSTS.map((mana) => (
              <button className='manaIcon' value={mana.value} key={mana.value} onClick={setMana}>
                {mana.label}
              </button>
            ))}
          </div>
          )
        : (
          <select className='manaSelect'>
            {MANA_COSTS_SELECT.map((mana) => (
              <option value={mana.value} key={mana.value}>{mana.label}</option>
            ))}
          </select>
          )}
    </div>
  )
}

export default ManaFilter
