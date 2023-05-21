import '../Styles/DeckCard.scss'

const DeckCard = ({ card, addedCardsAmount, addCard, removeCard }) => {
  return (
    <div className='deckCardContainer'>
      <span className='deckCardMana'>{card.manaCost}</span>
      <span className='deckCardName'>{card.name}</span>
      <img src={card.cropImage} alt={card.name} />
      <span className='deckCardAmount'>{addedCardsAmount[card.id]}</span>
      <div className='deckCardActions'>
        <span className='deckCardAction leftAction' onClick={() => addCard(card)}>+</span>
        <span className='deckCardAction rightAction' onClick={() => removeCard(card)}>-</span>
      </div>
    </div>
  )
}

export default DeckCard
