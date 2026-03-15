import React from "react"
import { useParams, Navigate } from "react-router-dom"
import { games } from "../data/games"
import BreathingGame from "../components/BreathingGame"
import MoodTracker from "../components/MoodTracker"
import MemoryMatch from "../components/MemoryMatch"
import BubblePop from "../components/BubblePop"

const GameDetail = () => {
  const { gameId } = useParams()

  // Find the game from the games data
  const game = games.find(g => g.id === gameId)

  // If game not found, redirect to games page
  if (!game) {
    return <Navigate to="/games" replace />
  }

  // Render specific game component based on game ID
  const renderGameComponent = () => {
    switch (gameId) {
      case "breathing-circle":
        return <BreathingGame />
      case "mood-tracker":
        return <MoodTracker />
      case "memory-match":
        return <MemoryMatch />
      case "bubble-pop":
        return <BubblePop />
      default:
        return (
          <div className="text-center py-12">
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-4">
              This game is coming soon!
            </p>
            <p className="text-lg text-gray-500 dark:text-gray-400">
              We're working hard to bring you more mental wellness activities.
            </p>
          </div>
        )
    }
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden transition-colors duration-300">
        <div className="p-6">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            {game.title}
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            {game.description}
          </p>

          <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
            {renderGameComponent()}
          </div>
        </div>
      </div>
    </div>
  )
}

export default GameDetail
