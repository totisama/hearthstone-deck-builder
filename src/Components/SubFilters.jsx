import '../Styles/SubFilters.scss'
import { HEALTH_VALUES, ATTACK_VALUES, RARITIES } from '../constants'
// import { useResizeWindow } from './../hooks/useResizeWindow'

const SubFilters = () => {
  // const { screenSize } = useResizeWindow()

  return (
    <div className='subFilters'>
      <select>
        {HEALTH_VALUES.map((health) => (
          <option key={health.value} value={health.value}>{health.label}</option>
        ))}
      </select>
      <select>
        {ATTACK_VALUES.map((attack) => (
          <option key={attack.value} value={attack.value}>{attack.label}</option>
        ))}
      </select>
      <select>
        {RARITIES.map((rarity) => (
          <option key={rarity.value} value={rarity.value}>{rarity.label}</option>
        ))}
      </select>
    </div>
  )
}

export default SubFilters
