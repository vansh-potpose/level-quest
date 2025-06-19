import { FaEdit, FaTrash } from "react-icons/fa";

export default function QuestItemMenu({ menuRef, onEdit, onDelete }) {
  return (
    <div
      ref={menuRef}
      className="absolute top-2 left-2 bg-gray-800 rounded shadow-lg z-50 flex flex-col"
      style={{ minWidth: 100 }}
    >
      <button
        className="flex items-center px-3 py-2 hover:bg-gray-700 text-left"
        onClick={e => {
          e.stopPropagation();
          onEdit();
        }}
      >
        <FaEdit className="mr-2" /> Edit
      </button>
      <button
        className="flex items-center px-3 py-2 hover:bg-gray-700 text-left text-red-400"
        onClick={e => {
          e.stopPropagation();
          onDelete();
        }}
      >
        <FaTrash className="mr-2" /> Delete
      </button>
    </div>
  );
}