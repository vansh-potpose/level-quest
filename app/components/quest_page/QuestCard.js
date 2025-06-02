"use client";

import ProgressBar from "../ProgressBar";
import { BsCoin } from "react-icons/bs";
import { IoCube } from "react-icons/io5";
import { FaCheck } from "react-icons/fa";

export default function QuestCard({ quest, onQuestClick }) {
  const hardborder = "border-[#FF1A00]";
  const mediumborder = "border-[#F9E827]";
  const easyborder = "border-[#3d444d]";
  const completedborder = "border-[#31FB74]";

  const totalSubquests = quest.sub_quests ? quest.sub_quests.length : 0;
  const completedSubquests = quest.sub_quests
    ? quest.sub_quests.filter((sq) => sq.completed).length
    : 0;
  const progress = totalSubquests > 0 ? (completedSubquests / totalSubquests) * 100 : 0;

  const getRemainingTime = () => {
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

  return (
    <div
      onClick={() => onQuestClick(quest)}
      className={`group relative bg-[#0d1117] border-2 ${
        quest.status === "Completed"
          ? completedborder
          : quest.priority === "High"
          ? hardborder
          : quest.priority === "Medium"
          ? mediumborder
          : easyborder
      } rounded-lg shadow-md w-96`}
    >
      <div className="h-40 overflow-hidden rounded-t-lg">
        <img src={quest.image} alt={quest.name} className="w-full object-fill rounded-t-md " />
      </div>
      <ProgressBar value={progress} color="bg-[#31FB74]" h="h-[5px] rounded-none" />
      <div className="p-4">
        <h2 className="text-lg font-bold text-[#f0f6fc]">{quest.name}</h2>
        <p className="text-sm font-normal text-[#9198a1]">{quest.description}</p>
        <div className="mt-2 flex gap-5 items-start">
          <div className="min-w-fit  font-semibold">Rewards :</div>
          <div className="flex gap-5 items-center flex-wrap">
            {quest.rewards.map((reward, index) => (
              <div key={index} className="flex ">
                {reward.type === "coins" && (
                  <span className="flex gap-1 text-md items-center ">
                    <BsCoin size={20} className="text-yellow-500" />
                    {reward.data.amount}
                  </span>
                )}
                {reward.type === "experience" && (
                  <span className="flex flex-row gap-1 text-md items-center text-blue-300">
                    + {reward.data.amount} exp
                  </span>
                )}
                {reward.type === "skill" && (
                  <span className="flex gap-1 text-md items-center text-green-400">
                    + {reward.data.amount} {reward.data.skill}
                  </span>
                )}
                {reward.type === "item" && <IoCube size={20} className="text-blue-600" />}
              </div>
            ))}
          </div>
        </div>
      </div>
      {quest.status === "Completed" && (
        <div className="absolute top-0  justify-center  w-full bg-black/60 h-full flex items-center gap-2  text-[#31FB74] rounded-md p-2">
          <FaCheck size={50} />
        </div>
      )}
      <p className="group-hover:opacity-100 opacity-0 duration-700 absolute top-2 right-2 font-medium text-sm  bg-black/60 w-fit p-2 rounded-md transition-opacity">
        {getRemainingTime()}
      </p>
    </div>
  );
}
