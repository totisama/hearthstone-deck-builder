import '../Styles/Cards.scss'
import { useEffect } from 'react'
import { useCards } from '../hooks/useCards'
import { useFilters } from '../hooks/useFilters'
import { InView } from 'react-intersection-observer'
import NoCards from './NoCards'
import Filters from './Filters'
import StatusBar from './StatusBar'

const Cards = () => {
  const { removeAllFilters } = useFilters()
  const { cards, getNewCards, resetCards } = useCards()
  const cardsEntries = Object.entries(cards)

  useEffect(() => {
    resetCards()
    removeAllFilters()
  }, [])

  return (
    <>
      <Filters />
      <StatusBar />
      <main>
        {cardsEntries.length > 0
          ? (
            <>
              {cardsEntries.map(([value, cards]) => (
                <div key={value}>
                  <h2 className='title'>{value}</h2>
                  <div className='cards'>
                    {cards.map((card) => (
                      <img key={card.id} src={card.image} alt={card.name} />
                    ))}
                  </div>
                </div>
              ))}
              <InView as='div' onChange={(inView) => { getNewCards(inView) }} />
            </>)
          : <NoCards />}
      </main>
    </>
  )
}

export default Cards
