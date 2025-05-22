'use client'
import Image from "next/image";
import Navbar from "./components/Navbar";
import Dashboard from "./components/home_page/Dashboard";
import QuestPage from "./components/quest_page/QuestPage";

import Reward from "./components/Reward";
import { useState } from "react";


export default function Home() {

  const [screen, setScreen] = useState("Quests");
  const [coins,setCoins] = useState(3000);
  const [user, setUser] = useState({
    name: "User Name",
    profilePic: "/jinwoo-solo-leveling.webp",
    level: 1,
    exp: 50,
    health: 100,
    coins: 3000,
    job: "Hunter",
    stats: [
      { skill: "strength", level: 1, value: 50 },
      { skill: "agility", level: 1, value: 40 },
      { skill: "intelligence", level: 1, value: 60 },
      { skill: "Skill", level: 1, value: 70 },
      { skill: "stamina", level: 1, value: 80 },
      { skill: "luck", level: 1, value: 30 }
    ],
    about:"Commit2Hab1t is a power ul habit-tracking app designed to help you stay on top o your goals. It combines task tracking, data analysis, and Al-enerated reports to provide deep insights into your habits and performance. The app is inspired by the 'Solo -Leveling' system, where users gain points and level up by completing tasks.",
    stregth: "decipline",
    weakness: "procrastination",
    masterObjective: "doing nothing",
    minorObjective: "doing nothing",
    
  });

  const [quests, setQuests] = useState([
    {
      id: 1,
      image: "/images.jpeg",
      name: "Quest 1",
      description: "just complete the quest page today itself, as it is important and need to compelete today",
      priority: "Low",
      status: "In Progress",
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
          completed: false,
          reward: new Reward("experience", { amount: 50 }),
        },
      ],
    },
    {
      id: 2,
      image: "/images.jpeg",
      name: "Quest 2",
      description: "just complete the quest page today itself, as it is important and need to compelete today",
      priority: "Medium",
      status: "Not Started",
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
  ])

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
    <div className="flex flex-col items-center justify-center h-screen mt-24">
      {screen === "Home" && <Dashboard user={user} />}
      {screen === "Store" && <h1 className="text-4xl font-bold mb-4">Store Page</h1>}
      {screen === "Quests" && <h1 className=" mb-4"><QuestPage quests={quests}/></h1>}
      {screen === "Habits" && <h1 className="text-4xl font-bold mb-4">Habits Page</h1>}
      {screen === "Settings" && <h1 className="text-4xl font-bold mb-4">Settings Page</h1>}
      </div>
    

   

   </div>
  );
}
