import React, { useState } from 'react';
import { Smile, Frown } from 'lucide-react';
import { useUser } from '../context/UserContext';

const AgeSelector = () => {
  const { setAge } = useUser();
  const [inputAge, setInputAge] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const age = parseInt(inputAge, 10);

    if (isNaN(age) || age <= 0 || age > 120) {
      setError('Please enter a valid age between 1 and 120');
      return;
    }

    setError('');
    setAge(age);
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md transition-all duration-300">
      <h2 className="text-2xl font-semibold text-center mb-6 text-gray-800 dark:text-white">
        Welcome to MindWell
      </h2>

      <p className="text-gray-600 dark:text-gray-300 mb-6 text-center">
        To provide you with personalized content, we'd like to know your age.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="age"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
          >
            Your Age
          </label>

          <input
            id="age"
            type="number"
            value={inputAge}
            onChange={(e) => setInputAge(e.target.value)}
            placeholder="Enter your age"
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white transition-colors duration-200"
            min="1"
            max="120"
          />

          {error && (
            <p className="mt-2 text-sm text-red-600 dark:text-red-400 flex items-center">
              <Frown className="h-4 w-4 mr-1" />
              {error}
            </p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center"
        >
          <Smile className="h-5 w-5 mr-2" />
          Continue
        </button>
      </form>

      <p className="mt-4 text-xs text-gray-500 dark:text-gray-400 text-center">
        We only use this information to personalize your experience.
        We don't store or share any personal information.
      </p>
    </div>
  );
};

export default AgeSelector;