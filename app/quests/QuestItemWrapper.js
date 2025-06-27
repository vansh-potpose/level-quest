import QuestCard from "./QuestCard";
import QuestItemMenu from "./QuestItemMenu";

export default function QuestItemWrapper({
  quest,
  openModal,
  selectedQuestId,
  setSelectedQuestId,
  menuRef,
  handleEdit,
  handleDelete,
}) {
  return (
    <div
      className="relative quest-card flex grow"
      onContextMenu={(e) => {
        e.preventDefault();
        setSelectedQuestId(quest.id);
      }}
      onMouseDown={() => {
        if (selectedQuestId && selectedQuestId !== quest.id) {
          setSelectedQuestId(null);
        }
      }}
    >
      <QuestCard quest={quest} onQuestClick={openModal} />
      {selectedQuestId === quest.id && (
        <QuestItemMenu
          menuRef={menuRef}
          onEdit={() => handleEdit(quest)}
          onDelete={() => handleDelete(quest)}
        />
      )}
    </div>
  );
}