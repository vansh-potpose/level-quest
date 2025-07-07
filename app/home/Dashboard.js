'use client';
import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import ProfileInfo from "./ProfileInfo";
import SkillDashboard from "./SkillDashboard";
import InventorySlotWrapper from "./InventorySlotWrapper";
import { confirmToast } from "../components/confirmToast";
import { useGame } from "./../context/GameContext";
import ProgressBar from "../components/ProgressBar";
import { useSelector } from "react-redux";

const Dashboard = () => {
  const { user } = useSelector((state) => state.user);
  const {
    getMaxHealthForLevel,
    getMaxExpForLevel,
    getMaxSkillPoints,
    deleteFromInventory,
  } = useGame();

  const [selectedItemId, setSelectedItemId] = useState(null);
  const menuRef = useRef(null);

  async function handleDelete(item) {
    const confirmed = await confirmToast({
      message: `Are you sure you want to delete "${item.name}" from the inventory?`,
      confirmText: "Delete",
      cancelText: "Cancel",
      type: "warning",
    });

    if (!confirmed) return;
    deleteFromInventory(item.id);
    setSelectedItemId(null);
  }

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target)
      ) {
        setSelectedItemId(null);
      }
    }
    if (selectedItemId !== null) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [selectedItemId]);

  return (
    <div className="flex flex-col items-center justify-center h-fit w-full px-10">
      <div className="flex w-full flex-col md:flex-row gap-10 justify-center items-center">
        <ProfileInfo user={user} getMaxHealthForLevel={getMaxHealthForLevel} getMaxExpForLevel={getMaxExpForLevel} />
        <SkillDashboard skills={user?.stats} getMaxSkillPoints={getMaxSkillPoints} />
      </div>
      <div className="bg-[#0d1117] m-5 p-5 rounded-xl w-full ">
        <div>
          <h1 className="font-bold text-lg text-[#9198a1]">About me : </h1>
          <p className="text-[#f0f6fc] text-md font-medium">{user.about}</p>
        </div>
        <div className="flex flex-col  gap-4 mt-6 w-full">
          <h1 className="text-[#f0f6fc] text-md font-medium"> <span className="text-[#9198a1]">Strengths : </span>{user.stregth}</h1>
          <h1 className="text-[#f0f6fc] text-md font-medium"><span className="text-[#9198a1]">Weaknesses : </span>{user.weakness}</h1>
          <h1 className="text-[#f0f6fc] text-md font-medium"><span className="text-[#9198a1]">Master Objective : </span>{user.masterObjective}</h1>
          <h1 className="text-[#f0f6fc] text-md font-medium"><span className="text-[#9198a1]">Minor Objective : </span>{user.minorObjective}</h1>
        </div>
      </div>
      <div className="mt-10 mb-30 w-full ">
        <h1 className="text-3xl font-bold text-[#f0f6fc] mb-9 flex w-full justify-center">Inventory</h1>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
          {user.inventory?.map((item) => (
            <InventorySlotWrapper
              key={item.id}
              item={item}
              selectedItemId={selectedItemId}
              setSelectedItemId={setSelectedItemId}
              menuRef={menuRef}
              handleDelete={() => handleDelete(item)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;