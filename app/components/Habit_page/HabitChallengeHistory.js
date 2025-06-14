import React from "react";

export default function HabitChallengeHistory({ challenges, history, today, getTodayChallengeCompleted }) {
const sortedHistory = history ? [...history].sort((a, b) => new Date(a.date) - new Date(b.date)) : [];

return (
    <div className="overflow-x-auto">
        <table className="border-separate border-spacing-2">
            <thead>
                <tr>
                    <th className="text-gray-400 text-xs font-normal text-left pr-2"></th>
                    {sortedHistory && sortedHistory.map((day, idx) => (
                        <th key={day.date} className="text-gray-400 text-xs font-normal px-1">
                            {idx === 0
                                ? new Date(day.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })
                                : new Date(day.date).getDate()
                            }
                        </th>
                    ))}
                    <th className="text-green-400 text-xs font-normal px-1">
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
                        <td className="text-gray-300 text-sm pr-2 text-left font-medium">{challenge.name}</td>
                        {sortedHistory && sortedHistory.map((day) => {
                            const ch = day.challenges.find(c => c.id === challenge.id);
                            return (
                                <td key={day.date} className="px-1">
                                    <div
                                        className={`w-6 h-6 rounded-md flex items-center justify-center border-2
                                            ${ch && ch.completed
                                                ? 'bg-green-500 border-green-400'
                                                : 'bg-[#161b22] border-gray-600'
                                            }
                                        `}
                                        title={ch && ch.completed ? "Completed" : "Not completed"}
                                    >
                                        {ch && ch.completed ? (
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