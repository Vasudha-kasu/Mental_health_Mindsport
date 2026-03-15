import React from "react"
import * as LucideIcons from "lucide-react"

const RecommendationCard = ({ recommendation }) => {
  // Dynamically get the icon from Lucide
  const IconComponent = LucideIcons[recommendation.icon] || LucideIcons.Star

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md p-5 transition-all duration-300 transform hover:-translate-y-1">
      <div className="flex items-start">
        <div className="flex-shrink-0 p-2 bg-blue-100 dark:bg-blue-900 rounded-full">
          <IconComponent className="h-6 w-6 text-blue-600 dark:text-blue-400" />
        </div>
        <div className="ml-4">
          <h3 className="text-lg font-medium text-gray-800 dark:text-white">
            {recommendation.title}
          </h3>
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
            {recommendation.description}
          </p>
          <button className="mt-3 text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors duration-200">
            Learn more →
          </button>
        </div>
      </div>
    </div>
  )
}

export default RecommendationCard
