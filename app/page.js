'use client'
import Image from "next/image";
import Navbar from "./components/Navbar";
import Dashboard from "./components/home_page/Dashboard";
import { useState } from "react";

export default function Home() {

  const [screen, setScreen] = useState("home");
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
      { name: "strength 1", level: 1, progress: 0 },
      { name: "agility 2", level: 1, progress: 0 },
      { name: "intelligence 3", level: 1, progress: 0 },
      { name: "Skill 4", level: 1, progress: 0 },
      { name: "stamina 5", level: 1, progress: 0 },
      { name: "luck 6", level: 1, progress: 0 }
    ],
    about:"Commit2Hab1t is a power ul habit-tracking app designed to help you stay on top o your goals. It combines task tracking, data analysis, and Al-enerated reports to provide deep insights into your habits and performance. The app is inspired by the 'Solo -Leveling' system, where users gain points and level up by completing tasks.",
    stregth: "decipline",
    weakness: "procrastination",
    masterObjective: "doing nothing",
    minorObjective: "doing nothing",
    
  });

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
    <div className="flex flex-col items-center justify-center h-screen mt-40">
      {screen === "home" && <Dashboard user={user} />}
      {screen === "profile" && <h1 className="text-4xl font-bold mb-4">Profile Page</h1>}
      {screen === "store" && <h1 className="text-4xl font-bold mb-4">Store Page</h1>}
      {screen === "quests" && <h1 className="text-4xl font-bold mb-4">Quests Page</h1>}
      {screen === "habits" && <h1 className="text-4xl font-bold mb-4">Habits Page</h1>}
      {screen === "settings" && <h1 className="text-4xl font-bold mb-4">Settings Page</h1>}
      </div>
    

   

   </div>
  );
}
