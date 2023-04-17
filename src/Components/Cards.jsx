import '../Styles/Cards.scss'
// import { getCards } from '../services'
// import { useMetadata } from '../hooks/useMetadata'
import { useCards } from '../hooks/useCards'
import { InView } from 'react-intersection-observer'

const Cards = () => {
  const { cards, getNewCards } = useCards()
  // const { getClassesIdName } = useMetadata()
  // const [cards, setCards] = useState([])
  // const classesObject = getClassesIdName()
  // let lastClassId = null

  // const classChanged = (currentClassId) => {
  //   if (lastClassId === null || lastClassId !== currentClassId) {
  //     lastClassId = currentClassId
  //     return true
  //   }
  //   return false
  // }

  return (
    <main>
      {cards.length > 0
        ? (
          <div className=' cards'>
            {cards.map((card) => (
              <img key={card.id} className='image' src={card.image} alt={card.name} />
            ))}
            <InView as='div' onChange={(inView) => { getNewCards(inView) }} />
          </div>
          )
        : null}
    </main>
  )
}

export default Cards
