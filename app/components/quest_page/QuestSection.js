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
    <div className="w-full max-w-[1200px] mx-auto mt-4">
      <div className="flex flex-wrap gap-4">
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