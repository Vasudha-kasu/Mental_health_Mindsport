import React, { useState } from "react"
import { useUser } from "../context/UserContext"
import { getAgeGroupLabel } from "../utils/ageUtils"
import { Sun, Moon, User, Trash } from "lucide-react"

const Settings = () => {
  const { user, setAge, toggleDarkMode, resetUser } = useUser()
  const [newAge, setNewAge] = useState(user.age ? user.age.toString() : "")
  const [showResetConfirm, setShowResetConfirm] = useState(false)
  const [changeSuccess, setChangeSuccess] = useState(false)

  const handleAgeSubmit = e => {
    e.preventDefault()

    const age = parseInt(newAge, 10)

    if (isNaN(age) || age <= 0 || age > 120) {
      return // Invalid age
    }

    setAge(age)
    setChangeSuccess(true)

    setTimeout(() => {
      setChangeSuccess(false)
    }, 3000)
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
        Settings
      </h1>

      <div className="space-y-6">
        {/* Age Settings */}
        <div className="bg-white dark:bg-gray-800 shadow-sm rounded-xl p-6 transition-colors duration-300">
          <div className="flex items-center mb-4">
            <User className="h-5 w-5 text-blue-600 dark:text-blue-400 mr-2" />
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
              Personal Information
            </h2>
          </div>

          <div className="mb-6">
            <div className="flex items-center mb-2">
              <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                Current Age:
              </span>
              <span className="ml-2 text-sm font-semibold text-gray-800 dark:text-white">
                {user.age} (
                {user.ageGroup ? getAgeGroupLabel(user.ageGroup) : ""})
              </span>
            </div>

            <form onSubmit={handleAgeSubmit} className="mt-4">
              <div className="flex items-start space-x-4">
                <div className="flex-grow">
                  <label
                    htmlFor="age"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                  >
                    Update Age
                  </label>
                  <input
                    id="age"
                    type="number"
                    value={newAge}
                    onChange={e => setNewAge(e.target.value)}
                    className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white transition-colors duration-200"
                    min="1"
                    max="120"
                  />
                </div>
                <div className="pt-7">
                  <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors duration-200"
                  >
                    Update
                  </button>
                </div>
              </div>

              {changeSuccess && (
                <p className="mt-2 text-sm text-green-600 dark:text-green-400 animate-pulse">
                  Age updated successfully!
                </p>
              )}
            </form>
          </div>
        </div>

        {/* Appearance Settings */}
        <div className="bg-white dark:bg-gray-800 shadow-sm rounded-xl p-6 transition-colors duration-300">
          <div className="flex items-center mb-4">
            {user.darkMode ? (
              <Moon className="h-5 w-5 text-blue-600 dark:text-blue-400 mr-2" />
            ) : (
              <Sun className="h-5 w-5 text-blue-600 dark:text-blue-400 mr-2" />
            )}
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
              Appearance
            </h2>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Dark Mode
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Toggle between light and dark themes
              </p>
            </div>
            <button
              onClick={toggleDarkMode}
              className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-200 dark:bg-gray-700 transition-colors duration-300"
            >
              <span
                className={`${
                  user.darkMode
                    ? "translate-x-6 bg-blue-600"
                    : "translate-x-1 bg-white"
                } inline-block h-4 w-4 transform rounded-full transition-transform duration-300`}
              />
            </button>
          </div>
        </div>

        {/* Reset Settings */}
        <div className="bg-white dark:bg-gray-800 shadow-sm rounded-xl p-6 transition-colors duration-300">
          <div className="flex items-center mb-4">
            <Trash className="h-5 w-5 text-red-600 dark:text-red-400 mr-2" />
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
              Reset Data
            </h2>
          </div>

          <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
            This will reset all your settings and data, including mood entries
            and age information.
          </p>

          {!showResetConfirm ? (
            <button
              onClick={() => setShowResetConfirm(true)}
              className="bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300 px-4 py-2 rounded-md hover:bg-red-200 dark:hover:bg-red-800 transition-colors duration-200"
            >
              Reset All Data
            </button>
          ) : (
            <div className="flex items-center space-x-4">
              <button
                onClick={() => {
                  resetUser()
                  setShowResetConfirm(false)
                }}
                className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors duration-200"
              >
                Confirm Reset
              </button>
              <button
                onClick={() => setShowResetConfirm(false)}
                className="bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 px-4 py-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200"
              >
                Cancel
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Settings
