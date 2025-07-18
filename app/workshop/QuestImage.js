'use client'

import React from "react";
import Reward from "../components/Reward";
import Rewards from "../quests/Rewards";
import ProgressBar from "../components/ProgressBar";
import { FaCheck } from "react-icons/fa";

// This component renders a quest as a static image-like card, no interactivity.
const QuestImage = ({ quest }) => {
    // Progress calculation
    console.log("QuestImage component rendered with quest:", quest);
 

  // Progress calculation
  const completedCount = quest.sub_quests.filter((sq) => sq.completed).length;
  const totalCount = quest.sub_quests.length || 1;
  const completionRatio = (completedCount / totalCount) * 100;

  // Time left calculation
  const getTimeLeft = () => {
    if (!quest.endDate) return "N/A";
    const now = new Date();
    const end = new Date(quest.endDate);
    const diffMs = end - now;
    if (diffMs <= 0) return "Ended";
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const diffHours = Math.floor((diffMs / (1000 * 60 * 60)) % 24);
    const diffMinutes = Math.floor((diffMs / (1000 * 60)) % 60);
    if (diffDays > 0) return `${diffDays} day${diffDays > 1 ? "s" : ""} ${diffHours}h`;
    if (diffHours > 0) return `${diffHours} hour${diffHours > 1 ? "s" : ""}`;
    return `${diffMinutes} min`;
  };

  // UI
  // Priority badge helper
  const getPriorityBadge = () => {
    if (quest.isCompleted)
      return (
        <span className="bg-[#00c160] text-white px-3 py-1 rounded-md text-xs font-bold shadow">
          Completed
        </span>
      );
        if (quest.priority === 1)
      return (
        <span className="bg-[#d52713] text-white px-3 py-1 rounded-md text-xs font-bold shadow">
          High Priority
        </span>
      );
        if (quest.priority === 2)
      return (
        <span className="bg-[#c8a310] text-white px-3 py-1 rounded-md text-xs font-bold shadow">
          Medium Priority
        </span>
      );
    return (
      <span className="bg-gray-700/80 text-gray-200 px-3 py-1 rounded-md text-xs font-bold shadow">
        Low Priority
      </span>
    );
  };

  return (
 
      <div
        className="relative bg-[#181c24] rounded-lg mx-auto  md:w-[85%] max-w-2xl shadow-2xl overflow-hidden"
      >
        

        {/* Quest Image with overlay */}
        <div className="relative w-full h-60 overflow-hidden">
          <img
            src={quest.image || "/images.jpeg"}
            alt={quest.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#181c24] via-transparent to-transparent" />
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3 gap-2">
            <h2 className="text-2xl font-extrabold text-white tracking-tight">{quest.name}</h2>
            <div className="flex items-center gap-2">
              {getPriorityBadge()}
              <span className="text-xs text-gray-400">
                <b>
                  {quest.endDate
                    ? new Date(quest.endDate).toLocaleDateString(undefined, {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })
                    : ""}
                </b>
              </span>
            </div>
          </div>
          <p className="text-gray-300 text-base mb-4">{quest.description}</p>
          {/* Original subquest/reward logic */}
          <div className="text-sm text-[#f0f6fc] mb-2">
            <div className="flex items-center gap-2 justify-between">
              <p>
                <b>Time left:</b> {getTimeLeft()}
              </p>
              
            </div>
            <div className="mt-2 flex gap-5 items-start">
              <div className="min-w-fit font-semibold">Rewards:</div>
              <Rewards rewards={quest.rewards} />
            </div>
          </div>

          <div className="my-4">
            <ProgressBar value={completionRatio} color="bg-[#22c55e]" h="h-2" />
          </div>

          <div>
            <h3 className="text-white text-sm font-semibold mb-2">
              Sub quests ({completedCount}/{totalCount})
            </h3>
            <div className="space-y-3.5 mt-3">
              {quest.sub_quests.map((sq) => (
                <div
                  key={sq.id}
                  className="flex items-center justify-between bg-transparent rounded-md px-1"
                >
                  <div className="flex items-center gap-2 cursor-pointer">
                    <div
                      className={`w-5 h-5 rounded-sm border-2 flex items-center justify-center cursor-pointer transition ${
                        sq.completed
                          ? "border-green-500 text-green-500 bg-green-700/20"
                          : "border-gray-600 text-gray-600 bg-gray-700/20"
                      }`}
                    >
                      {sq.completed && <FaCheck size={12} />}
                    </div>
                    <span
                      className={`text-md ${
                        sq.completed
                          ? "text-green-300 line-through"
                          : "text-gray-300"
                      }`}
                    >
                      {sq.name}
                    </span>
                  </div>
                  <div className={`${sq.claim ? "hidden" : ""} flex items-center gap-4`}>
                    <Rewards rewards={sq.rewards} />
                    {sq.completed && (
                      <button
                        className="bg-[#22c55e] hover:bg-green-700 transition text-white text-sm font-semibold px-3 py-1 rounded-md"
                        disabled={sq.claim}
                      >
                        {sq.claim ? "Claimed" : "Claim"}
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
  );
};

export default QuestImage;
