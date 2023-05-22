import '../Styles/HeroSelect.scss'
import { useNavigate } from 'react-router-dom'
import { HERO_CLASSES } from '../constants'
import { useCards } from '../hooks/useCards'
import { useFilters } from '../hooks/useFilters'

const assetsPath = 'src/assets/classes/'

const HeroSelect = () => {
  const { resetCards } = useCards(false)
  const { setFilter, removeAllFilters } = useFilters()
  const navigate = useNavigate()

  const goToDeckbuilder = (value) => {
    removeAllFilters()
    resetCards()

    const classFilter = value + ',neutral'
    setFilter('class', classFilter)

    navigate('/deckbuilder/' + value)
  }

  return (
    <main className='heroSelectionContainer'>
      <div className='heroSelection'>
        {HERO_CLASSES.map((hero) => (
          <button type='button' key={hero.id} className='heroButton' onClick={() => goToDeckbuilder(hero.value)}>
            <img src={assetsPath + hero.image} alt={hero.name} />
            <div className='heroName'>
              <h4>{hero.name}</h4>
            </div>
          </button>
        ))}
      </div>
    </main>
  )
}

export default HeroSelect
