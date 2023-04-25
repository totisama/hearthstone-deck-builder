import '../Styles/SubFilters.scss'
import { HEALTH_VALUES, ATTACK_VALUES, LARGE, MEDIUM } from '../constants'
import { useResizeWindow } from './../hooks/useResizeWindow'
import Hamburger from './Hamburger'
import { useMetadata } from '../hooks/useMetadata'
import { useFilters } from '../hooks/useFilters'

const SubFilters = () => {
  const { screenSize } = useResizeWindow()
  const { setFilters, filters } = useFilters()
  const { metadata } = useMetadata()
  const {
    types = [],
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

  return screenSize === LARGE || screenSize === MEDIUM
    ? (
      <aside className='subFilters'>
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
      </aside>)
    : <Hamburger />
}

export default SubFilters
