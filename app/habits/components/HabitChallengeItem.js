import React from "react";
import { FiEdit, FiTrash2 } from "react-icons/fi";

export default function HabitChallengeItem({
  challenge,
  editMode,
  onCheckboxChange,
  onEditClick,
  onDeleteClick,
  disableCheckboxes = false,
}) {
  return (
    <div className="bg-[#161b22] rounded-lg p-3 sm:p-4 mb-3 w-full flex flex-col sm:flex-row items-start sm:items-center justify-between shadow transition hover:shadow-lg gap-3">
      <label className="flex flex-row items-center cursor-pointer flex-1 gap-2">
        <input
          type="checkbox"
          checked={challenge.completed}
          onChange={() => onCheckboxChange(challenge.id)}
          className="peer appearance-none w-5 h-5 border-2 border-gray-400 rounded-md checked:bg-green-500 checked:border-green-500 transition-all duration-150 mr-0 xs:mr-3 focus:outline-none"
          disabled={editMode || disableCheckboxes}
        />
        <span className="absolute w-5 h-5 flex items-center justify-center pointer-events-none">
          {challenge.completed ? (
            <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
              <path d="M5 10.5L9 14.5L15 7.5" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          ) : null}
        </span>
        <div className="ml-1 min-w-0 flex-1">
          <div className="flex flex-row items-center gap-2">
            <h3 className={`text-sm sm:text-lg font-semibold flex items-center gap-1 ${challenge.completed ? 'text-green-400 line-through' : 'text-white'}`}>
              {challenge.name}
            </h3>
            <div className="flex items-center">
              {challenge.skill ? (
                <span className="inline-flex items-center px-2 rounded-sm text-xs font-medium bg-blue-700 text-blue-100">
                  {challenge.skill}
                </span>
              ) : (
                <span className="inline-flex items-center px-2 rounded-sm text-xs font-medium bg-gray-700 text-gray-400">
                  No skill
                </span>
              )}
            </div>
          </div>
          <p className="text-gray-400 text-sm break-words">{challenge.description}</p>
        </div>
      </label>
      {editMode && (
        <div className="flex gap-2 ml-0 sm:ml-2 mt-2 sm:mt-0 flex-shrink-0">
          <button
            className="text-blue-400 hover:text-blue-300 p-1 rounded"
            onClick={() => onEditClick(challenge)}
            title="Edit"
          >
            <FiEdit size={18} className="sm:w-5 sm:h-5" />
          </button>
          <button
            className="text-red-400 hover:text-red-300 p-1 rounded"
            onClick={() => onDeleteClick(challenge)}
            title="Delete"
          >
            <FiTrash2 size={18} className="sm:w-5 sm:h-5" />
          </button>
        </div>
      )}
    </div>
  );
}
