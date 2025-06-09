"use client";
import { useState, useMemo } from "react";
import QuestCard from "./QuestCard";
import QuestModal from "./QuestModal";

export default function QuestPage({ quests, setQuests }) {
  const [selectedQuest, setSelectedQuest] = useState(null);
  const [sortOption, setSortOption] = useState("name");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("Active"); // Filter quests by status

  const handleOpenModal = (quest) => setSelectedQuest(quest);
  const handleCloseModal = () => setSelectedQuest(null);

  // Update completion status of a sub-quest
  const updateSubQuestStatus = (questId, subQuestId, completed) => {
    setQuests((prevQuests) =>
      prevQuests.map((quest) =>
        quest.id === questId
          ? {
              ...quest,
              sub_quests: quest.sub_quests.map((sub) =>
                sub.id === subQuestId ? { ...sub, completed } : sub
              ),
            }
          : quest
      )
    );
  };

  // Filter and sort quests based on search, sort option, and status filter
  const filteredAndSortedQuests = useMemo(() => {
    // Filter by search term (case-insensitive)
    let filtered = quests.filter((quest) =>
      quest.name.toLowerCase().includes(searchTerm.trim().toLowerCase())
    );

    // Filter by quest status (Completed or Active)
    filtered = filtered.filter((quest) =>
      filterStatus === "Completed"
        ? quest.status === "Completed"
        : quest.status !== "Completed"
    );

    // Sort quests
    if (sortOption === "name") {
      filtered.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortOption === "date") {
      filtered.sort((a, b) => new Date(a.endDate) - new Date(b.endDate));
    } else if (sortOption === "difficulty") {
      const priorityOrder = { High: 1, Medium: 2, Low: 3 };
      filtered.sort(
        (a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]
      );
    }

    return filtered;
  }, [quests, sortOption, searchTerm, filterStatus]);

  return (
    <div className="flex flex-col items-center h-screen">
      <div className="flex items-center gap-3 bg-[#0d1117] p-3 rounded-lg shadow-md">
        <select
          className="px-3 py-1.5 text-xs rounded-md border border-[#3d444d] bg-[#151b23] text-[#f0f6fc] focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          onChange={(e) => setSortOption(e.target.value)}
          value={sortOption}
        >
          <option value="name">Sort by Name</option>
          <option value="date">Sort by Date</option>
          <option value="difficulty">Sort by Difficulty</option>
        </select>

        <input
          type="text"
          placeholder="Search…"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="px-3 py-1.5 text-xs rounded-md border border-[#3d444d] bg-[#151b23] text-[#f0f6fc] focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
        />

        <button
          className={`px-3 min-w-32 py-1.5 text-xs rounded-md border-2 ${
            filterStatus === "Completed"
              ? "border-green-700"
              : "border-yellow-600"
          } text-[#f0f6fc] focus:outline-none transition`}
          onClick={() =>
            setFilterStatus((prev) =>
              prev === "Completed" ? "Active" : "Completed"
            )
          }
          aria-label="Toggle quest status filter"
        >
          {filterStatus === "Completed" ? "Show Active" : "Show Completed"}
        </button>
      </div>

      <div className="w-full max-w-[1200px] mx-auto mt-4">
        <div className="flex flex-wrap gap-4">
          {filteredAndSortedQuests.map((quest) => (
            <QuestCard
              quest={quest}
              key={quest.id}
              onQuestClick={handleOpenModal}
            />
          ))}
        </div>
      </div>

      {selectedQuest && (
        <QuestModal
          quest={selectedQuest}
          onClose={handleCloseModal}
          updateSubQuestStatus={updateSubQuestStatus}
          claimRewards={claimRewards}
        />
      )}
    </div>
  );
}
