import React, { useState } from "react";
import { FiEdit, FiTrash2, FiSave, FiX, FiPlus } from "react-icons/fi";
import { confirmToast } from "../components/confirmToast";

export default function HabitChallengeList({
  challenges,
  onCheckboxChange,
  editMode = false,
  onEditChallenge,
  onDeleteChallenge,
  onAddChallenge,
  skillOptions = [],
  disableCheckboxes = false,
}) {
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({ name: "", description: "", skill: "" });
  const [adding, setAdding] = useState(false);
  const [addData, setAddData] = useState({ name: "", description: "", skill: "" });

  const startEdit = (challenge) => {
    setEditingId(challenge.id);
    setEditData({
      name: challenge.name,
      description: challenge.description,
      skill: challenge.skill ?? "",
    });
  };

  const handleEditSave = (id) => {
    onEditChallenge(id, editData);
    setEditingId(null);
    setEditData({ name: "", description: "", skill: "" });
  };

  const handleDeleteClick = async (challenge) => {
    const confirmed = await confirmToast({
      message: `Are you sure you want to delete "${challenge.name}"?`,
      confirmText: "Delete",
      cancelText: "Cancel",
      type: "warning",
    });
    if (confirmed) {
      onDeleteChallenge(challenge.id);
    }
  };

  const handleAddSave = () => {
    if (!addData.name.trim()) return;
    onAddChallenge(addData.skill || null, addData.name, addData.description);
    setAdding(false);
    setAddData({ name: "", description: "", skill: "" });
  };

  return (
    <div className="flex flex-col items-start mt-4 w-full">
      {challenges.map((challenge) => (
        <div
          key={challenge.id}
          className="bg-[#161b22] rounded-lg p-3 sm:p-4 mb-3 w-full flex flex-col sm:flex-row items-start sm:items-center justify-between shadow transition hover:shadow-lg gap-3"
        >
          {editMode && editingId === challenge.id ? (
            <div className="flex flex-col w-full">
              <input
                className="mb-2 px-2 py-1 rounded bg-[#22272e] text-white text-sm"
                value={editData.name}
                onChange={e => setEditData({ ...editData, name: e.target.value })}
                placeholder="Challenge Name"
              />
              <input
                className="mb-2 px-2 py-1 rounded bg-[#22272e] text-white text-sm"
                value={editData.description}
                onChange={e => setEditData({ ...editData, description: e.target.value })}
                placeholder="Description"
              />
              <select
                className="mb-2 px-2 py-1 rounded bg-[#22272e] text-white text-sm"
                value={editData.skill ?? ""}
                onChange={e => setEditData({ ...editData, skill: e.target.value })}
              >
                {skillOptions.map(opt => (
                  <option key={opt.value ?? "none"} value={opt.value ?? ""}>{opt.label}</option>
                ))}
              </select>
              <div className="flex gap-2 flex-wrap">
                <button
                  className="bg-green-600 text-white px-3 py-1 rounded flex items-center gap-1 text-sm"
                  onClick={() => handleEditSave(challenge.id)}
                  title="Save"
                >
                  <FiSave /> Save
                </button>
                <button
                  className="bg-gray-600 text-white px-3 py-1 rounded flex items-center gap-1 text-sm"
                  onClick={() => setEditingId(null)}
                  title="Cancel"
                >
                  <FiX /> Cancel
                </button>
              </div>
            </div>
          ) : (
            <>
              <label className="flex flex-row  items-center cursor-pointer flex-1 gap-2 sm:gap-0">
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
                    <h3 className={`text-sm  sm:text-lg font-semibold flex items-center gap-1 ${challenge.completed ? 'text-green-400 line-through' : 'text-white'}`}>
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
                    onClick={() => startEdit(challenge)}
                    title="Edit"
                  >
                    <FiEdit size={18} className="sm:w-5 sm:h-5"/>
                  </button>
                  <button
                    className="text-red-400 hover:text-red-300 p-1 rounded"
                    onClick={() => handleDeleteClick(challenge)}
                    title="Delete"
                  >
                    <FiTrash2 size={18} className="sm:w-5 sm:h-5" />
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      ))}
      {editMode && (
        <>
          {adding ? (
            <div className="bg-[#161b22] rounded-lg p-3 sm:p-4 mb-2 w-full flex flex-col">
              <input
                className="mb-2 px-2 py-1 rounded bg-[#22272e] text-white text-sm"
                value={addData.name}
                onChange={e => setAddData({ ...addData, name: e.target.value })}
                placeholder="Challenge Name"
              />
              <input
                className="mb-2 px-2 py-1 rounded bg-[#22272e] text-white text-sm"
                value={addData.description}
                onChange={e => setAddData({ ...addData, description: e.target.value })}
                placeholder="Description"
              />
              <select
                className="mb-2 px-2 py-1 rounded bg-[#22272e] text-white text-sm"
                value={addData.skill ?? ""}
                onChange={e => setAddData({ ...addData, skill: e.target.value })}
              >
                {skillOptions.map(opt => (
                  <option key={opt.value ?? "none"} value={opt.value ?? ""}>{opt.label}</option>
                ))}
              </select>
              <div className="flex gap-2 flex-wrap">
                <button
                  className="bg-green-600 text-white px-3 py-1 rounded flex items-center gap-1 text-sm"
                  onClick={handleAddSave}
                  title="Add"
                >
                  <FiSave /> Add
                </button>
                <button
                  className="bg-gray-600 text-white px-3 py-1 rounded flex items-center gap-1 text-sm"
                  onClick={() => { setAdding(false); setAddData({ name: "", description: "", skill: "" }); }}
                  title="Cancel"
                >
                  <FiX /> Cancel
                </button>
              </div>
            </div>
          ) : (
            <button
              className="mt-2 px-4 py-2 bg-orange-600 text-white rounded hover:bg-orange-700 flex items-center gap-2 w-full sm:w-auto justify-center text-sm"
              onClick={() => setAdding(true)}
              title="Add Challenge"
            >
              <FiPlus /> Add Challenge
            </button>
          )}
        </>
      )}
    </div>
  );
}