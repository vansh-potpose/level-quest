import QuestItemWrapper from "./QuestItemWrapper";

export default function QuestSection({
  quests,
  openModal,
  selectedQuestId,
  setSelectedQuestId,
  menuRef,
  handleEdit,
  handleDelete,
}) {
  return (
    <div className="w-full max-w-[1400px] mx-auto mt-4 px-2">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3  gap-4 sm:gap-6">
        {quests.map((quest) => (
          <QuestItemWrapper
            key={quest.id}
            quest={quest}
            openModal={openModal}
            selectedQuestId={selectedQuestId}
            setSelectedQuestId={setSelectedQuestId}
            menuRef={menuRef}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
}