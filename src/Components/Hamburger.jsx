import '../Styles/Hamburger.scss'
import { HEALTH_VALUES, ATTACK_VALUES } from '../constants'
import cross from '../assets/cross.svg'
import { useMetadata } from '../hooks/useMetadata'
import { useFilters } from '../hooks/useFilters'

const Hamburger = () => {
  const { setFilters, setShowSubFilters, filters } = useFilters()
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

  const handleOnChange = (event, filter) => {
    setFilters((prevState) => {
      const newState = { ...prevState }
      newState[filter] = event.target.value

      return newState
    })
  }

  return (
    <aside className='hamburger'>
      <div className='close'>
        <img src={cross} onClick={() => { setShowSubFilters(false) }} />
      </div>
      <div className='hamburgerFilters'>
        <select value={filters.set} onChange={(event) => handleOnChange(event, 'set')}>
          <option key={1} value='standard'>Standard</option>
          <option key={2} value='wild'>Wild Cards</option>
          {sets.map((set) => (
            <option key={set.id} value={set.slug}>{set.name}</option>
          ))}
        </select>
        <select value={filters.class} onChange={(event) => handleOnChange(event, 'class')}>
          <option key={0} value=''>All Classes</option>
          {classes.map((heroClass) => (
            <option key={heroClass.id} value={heroClass.slug}>{heroClass.name}</option>
          ))}
        </select>
        <select value={filters.attack} onChange={(event) => handleOnChange(event, 'attack')}>
          {ATTACK_VALUES.map((attack) => (
            <option key={attack.slug} value={attack.slug}>{attack.label}</option>
          ))}
        </select>
        <select value={filters.health} onChange={(event) => handleOnChange(event, 'health')}>
          {HEALTH_VALUES.map((health) => (
            <option key={health.slug} value={health.slug}>{health.label}</option>
          ))}
        </select>
        <select value={filters.type} onChange={(event) => handleOnChange(event, 'type')}>
          <option key={0} value=''>Any Card Type</option>
          {types.map((type) => (
            <option key={type.id} value={type.slug}>{type.name}</option>
          ))}
        </select>
        <select value={filters.minionType} onChange={(event) => handleOnChange(event, 'minionType')}>
          <option key={0} value=''>Any Minion Type</option>
          {minionTypes.map((minionType) => (
            <option key={minionType.id} value={minionType.slug}>{minionType.name}</option>
          ))}
        </select>
        <select value={filters.spellSchool} onChange={(event) => handleOnChange(event, 'spellSchool')}>
          <option key={0} value=''>Any Spell School</option>
          {spellSchools.map((spellSchool) => (
            <option key={spellSchool.id} value={spellSchool.slug}>{spellSchool.name}</option>
          ))}
        </select>
        <select value={filters.rarity} onChange={(event) => handleOnChange(event, 'rarity')}>
          <option key={0} value=''>Any Rarity</option>
          {rarities.map((rarity) => (
            <option key={rarity.id} value={rarity.slug}>{rarity.name}</option>
          ))}
        </select>
        <select value={filters.keyword} onChange={(event) => handleOnChange(event, 'keyword')}>
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
