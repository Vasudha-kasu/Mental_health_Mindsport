import React, { useState, useEffect, useCallback } from "react";

const BubblePop = () => {
  const [bubbles, setBubbles] = useState([]);
  const [score, setScore] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const createBubble = useCallback(() => {
    const newBubble = {
      id: Date.now(),
      x: Math.random() * (window.innerWidth - 100),
      y: window.innerHeight,
      size: Math.random() * 40 + 20,
      speed: Math.random() * 2 + 1,
    };

    setBubbles((prev) => [...prev, newBubble]);
  }, []);

  const removeBubble = (id) => {
    setBubbles((prev) => prev.filter((bubble) => bubble.id !== id));
    setScore((prev) => prev + 1);
  };

  const startGame = () => {
    setIsPlaying(true);
    setScore(0);
    setBubbles([]);
  };

  useEffect(() => {
    let bubbleInterval;
    let animationFrame;

    if (isPlaying) {
      bubbleInterval = setInterval(createBubble, 1000);

      const updateBubbles = () => {
        setBubbles((prev) =>
          prev
            .map((bubble) => ({
              ...bubble,
              y: bubble.y - bubble.speed,
            }))
            .filter((bubble) => bubble.y + bubble.size > 0)
        );

        animationFrame = requestAnimationFrame(updateBubbles);
      };

      animationFrame = requestAnimationFrame(updateBubbles);
    }

    return () => {
      clearInterval(bubbleInterval);
      cancelAnimationFrame(animationFrame);
    };
  }, [isPlaying, createBubble]);

  return (
    <div className="relative h-[600px] overflow-hidden bg-gradient-to-b from-blue-100 to-blue-200 dark:from-blue-900 dark:to-blue-800 rounded-xl">
      <div className="absolute top-4 left-4 bg-white dark:bg-gray-800 px-4 py-2 rounded-lg shadow-md">
        <p className="text-lg font-semibold text-gray-800 dark:text-white">
          Score: {score}
        </p>
      </div>

      {!isPlaying && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Bubble Pop
            </h2>
            <p className="text-lg text-gray-200 mb-6">
              Pop the bubbles as they float up!
            </p>

            <button
              onClick={startGame}
              className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200"
            >
              Start Game
            </button>
          </div>
        </div>
      )}

      {bubbles.map((bubble) => (
        <button
          key={bubble.id}
          onClick={() => removeBubble(bubble.id)}
          className="absolute rounded-full bg-white bg-opacity-30 backdrop-blur-sm border-2 border-white border-opacity-50 cursor-pointer transform hover:scale-110 transition-transform duration-200"
          style={{
            left: bubble.x,
            top: bubble.y,
            width: bubble.size,
            height: bubble.size,
          }}
        />
      ))}
    </div>
  );
};

export default BubblePop;