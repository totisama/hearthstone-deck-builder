import NoCards from './NoCards'
import StatusBar from './StatusBar'
import { InView } from 'react-intersection-observer'
import { useCards } from '../hooks/useCards'
import { useDeck } from '../hooks/useDeck'
import '../Styles/DeckCards.scss'

const DeckCards = () => {
  const { cards, getNewCards } = useCards()
  const cardsEntries = Object.entries(cards)
  const {
    addCard,
    addedCardsAmount,
    isDeathKnigth,
    cardAvailableToAdd
  } = useDeck()

  const getCardAmountClasses = (cardId, cardRarity) => {
    let classes = 'cardAmount'

    if (addedCardsAmount[cardId] >= 2 || cardRarity === 5) {
      classes += ' locked'
    }

    return classes
  }

  const cardAddedFilter = (id, rarityId, runeCost) => {
    let className = ''

    if (isDeathKnigth && runeCost) {
      const canAdd = cardAvailableToAdd(runeCost)

      className = canAdd ? '' : 'runeAmountLimit'
    }

    if ((addedCardsAmount[id] === 1 && rarityId === 5) ||
      addedCardsAmount[id] === 2
    ) {
      className = 'amountLimit'
    }

    return className
  }

  return (
    <div className='deckCardsContainer'>
      {cardsEntries.length > 0
        ? (
          <>
            <StatusBar deckBuilder />
            {cardsEntries.map(([value, cards]) => (
              <div key={value}>
                <h2 className='title'>{value}</h2>
                <div className='cards'>
                  {cards.map((card) => (
                    <div key={card.id} className='cardContainer' onClick={() => addCard(card)}>
                      <img src={card.image} alt={card.name} className={cardAddedFilter(card.id, card.rarityId, card?.runeCost)} />
                      {addedCardsAmount[card.id]
                        ? (
                          <div className={getCardAmountClasses(card.id, card.rarityId)}>
                            <span className='cardAmountText'>
                              {addedCardsAmount[card.id]}/{card.rarityId === 5 ? 1 : 2}
                            </span>
                          </div>
                          )
                        : null}
                    </div>
                  ))}
                </div>
              </div>
            ))}
            <InView as='div' onChange={(inView) => { getNewCards(inView) }} />
          </>)
        : <NoCards />}
    </div>
  )
}

export default DeckCards
