import React from "react";

export default function HabitChallengeList({ challenges, onCheckboxChange }) {
  return (
    <div className="flex flex-col items-start mt-4">
      {challenges.map((challenge) => (
        <div key={challenge.id} className="bg-[#161b22] rounded-lg p-4 mb-2 w-full flex items-center">
          <label className="flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={challenge.completed}
              onChange={() => onCheckboxChange(challenge.id)}
              className="peer appearance-none w-5 h-5 border-2 border-gray-400 rounded-md checked:bg-green-500 checked:border-green-500 transition-all duration-150 mr-3 focus:outline-none"
            />
            <span className="absolute w-5 h-5 flex items-center justify-center pointer-events-none">
              <svg
                className="hidden peer-checked:block text-white"
                width="18"
                height="18"
                viewBox="0 0 20 20"
                fill="none"
              >
                <path
                  d="M5 10.5L9 14.5L15 7.5"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            <div className="ml-1">
              <h3 className={`text-lg font-semibold ${challenge.completed ? 'text-green-400 line-through' : 'text-white'}`}>
                {challenge.name}
              </h3>
              <p className="text-gray-400">{challenge.description}</p>
            </div>
          </label>
        </div>
      ))}
    </div>
  );
}