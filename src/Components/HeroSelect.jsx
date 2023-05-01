import '../Styles/HeroSelect.scss'
import { Link } from 'react-router-dom'
import { HERO_CLASSES } from '../constants'

const assetsPath = 'src/assets/classes/'

const HeroSelect = () => {
  return (
    <main className='heroSelectionContainer'>
      <div className='heroSelection'>
        {HERO_CLASSES.map((hero) => (
          <Link key={hero.id} to={'/deckbuilder/' + hero.value}>
            <div className='heroButton'>
              <img src={assetsPath + hero.image} alt={hero.name} />
              <div className='heroName'>
                <h4>{hero.name}</h4>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </main>
  )
}

export default HeroSelect
