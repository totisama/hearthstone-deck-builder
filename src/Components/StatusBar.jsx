import '../Styles/StatusBar.scss'
import { useFilters } from '../hooks/useFilters'
import { useStatusBar } from '../hooks/useStatusBar'

const StatusBar = () => {
  const { status } = useStatusBar()
  const { removeFilter } = useFilters()
  const {
    cardCount,
    statusFilters,
    set
  } = status

  return (
    <section className='statusBar'>
      <h1>{cardCount} cards found for "{set}"</h1>
      <div className='removableFilters'>
        {Object.entries(statusFilters).map(([key, value]) => (
          <button key={value} onClick={() => { removeFilter(key) }}>{value}
            <span>✕</span>
          </button>
        ))}
      </div>
    </section>
  )
}

export default StatusBar
