'use client';
import { FaTrash } from "react-icons/fa";

export default function InventorySlotMenu({ menuRef, onDelete }) {
  return (
    <div
      ref={menuRef}
      className="absolute top-2 left-2 bg-gray-800 overflow-hidden rounded shadow-lg z-50 flex flex-col"
      style={{ minWidth: 100 }}
    >
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