import React, { useState, useEffect } from "react";
import { FaCheck } from "react-icons/fa";
import { toast } from "react-toastify";
import ProgressBar from "../components/ProgressBar";
import { showGameToast } from "../components/ShowGameToast";
import { confirmToast } from "../components/confirmToast";
import Rewards from "./Rewards";

const QuestModal = ({
  quest,
  onClose,
  updateSubQuestStatus,
  claimRewards,
  updateSubQuestClaimed,
  updateQuestCompleted,
}) => {
  const [subQuests, setSubQuests] = useState(quest.sub_quests || []);

  // Sync subQuests with quest prop
  useEffect(() => {
    setSubQuests(quest.sub_quests || []);
  }, [quest.sub_quests]);

  // Check for quest completion
  useEffect(() => {
    if (
      subQuests.length > 0 &&
      subQuests.every((sq) => sq.completed) &&
      !quest.isCompleted
    ) {

      console.log("All subquests completed, marking quest as completed", quest.name);
      console.log("Subquests:", subQuests);
      console.log("Quest status before completion:", quest);
      handleQuestCompleted();
      console.log("Quest status after completion:", quest);
    }
    // eslint-disable-next-line
    // Update quest status if all subquests are completed
    // This ensures the UI reflects the correct status
  }, [subQuests, quest.isCompleted]);

  const handleQuestCompleted = () => {
    if (quest.isCompleted) return; // Prevent double call
    updateQuestCompleted(quest.id);
    claimRewards(quest);
    showGameToast({
      icon: "🏆",
      title: "Quest Completed!",
      description: `You completed the quest: ${quest.name}`,
      border_color: "border-yellow-500",
      text_color: "text-yellow-400",
      progressClass_color: "!bg-yellow-500",
    });
  };

  const handleSubQuestComplete = async (subQuestId, isCompleted) => {
    if (isCompleted) {
      toast.info("You can't uncheck a completed subquest.");
      return;
    }
    const confirmed = await confirmToast({
      message: "Mark this subquest as completed? (This change cannot be reverted.)",
      confirmText: "Yes",
      cancelText: "No",
    });
    if (confirmed) {
      setSubQuests((prev) =>
        prev.map((sq) =>
          sq.id === subQuestId ? { ...sq, completed: true } : sq
        )
      );
      updateSubQuestStatus(quest.id, subQuestId, true);
    }
  };

  const handleClaimSubQuestRewards = (subQuest) => {
    if (subQuest.rewards.length === 0) {
      toast.info("No rewards available for this subquest.");
      return;
    }
    if (subQuest.claim) {
      toast.info("Rewards for this subquest have already been claimed.");
      return;
    }
    setSubQuests((prev) =>
      prev.map((sq) =>
        sq.id === subQuest.id ? { ...sq, claim: true } : sq
      )
    );
    updateSubQuestClaimed(quest.id, subQuest.id, true);
    claimRewards(subQuest);
  };

  // Progress calculation
  const completedCount = subQuests.filter((sq) => sq.completed).length;
  const totalCount = subQuests.length || 1;
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
      className="fixed  inset-0 z-50 flex items-center justify-center bg-black/60"
      onClick={onClose}
    >
      {/* Close button for mobile, absolute top-right with 'X' icon */}

      <div
        className="relative bg-[#181c24] rounded-lg  w-[95%] max-w-2xl shadow-2xl  overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >


        {/* Quest Image with overlay */}
        <div className="relative w-full h-60  overflow-hidden">
          <img
            src={quest.image || "/images.jpeg"}
            alt={quest.name}
            className="w-full h-full object-cover"
          />

          <button
            className="absolute top-4 right-4 bg-gray-800 text-white p-2 rounded-full shadow-lg font-semibold text-base block md:hidden z-50"
            onClick={onClose}
            aria-label="Close"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
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
              {subQuests.map((sq) => (
                <div
                  key={sq.id}
                  className="flex items-center justify-between bg-transparent rounded-md px-1"
                >
                  <div className="flex items-center gap-2 cursor-pointer">
                    <div
                      onClick={() => handleSubQuestComplete(sq.id, sq.completed)}
                      className={`w-5 h-5 rounded-sm border-2 flex items-center justify-center cursor-pointer transition ${sq.completed
                          ? "border-green-500 text-green-500 bg-green-700/20"
                          : "border-gray-600 text-gray-600 bg-gray-700/20"
                        }`}
                    >
                      {sq.completed && <FaCheck size={12} />}
                    </div>
                    <span
                      className={`text-md ${sq.completed
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
                        onClick={() => handleClaimSubQuestRewards(sq)}
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
    </div>
  );
};

export default QuestModal;
