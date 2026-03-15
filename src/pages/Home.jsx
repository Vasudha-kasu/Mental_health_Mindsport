import React from "react"
import { useUser } from "../context/UserContext"
import AgeSelector from "../components/AgeSelector"
import { Heart, Brain, Smile, Clock } from "lucide-react"

const Home = () => {
  const { user } = useUser()

  const features = [
    {
      icon: <Brain className="h-6 w-6 text-blue-600 dark:text-blue-400" />,
      title: "Age-Based Recommendations",
      description:
        "Personalized mental health tips and activities tailored to your specific age group."
    },
    {
      icon: <Smile className="h-6 w-6 text-green-600 dark:text-green-400" />,
      title: "Interactive Games",
      description:
        "Fun and engaging activities designed to improve mindfulness, reduce stress, and boost mood."
    },
    {
      icon: <Heart className="h-6 w-6 text-red-600 dark:text-red-400" />,
      title: "Mood Tracking",
      description:
        "Monitor your emotional well-being over time with simple mood logging tools."
    },
    {
      icon: <Clock className="h-6 w-6 text-purple-600 dark:text-purple-400" />,
      title: "Daily Challenges",
      description:
        "Build healthy mental habits with small, achievable daily activities."
    }
  ]

  if (user.age !== null) {
    return (
      <div className="flex flex-col min-h-screen bg-white dark:bg-gray-900">
        <main className="flex-grow bg-white dark:bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <div className="text-center">
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white sm:text-5xl">
                Welcome back to MindWell
              </h1>

              <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-600 dark:text-gray-300">
                Your personalized mental wellness companion.
              </p>
            </div>

            <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
              <a
                href="/dashboard"
                className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-200"
              >
                Go to Dashboard
              </a>

              <a
                href="/games"
                className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 dark:border-gray-600 text-base font-medium rounded-md text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
              >
                Explore Games
              </a>
            </div>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-gray-900">
      <main className="flex-grow bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white sm:text-5xl">
              Welcome to MindWell
            </h1>

            <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-600 dark:text-gray-300">
              Your personalized mental wellness companion.
            </p>
          </div>

          <div className="max-w-md mx-auto mb-16">
            <AgeSelector />
          </div>

          <div className="py-12 bg-gray-50 dark:bg-gray-800 rounded-2xl">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

              <div className="text-center">
                <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">
                  Features to Support Your Well-being
                </h2>

                <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-600 dark:text-gray-300">
                  Discover tools and activities designed for your mental health journey.
                </p>
              </div>

              <div className="mt-10">
                <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">

                  {features.map((feature, index) => (
                    <div key={index} className="relative">

                      <dt>
                        <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-white dark:bg-gray-700 shadow-md">
                          {feature.icon}
                        </div>

                        <p className="ml-16 text-lg leading-6 font-medium text-gray-900 dark:text-white">
                          {feature.title}
                        </p>
                      </dt>

                      <dd className="mt-2 ml-16 text-base text-gray-600 dark:text-gray-300">
                        {feature.description}
                      </dd>

                    </div>
                  ))}

                </dl>
              </div>

            </div>
          </div>

        </div>
      </main>
    </div>
  )
}

export default Home