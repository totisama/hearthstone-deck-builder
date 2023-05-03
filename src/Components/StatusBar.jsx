import '../Styles/StatusBar.scss'
import { useFilters } from '../hooks/useFilters'
import { useStatusBar } from '../hooks/useStatusBar'
import clearIcon from '../assets/clear-icon.svg'
import { NUMBER_FILTERS_KEY } from '../constants'

const StatusBar = ({ deckBuilder = false }) => {
  const { removeFilter, removeAllFilters } = useFilters()
  const { status } = useStatusBar({ deckBuilder })
  const {
    cardCount,
    statusFilters,
    set
  } = status
  const statusFiltersEntries = Object.entries(statusFilters)

  return (
    <section className='statusBar'>
      <div className='removableFilters'>
        <h1>{cardCount} cards found for "{set}"</h1>
        {statusFiltersEntries.map(([key, value]) => (
          <button key={value} onClick={() => { removeFilter(key) }}>
            {NUMBER_FILTERS_KEY[key]
              ? NUMBER_FILTERS_KEY[key] + ': ' + value
              : value}
            <span>✕</span>
          </button>
        ))}
        {statusFiltersEntries.length > 1
          ? (
            <button onClick={() => { removeAllFilters(deckBuilder) }}>
              <img src={clearIcon} />
              Clear All
            </button>)
          : null}
      </div>
    </section>
  )
}

export default StatusBar
