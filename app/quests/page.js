"use client";
import { useState, useMemo, useCallback, useRef, useEffect } from "react";
import QuestSection from "./QuestSection";
import QuestModal from "./QuestModal";
import { confirmToast } from "../components/confirmToast";
import { useGame } from "../context/GameContext";
import { useRouter } from "next/navigation";

export default function QuestPage() {
  const {
    quests,
    setQuests,
    claimRewards,
    // setEditingQuest, // Remove direct usage
  } = useGame();

  const router = useRouter();

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
  const updateQuestCompleted = useCallback((questId) => {
    setQuests((prev) =>
      prev.map((quest) =>
        quest.id === questId
          ? { ...quest, isCompleted:true }
          : quest
      )
    );
    setSelectedQuest((prev) =>
      prev && prev.id === questId ? { ...prev, isCompleted: true } : prev
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
    setSelectedQuestId(null);
    router.push(`/workshop?editQuest=${quest.id}`);
  }

  async function handleDelete(quest) {
    const confirmed = await confirmToast({
      message: `Are you sure you want to delete "${quest.name}" from the quests?`,
      confirmText: "Delete",
      cancelText: "Cancel",
      type: "warning",
    });

    if (!confirmed) return;
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
          ? quest.isCompleted
          : !quest.isCompleted;
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
      } else if (sortOption === "priority") {
        // const priorityOrder = { High: 1, Medium: 2, Low: 3 };
        sorted.sort(
          (a, b) => (a.priority || 99) - (b.priority || 99)
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
    <div className="flex flex-col items-center mb-20 px-4 w-full max-w-7xl mx-auto">
    
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 bg-[#0d1117] p-4 rounded-lg  w-full max-w-2xl mb-6">
          {/* Sort Dropdown */}
          <label className="flex items-center gap-2 flex-1 min-w-0">
            <span className="text-xs text-[#8b949e] hidden sm:inline">Sort:</span>
            <select
          className="px-3 py-2 text-xs sm:text-sm rounded-md border border-[#30363d] bg-[#161b22] text-[#f0f6fc] focus:outline-none focus:ring-2 focus:ring-blue-500 transition w-full"
          onChange={(e) => setSortOption(e.target.value)}
          value={sortOption}
          aria-label="Sort quests"
            >
          <option value="name">Name</option>
          <option value="date">End Date</option>
          <option value="priority">Priority</option>
            </select>
          </label>

          {/* Search Input */}
          <label className="flex items-center gap-2 flex-1 min-w-0">
            <span className="text-xs text-[#8b949e] hidden sm:inline">Search:</span>
            <input
          type="text"
          placeholder="Search quests…"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="px-3 py-2 text-xs sm:text-sm rounded-md border border-[#30363d] bg-[#161b22] text-[#f0f6fc] focus:outline-none focus:ring-2 focus:ring-blue-500 transition w-full"
          aria-label="Search quests"
            />
          </label>

          {/* Toggle Button */}
          <div className="flex-shrink-0 w-[140px]">
            <button
          className={`px-3 py-2 text-xs sm:text-sm rounded-md border-2 transition whitespace-nowrap font-semibold w-full
            ${showCompleted
              ? "border-green-600 bg-green-900/30 text-green-300 hover:bg-green-900/60"
              : "border-orange-600 bg-orange-900/30 text-orange-200 hover:bg-yellow-900/60"
            }`}
          onClick={() => setShowCompleted((prev) => !prev)}
          aria-pressed={showCompleted}
          aria-label="Toggle quest status filter"
          type="button"
            >
          {showCompleted ? "Show Active" : "Show Completed"}
            </button>
          </div>
        </div>
        <QuestSection
          quests={displayedQuests}
          openModal={openModal}
          selectedQuestId={selectedQuestId}
          setSelectedQuestId={setSelectedQuestId}
          menuRef={menuRef}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
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