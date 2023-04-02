import { useEffect, useState } from 'react'
import '../Styles/Cards.scss'

const Cards = () => {
  const [cards, setCards] = useState([])

  const retrieveCards = async () => {
    const response = await fetch('https://eu.api.blizzard.com/hearthstone/cards?locale=en_US&sort=manaCost:asc,name:asc,classes:asc,groupByClass:asc&page=1&access_token=EUmY2UXu50se2AWWgsX4XeReXlemh9w78g')
    const data = await response.json()
    // console.log(data)
    setCards(data.cards)
  }

  useEffect(() => {
    retrieveCards()
  }, [])

  return (
    <section className='cards'>
      {cards.map((card) => (
        <img key={card.id} className='image' src={card.image} alt={card.name} />
      ))}
    </section>
  )
}

export default Cards
