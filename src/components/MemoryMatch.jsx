import React, { useState, useEffect } from "react"
import { Shuffle } from "lucide-react"

const EMOJIS = ["🌟", "🎨", "🌈", "🎭", "🎪", "🎡", "🎢", "🎠"]

const MemoryMatch = () => {
  const [cards, setCards] = useState([])
  const [flippedCards, setFlippedCards] = useState([])
  const [matches, setMatches] = useState(0)
  const [moves, setMoves] = useState(0)

  const initializeCards = () => {
    const duplicatedEmojis = [...EMOJIS, ...EMOJIS]
    const shuffledEmojis = duplicatedEmojis.sort(() => Math.random() - 0.5)

    return shuffledEmojis.map((emoji, index) => ({
      id: index,
      emoji,
      isFlipped: false,
      isMatched: false
    }))
  }

  const resetGame = () => {
    setCards(initializeCards())
    setFlippedCards([])
    setMatches(0)
    setMoves(0)
  }

  useEffect(() => {
    resetGame()
  }, [])

  const handleCardClick = cardId => {
    if (flippedCards.length === 2) return
    if (cards[cardId].isMatched) return
    if (flippedCards.includes(cardId)) return

    const newCards = [...cards]
    newCards[cardId].isFlipped = true
    setCards(newCards)

    const newFlippedCards = [...flippedCards, cardId]
    setFlippedCards(newFlippedCards)

    if (newFlippedCards.length === 2) {
      setMoves(prev => prev + 1)

      const [firstCard, secondCard] = newFlippedCards
      if (cards[firstCard].emoji === cards[secondCard].emoji) {
        newCards[firstCard].isMatched = true
        newCards[secondCard].isMatched = true
        setCards(newCards)
        setMatches(prev => prev + 1)
        setFlippedCards([])
      } else {
        setTimeout(() => {
          newCards[firstCard].isFlipped = false
          newCards[secondCard].isFlipped = false
          setCards(newCards)
          setFlippedCards([])
        }, 1000)
      }
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <p className="text-gray-700 dark:text-gray-300">
            Moves: <span className="font-bold">{moves}</span>
          </p>
          <p className="text-gray-700 dark:text-gray-300">
            Matches: <span className="font-bold">{matches}</span>
          </p>
        </div>
        <button
          onClick={resetGame}
          className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200"
        >
          <Shuffle className="h-5 w-5 mr-2" />
          Reset Game
        </button>
      </div>

      <div className="grid grid-cols-4 gap-4">
        {cards.map(card => (
          <button
            key={card.id}
            onClick={() => handleCardClick(card.id)}
            className={`aspect-square text-4xl flex items-center justify-center rounded-xl transition-all duration-300 ${
              card.isFlipped || card.isMatched
                ? "bg-white dark:bg-gray-700 rotate-0"
                : "bg-blue-500 dark:bg-blue-600 rotate-180"
            } ${card.isMatched ? "opacity-50" : ""}`}
            disabled={card.isMatched}
          >
            {(card.isFlipped || card.isMatched) && card.emoji}
          </button>
        ))}
      </div>

      {matches === EMOJIS.length && (
        <div className="mt-6 text-center">
          <h3 className="text-2xl font-bold text-green-600 dark:text-green-400 mb-2">
            Congratulations! 🎉
          </h3>
          <p className="text-gray-600 dark:text-gray-300">
            You completed the game in {moves} moves!
          </p>
        </div>
      )}
    </div>
  )
}

export default MemoryMatch
