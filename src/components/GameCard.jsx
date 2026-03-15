import React from "react";
import { Link } from "react-router-dom";
import * as LucideIcons from "lucide-react";

const GameCard = ({ game }) => {

  // Dynamically get the icon from Lucide
  const IconComponent = LucideIcons[game.icon] || LucideIcons.Gamepad2;

  const categoryColors = {
    memory: {
      bg: "bg-purple-100 dark:bg-purple-900",
      text: "text-purple-600 dark:text-purple-400",
      hover: "hover:bg-purple-600 dark:hover:bg-purple-700",
    },
    relaxation: {
      bg: "bg-blue-100 dark:bg-blue-900",
      text: "text-blue-600 dark:text-blue-400",
      hover: "hover:bg-blue-600 dark:hover:bg-blue-700",
    },
    mood: {
      bg: "bg-pink-100 dark:bg-pink-900",
      text: "text-pink-600 dark:text-pink-400",
      hover: "hover:bg-pink-600 dark:hover:bg-pink-700",
    },
    challenge: {
      bg: "bg-orange-100 dark:bg-orange-900",
      text: "text-orange-600 dark:text-orange-400",
      hover: "hover:bg-orange-600 dark:hover:bg-orange-700",
    },
  };

  const colors = categoryColors[game.category];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md overflow-hidden transition-all duration-300 transform hover:-translate-y-1">
      <div className={`h-2 ${colors.bg}`}></div>

      <div className="p-5">
        <div className="flex items-start mb-4">
          
          <div className={`flex-shrink-0 p-2 rounded-full ${colors.bg}`}>
            <IconComponent className={`h-6 w-6 ${colors.text}`} />
          </div>

          <div className="ml-3">
            <h3 className="text-lg font-medium text-gray-800 dark:text-white">
              {game.title}
            </h3>

            <span
              className={`inline-block px-2 py-1 mt-1 text-xs rounded-full ${colors.bg} ${colors.text}`}
            >
              {game.category.charAt(0).toUpperCase() + game.category.slice(1)}
            </span>
          </div>

        </div>

        <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
          {game.description}
        </p>

        <Link
          to={`/games/${game.id}`}
          className={`block w-full mt-3 px-4 py-2 text-sm font-medium text-center text-white rounded-lg transition-colors duration-200 ${colors.hover}`}
        >
          Play Now
        </Link>

      </div>
    </div>
  );
};

export default GameCard;