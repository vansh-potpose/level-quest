"use client";

import ProgressBar from "../components/ProgressBar";
import { BsCoin } from "react-icons/bs";
import { IoCube } from "react-icons/io5";
import { FaCheck } from "react-icons/fa";
import Rewards from "./Rewards";

export default function QuestCard({ quest, onQuestClick }) {
  const hardborder = "border-[#FF1A00]/70";
  const mediumborder = "border-[#F9E827]/70";
  const easyborder = "border-[#3d444d]";
  const completedborder = "border-[#31FB74]/70";

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

  const getPriorityBadge = () => {
    if (quest.status === "Completed")
      return (
        <span className="border-2 border-[#00c160] text-white px-3 py-1 rounded-md text-xs font-bold shadow">
          Completed
        </span>
      );
        if (quest.priority === "High")
      return (
        <span className="border-2 border-[#d52713] text-white px-3 py-1 rounded-md text-xs font-bold shadow">
          High 
        </span>
      );
        if (quest.priority === "Medium")
      return (
        <span className="border-2 border-[#c8a310] text-white px-3 py-1 rounded-md text-xs font-bold shadow">
          Medium 
        </span>
      );
    return (
      <span className="border-2 border-gray-700 text-gray-200 px-3 py-1 rounded-md text-xs font-bold shadow">
        Low
      </span>
    );
  };

  return (
    <div
      onClick={() => onQuestClick(quest)}
      className={`group relative bg-[#0d1117] border border-[#3d444d] rounded-lg shadow-md w-96`}
    >
      <div className="h-[200px] overflow-hidden rounded-t-lg">
        <img
          src={quest.image}
          alt={quest.name}
          className="w-full h-full object-cover rounded-t-md"
        />
      </div>
      <ProgressBar value={progress} color="bg-[#22c55e]" h="h-[5px] rounded-none" />
      <div className="p-4">
        <h2 className="text-lg font-bold text-[#f0f6fc]">{quest.name}</h2>
        <p className="text-sm font-normal text-[#9198a1]">{quest.description}</p>
        <p className="font-medium text-sm w-fit  rounded-md my-3  ">
        
      </p>
        <div className="mt-2 flex gap-5 items-start">
          <div className="min-w-fit  font-semibold">Rewards :</div>
          <Rewards rewards={quest.rewards} />
        </div>
      </div>
      {quest.status === "Completed" && (
        <div className="absolute top-0  justify-center  w-full bg-black/60 h-full flex items-center gap-2  text-[#22c55e] rounded-md p-2">
          <FaCheck size={80} />
        </div>
      )}
      <p className="group-hover:opacity-100 opacity-0 duration-700 absolute top-2 right-2 font-medium text-sm  bg-black/60 w-fit p-2 rounded-md transition-opacity">
        {getPriorityBadge()} - {getRemainingTime()}
      </p>
      
    </div>
  );
}
