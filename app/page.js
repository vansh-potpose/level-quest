'use client'
import Image from "next/image";
import Navbar from "./components/Navbar";
import Dashboard from "./components/home_page/Dashboard";
import QuestPage from "./components/quest_page/QuestPage";
import { showGameToast } from "./components/ShowGameToast";
import Reward from "./components/Reward";
import Item from "./components/Item";
import { useEffect, useState, useRef } from "react";
import StorePage from "./components/store_page/StorePage";

export default function Home() {
  // --- Constants ---
  const BASE_HEALTH = 100;
  const BASE_XP = 100;

  // --- State ---
  const [screen, setScreen] = useState("Store");
  const [user, setUser] = useState({
    name: "User Name",
    profilePic: "/jinwoo-solo-leveling.webp",
    level: 1,
    exp: 50,
    health: 100,
    coins: 30000,
    job: "Hunter",
    stats: [
      { skill: "strength", level: 1, value: 50 },
      { skill: "agility", level: 1, value: 40 },
      { skill: "intelligence", level: 1, value: 60 },
      { skill: "Skill", level: 1, value: 70 },
      { skill: "stamina", level: 1, value: 80 },
      { skill: "luck", level: 1, value: 30 }
    ],
    about: "Commit2Hab1t is a powerful habit-tracking app designed to help you stay on top of your goals. It combines task tracking, data analysis, and AI-generated reports to provide deep insights into your habits and performance. The app is inspired by the 'Solo-Leveling' system, where users gain points and level up by completing tasks.",
    stregth: "discipline",
    weakness: "procrastination",
    masterObjective: "doing nothing",
    minorObjective: "doing nothing",
    inventory: [
      new Item({
        id: 19,
        name: "Health Potion",
        price: 100,
        description: "Restores 50 health points.",
        image: "/images.jpeg",
        type: "Magical Item",
        amount: 50,
        claimed: false,
        attribute_name: "health",
      }, claimItems),
      new Item({
        id: 20,
        name: "Mana Potion",
        price: 150,
        description: "Restores 30 mana points.",
        image: "/images.jpeg",
        type: "Magical Item",
        amount: 50,
        claimed: false,
        attribute_name: "experience",
      }, claimItems),
    ]
  });
  const [coins, setCoins] = useState(user.coins || 0);

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
          newValue=stat.value + amount;
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
  }



  function claimObjects(message) {
    alert(message);
  }


  function addToInventory(item) {
    setUser(prev => ({
      ...prev,
      inventory: [...prev.inventory, item],
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
    quest.rewards.forEach(reward => {
      claimReward(reward);
    });
    setQuests(prev => prev.map(q => q.id === quest.id ? { ...q, status: "Completed" } : q));
    showGameToast({
      icon: "🏆" ,
      title: "Quest Completed!",
      description: `You completed the quest: ${quest.name}`,
      border_color: "border-yellow-500",
      text_color: "text-yellow-400",
      progressClass_color: "!bg-yellow-500",
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
      alert(`You bought: ${item.name}`);
    } else {
      alert("Not enough coins to buy this item.");
    }
  }

  // --- Store Items ---
  const [StoreItems] = useState([
    new Item({ id: 1, name: "Shadow Fight Game", price: 300, description: "Epic battles and martial arts.", image: "/image_b.jpg", type: "Object", amount: 1, claimed: false, attribute_name: "agility" }, claimObjects),
    new Item({ id: 2, name: "Playing Mobile Game", price: 300, description: "Immersive gaming experience.", image: "/images.jpeg", type: "Object", amount: 1, claimed: false, attribute_name: "intelligence" }, claimObjects),
    new Item({ id: 3, name: "Gali Cricket", price: 300, description: "Play with friends in streets.", image: "/images.jpeg", type: "Object", amount: 1, claimed: false, attribute_name: "strength" }, claimObjects),
    new Item({ id: 4, name: "Casio MTP 1183", price: 1000, description: "Stylish wristwatch with leather strap.", image: "/images.jpeg", type: "Object", amount: 1, claimed: false, attribute_name: "luck" }, claimObjects),
    new Item({ id: 5, name: "Chatting With Her", price: 500, description: "Romantic texting session.", image: "/images.jpeg", type: "Object", amount: 1, claimed: false, attribute_name: "health" }, claimObjects),
    new Item({ id: 6, name: "Butter Scotch Ice Cream", price: 300, description: "Delicious frozen dessert.", image: "/images.jpeg", type: "Object", amount: 1, claimed: false, attribute_name: "health" }, claimObjects),
    new Item({ id: 7, name: "Meeting Her", price: 1500, description: "Calling her and asking her to meet, you both can talk, walk, dance, etc.", image: "/images.jpeg", type: "Object", amount: 1, claimed: false, attribute_name: "stamina" }, claimObjects),
    new Item({ id: 8, name: "Magical Sword", price: 5000, description: "A sword that glows with magical energy.", image: "/images.jpeg", type: "Magical Item", amount: 60, claimed: false, attribute_name: "strength" }, claimItems),
    new Item({ id: 9, name: "Enchanted Shield", price: 4000, description: "A shield that protects against dark magic.", image: "/images.jpeg", type: "Magical Item", amount: 1, claimed: false, attribute_name: "health" }, claimItems),
    new Item({ id: 10, name: "Mystic Amulet", price: 6000, description: "An amulet that grants the wearer special powers.", image: "/images.jpeg", type: "Magical Item", amount: 1, claimed: false, attribute_name: "experience" }, claimItems),
  ]);

  // --- Quests ---
  const [quests, setQuests] = useState([
    {
      id: 1,
      image: "/images.jpeg",
      name: "Quest 1",
      endDate: new Date().toISOString(),
      description: "Just complete the quest page today itself, as it is important and needs to be completed today",
      priority: "Low",
      status: "Active",
      rewards: [
        new Reward("coins", { amount: 1000 }),
        new Reward("experience", { amount: 500 }),
      ],
      sub_quests: [
        {
          id: 1,
          name: "Sub-quest 1",
          completed: false,
          rewards: [
            new Reward("coins", { amount: Math.floor(1000 * 0.05) }),
            new Reward("experience", { amount: Math.floor(500 * 0.05) }),
          ],
        },
        {
          id: 2,
          name: "Sub-quest 2",
          completed: true,
          rewards: [
            new Reward("coins", { amount: Math.floor(1000 * 0.05) }),
            new Reward("experience", { amount: Math.floor(500 * 0.05) }),
          ],
        },
      ],
    },
    {
      id: 2,
      image: "/images.jpeg",
      name: "Quest 2",
      endDate: new Date().toISOString(),
      description: "Just complete the quest page today itself, as it is important and needs to be completed today",
      priority: "Medium",
      status: "Active",
      rewards: [
        new Reward("coins", { amount: 500 }),
        new Reward("experience", { amount: 300 }),
        new Reward("skill", { skill: "strength", amount: 5 }),
        new Reward("item", { item: new Item({ id: 101, name: "Health Potion", price: 100, description: "Restores 50 health points.", image: "/images.jpeg", type: "Magical Item", amount: 50, claimed: false, attribute_name: "health" }, claimItems) }),
      ],
      sub_quests: [
        {
          id: 1,
          name: "Sub-quest 1",
          completed: false,
          rewards: [
            new Reward("coins", { amount: Math.floor(500 * 0.05) }),
            new Reward("experience", { amount: Math.floor(300 * 0.05) }),
          ],
        },
        {
          id: 2,
          name: "Sub-quest 2",
          completed: false,
          rewards: [
            new Reward("coins", { amount: Math.floor(500 * 0.05) }),
            new Reward("experience", { amount: Math.floor(300 * 0.05) }),
          ],
        },
      ],
    },
    {
      id: 3,
      image: "/images.jpeg",
      name: "Quest 3",
      endDate: new Date().toISOString(),
      description: "Just complete the quest page today itself, as it is important and needs to be completed today",
      priority: "High",
      status: "Completed",
      rewards: [
        new Reward("coins", { amount: 2000 }),
        new Reward("experience", { amount: 1000 }),
        new Reward("item", { item: new Item({ id: 102, name: "Sword", price: 2000, description: "A sharp blade for battle.", image: "/images.jpeg", type: "Weapon", amount: 1, claimed: false, attribute_name: "strength" }, claimItems) }),
      ],
      sub_quests: [
        {
          id: 1,
          name: "Sub-quest 1",
          completed: true,
          rewards: [
            new Reward("coins", { amount: Math.floor(2000 * 0.05) }),
            new Reward("experience", { amount: Math.floor(1000 * 0.05) }),
          ],
        },
        {
          id: 2,
          name: "Sub-quest 2",
          completed: false,
          rewards: [
            new Reward("coins", { amount: Math.floor(2000 * 0.05) }),
            new Reward("experience", { amount: Math.floor(1000 * 0.05) }),
          ],
        },
      ],
    },
    {
      id: 4,
      image: "/quest4.png",
      name: "Read a Book",
      endDate: new Date(Date.now() + 86400000).toISOString(),
      description: "Finish reading at least 50 pages of a new book.",
      priority: "Medium",
      status: "Active",
      rewards: [
        new Reward("experience", { amount: 200 }),
        new Reward("skill", { skill: "intelligence", amount: 3 }),
      ],
      sub_quests: [
        {
          id: 1,
          name: "Read 25 pages",
          completed: true,
          rewards: [
            new Reward("coins", { amount: 0 }),
            new Reward("experience", { amount: Math.floor(200 * 0.05) }),
          ],
        },
        {
          id: 2,
          name: "Read 25 more pages",
          completed: false,
          rewards: [
            new Reward("coins", { amount: 0 }),
            new Reward("experience", { amount: Math.floor(200 * 0.05) }),
          ],
        },
      ],
    },
    {
      id: 5,
      image: "/quest5.png",
      name: "Morning Routine",
      endDate: new Date(Date.now() + 2 * 86400000).toISOString(),
      description: "Complete your morning routine for two consecutive days.",
      priority: "High",
      status: "Active",
      rewards: [
        new Reward("coins", { amount: 800 }),
        new Reward("item", { item: new Item({ id: 104, name: "Coffee Mug", price: 200, description: "A mug to start your day.", image: "/images.jpeg", type: "Object", amount: 1, claimed: false, attribute_name: "none" }, claimItems) }),
      ],
      sub_quests: [
        {
          id: 1,
          name: "Day 1 Routine",
          completed: false,
          rewards: [
            new Reward("coins", { amount: Math.floor(800 * 0.05) }),
            new Reward("experience", { amount: 0 }),
          ],
        },
        {
          id: 2,
          name: "Day 2 Routine",
          completed: false,
          rewards: [
            new Reward("coins", { amount: Math.floor(800 * 0.05) }),
            new Reward("experience", { amount: 0 }),
          ],
        },
      ],
    },
    {
      id: 6,
      image: "/quest6.png",
      name: "Workout Challenge",
      endDate: new Date(Date.now() + 3 * 86400000).toISOString(),
      description: "Complete a 30-minute workout for three days.",
      priority: "High",
      status: "Active",
      rewards: [
        new Reward("experience", { amount: 600 }),
        new Reward("skill", { skill: "strength", amount: 10 }),
      ],
      sub_quests: [
        {
          id: 1,
          name: "Day 1 Workout",
          completed: true,
          rewards: [
            new Reward("coins", { amount: 0 }),
            new Reward("experience", { amount: Math.floor(600 * 0.05) }),
          ],
        },
        {
          id: 2,
          name: "Day 2 Workout",
          completed: false,
          rewards: [
            new Reward("coins", { amount: 0 }),
            new Reward("experience", { amount: Math.floor(600 * 0.05) }),
          ],
        },
        {
          id: 3,
          name: "Day 3 Workout",
          completed: false,
          rewards: [
            new Reward("coins", { amount: 0 }),
            new Reward("experience", { amount: Math.floor(600 * 0.05) }),
          ],
        },
      ],
    },
    {
      id: 7,
      image: "/quest7.png",
      name: "Code for 1 Hour",
      endDate: new Date(Date.now() + 3600000).toISOString(),
      description: "Spend at least 1 hour coding today.",
      priority: "Low",
      status: "Active",
      rewards: [
        new Reward("coins", { amount: 300 }),
        new Reward("experience", { amount: 150 }),
      ],
      sub_quests: [
        {
          id: 1,
          name: "30 minutes coding",
          completed: false,
          rewards: [
            new Reward("coins", { amount: Math.floor(300 * 0.05) }),
            new Reward("experience", { amount: Math.floor(150 * 0.05) }),
          ],
        },
        {
          id: 2,
          name: "Another 30 minutes coding",
          completed: false,
          rewards: [
            new Reward("coins", { amount: Math.floor(300 * 0.05) }),
            new Reward("experience", { amount: Math.floor(150 * 0.05) }),
          ],
        },
      ],
    },
  ]);

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

  // --- Render ---
  return (
    <div>
      <div className="fixed top-0 left-0 w-full z-50 ">
        <Navbar
          screen={screen}
          setScreen={setScreen}
          coins={coins}
          user={user}
        />
      </div>
      <div className="flex flex-col items-center justify-center mt-24">
        {screen === "Home" && (
          <Dashboard
            user={user}
            getMaxHealthForLevel={getMaxHealthForLevel}
            getMaxExpForLevel={getMaxExpForLevel}
            getMaxSkillPoints={getMaxSkillPoints}
          />
        )}
        {screen === "Store" && (
          <StorePage StoreItems={StoreItems} buyItem={buyItem} />
        )}
        {screen === "Quests" && (
          <QuestPage quests={quests} setQuests={setQuests} />
        )}
        {screen === "Habits" && (
          <h1 className="text-4xl font-bold mb-4">Habits Page</h1>
        )}
        {screen === "Settings" && (
          <h1 className="text-4xl font-bold mb-4">Settings Page</h1>
        )}
      </div>
    </div>
  );
}
