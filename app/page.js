'use client'
import Image from "next/image";
import Navbar from "./components/Navbar";
import { useState } from "react";

export default function Home() {

  const [screen, setScreen] = useState("home");
  const [coins,setCoins] = useState(3000);
  const [user, setUser] = useState({
    name: "User Name",
    profilePic: "/jinwoo-solo-leveling.webp",
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
    

   

   </div>
  );
}
