'use client'
import Image from "next/image";
import Navbar from "./components/Navbar";
import { useState } from "react";

export default function Home() {

  const [screen, setScreen] = useState("home");

  return (
   <div>
    <Navbar 
    screen={screen}
    setScreen={setScreen}
    />
    <div className="w-3xl h-5 bg-amber-500"
    ></div>

   </div>
  );
}
