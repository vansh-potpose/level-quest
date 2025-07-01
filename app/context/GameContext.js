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
  const getMaxHealthForLevel = (level) => Math.floor(BASE_HEALTH * 1.05 ** (level - 1));
  const getMaxSkillPoints = (level) => Math.floor(BASE_XP * level ** 1.5);

  // --- Update Functions ---
  function updateCoins(amount) {
    setUser(prev => {
      const newCoins = prev.coins + amount;
      setCoins(newCoins);
      return { ...prev, coins: newCoins };
    });
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
        if (stat.skill !== skillName) return stat;
        let newValue = stat.value + amount;
        let newLevel = stat.level;
        let maxPoints;
        while (true) {
          maxPoints = getMaxSkillPoints(newLevel);
          if (newValue < maxPoints) break;
          newValue -= maxPoints;
          newLevel += 1;
        }
        newValue = stat.value + amount;

        return { ...stat, value: newValue, level: newLevel };
      })
    }));
  }

  function updateExp(amount) {
    setUser(prev => {
      let newExp = prev.exp + amount;
      let newLevel = prev.level;
      while (true) {
        const maxExp = getMaxExpForLevel(newLevel);
        if (newExp < maxExp) break;
        newExp -= maxExp;
        newLevel += 1;
      }
      return { ...prev, exp: newExp, level: newLevel };
    });
  }

  // --- Claim Functions ---
  function claimItems(attribute_name, amount) {
    const actions = {
      health: updateHealth,
      coins: updateCoins,
      experience: updateExp,
    };
    (actions[attribute_name] || ((amt) => updateSkill(attribute_name, amt)))(amount);

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
    if (!reward || !reward.type) return;
    const handlers = {
      coins: () => updateCoins(reward.data.amount),
      experience: () => updateExp(reward.data.amount),
      skill: () => updateSkill(reward.data.skill, reward.data.amount),
      item: () => addToInventory(reward.data.item),
    };
    (handlers[reward.type] || (() => console.warn(`Unhandled reward type: ${reward.type}`)))();
  };

  const claimRewards = (quest) => {
    if (!quest?.rewards?.length) return;
    const rewardDescriptions = quest.rewards.map(reward => {
      switch (reward.type) {
        case "item":
          return reward.data.item?.name || "Unknown Item";
        case "coins":
          return `+${reward.data.amount} coins`;
        case "experience":
          return `+${reward.data.amount} experience`;
        case "skill":
          return `+${reward.data.amount} ${reward.data.skill}`;
        default:
          return "Unknown Reward";
      }
    });
    quest.rewards.forEach(claimReward);
    showGameToast({
      icon: "🎁",
      title: "Rewards Claimed!",
      description: `You received: ${rewardDescriptions.join(", ")}`,
      border_color: "border-green-500",
      text_color: "text-green-400",
      progressClass_color: "!bg-green-500",
    });
  };

  // --- Store Logic ---
  function buyItem(item) {
    if (user.coins < item.price) {
      showGameToast({
        icon: "❌",
        title: "Purchase Failed",
        description: "Not enough coins to buy this item.",
        border_color: "border-red-500",
        text_color: "text-red-500",
        progressClass_color: "!bg-red-700",
      });
      return;
    }

    updateCoins(-item.price);

    const newItem = new Item(
      { ...item, id: Date.now() + Math.floor(Math.random() * 1e6) },
      item.onClaim
    );

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
  }

  // --- Level Up Toasts ---
  // --- Efficient Level Up Toasts ---
  const prevStats = useRef({
    skillLevels: user.stats.map(stat => stat.level),
    userLevel: user.level,
    userHealth: user.health,
  });

  useEffect(() => {
    // Skill level up toasts
    user.stats.forEach((stat, idx) => {
      const prevLevel = prevStats.current.skillLevels[idx];
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

    // User level up toast
    if (user.level > prevStats.current.userLevel) {
      showGameToast({
        icon: "🎉",
        title: "Level Up!",
        description: `You've reached Level ${user.level}!`,
        border_color: "border-blue-500",
        text_color: "text-blue-400",
        progressClass_color: "!bg-blue-500",
      });
    }

    // Health change toast
    if (user.health !== prevStats.current.userHealth) {
      if (user.health > prevStats.current.userHealth) {
        showGameToast({
          icon: "❤️",
          title: "Health Restored!",
          description: `Your health increased to ${user.health}.`,
          border_color: "border-red-500",
          text_color: "text-red-500",
          progressClass_color: "!bg-red-700",
        });
      } else {
        showGameToast({
          icon: "💔",
          title: "Health Decreased!",
          description: `Your health dropped to ${user.health}.`,
          border_color: "border-red-700",
          text_color: "text-red-600",
          progressClass_color: "!bg-red-700",
        });
      }
    }

    // Update refs in one place
    prevStats.current = {
      skillLevels: user.stats.map(stat => stat.level),
      userLevel: user.level,
      userHealth: user.health,
    };
  }, [user.stats, user.level, user.health]);

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