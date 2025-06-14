'use client';
import React, { useState } from 'react';
import Calendar from './Calendar';
import HabitChallengeList from './HabitChallengeList';
import HabitChallengeHistory from './HabitChallengeHistory';

export default function HabitPage({ dailyChallenges, setDailyChallenges,tasks, setTasks }) {
    // Toggle completed state for a challenge by id
    const handleCheckboxChange = (id) => {
        const updatedChallenges = dailyChallenges.challenges.map((challenge) =>
            challenge.id === id
                ? { ...challenge, completed: !challenge.completed }
                : challenge
        );
        setDailyChallenges({ ...dailyChallenges, challenges: updatedChallenges });
    };

    // Import Calendar and dependencies

    // Example initial state for calendar tasks
    

    // Get today's date in YYYY-MM-DD format
    const today = new Date();
    const todayStr = today.toISOString().split('T')[0];

    // Find today's history entry, or create a fallback
    const todayHistory = dailyChallenges.history?.find(day => day.date === todayStr);

    // Helper to get today's challenge completion state
    const getTodayChallengeCompleted = (challengeId) => {
        // If today's history exists, use it; otherwise, fallback to current state
        if (todayHistory) {
            const ch = todayHistory.challenges.find(c => c.id === challengeId);
            return ch ? ch.completed : false;
        }
        // fallback: use current challenge state
        const ch = dailyChallenges.challenges.find(c => c.id === challengeId);
        return ch ? ch.completed : false;
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <div className="grid grid-cols-2 gap-6 ">
                {/* First column: one row */}
                <div className="bg-[#0d1117] rounded-lg p-6 flex flex-col grow col-span-1 row-span-2">
                    <span className="text-white">
                        Daily Challenge
                    </span>
                    <HabitChallengeList
                        challenges={dailyChallenges.challenges}
                        onCheckboxChange={handleCheckboxChange}
                    />
                </div>
                {/* Second column: two rows */}
                <div className="bg-[#0d1117] rounded-lg p-6 flex flex-col items-center justify-center">
                    <span className="text-white mb-4 font-semibold">Challenge History</span>
                    <HabitChallengeHistory
                        challenges={dailyChallenges.challenges}
                        history={dailyChallenges.history}
                        today={today}
                        getTodayChallengeCompleted={getTodayChallengeCompleted}
                    />
                </div>
                <div className="rounded-lg  flex items-center justify-center">
                    <Calendar tasks={tasks} setTasks={setTasks} />
                </div>
            </div>
        </div>
    );
}