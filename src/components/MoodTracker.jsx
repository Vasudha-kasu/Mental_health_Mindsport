import React, { useState, useEffect } from "react"
import { useLocalStorage } from "../hooks/useLocalStorage"

const MOODS = [
  { emoji: "😊", label: "Happy" },
  { emoji: "😌", label: "Calm" },
  { emoji: "😐", label: "Neutral" },
  { emoji: "😔", label: "Sad" },
  { emoji: "😡", label: "Angry" },
  { emoji: "😰", label: "Anxious" },
  { emoji: "😴", label: "Tired" },
  { emoji: "🤔", label: "Confused" }
]

const MoodTracker = () => {
  const [moodEntries, setMoodEntries] = useLocalStorage("mood-entries", [])
  const [selectedMood, setSelectedMood] = useState(null)
  const [note, setNote] = useState("")
  const [showHistory, setShowHistory] = useState(false)
  const [entryAdded, setEntryAdded] = useState(false)

  // Check if user has already added an entry today
  const today = new Date().toISOString().split("T")[0]
  const hasTodayEntry = moodEntries.some(entry => entry.date === today)

  const handleMoodSelect = mood => {
    setSelectedMood(mood)
    setEntryAdded(false)
  }

  const handleSubmit = e => {
    e.preventDefault()

    if (!selectedMood) return

    const newEntry = {
      mood: selectedMood,
      date: today,
      note: note
    }

    // Remove any existing entry for today
    const filteredEntries = moodEntries.filter(entry => entry.date !== today)

    // Add the new entry
    setMoodEntries([newEntry, ...filteredEntries])
    setNote("")
    setEntryAdded(true)
  }

  // Sort entries by date (most recent first)
  const sortedEntries = [...moodEntries].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  )

  // Reset animation state
  useEffect(() => {
    if (entryAdded) {
      const timer = setTimeout(() => {
        setEntryAdded(false)
      }, 3000)

      return () => clearTimeout(timer)
    }
  }, [entryAdded])

  return (
    <div className="max-w-md mx-auto p-5">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
        Mood Tracker
      </h2>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 mb-6 transition-all duration-300">
        <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-4">
          How are you feeling today?
        </h3>

        <div className="grid grid-cols-4 gap-3 mb-6">
          {MOODS.map(mood => (
            <button
              key={mood.label}
              onClick={() => handleMoodSelect(mood.label)}
              className={`p-3 rounded-lg flex flex-col items-center justify-center transition-all duration-200 ${
                selectedMood === mood.label
                  ? "bg-blue-100 dark:bg-blue-900 shadow-md transform scale-105"
                  : "bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600"
              }`}
            >
              <span className="text-2xl mb-1">{mood.emoji}</span>
              <span className="text-xs font-medium text-gray-800 dark:text-gray-200">
                {mood.label}
              </span>
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="mood-note"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              Add a note (optional)
            </label>
            <textarea
              id="mood-note"
              value={note}
              onChange={e => setNote(e.target.value)}
              placeholder="What's contributing to your mood today?"
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white transition-colors duration-200"
              rows={3}
            />
          </div>

          <button
            type="submit"
            disabled={!selectedMood || entryAdded}
            className={`w-full py-2 px-4 rounded-lg font-medium transition-all duration-200 ${
              !selectedMood || entryAdded
                ? "bg-gray-200 text-gray-500 dark:bg-gray-700 dark:text-gray-400 cursor-not-allowed"
                : "bg-blue-500 text-white hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700"
            } ${entryAdded ? "animate-pulse" : ""}`}
          >
            {entryAdded
              ? "Mood Saved!"
              : hasTodayEntry
              ? "Update Today's Mood"
              : "Save Mood"}
          </button>
        </form>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 transition-all duration-300">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium text-gray-800 dark:text-white">
            Your Mood History
          </h3>
          <button
            onClick={() => setShowHistory(!showHistory)}
            className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors duration-200"
          >
            {showHistory ? "Hide" : "Show"}
          </button>
        </div>

        {showHistory && (
          <div className="space-y-3 mt-2">
            {sortedEntries.length > 0 ? (
              sortedEntries.map((entry, index) => {
                const moodObj = MOODS.find(m => m.label === entry.mood)
                const emoji = moodObj ? moodObj.emoji : "😐"
                const formattedDate = new Date(entry.date).toLocaleDateString(
                  "en-US",
                  {
                    weekday: "short",
                    month: "short",
                    day: "numeric"
                  }
                )

                return (
                  <div
                    key={index}
                    className="flex items-start p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
                  >
                    <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center bg-white dark:bg-gray-800 rounded-full text-2xl shadow-sm">
                      {emoji}
                    </div>
                    <div className="ml-3">
                      <div className="flex items-center">
                        <h4 className="text-sm font-medium text-gray-800 dark:text-white">
                          {entry.mood}
                        </h4>
                        <span className="ml-2 text-xs text-gray-500 dark:text-gray-400">
                          {formattedDate}
                        </span>
                      </div>
                      {entry.note && (
                        <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
                          {entry.note}
                        </p>
                      )}
                    </div>
                  </div>
                )
              })
            ) : (
              <p className="text-sm text-gray-500 dark:text-gray-400 text-center py-4">
                No mood entries yet. Start tracking today!
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default MoodTracker
