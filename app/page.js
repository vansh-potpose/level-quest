'use client'
import Image from "next/image";
import Navbar from "./components/Navbar";
import Dashboard from "./components/home_page/Dashboard";
import QuestPage from "./components/quest_page/QuestPage";

import Reward from "./components/Reward";
import Item from "./components/Item";
import { useEffect, useState } from "react";
import StorePage from "./components/store_page/StorePage";


export default function Home() {

  // Update experience

  const claimItems = (attribute_name, amount) => {
    console.log(`cosole comment 1 Claiming item with attribute: ${attribute_name}, amount: ${amount}`);
    switch (attribute_name) {
      case "health": updateHealth(amount); break;
      case "coins": updateCoins(amount); break;
      case "experience": updateExp(amount); break;
      default: updateSkill(attribute_name, amount);
    }

  };

  const claimObjects = (message) => {
    console.log(`Claiming object: ${message}`);
    alert(message);
  }


  const [screen, setScreen] = useState("Store");
  const baseHealth = 100; // Base health for level 1
  const baseXP = 100; // Base experience for level 1
  const [coins, setCoins] = useState(30000);
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
    about: "Commit2Hab1t is a power ul habit-tracking app designed to help you stay on top o your goals. It combines task tracking, data analysis, and Al-enerated reports to provide deep insights into your habits and performance. The app is inspired by the 'Solo -Leveling' system, where users gain points and level up by completing tasks.",
    stregth: "decipline",
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



  const getMaxExpForLevel = (level) => {

    return Math.floor(baseXP * level ** 1.5); // adjust as you want
  };

  const getMaxHealthForLevel = (level) => {

    return Math.floor(baseHealth * 1.05 ** level); // adjust as you want
  };

  // Update coins
  const updateCoins = (amount) => {
    setUser(prev => ({
      ...prev,
      coins: prev.coins + amount
    }));
    setCoins(prev => prev + amount);
  };

  // Update health
  const updateHealth = (amount) => {
    setUser(prev => {
      const maxHealth = getMaxHealthForLevel(prev.level);
      const newHealth = Math.max(0, Math.min(prev.health + amount, maxHealth));
      return {
        ...prev,
        health: newHealth
      };
    });
  };

  // Update skill points (by skill name)
  // Function to get max points for a skill at a given level
  const getMaxSkillPoints = (level) => {
    // Example: max points increases by 50 per level, starting at 100
    return Math.floor(baseXP * level ** 1.5);
  };

  const updateSkill = (skillName, amount) => {
    setUser(prev => ({
      ...prev,
      stats: prev.stats.map(stat => {
        if (stat.skill === skillName) {
          let newValue = stat.value + amount;
          let newLevel = stat.level;
          let maxPoints = getMaxSkillPoints(stat.level);

          // Level up skill while value exceeds max points
          while (newValue >= maxPoints) {
            newValue -= maxPoints;
            newLevel += 1;
            maxPoints = getMaxSkillPoints(newLevel);
          }
          newValue = stat.value + amount;; // Ensure value doesn't go negative

          return { ...stat, value: newValue, level: newLevel };
        }
        return stat;
      })
    }));
  };

  const updateExp = (amount) => {
    setUser(prev => {
      let newExp = prev.exp + amount;
      let newLevel = prev.level;
      const maxExp = getMaxExpForLevel(newLevel);

      // Level up while experience exceeds max required exp
      while (newExp >= maxExp) {
        newExp -= maxExp;
        newLevel += 1;
      }

      console.log(`Experience updated: +${amount}. New total: ${newExp}, Level: ${newLevel}`);

      return {
        ...prev,
        exp: newExp,
        level: newLevel,
      };
    });
  };


  const [quests, setQuests] = useState([
    {
      id: 1,
      image: "/images.jpeg",
      name: "Quest 1",
      endDate: new Date().toISOString(),
      description: "just complete the quest page today itself, as it is important and need to compelete today",
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
          reward: new Reward("coins", { amount: 100 }),
        },
        {
          id: 2,
          name: "Sub-quest 2",
          completed: true,
          reward: new Reward("experience", { amount: 50 }),
        },
      ],
    },
    {
      id: 2,
      image: "/images.jpeg",
      name: "Quest 2",
      endDate: new Date().toISOString(),
      description: "just complete the quest page today itself, as it is important and need to compelete today",
      priority: "Medium",
      status: "Active",
      rewards: [
        new Reward("coins", { amount: 500 }),
        new Reward("experience", { amount: 300 }),
        new Reward("skill", { skill: "strength", amount: 5 }),
        new Reward("item", { item: "Health Potion" }),
      ],
      sub_quests: [
        {
          id: 1,
          name: "Sub-quest 1",
          completed: false,
          reward: new Reward("skill", { skill: "intelligence", amount: 10 }),
        },
      ],
    },
    {
      id: 3,
      image: "/images.jpeg",
      name: "Quest 3",
      endDate: new Date().toISOString(),
      description: "just complete the quest page today itself, as it is important and need to compelete today",
      priority: "High",
      status: "Completed",
      rewards: [
        new Reward("coins", { amount: 2000 }),
        new Reward("experience", { amount: 1000 }),
        new Reward("item", { item: "Sword" }),
      ],
      sub_quests: [
        {
          id: 1,
          name: "Sub-quest 1",
          completed: true,
          reward: new Reward("item", { item: "Running Shoes" }),
        },
      ],
    },
    // Example Quest 4
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
          reward: new Reward("experience", { amount: 100 }),
        },
        {
          id: 2,
          name: "Read 25 more pages",
          completed: false,
          reward: new Reward("experience", { amount: 100 }),
        },
      ],
    },
    // Example Quest 5
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
        new Reward("item", { item: "Coffee Mug" }),
      ],
      sub_quests: [
        {
          id: 1,
          name: "Day 1 Routine",
          completed: false,
          reward: new Reward("coins", { amount: 400 }),
        },
        {
          id: 2,
          name: "Day 2 Routine",
          completed: false,
          reward: new Reward("coins", { amount: 400 }),
        },
      ],
    },
    // Example Quest 6
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
          reward: new Reward("experience", { amount: 200 }),
        },
        {
          id: 2,
          name: "Day 2 Workout",
          completed: false,
          reward: new Reward("experience", { amount: 200 }),
        },
        {
          id: 3,
          name: "Day 3 Workout",
          completed: false,
          reward: new Reward("experience", { amount: 200 }),
        },
      ],
    },
    // Example Quest 7
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
          reward: new Reward("experience", { amount: 75 }),
        },
        {
          id: 2,
          name: "Another 30 minutes coding",
          completed: false,
          reward: new Reward("experience", { amount: 75 }),
        },
      ],
    },
  ])




  const buyItem = (item) => {
    if (user.coins >= item.price) {
      updateCoins(-item.price);
      // Ensure unique id for the new item using timestamp and random
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
  };










  const [StoreItems, setStoreItems] = useState([
    new Item({
      id: 1,
      name: "Shadow Fight Game",
      price: 300,
      description: "Epic battles and martial arts.",
      image: "/image_b.jpg",
      type: "Object",
      amount: 1,
      claimed: false,
      attribute_name: "agility",
    }, claimObjects),
    new Item({
      id: 2,
      name: "Playing Mobile Game",
      price: 300,
      description: "Immersive gaming experience.",
      image: "/images.jpeg",
      type: "Object",
      amount: 1,
      claimed: false,
      attribute_name: "intelligence",
    }, claimObjects),
    new Item({
      id: 3,
      name: "Gali Cricket",
      price: 300,
      description: "Play with friends in streets.",
      image: "/images.jpeg",
      type: "Object",
      amount: 1,
      claimed: false,
      attribute_name: "strength",
    }, claimObjects),
    new Item({
      id: 4,
      name: "Casio MTP 1183",
      price: 1000,
      description: "Stylish wristwatch with leather strap.",
      image: "/images.jpeg",
      type: "Object",
      amount: 1,
      claimed: false,
      attribute_name: "luck",
    }, claimObjects),
    new Item({
      id: 5,
      name: "Chatting With Her",
      price: 500,
      description: "Romantic texting session.",
      image: "/images.jpeg",
      type: "Object",
      amount: 1,
      claimed: false,
      attribute_name: "health",
    }, claimObjects),
    new Item({
      id: 6,
      name: "Butter Scotch Ice Cream",
      price: 300,
      description: "Delicious frozen dessert.",
      image: "/images.jpeg",
      type: "Object",
      amount: 1,
      claimed: false,
      attribute_name: "health",
    }, claimObjects),
    new Item({
      id: 7,
      name: "Meeting Her",
      price: 1500,
      description: "Calling her and asking her to meet, you both can talk, walk, dance, etc.",
      image: "/images.jpeg",
      type: "Object",
      amount: 1,
      claimed: false,
      attribute_name: "stamina",
    }, claimObjects),
    new Item({
      id: 8,
      name: "Magical Sword",
      price: 5000,
      description: "A sword that glows with magical energy.",
      image: "/images.jpeg",
      type: "Magical Item",
      amount: 60,
      claimed: false,
      attribute_name: "strength",
    }, claimItems),
    new Item({
      id: 9,
      name: "Enchanted Shield",
      price: 4000,
      description: "A shield that protects against dark magic.",
      image: "/images.jpeg",
      type: "Magical Item",
      amount: 1,
      claimed: false,
      attribute_name: "health",
    }, claimItems),
    new Item({
      id: 10,
      name: "Mystic Amulet",
      price: 6000,
      description: "An amulet that grants the wearer special powers.",
      image: "/images.jpeg",
      type: "Magical Item",
      amount: 1,
      claimed: false,
      attribute_name: "experience",
    }, claimItems),
  ]);


  return (
    <div>
      <div className="fixed top-0 left-0 w-full z-50">
        <Navbar
          screen={screen}
          setScreen={setScreen}
          coins={coins}
          user={user}
        />
      </div>
      <div className="flex flex-col items-center justify-center  mt-24">
        {screen === "Home" && <Dashboard
          user={user}
          getMaxHealthForLevel={getMaxHealthForLevel}
          getMaxExpForLevel={getMaxExpForLevel}
          getMaxSkillPoints={getMaxSkillPoints}
        />}
        {screen === "Store" && <StorePage StoreItems={StoreItems} buyItem={buyItem} />}
        {screen === "Quests" && <h1 className=" mb-4"><QuestPage quests={quests} setQuests={setQuests} /></h1>}
        {screen === "Habits" && <h1 className="text-4xl font-bold mb-4">Habits Page</h1>}
        {screen === "Settings" && <h1 className="text-4xl font-bold mb-4">Settings Page</h1>}
      </div>




    </div>
  );
}
