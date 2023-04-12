import '../Styles/Hamburger.scss'
import { HEALTH_VALUES, ATTACK_VALUES } from '../constants'
import cross from '../Assets/cross.svg'
import { useMetadata } from '../hooks/useMetadata'

const Hamburger = ({ setShowSubFilters }) => {
  const { metadata } = useMetadata()
  const {
    types = [],
    classes = [],
    sets = [],
    minionTypes = [],
    spellSchools = [],
    keywords = [],
    rarities = []
  } = metadata

  return (
    <aside className='hamburger'>
      <div className='close'>
        <img src={cross} onClick={() => { setShowSubFilters(false) }} />
      </div>
      <div className='hamburger-filters'>
        <select>
          <option key={1} value='standard'>Standard</option>
          <option key={2} value='wild'>Wild Cards</option>
          {sets.map((set) => (
            <option key={set.id} value={set.slug}>{set.name}</option>
          ))}
        </select>
        <select>
          <option key={0} value=''>All Classes</option>
          {classes.map((heroClass) => (
            <option key={heroClass.id} value={heroClass.slug}>{heroClass.name}</option>
          ))}
        </select>
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
      </div>
    </aside>
  )
}

export default Hamburger
