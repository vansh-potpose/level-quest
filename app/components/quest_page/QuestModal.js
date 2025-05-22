const QuestModal = ({ quest, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className=" dark:bg-gray-900 rounded-xl p-6 w-[90%] max-w-xl shadow-lg relative">
        <button onClick={onClose} className="absolute top-2 right-4 text-xl">×</button>
        <h2 className="text-2xl font-bold mb-2">{quest.name}</h2>
        <p className="mb-4">{quest.description}</p>
        {quest.sub_quests?.map((sq) => (
          <div key={sq.id} className="mb-2 p-2 border rounded">
            {sq.name} - Reward: {typeof sq.reward === 'object' ? 'Multiple' : sq.reward}
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuestModal;
