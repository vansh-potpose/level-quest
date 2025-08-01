import React from "react";

export default function HabitChallengeHistory({ challenges, history, today, getTodayChallengeCompleted }) {
  const sortedHistory = history ? [...history].sort((a, b) => new Date(a.date) - new Date(b.date)) : [];

  return (
    <div className="overflow-x-auto w-full  max-w-full md:max-w-2xl  lg:max-w-none mx-auto">
      <table className="min-w-[350px] w-full border-separate border-spacing-2 text-xs md:text-sm">
        <thead>
          <tr>
            <th className="text-gray-400 text-xs font-normal text-left pr-2 min-w-[80px] "></th>
            {sortedHistory && sortedHistory.map((day, idx) => (
              <th key={day.date} className="text-gray-400  text-xs font-normal px-1 min-w-[32px]">
                {idx === 0
                  ? new Date(day.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })
                  : new Date(day.date).getDate()
                }
              </th>
            ))}
            <th className="text-green-400 text-xs font-normal px-1 min-w-[32px]">
              {sortedHistory && sortedHistory.length === 0
                ? today.toLocaleDateString(undefined, { month: 'short', day: 'numeric' })
                : today.getDate()
              }
            </th>
          </tr>
        </thead>
        <tbody>
          {challenges.map((challenge) => (
            <tr key={challenge.id}>
              <td className="text-gray-300 text-xs md:text-sm pr-2 text-left font-medium break-words max-w-[120px]">{challenge.name}</td>
              {sortedHistory && sortedHistory.map((day) => {
                const ch = day.challenges.find(c => c.id === challenge.id);
                if (!ch) {
                  // Not present in that day's template
                  return (
                    <td key={day.date} className="px-1">
                      <div
                        className="w-6 h-6 rounded-md flex items-center justify-center border-2 bg-orange-400 border-orange-400"
                        title="Not present"
                      >
                        <span className="text-white text-xs font-bold">N/A</span>
                      </div>
                    </td>
                  );
                }
                return (
                  <td key={day.date} className="px-1">
                    <div
                      className={`w-6 h-6 rounded-md flex items-center justify-center border-2
                        ${ch.completed
                          ? 'bg-green-500 border-green-400'
                          : 'bg-[#161b22] border-gray-600'
                        }
                      `}
                      title={ch.completed ? "Completed" : "Not completed"}
                    >
                      {ch.completed ? (
                        <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
                          <path d="M5 10.5L9 14.5L15 7.5" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      ) : null}
                    </div>
                  </td>
                );
              })}
              <td className="px-1">
                <div
                  className={`w-6 h-6 rounded-md flex items-center justify-center border-2
                    ${getTodayChallengeCompleted(challenge.id)
                      ? 'bg-green-500 border-green-400'
                      : 'bg-[#161b22] border-gray-600'
                    }
                  `}
                  title={getTodayChallengeCompleted(challenge.id) ? "Completed" : "Not completed"}
                >
                  {getTodayChallengeCompleted(challenge.id) ? (
                    <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
                      <path d="M5 10.5L9 14.5L15 7.5" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  ) : null}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}