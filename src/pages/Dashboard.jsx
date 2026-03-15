import React from "react"
import { useUser } from "../context/UserContext"
import { useNavigate } from "react-router-dom"
import { getAgeGroupLabel } from "../utils/ageUtils"
import RecommendationCard from "../components/RecommendationCard"
import MoodTracker from "../components/MoodTracker"
import { recommendations } from "../data/recommendations"
import { Calendar, Sparkles, Brain } from "lucide-react"

const Dashboard = () => {
  const { user } = useUser()
  const navigate = useNavigate()

  // Redirect to home if age is not set
  React.useEffect(() => {
    if (user.age === null) {
      navigate("/")
    }
  }, [user.age, navigate])

  if (user.age === null || user.ageGroup === null) {
    return null // Prevent flash of content while redirecting
  }

  // Filter recommendations based on user age group
  const filteredRecommendations = recommendations.filter(rec =>
    rec.ageGroups.includes(user.ageGroup)
  )

  // Get age group label
  const ageGroupLabel = getAgeGroupLabel(user.ageGroup)

  // Generate greeting based on time of day
  const getGreeting = () => {
    const hour = new Date().getHours()
    if (hour < 12) return "Good morning"
    if (hour < 18) return "Good afternoon"
    return "Good evening"
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          {getGreeting()}
        </h1>
        <p className="mt-2 text-xl text-gray-600 dark:text-gray-300">
          Welcome to your personalized dashboard for{" "}
          <span className="font-medium">{ageGroupLabel}</span>
        </p>
      </div>

      {/* Dashboard Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content (2/3 width on large screens) */}
        <div className="lg:col-span-2 space-y-8">
          {/* Today's Recommendations */}
          <section>
            <div className="flex items-center mb-4">
              <Sparkles className="h-6 w-6 text-blue-600 dark:text-blue-400 mr-2" />
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">
                Recommended for You
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredRecommendations.slice(0, 4).map(recommendation => (
                <RecommendationCard
                  key={recommendation.id}
                  recommendation={recommendation}
                />
              ))}
            </div>
          </section>

          {/* Daily Challenge */}
          <section className="bg-gradient-to-r from-blue-500 to-indigo-600 dark:from-blue-600 dark:to-indigo-800 rounded-xl shadow-md overflow-hidden">
            <div className="p-6 text-white">
              <div className="flex items-center mb-4">
                <Calendar className="h-6 w-6 mr-2" />
                <h2 className="text-xl font-semibold">Daily Challenge</h2>
              </div>
              <p className="text-lg mb-4">
                Take a 5-minute break to practice deep breathing.
              </p>
              <button
                onClick={() => navigate("/games/breathing-circle")}
                className="bg-white text-blue-600 hover:bg-blue-50 px-4 py-2 rounded-lg font-medium transition-colors duration-200"
              >
                Start Now
              </button>
            </div>
          </section>

          {/* Featured Games */}
          <section>
            <div className="flex items-center mb-4">
              <Brain className="h-6 w-6 text-purple-600 dark:text-purple-400 mr-2" />
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">
                Featured Activities
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div
                className="bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md p-5 transition-all duration-300 cursor-pointer"
                onClick={() => navigate("/games")}
              >
                <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-2">
                  Memory Games
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                  Enhance your cognitive abilities with fun memory challenges.
                </p>
                <button className="text-purple-600 dark:text-purple-400 font-medium hover:underline">
                  Explore Games →
                </button>
              </div>

              <div
                className="bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md p-5 transition-all duration-300 cursor-pointer"
                onClick={() => navigate("/games")}
              >
                <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-2">
                  Relaxation Techniques
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                  Discover calming exercises to reduce stress and anxiety.
                </p>
                <button className="text-blue-600 dark:text-blue-400 font-medium hover:underline">
                  Try Now →
                </button>
              </div>
            </div>
          </section>
        </div>

        {/* Sidebar (1/3 width on large screens) */}
        <div className="space-y-8">
          {/* Mood Tracker */}
          <section className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
            <MoodTracker />
          </section>

          {/* Tips */}
          <section className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
              Quick Tips
            </h2>
            <ul className="space-y-3">
              <li className="flex items-start">
                <span className="text-green-500 dark:text-green-400 mr-2">
                  •
                </span>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Take short breaks throughout your day to reset your mind.
                </p>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 dark:text-green-400 mr-2">
                  •
                </span>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Stay hydrated! Water is essential for brain function.
                </p>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 dark:text-green-400 mr-2">
                  •
                </span>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Practice gratitude by noting three positive things each day.
                </p>
              </li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
