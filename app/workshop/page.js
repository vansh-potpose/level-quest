'use client'

import React, { useState, useEffect } from "react";
import CreateQuest from "./CreateQuest";
import Reward from "../components/Reward";
import Item from "../components/Item";
import CreateItem from "./CreateItem";
import { showGameToast } from "../components/ShowGameToast";
import { useGame } from "../context/GameContext"; // Import context
import { useRouter, useSearchParams } from "next/navigation";
 
export default function WorkshopPage() {
    // Use context for all shared state/functions
    const {
        user,
        StoreItems,
        setStoreItems,
        setQuests,
        claimObjects,
        claimItems,
        quests,
        editingItem,
        editingQuest,
        setEditingQuest,
        setEditingItem,
        updateCoins,
    } = useGame();
    const router = useRouter();
    const searchParams = useSearchParams();

    // Fallback quest if not editing
    const defaultQuest = {
        id: Date.now(),
        image: "/images.jpeg",
        name: "Quest title",
        endDate: new Date().toISOString(),
        description: "This is a sample quest description. Complete tasks to earn rewards.",
        priority: "Low",
        status: "Active",
        rewards: [
            new Reward("coins", { amount: 1000 }),
            new Reward("experience", { amount: 500 }),
        ],
        sub_quests: [
            { id: 1, name: "Sub-quest 1", completed: false, claim: false, rewards: [] },
            { id: 2, name: "Sub-quest 2", completed: false, claim: false, rewards: [] },
        ],
    };

    const defaultItem = {
        id: Date.now(),
        name: "Shadow Fight Game",
        price: 300,
        description: "Epic battles and martial arts.",
        image: "/image_b.jpg",
        type: "Object",
        amount: 0,
        claimed: false,
        attribute_name: "none",
    };

    // --- Sync context editing state with URL ---
    useEffect(() => {
        const editQuestId = searchParams.get("editQuest");
        const editItemId = searchParams.get("editItem");
        if (editQuestId) {
            const quest = quests.find(q => String(q.id) === String(editQuestId));
            setEditingQuest(quest || null);
            setEditingItem(null);
        } else if (editItemId) {
            const item = StoreItems.find(i => String(i.id) === String(editItemId));
            setEditingItem(item || null);
            setEditingQuest(null);
        } else {
            setEditingQuest(null);
            setEditingItem(null);
        }
    }, [searchParams, quests, StoreItems, setEditingQuest, setEditingItem]);

    // --- Form state, always sync with context editing state ---
    const [tempQuest, setTempQuest] = useState(editingQuest || defaultQuest);
    const [itemState, setItem] = useState(editingItem || defaultItem);
    const [activeTab, setTab] = useState(0);

    // When editingQuest or editingItem changes, update form state
    useEffect(() => {
        if (editingQuest) {
            setTempQuest(editingQuest);
            setTab(0);
        } else if (editingItem) {
            setItem(editingItem);
            setTab(1);
        } else {
            setTempQuest({ ...defaultQuest, id: Date.now() });
            setItem({ ...defaultItem, id: Date.now() });
        }
    }, [editingQuest, editingItem]);

    function calculateEffectCost(effects = []) {
        let totalCost = 0;
        for (let effect of effects) {
            if (effect.type === "health") {
                totalCost += effect.amount * 5;
            } else if (effect.type === "experience") {
                totalCost += effect.amount * 2;
            } else if (effect.type === "skill") {
                totalCost += effect.amount * 2;
            } else if (effect.type === "coins") {
                totalCost += effect.amount * 0.5;
            } else if (effect.type === "item") {
                totalCost += effect.amount * 0.5;
            }
        }
        return Math.max(20, totalCost);
    }

    // Auto-switch tab based on incoming edit data
    useEffect(() => {
        if (editingQuest) setTab(0);
        if (editingItem) setTab(1);
    }, [editingQuest, editingItem]);

    const addItemToStore = (newItem, cost) => {
        const wrappedItem =
            newItem.type === "Magical Item"
                ? new Item({ ...newItem }, claimItems)
                : new Item({ ...newItem }, claimObjects);

        setStoreItems(prev => {
            if (editingItem) {
                return prev.map(i => i.id === editingItem.id ? wrappedItem : i);
            } else {
                return [...prev, wrappedItem];
            }
        });
        updateCoins(-cost);
        const message = editingItem
            ? "Item updated successfully!"
            : "Item added to store successfully!";
        showGameToast({
            icon: "🎉",
            title: editingItem ? "Item Updated!" : "Item Added!",
            description: message,
            border_color: "border-blue-500",
            text_color: "text-blue-400",
            progressClass_color: "!bg-blue-500",
        });
        setEditingItem(null);
        // Remove editItem param from URL
        const params = new URLSearchParams(searchParams.toString());
        params.delete("editItem");
        router.replace(`/workshop${params.toString() ? `?${params}` : ""}`);
    };

    const addQuest = (newQuest, cost) => {
        const coinsReward = newQuest.rewards.find(r => r.type === "coins");
        const questCoins = coinsReward ? (r => r.amount ?? (r.data?.amount ?? 0))(coinsReward) : 0;
        const experienceReward = newQuest.rewards.find(r => r.type === "experience");
        const questExperience = experienceReward ? (r => r.amount ?? (r.data?.amount ?? 0))(experienceReward) : 0;

        newQuest.sub_quests = newQuest.sub_quests.map(sub => {
            const subRewards = [];
            if (questCoins > 0) {
                subRewards.push(new Reward("coins", { amount: Math.floor(questCoins * 0.05) }));
            }
            if (questExperience > 0) {
                subRewards.push(new Reward("experience", { amount: Math.floor(questExperience * 0.05) }));
            }
            return { ...sub, rewards: subRewards };
        });
        setQuests(prev => {
            if (editingQuest) {
                return prev.map(q => q.id === editingQuest.id ? newQuest : q);
            } else {
                return [...prev, newQuest];
            }
        });
        updateCoins(-cost);

        const message = editingQuest
            ? "Quest updated successfully!"
            : "Quest created successfully!";
        showGameToast({
            icon: "🎉",
            title: editingQuest ? "Quest Updated!" : "Quest Created!",
            description: message,
            border_color: "border-blue-500",
            text_color: "text-blue-400",
            progressClass_color: "!bg-blue-500",
        });
        setEditingQuest(null);
        // Remove editQuest param from URL
        const params = new URLSearchParams(searchParams.toString());
        params.delete("editQuest");
        router.replace(`/workshop${params.toString() ? `?${params}` : ""}`);
    };

    const tabs = [
        {
            name: "Quests",
            component: (
                <CreateQuest
                    tempQuest={tempQuest}
                    setTempQuest={setTempQuest}
                    StoreItems={StoreItems}
                    skills={user.stats}
                    addQuest={addQuest}
                    userCoins={user.coins}
                    calculateEffectCost={calculateEffectCost}
                    originalQuest={editingQuest}
                />
            ),
        },
        {
            name: "Items",
            component: (
                <CreateItem
                    addItemToStore={addItemToStore}
                    item={itemState}
                    setItem={setItem}
                    skills={user.stats}
                    originalItem={editingItem}
                    userCoins={user.coins}
                    calculateEffectCost={calculateEffectCost}
                />
            ),
        },
    ];

    function setActiveTab(idx) {
        setTab(idx);
    }

    return (
        <div className="flex flex-col items-center w-full text-white">
            <div className="w-full px-2 sm:px-4 md:px-10">
                <div className="flex max-w-md mx-auto mb-4 gap-2">
                    {tabs.map((tab, idx) => (
                        <button
                            key={tab.name}
                            onClick={() => setActiveTab(idx)}
                            className={`flex-1 py-2 px-4 rounded-t transition-colors duration-200 ${activeTab === idx
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
                <div className="relative min-h-[400px]">
                    {tabs.map((tab, idx) => (
                        <div
                            key={tab.name}
                            className={`absolute inset-0 transition-all duration-500 ${activeTab === idx
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