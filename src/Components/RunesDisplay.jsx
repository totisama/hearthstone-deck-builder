import '../Styles/RunesDisplay.scss'

const RunesDisplay = ({ currentRunesName }) => {
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
