'use client'

import React, { useState } from "react";
import CreateQuest from "./CreateQuest";
import Reward from "../Reward";
import Item from "../Item";
import CreateItem from "./CreateItem";
export default function WorkshopPage({user,StoreItems,setStoreItems,setQuests , claimObjects, claimItems}) {
    // Example initial quest data (can be replaced with real data later)
    const [tempQuest, setTempQuest] = useState({
        id: 10,
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
                claim: false,
                rewards: [
                 ]
            },
            {
                id: 2,
                name: "Sub-quest 2",
                completed: false,
                claim: false,
                rewards: [
                 
                ],
            },
        ],
    
    });

    const [item, setItem] = useState({ 
        id: 50,
        name: "Shadow Fight Game", 
        price: 300, 
        description: "Epic battles and martial arts.", 
        image: "/image_b.jpg", 
        type: "Object", 
        amount: 0, 
        claimed: false, 
        attribute_name: "none" 
    });

    const addItemToStore = (item) => {
        let newItem;
        if (item.type === "Magical Item") {
            newItem = new Item({
                
                ...item},claimItems
            );
        } else if (item.type === "Object") {
            newItem = new Item({
                
                ...item},claimObjects
            );
        }
        setStoreItems(prev => [...prev, newItem]);
        console.log("Item added to store:", JSON.stringify(StoreItems, null, 2));
    }
    const addQuest = (quest) => {
        setQuests(prev => [...prev, quest]);
    }
    function ItemsTab() {
        return (
            <div className="p-6">
                <h2 className="text-2xl font-semibold mb-2">Items</h2>
                <p>Here are your items.</p>
            </div>
        );
    }

    const tabs = [
        { name: "Quests", component: <CreateQuest tempQuest={tempQuest} setTempQuest={setTempQuest} StoreItems={StoreItems} skills={user.stats}  addQuest={addQuest} /> },
        { name: "Items", component: <CreateItem addItemToStore={addItemToStore}  item={item} setItem={setItem} skills={user.stats} /> },
    ];

    const [activeTab, setTab] = useState(0);

    function setActiveTab(idx) {
        setTab(idx);
    }

    return (
        <div className="flex flex-col items-center w-full text-white">
           
            <div className="w-full px-10">
                <div className="flex max-w-md mx-auto mb-4 gap-2">
                    {tabs.map((tab, idx) => (
                        <button
                            key={tab.name}
                            onClick={() => setActiveTab(idx)}
                            className={`flex-1 py-2 px-4 rounded-t transition-colors duration-200 ${
                                activeTab === idx
                                    ? "bg-blue-600 text-white shadow-lg scale-105"
                                    : "bg-gray-800 text-gray-400 hover:bg-gray-700"
                            }`}
                            style={{
                                transition: "all 0.25s cubic-bezier(0.4,0,0.2,1)",
                            }}
                        >
                            {tab.name}
                        </button>
                    ))}
                </div>
                <div className="relative">
                    {tabs.map((tab, idx) => (
                        <div
                            key={tab.name}
                            className={`absolute inset-0 transition-all duration-500 ${
                                activeTab === idx
                                    ? "opacity-100 z-10 translate-y-0 scale-100"
                                    : "opacity-0 z-0 pointer-events-none translate-y-8 scale-95"
                            }`}
                            style={{
                                transition: "all 0.5s cubic-bezier(0.4,0,0.2,1)",
                            }}
                        >
                            {tab.component}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}