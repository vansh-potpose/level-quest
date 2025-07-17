"use client";
import React, { useState, useRef, useEffect } from "react";
import ProfileInfo from "./ProfileInfo";
import SkillDashboard from "./SkillDashboard";
import InventorySlotWrapper from "./InventorySlotWrapper";
import { confirmToast } from "../components/confirmToast";
import { useGame } from "./../context/GameContext";
import { useSelector } from "react-redux";
import itemService from "../backend-services/item.service";
import ApiError from "../backend-services/utils/ApiError";

const Dashboard = () => {
  const { user } = useSelector((state) => state.user);
  const {
    getMaxHealthForLevel,
    getMaxExpForLevel,
    getMaxSkillPoints,
    deleteFromInventory,
  } = useGame();
  const [inventory, setInventory] = useState([]);

  useEffect(() => {
    itemService
      .getUserItems(user._id)
      .then((data) => {
        setInventory(data);
      })
      .catch((err) => console.log(err.message));
  }, []);

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

    const deletedItem = await itemService.deleteItem(item._id);

    if (!deletedItem) {
      throw new ApiError(500, "something happened while deleting the item");
    }

    setInventory((prev) => prev.filter((item) => item._id != deletedItem._id));
  }

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
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
    <div className="flex flex-col items-center justify-center h-fit w-full px-4 sm:px-6 lg:px-10">
      <div className="flex w-full flex-col xl:flex-row sm:gap-6 lg:gap-10 justify-center items-center max-w-7xl">
        <ProfileInfo
          user={user}
          getMaxHealthForLevel={getMaxHealthForLevel}
          getMaxExpForLevel={getMaxExpForLevel}
        />
        <SkillDashboard />
      </div>
      <div className="bg-[#0d1117] mt-5 mb-5 p-4 sm:p-5 rounded-xl w-full max-w-7xl">
        <div>
          <h1 className="font-bold text-base sm:text-lg text-[#9198a1] mb-2">
            About me:
          </h1>
          <p className="text-[#f0f6fc] text-sm sm:text-md font-medium leading-relaxed">
            {user.about}
          </p>
        </div>
        <div className="flex flex-col gap-3 sm:gap-4 mt-4 sm:mt-6 w-full">
          <h1 className="text-[#f0f6fc] text-sm sm:text-md font-medium break-words">
            <span className="text-[#9198a1]">Strengths: </span>
            {user.strength}
          </h1>
          <h1 className="text-[#f0f6fc] text-sm sm:text-md font-medium break-words">
            <span className="text-[#9198a1]">Weaknesses: </span>
            {user.weakness}
          </h1>
          <h1 className="text-[#f0f6fc] text-sm sm:text-md font-medium break-words">
            <span className="text-[#9198a1]">Master Objective: </span>
            {user.masterObjective}
          </h1>
          <h1 className="text-[#f0f6fc] text-sm sm:text-md font-medium break-words">
            <span className="text-[#9198a1]">Minor Objective: </span>
            {user.minorObjective}
          </h1>
        </div>
      </div>

      <div className="mt-6 sm:mt-10 mb-20 sm:mb-30 w-full max-w-7xl">
        <h1 className="text-2xl sm:text-3xl font-bold text-[#f0f6fc] mb-6 sm:mb-9 flex w-full justify-center">
          Inventory
        </h1>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-6">
          {inventory.map((item) => (
            <InventorySlotWrapper
              key={item._id}
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
