import { useEffect, useState } from 'react'
import '../Styles/Cards.scss'
import { getCards } from '../services'
import { useFilters } from '../hooks/useFilters'

const Cards = () => {
  const { filters } = useFilters()
  const [cards, setCards] = useState([])

  const retrieveCards = async () => {
    const data = await getCards(filters)

    setCards(data.cards)
  }

  useEffect(() => {
    retrieveCards()
  }, [filters])

  return (
    <main className='cards'>
      {cards.map((card) => (
        <img key={card.id} className='image' src={card.image} alt={card.name} />
      ))}
    </main>
  )
}

export default Cards
