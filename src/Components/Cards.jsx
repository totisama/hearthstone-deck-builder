import { useEffect, useState } from 'react'
import '../Styles/Cards.scss'
import { getCards } from '../services'

const Cards = () => {
  const [cards, setCards] = useState([])

  const retrieveCards = async () => {
    const data = await getCards()

    setCards(data.cards)
  }

  useEffect(() => {
    retrieveCards()
  }, [])

  return (
    <main className='cards'>
      {cards.map((card) => (
        <img key={card.id} className='image' src={card.image} alt={card.name} />
      ))}
    </main>
  )
}

export default Cards
