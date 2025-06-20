"use client";
import { useState, useMemo, useCallback, useRef, useEffect } from "react";
import QuestSection from "./QuestSection";
import QuestModal from "./QuestModal";

export default function QuestPage({ quests, setQuests, claimRewards,onEditQuest }) {
  const [selectedQuest, setSelectedQuest] = useState(null);
  const [sortOption, setSortOption] = useState("name");
  const [searchTerm, setSearchTerm] = useState("");
  const [showCompleted, setShowCompleted] = useState(false);
 
  // Floating menu state
  const [selectedQuestId, setSelectedQuestId] = useState(null);
  const menuRef = useRef(null);

  // Handlers
  const openModal = useCallback((quest) => setSelectedQuest(quest), []);
  const closeModal = useCallback(() => setSelectedQuest(null), []);

  // Update sub-quest completion
  const updateSubQuestStatus = useCallback((questId, subQuestId, completed) => {
    setQuests((prev) =>
      prev.map((quest) =>
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
  }, [setQuests]);

  // Update sub-quest claimed
  const updateSubQuestClaimed = useCallback((questId, subQuestId, claimed) => {
    setQuests((prev) =>
      prev.map((quest) =>
        quest.id === questId
          ? {
              ...quest,
              sub_quests: quest.sub_quests.map((sub) =>
                sub.id === subQuestId ? { ...sub, claim: claimed } : sub
              ),
            }
          : quest
      )
    );
  }, [setQuests]);

  // Update quest status
  const updateQuestCompleted = useCallback((questId, completed) => {
    setQuests((prev) =>
      prev.map((quest) =>
        quest.id === questId
          ? { ...quest, status: completed ? "Completed" : "Active" }
          : quest
      )
    );
  }, [setQuests]);

  // Floating menu: close on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        !event.target.closest(".quest-card")
      ) {
        setSelectedQuestId(null);
      }
    }
    document.addEventListener("contextmenu", handleClickOutside);
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("contextmenu", handleClickOutside);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Edit and Delete handlers
  function handleEdit(quest) {
    onEditQuest(quest);
    setSelectedQuestId(null);
  }

  function handleDelete(quest) {
    setQuests((prev) => prev.filter((q) => q.id !== quest.id));
    setSelectedQuestId(null);
  }

  // Filtering and sorting
  const filterQuests = useCallback(
    (quests) =>
      quests.filter((quest) => {
        const matchesSearch = quest.name
          .toLowerCase()
          .includes(searchTerm.trim().toLowerCase());
        const matchesStatus = showCompleted
          ? quest.status === "Completed"
          : quest.status !== "Completed";
        return matchesSearch && matchesStatus;
      }),
    [searchTerm, showCompleted]
  );

  const sortQuests = useCallback(
    (quests) => {
      const sorted = [...quests];
      if (sortOption === "name") {
        sorted.sort((a, b) => a.name.localeCompare(b.name));
      } else if (sortOption === "date") {
        sorted.sort((a, b) => new Date(a.endDate) - new Date(b.endDate));
      } else if (sortOption === "difficulty" || sortOption === "priority") {
        const priorityOrder = { High: 1, Medium: 2, Low: 3 };
        sorted.sort(
          (a, b) => (priorityOrder[a.priority] || 99) - (priorityOrder[b.priority] || 99)
        );
      }
      return sorted;
    },
    [sortOption]
  );

  const displayedQuests = useMemo(
    () => sortQuests(filterQuests(quests)),
    [quests, filterQuests, sortQuests]
  );

  return (
    <div className="flex flex-col items-center ">
      {/* Controls */}
      <div className="flex items-center gap-3 bg-[#0d1117] p-3 rounded-lg shadow-md">
        <select
          className="px-3 py-1.5 text-xs rounded-md border border-[#3d444d] bg-[#151b23] text-[#f0f6fc] focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          onChange={(e) => setSortOption(e.target.value)}
          value={sortOption}
        >
          <option value="name">Sort by Name</option>
          <option value="date">Sort by Date</option>
          <option value="difficulty">Sort by Difficulty</option>
          <option value="priority">Sort by Priority</option>
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
            showCompleted ? "border-green-700" : "border-yellow-600"
          } text-[#f0f6fc] focus:outline-none transition`}
          onClick={() => setShowCompleted((prev) => !prev)}
          aria-label="Toggle quest status filter"
        >
          {showCompleted ? "Show Active" : "Show Completed"}
        </button>
      </div>

      {/* Quest Section */}
      <QuestSection
        quests={displayedQuests}
        openModal={openModal}
        selectedQuestId={selectedQuestId}
        setSelectedQuestId={setSelectedQuestId}
        menuRef={menuRef}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
        onEditQuest={onEditQuest}
      />

      {/* Modal */}
      {selectedQuest && (
        <QuestModal
          quest={selectedQuest}
          onClose={closeModal}
          updateSubQuestStatus={updateSubQuestStatus}
          claimRewards={claimRewards}
          updateSubQuestClaimed={updateSubQuestClaimed}
          updateQuestCompleted={updateQuestCompleted}
        />
      )}
    </div>
  );
}