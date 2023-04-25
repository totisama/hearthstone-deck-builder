import '../Styles/Cards.scss'
import { useCards } from '../hooks/useCards'
import { InView } from 'react-intersection-observer'
import NoCards from './NoCards'

const Cards = () => {
  const { cards, getNewCards } = useCards()
  const cardsEntries = Object.entries(cards)

  return (
    <main>
      {cardsEntries.length > 0
        ? (
          <>
            {cardsEntries.map(([value, cards]) => (
              <div key={value}>
                <h2 className='title'>{value}</h2>
                <div className='cards'>
                  {cards.map((card) => (
                    <img key={card.id} className='image' src={card.image} alt={card.name} />
                  ))}
                </div>
              </div>
            ))}
            <InView as='div' onChange={(inView) => { getNewCards(inView) }} />
          </>)
        : <NoCards />}
    </main>
  )
}

export default Cards
