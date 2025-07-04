import React from "react";
import { FiSave, FiX, FiPlus } from "react-icons/fi";

export default function HabitChallengeAddForm({
  addData,
  setAddData,
  skillOptions,
  onAdd,
  onCancel,
  isAdding,
  onStartAdd,
}) {
  if (!isAdding) {
    return (
      <button
        className="mt-2 px-4 py-2 bg-orange-600 text-white rounded hover:bg-orange-700 flex items-center gap-2 w-full sm:w-auto justify-center text-sm"
        onClick={onStartAdd}
        title="Add Challenge"
      >
        <FiPlus /> Add Challenge
      </button>
    );
  }

  return (
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
          onClick={onAdd}
          title="Add"
        >
          <FiSave /> Add
        </button>
        <button
          className="bg-gray-600 text-white px-3 py-1 rounded flex items-center gap-1 text-sm"
          onClick={onCancel}
          title="Cancel"
        >
          <FiX /> Cancel
        </button>
      </div>
    </div>
  );
}
