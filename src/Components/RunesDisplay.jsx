import '../Styles/RunesDisplay.scss'
import { useDeck } from '../hooks/useDeck'

const RunesDisplay = () => {
  const { currentRunesName } = useDeck()

  const getRuneClass = (value) => {
    const className = `rune ${value}`

    return className
  }

  return (
    <div className='runesContainer'>
      <div className='runes'>
        {currentRunesName.map((value, index) =>
          <div key={index} className={getRuneClass(value)} />
        )}
      </div>
    </div>
  )
}

export default RunesDisplay
