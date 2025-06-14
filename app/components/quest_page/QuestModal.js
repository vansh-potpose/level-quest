import React, { useState, useEffect } from "react";
import { FaCheck } from "react-icons/fa";
import { toast } from "react-toastify";
import ProgressBar from "../ProgressBar";
import { showGameToast } from "../ShowGameToast";
import { confirmToast } from "../confirmToast";
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
      quest.status != "Completed"
    ) {
      handleQuestCompleted();
    }
    // eslint-disable-next-line
  }, [subQuests, quest.status]);

  const handleQuestCompleted = () => {
    
    updateQuestCompleted(quest.id, true);
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
    claimRewards(quest);
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
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-white/40 border"
      onClick={onClose}
    >
      <div
        className="dark:bg-gray-900 bg-[#0d1117] pb-5 rounded-xl w-[90%] max-w-2xl shadow-lg relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="z-50 absolute top-3 right-4 text-2xl font-bold text-[#f0f6fc] bg-[#0d1117]/70 rounded-md flex w-6 h-6 items-center justify-center"
        >
          ×
        </button>

        <div className="relative w-full mb-4 h-64 overflow-hidden rounded-t-xl">
          <img
            src={quest.image || "/images.jpeg"}
            alt={quest.name}
            className="w-full h-auto rounded object-fill"
          />
        </div>

        <div className="p-4">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-xl font-bold text-[#f0f6fc]">{quest.name}</h2>
            <span className="text-sm text-[#f0f6fc]">
              End Date:{" "}
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

          <p className="text-[#9198a1] text-sm mb-4">{quest.description}</p>

          <div className="text-sm text-[#f0f6fc] mb-2">
            <div className="flex items-center gap-2 justify-between">
              <p>
                <b>Time left:</b> {getTimeLeft()}
              </p>
              <div
                className={`border w-fit py-1 px-2 ${
                  quest.status === "Completed"
                    ? "border-[#31FB74]"
                    : quest.priority === "High"
                    ? "border-[#FF1A00]"
                    : quest.priority === "Medium"
                    ? "border-[#F9E827]"
                    : "border-[#3d444d]"
                } rounded-lg`}
              >
                {quest.status === "Completed"
                  ? "Completed"
                  : "Priority: " + quest.priority}
              </div>
            </div>
            <div className="mt-2 flex gap-5 items-start">
              <div className="min-w-fit font-semibold">Rewards:</div>
              <Rewards rewards={quest.rewards} />
            </div>
          </div>

          <div className="my-4">
            <ProgressBar value={completionRatio} color="bg-[#31FB74]" h="h-2" />
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
                        className="bg-green-500 hover:bg-green-400 transition text-white text-sm font-semibold px-3 py-1 rounded-md"
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
