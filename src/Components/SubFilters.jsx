import '../Styles/SubFilters.scss'
import { HEALTH_VALUES, ATTACK_VALUES, LARGE, MEDIUM } from '../constants'
import { useResizeWindow } from './../hooks/useResizeWindow'

const SubFilters = ({ metadata }) => {
  const { screenSize } = useResizeWindow()
  const {
    types = [],
    // classes = [],
    // sets = [],
    minionTypes = [],
    spellSchools = [],
    keywords = [],
    rarities = []
  } = metadata

  return screenSize === LARGE || screenSize === MEDIUM
    ? (
      <aside className='subFilters'>
        <select>
          {HEALTH_VALUES.map((health) => (
            <option key={health.slug} value={health.slug}>{health.label}</option>
          ))}
        </select>
        <select>
          {ATTACK_VALUES.map((attack) => (
            <option key={attack.slug} value={attack.slug}>{attack.label}</option>
          ))}
        </select>
        <select>
          <option key={0} value=''>Any Type</option>
          {types.map((type) => (
            <option key={type.id} value={type.slug}>{type.name}</option>
          ))}
        </select>
        <select>
          <option key={0} value=''>Any Type</option>
          {minionTypes.map((minionType) => (
            <option key={minionType.id} value={minionType.slug}>{minionType.name}</option>
          ))}
        </select>
        <select>
          <option key={0} value=''>Any School</option>
          {spellSchools.map((spellSchool) => (
            <option key={spellSchool.id} value={spellSchool.slug}>{spellSchool.name}</option>
          ))}
        </select>
        <select>
          <option key={0} value=''>Any Rarity</option>
          {rarities.map((rarity) => (
            <option key={rarity.id} value={rarity.slug}>{rarity.name}</option>
          ))}
        </select>
        <select>
          <option key={0} value=''>Any Keyword</option>
          {keywords.map((keyword) => (
            <option key={keyword.id} value={keyword.slug}>{keyword.name}</option>
          ))}
        </select>
      </aside>)
    : null
}

export default SubFilters
