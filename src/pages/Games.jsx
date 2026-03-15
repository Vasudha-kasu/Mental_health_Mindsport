import React, { useState } from "react"
import { games } from "../data/games"
import GameCard from "../components/GameCard"
import { useUser } from "../context/UserContext"
import { Gamepad2, Brain, Wind, SmilePlus, Trophy } from "lucide-react"

const Games = () => {
  const { user } = useUser()
  const [activeCategory, setActiveCategory] = useState("all")

  // Filter games based on user age group
  const ageFilteredGames = user.ageGroup
    ? games.filter(game => game.ageGroups.includes(user.ageGroup))
    : games

  // Filter by selected category
  const filteredGames =
    activeCategory === "all"
      ? ageFilteredGames
      : ageFilteredGames.filter(game => game.category === activeCategory)

  // Category data
  const categories = [
    { id: "all", name: "All Games", icon: <Gamepad2 className="h-5 w-5" /> },
    { id: "memory", name: "Memory", icon: <Brain className="h-5 w-5" /> },
    {
      id: "relaxation",
      name: "Relaxation",
      icon: <Wind className="h-5 w-5" />
    },
    { id: "mood", name: "Mood", icon: <SmilePlus className="h-5 w-5" /> },
    {
      id: "challenge",
      name: "Challenges",
      icon: <Trophy className="h-5 w-5" />
    }
  ]

  // Styles for each category
  const categoryColors = {
    all: {
      active: "bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-white",
      inactive: "bg-white text-gray-600 dark:bg-gray-800 dark:text-gray-300"
    },
    memory: {
      active:
        "bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300",
      inactive: "bg-white text-gray-600 dark:bg-gray-800 dark:text-gray-300"
    },
    relaxation: {
      active: "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300",
      inactive: "bg-white text-gray-600 dark:bg-gray-800 dark:text-gray-300"
    },
    mood: {
      active: "bg-pink-100 text-pink-700 dark:bg-pink-900 dark:text-pink-300",
      inactive: "bg-white text-gray-600 dark:bg-gray-800 dark:text-gray-300"
    },
    challenge: {
      active:
        "bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300",
      inactive: "bg-white text-gray-600 dark:bg-gray-800 dark:text-gray-300"
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
        Games & Activities
      </h1>
      <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
        Interactive tools to support your mental well-being
      </p>

      {/* Categories */}
      <div className="flex flex-wrap gap-2 mb-8">
        {categories.map(category => (
          <button
            key={category.id}
            onClick={() => setActiveCategory(category.id)}
            className={`flex items-center px-4 py-2 rounded-full shadow-sm transition-all duration-300 ${
              activeCategory === category.id
                ? categoryColors[category.id].active + " transform scale-105"
                : categoryColors[category.id].inactive
            }`}
          >
            <span className="mr-2">{category.icon}</span>
            {category.name}
          </button>
        ))}
      </div>

      {/* Game Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredGames.map(game => (
          <GameCard key={game.id} game={game} />
        ))}
      </div>

      {filteredGames.length === 0 && (
        <div className="text-center py-12">
          <p className="text-lg text-gray-600 dark:text-gray-300">
            No games available in this category for your age group.
          </p>
        </div>
      )}
    </div>
  )
}

export default Games
