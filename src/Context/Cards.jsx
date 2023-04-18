import { createContext, useState } from 'react'

export const CardsContext = createContext()

export const CardsProvider = ({ children }) => {
  const [cards, setCards] = useState({})
  const [cardCount, setCardCount] = useState(0)

  return (
    <CardsContext.Provider value={{
      cards,
      setCards,
      cardCount,
      setCardCount
    }}
    >
      {children}
    </CardsContext.Provider>
  )
}
