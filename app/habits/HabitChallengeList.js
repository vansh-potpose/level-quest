import React, { useState } from "react";
import { FiSave, FiX, FiPlus } from "react-icons/fi";
import { confirmToast } from "../components/confirmToast";
import HabitChallengeItem from "./components/HabitChallengeItem";
import HabitChallengeEditForm from "./components/HabitChallengeEditForm";
import HabitChallengeAddForm from "./components/HabitChallengeAddForm";

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
        <div key={challenge.id} className="w-full">
          {editMode && editingId === challenge.id ? (
            <HabitChallengeEditForm
              editData={editData}
              setEditData={setEditData}
              skillOptions={skillOptions}
              onSave={() => handleEditSave(challenge.id)}
              onCancel={() => setEditingId(null)}
            />
          ) : (
            <HabitChallengeItem
              challenge={challenge}
              editMode={editMode}
              onCheckboxChange={onCheckboxChange}
              onEditClick={startEdit}
              onDeleteClick={handleDeleteClick}
              disableCheckboxes={disableCheckboxes}
            />
          )}
        </div>
      ))}
      {editMode && (
        <HabitChallengeAddForm
          addData={addData}
          setAddData={setAddData}
          skillOptions={skillOptions}
          onAdd={handleAddSave}
          onCancel={() => {
            setAdding(false);
            setAddData({ name: "", description: "", skill: "" });
          }}
          onStartAdd={() => setAdding(true)}
          isAdding={adding}
        />
      )}
    </div>
  );
}