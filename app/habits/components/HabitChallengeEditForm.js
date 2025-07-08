import React from "react";
import { FiSave, FiX } from "react-icons/fi";

export default function HabitChallengeEditForm({
  editData,
  setEditData,
  skillOptions,
  onSave,
  onCancel,
}) {
  return (
    <div className="bg-[#161b22] rounded-lg p-3 sm:p-4 mb-3 w-full flex flex-col shadow transition hover:shadow-lg">
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
          onClick={onSave}
          title="Save"
        >
          <FiSave /> Save
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
