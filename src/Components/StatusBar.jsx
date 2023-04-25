import '../Styles/StatusBar.scss'
import { useFilters } from '../hooks/useFilters'
import { useStatusBar } from '../hooks/useStatusBar'
import clearIcon from '../Assets/clear-icon.svg'

const StatusBar = () => {
  const { removeFilter, removeAllFilters } = useFilters()
  const { status } = useStatusBar()
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
            {value}
            <span>✕</span>
          </button>
        ))}
        {statusFiltersEntries.length > 1
          ? (
            <button onClick={() => { removeAllFilters() }}>
              <img src={clearIcon} />
              Clear All
            </button>)
          : null}
      </div>
    </section>
  )
}

export default StatusBar
