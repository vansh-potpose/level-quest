"use client"
import { useState } from "react";
import QuestCard from "./QuestCard";
import QuestModal from "./QuestModal"; // you create this



export default function QuestPage({ quests }) {
    const [selectedQuest, setSelectedQuest] = useState(null);
    const handleOpenModal = (quest) => setSelectedQuest(quest);
    const handleCloseModal = () => setSelectedQuest(null);
    return (
        <div className="flex flex-col items-center  h-screen ">

            <div className="flex items-center gap-3 bg-[#0d1117] p-3 rounded-lg shadow-md">
                <select className="px-3 py-1.5 text-xs rounded-md border border-[#3d444d] bg-[#151b23] text-[#f0f6fc] focus:outline-none focus:ring-2 focus:ring-blue-400 transition">
                    <option value="name">Sort by Name</option>
                    <option value="date">Sort by Date</option>
                    <option value="difficulty">Sort by Difficulty</option>
                </select>
                <input
                    type="text"
                    placeholder="Search…"
                    className="px-3 py-1.5 text-xs rounded-md border border-[#3d444d] bg-[#151b23] text-[#f0f6fc] focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                />
            </div>


            <div className="flex flex-wrap gap-4 mt-4">
                {quests.map((quest) => (
                    <QuestCard quest={quest} key={quest.id} onQuestClick={handleOpenModal} />
                ))}

            </div>

            {selectedQuest && (
                <QuestModal quest={selectedQuest} onClose={handleCloseModal} />
            )}
        </div>
    );
}