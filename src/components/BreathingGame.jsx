import React, { useState, useEffect } from "react";

const BreathingGame = () => {
  const [phase, setPhase] = useState("inhale");
  const [counter, setCounter] = useState(4);
  const [isActive, setIsActive] = useState(false);
  const [totalBreaths, setTotalBreaths] = useState(0);

  const timings = {
    inhale: 4,
    hold: 4,
    exhale: 6,
    rest: 2,
  };

  useEffect(() => {
    let interval = null;

    if (isActive) {
      interval = setInterval(() => {
        setCounter((prevCounter) => {
          if (prevCounter > 1) {
            return prevCounter - 1;
          } else {
            switch (phase) {
              case "inhale":
                setPhase("hold");
                return timings.hold;

              case "hold":
                setPhase("exhale");
                return timings.exhale;

              case "exhale":
                setPhase("rest");
                return timings.rest;

              case "rest":
                setPhase("inhale");
                setTotalBreaths((prev) => prev + 1);
                return timings.inhale;

              default:
                return timings.inhale;
            }
          }
        });
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, phase]);

  const toggleBreathing = () => {
    if (!isActive) {
      setPhase("inhale");
      setCounter(timings.inhale);
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  };

  const resetBreathing = () => {
    setIsActive(false);
    setPhase("inhale");
    setCounter(timings.inhale);
    setTotalBreaths(0);
  };

  const circleClasses = `
    w-48 h-48 rounded-full flex items-center justify-center
    transition-all duration-1000 ease-in-out
    ${phase === "inhale" ? "scale-100 bg-blue-200 dark:bg-blue-900" : ""}
    ${phase === "hold" ? "scale-110 bg-purple-200 dark:bg-purple-900" : ""}
    ${phase === "exhale" ? "scale-90 bg-teal-200 dark:bg-teal-900" : ""}
    ${phase === "rest" ? "scale-100 bg-gray-200 dark:bg-gray-800" : ""}
  `;

  const textClasses = `
    text-2xl font-semibold transition-colors duration-300
    ${phase === "inhale" ? "text-blue-600 dark:text-blue-400" : ""}
    ${phase === "hold" ? "text-purple-600 dark:text-purple-400" : ""}
    ${phase === "exhale" ? "text-teal-600 dark:text-teal-400" : ""}
    ${phase === "rest" ? "text-gray-600 dark:text-gray-400" : ""}
  `;

  return (
    <div className="flex flex-col items-center justify-center p-6">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
        Breathing Circle
      </h2>

      <div className="flex flex-col items-center mb-8">
        <div className={circleClasses}>
          <div className="text-center">
            <p className={textClasses}>
              {phase.charAt(0).toUpperCase() + phase.slice(1)}
            </p>
            <p className="text-4xl font-bold">{counter}</p>
          </div>
        </div>
      </div>

      <div className="flex space-x-4">
        <button
          onClick={toggleBreathing}
          className={`px-6 py-2 rounded-lg font-medium transition-colors duration-200 ${
            isActive
              ? "bg-red-100 text-red-600 hover:bg-red-200 dark:bg-red-900 dark:text-red-300 dark:hover:bg-red-800"
              : "bg-blue-100 text-blue-600 hover:bg-blue-200 dark:bg-blue-900 dark:text-blue-300 dark:hover:bg-blue-800"
          }`}
        >
          {isActive ? "Pause" : "Start"}
        </button>

        <button
          onClick={resetBreathing}
          className="px-6 py-2 bg-gray-100 text-gray-600 rounded-lg font-medium hover:bg-gray-200 transition-colors duration-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
        >
          Reset
        </button>
      </div>

      {totalBreaths > 0 && (
        <p className="mt-6 text-gray-600 dark:text-gray-300">
          Completed breaths:{" "}
          <span className="font-semibold">{totalBreaths}</span>
        </p>
      )}

      <div className="mt-8 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg max-w-md">
        <h3 className="font-semibold text-gray-800 dark:text-white mb-2">
          Benefits of Deep Breathing
        </h3>
        <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
          <li>• Reduces stress and anxiety</li>
          <li>• Lowers heart rate and blood pressure</li>
          <li>• Improves focus and concentration</li>
          <li>• Helps manage emotions</li>
        </ul>
      </div>
    </div>
  );
};

export default BreathingGame;