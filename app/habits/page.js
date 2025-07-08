'use client';
import React, { useState, useEffect, useRef } from 'react';
import { FiEdit } from "react-icons/fi";
import Calendar from './Calendar';
import HabitChallengeList from './HabitChallengeList';
import HabitChallengeHistory from './HabitChallengeHistory';
import { showGameToast } from '../components/ShowGameToast';
import { useGame } from "../context/GameContext";

export default function HabitPage() {
    const {
        dailyChallenges,
        setDailyChallenges,
        tasks,
        setTasks,
        updateSkill,
        updateExp,
        updateHealth,
        user,
        claimReward
    } = useGame();

    const skills = user.stats;
    const [editMode, setEditMode] = useState(false);
    const hasPenalizedRef = useRef(false);

    // Reward logic: only claim once per day
    useEffect(() => {
        const todayStr = new Date().toISOString().split('T')[0];
        const allCompleted = dailyChallenges.challenges.length > 0 &&
            dailyChallenges.challenges.every(ch => ch.completed);

        if (allCompleted && dailyChallenges.claimedDate !== todayStr) {
            setDailyChallenges({
                ...dailyChallenges,
                claimedDate: todayStr,
            });

            for (const reward of dailyChallenges.rewards) {
                claimReward(reward);
            }

            showGameToast({
                icon: "🎁",
                title: "Daily Rewards Claimed!",
                description: "You completed all daily challenges and received your rewards!",
                border_color: "border-green-500",
                text_color: "text-green-400",
                progressClass_color: "!bg-green-500",
            });
        }
        // eslint-disable-next-line
    }, [dailyChallenges.challenges, dailyChallenges.claimedDate]);

    // Checkbox handler
    const handleCheckboxChange = (id) => {
        const updatedChallenges = dailyChallenges.challenges.map((challenge) => {
            if (challenge.id === id) {
                const wasCompleted = challenge.completed;
                const newCompleted = !challenge.completed;
                if (challenge.skill) {
                    if (newCompleted && !wasCompleted) {
                        updateSkill(challenge.skill, 1);
                    } else if (!newCompleted && wasCompleted) {
                        updateSkill(challenge.skill, -1);
                    }
                    updateExp(newCompleted ? 1 : -1);
                    updateHealth(newCompleted ? 1 : -1);
                } else {
                    updateExp(newCompleted ? 1 : -1);
                    updateHealth(newCompleted ? 1 : -1);
                }
                return { ...challenge, completed: newCompleted };
            }
            return challenge;
        });
        setDailyChallenges({ ...dailyChallenges, challenges: updatedChallenges });
    };

    // Edit, Delete, Add challenge handlers
    const handleEditChallenge = (id, newData) => {
        const updatedChallenges = dailyChallenges.challenges.map((challenge) =>
            challenge.id === id ? { ...challenge, ...newData } : challenge
        );
        setDailyChallenges({ ...dailyChallenges, challenges: updatedChallenges });
    };

    const handleDeleteChallenge = (id) => {
        const updatedChallenges = dailyChallenges.challenges.filter(challenge => challenge.id !== id);
        setDailyChallenges({ ...dailyChallenges, challenges: updatedChallenges });
    };

    const skillOptions = [
        { value: "", label: "Select Skill" },
        ...skills.map(s => ({
            value: s.skill,
            label: s.skill.charAt(0).toUpperCase() + s.skill.slice(1)
        })),
    ];

    const handleAddChallenge = (skill = null, name = "New Challenge", description = "Describe your challenge.") => {
        const nextId = dailyChallenges.challenges.length > 0
            ? Math.max(...dailyChallenges.challenges.map(c => c.id)) + 1
            : 1;
        const newChallenge = {
            id: nextId,
            name,
            description,
            completed: false,
            skill,
        };
        setDailyChallenges({
            ...dailyChallenges,
            challenges: [...dailyChallenges.challenges, newChallenge],
        });
    };

    // Disable checkboxes if all completed and claimed today
    const todayStr = new Date().toISOString().split('T')[0];
    const allCompleted = dailyChallenges.challenges.length > 0 &&
        dailyChallenges.challenges.every(ch => ch.completed);
    const disableCheckboxes = allCompleted && dailyChallenges.claimedDate === todayStr;

    const getTodayChallengeCompleted = (challengeId) => {
        const todayStr = new Date().toISOString().split('T')[0];
        const todayHistory = dailyChallenges.history?.find(day => day.date.startsWith(todayStr));
        if (todayHistory) {
            const ch = todayHistory.challenges.find(c => c.id === challengeId);
            return ch ? ch.completed : false;
        }
        const ch = dailyChallenges.challenges.find(c => c.id === challengeId);
        return ch ? ch.completed : false;
    };

    return (
  <div className="w-full flex flex-col px-0 xl:px-10 items-center justify-center mb-20">
    <div className="w-full mx-auto px-2 sm:px-4 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="bg-[#0d1117] rounded-lg p-3 sm:p-6 flex flex-col grow col-span-1 row-span-2">
        <div className="flex items-center justify-between mb-2">
          <span className="text-white">Daily Challenge</span>
          <button
            className="text-orange-400 hover:text-orange-300 flex items-center gap-1"
            onClick={() => setEditMode((prev) => !prev)}
            title="Edit Challenge Template"
          >
            <FiEdit /> {editMode ? "Done" : "Edit Template"}
          </button>
        </div>
        <HabitChallengeList
          challenges={dailyChallenges.challenges}
          onCheckboxChange={handleCheckboxChange}
          editMode={editMode}
          onEditChallenge={handleEditChallenge}
          onDeleteChallenge={handleDeleteChallenge}
          onAddChallenge={handleAddChallenge}
          skillOptions={skillOptions}
          disableCheckboxes={disableCheckboxes}
        />
      </div>
      <div className="bg-[#0d1117] rounded-lg p-4 sm:p-6 flex grow flex-col items-center justify-center">
        <span className="text-white mb-4 font-semibold">Challenge History</span>
        <HabitChallengeHistory
          challenges={dailyChallenges.challenges}
          history={dailyChallenges.history}
          today={new Date()}
          getTodayChallengeCompleted={getTodayChallengeCompleted}
        />
      </div>
      <div className="rounded-lg flex items-center justify-center">
        <Calendar tasks={tasks} setTasks={setTasks} />
      </div>
    </div>
  </div>
);
}