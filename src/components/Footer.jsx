import React from "react";
import { Heart, Github, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-white dark:bg-gray-900 shadow-inner py-6 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          
          <div className="mb-4 md:mb-0">
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              © 2025 MindWell. All rights reserved.
            </p>
          </div>

          <div className="flex items-center space-x-4">
            <p className="text-gray-600 dark:text-gray-400 text-sm flex items-center">
              Made with <Heart className="h-4 w-4 mx-1 text-red-500" /> for better mental health
            </p>
          </div>

          <div className="mt-4 md:mt-0 flex space-x-4">
            <a
              href="#"
              className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
              aria-label="Github"
            >
              <Github className="h-5 w-5" />
            </a>

            <a
              href="#"
              className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
              aria-label="Email"
            >
              <Mail className="h-5 w-5" />
            </a>
          </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;