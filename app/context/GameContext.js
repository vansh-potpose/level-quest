'use client';
import React, { createContext, useContext, useState, useRef, useEffect } from "react";
import { exampleUser, exampleStoreItems, exampleQuests, dailyChallenge } from "../data";
import Item from "../components/Item";
import { showGameToast } from "../components/ShowGameToast";

const GameContext = createContext();

export function GameProvider({ children }) {
  // --- Constants ---
  const BASE_HEALTH = 100;
  const BASE_XP = 100;

  // --- State ---
  const [user, setUser] = useState(exampleUser(claimItems));
  const [coins, setCoins] = useState(user.coins || 0);
  const [dailyChallenges, setDailyChallenges] = useState(dailyChallenge);
  const [tasks, setTasks] = useState(user.Tasks);
  const [editingQuest, setEditingQuest] = useState(null);
  const [editingItem, setEditingItem] = useState(null);
  const [StoreItems, setStoreItems] = useState(exampleStoreItems(claimItems, claimObjects));
  const [quests, setQuests] = useState(exampleQuests(claimItems));

  // --- Utility Functions ---
  const getMaxExpForLevel = (level) => Math.floor(BASE_XP * level ** 1.5);
  const getMaxHealthForLevel = (level) => Math.floor(BASE_HEALTH * 1.05 ** level);
  const getMaxSkillPoints = (level) => Math.floor(BASE_XP * level ** 1.5);

  // --- Update Functions ---
  function updateCoins(amount) {
    setUser(prev => ({ ...prev, coins: prev.coins + amount }));
    setCoins(prev => prev + amount);
  }

  function updateHealth(amount) {
    setUser(prev => {
      const maxHealth = getMaxHealthForLevel(prev.level);
      const newHealth = Math.max(0, Math.min(prev.health + amount, maxHealth));
      return { ...prev, health: newHealth };
    });
  }

  function updateSkill(skillName, amount) {
    setUser(prev => ({
      ...prev,
      stats: prev.stats.map(stat => {
        if (stat.skill === skillName) {
          let newValue = stat.value + amount;
          let newLevel = stat.level;
          let maxPoints = getMaxSkillPoints(stat.level);

          while (newValue >= maxPoints) {
            newValue -= maxPoints;
            newLevel += 1;
            maxPoints = getMaxSkillPoints(newLevel);
          }
          newValue = stat.value + amount;
          return { ...stat, value: newValue, level: newLevel };
        }
        return stat;
      })
    }));
  }

  function updateExp(amount) {
    setUser(prev => {
      let newExp = prev.exp + amount;
      let newLevel = prev.level;
      let maxExp = getMaxExpForLevel(newLevel);

      while (newExp >= maxExp) {
        newExp -= maxExp;
        newLevel += 1;
        maxExp = getMaxExpForLevel(newLevel);
      }
      return { ...prev, exp: newExp, level: newLevel };
    });
  }

  // --- Claim Functions ---
  function claimItems(attribute_name, amount) {
    switch (attribute_name) {
      case "health": updateHealth(amount); break;
      case "coins": updateCoins(amount); break;
      case "experience": updateExp(amount); break;
      default: updateSkill(attribute_name, amount);
    }
    showGameToast({
      icon: "🎉",
      title: "Item Claimed!",
      description: `You received ${amount} ${attribute_name}.`,
      border_color: "border-blue-500",
      text_color: "text-blue-400",
      progressClass_color: "!bg-blue-500",
    });
  }

  function claimObjects(message) {
    showGameToast({
      icon: "🎉",
      title: "Object Claimed!",
      description: message,
      border_color: "border-blue-500",
      text_color: "text-blue-400",
      progressClass_color: "!bg-blue-500",
    });
  }

  function addToInventory(item) {
    setUser(prev => ({
      ...prev,
      inventory: [...prev.inventory, item],
    }));
  }

  function deleteFromInventory(itemId) {
    setUser(prev => ({
      ...prev,
      inventory: prev.inventory.filter(item => item.id !== itemId),
    }));
  }

  const claimReward = (reward) => {
    switch (reward.type) {
      case "coins":
        updateCoins(reward.data.amount);
        break;
      case "experience":
        updateExp(reward.data.amount);
        break;
      case "skill":
        updateSkill(reward.data.skill, reward.data.amount);
        break;
      case "item":
        addToInventory(reward.data.item);
        break;
      default:
        console.warn(`Unhandled reward type: ${reward.type}`);
    }
  };

  const claimRewards = (quest) => {
    let rewars_names = quest.rewards.map(reward => {
      if (reward.type === "item") {
        return reward.data.item.name;
      } else if (reward.type === "coins") {
        return `+${reward.data.amount} coins`;
      } else if (reward.type === "experience") {
        return `+${reward.data.amount} experience`;
      } else if (reward.type === "skill") {
        return `+${reward.data.amount} ${reward.data.skill}`;
      }
      return "Unknown Reward";
    }).join(", ");
    quest.rewards.forEach(reward => {
      claimReward(reward);
    });
    showGameToast({
      icon: "🎁",
      title: "Rewards Claimed!",
      description: `You received: ${rewars_names}`,
      border_color: "border-green-500",
      text_color: "text-green-400",
      progressClass_color: "!bg-green-500",
    });
  };

  // --- Store Logic ---
  function buyItem(item) {
    if (user.coins >= item.price) {
      updateCoins(-item.price);
      const newId = Date.now() + Math.floor(Math.random() * 1000000);
      const newItem = new Item({ ...item, id: newId }, item.onClaim, item.skill_name || "none");
      setUser(prev => ({
        ...prev,
        inventory: [...prev.inventory, newItem],
      }));
      showGameToast({
        icon: "🛒",
        title: "Item Purchased!",
        description: `You bought: ${item.name}`,
        border_color: "border-green-500",
        text_color: "text-green-400",
        progressClass_color: "!bg-green-500",
      });
    } else {
      showGameToast({
        icon: "❌",
        title: "Purchase Failed",
        description: "Not enough coins to buy this item.",
        border_color: "border-red-500",
        text_color: "text-red-500",
        progressClass_color: "!bg-red-700",
      });
    }
  }

  // --- Level Up Toasts ---
  const prevSkillLevels = useRef(user.stats.map(stat => stat.level));
  const prevUserLevel = useRef(user.level);
  const prevUserHealth = useRef(user.health);

  useEffect(() => {
    user.stats.forEach((stat, idx) => {
      const prevLevel = prevSkillLevels.current[idx];
      if (stat.level > prevLevel) {
        showGameToast({
          icon: "⚔️",
          title: `${stat.skill} Level Up!`,
          description: `You've reached Level ${stat.level}!`,
          border_color: "border-green-500",
          text_color: "text-green-400",
          progressClass_color: "!bg-green-500",
        });
      }
    });
    prevSkillLevels.current = user.stats.map(stat => stat.level);
  }, [user.stats]);

  useEffect(() => {
    if (user.level > prevUserLevel.current) {
      showGameToast({
        icon: "🎉",
        title: "Level Up!",
        description: `You've reached Level ${user.level}!`,
        border_color: "border-blue-500",
        text_color: "text-blue-400",
        progressClass_color: "!bg-blue-500",
      });
    }
    prevUserLevel.current = user.level;
  }, [user.level]);

  useEffect(() => {
    if (user.health > prevUserHealth.current) {
      showGameToast({
        icon: "❤️",
        title: "Health Restored!",
        description: `Your health increased to ${user.health}.`,
        border_color: "border-red-500",
        text_color: "text-red-500",
        progressClass_color: "!bg-red-700",
      });
    } else if (user.health < prevUserHealth.current) {
      showGameToast({
        icon: "💔",
        title: "Health Decreased!",
        description: `Your health dropped to ${user.health}.`,
        border_color: "border-red-700",
        text_color: "text-red-600",
        progressClass_color: "!bg-red-700",
      });
    }
    prevUserHealth.current = user.health;
  }, [user.health]);

  // --- Provide everything needed to children ---
  return (
    <GameContext.Provider value={{
      user, setUser, coins, setCoins, dailyChallenges, setDailyChallenges, tasks, setTasks,
      editingQuest, setEditingQuest, editingItem, setEditingItem,
      StoreItems, setStoreItems, quests, setQuests,
      getMaxExpForLevel, getMaxHealthForLevel, getMaxSkillPoints,
      updateCoins, updateHealth, updateSkill, updateExp,
      claimItems, claimObjects, addToInventory, deleteFromInventory,
      claimReward, claimRewards, buyItem
    }}>
      {children}
    </GameContext.Provider>
  );
}

export function useGame() {
  return useContext(GameContext);
}