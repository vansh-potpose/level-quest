'use client'
import { useRef, useState, useEffect } from "react";
import { FiUpload, FiPlus, FiTrash2, FiSave, FiClipboard } from "react-icons/fi";
import { BsCoin } from "react-icons/bs";
import RewardSelection from "./RewardSelection";
import QuestImage from "./QuestImage";

// Reward types constant
const REWARD_TYPES = [
    { value: "coins", label: "Coins" },
    { value: "experience", label: "Experience" },
    { value: "skill", label: "Skill" },
    { value: "item", label: "Item" }
];

export default function CreateQuest({ tempQuest, setTempQuest, StoreItems, skills, addQuest, userCoins,
    calculateEffectCost,
    originalQuest }) {
    const [subquestInput, setSubquestInput] = useState("");
    const [rewardTypeInput, setRewardTypeInput] = useState("");
    const [rewardDataInput, setRewardDataInput] = useState({});
    const fileInputRef = useRef();
    const [cost, setCost] = useState(0);

    useEffect(() => {
        const extractEffects = (quest) => {
            return quest.rewards.map(r => {
                if (r.type === "coins") return { type: "coins", amount: r.data.amount };
                if (r.type === "skill") return { type: "skill", amount: r.data.amount };
                if (r.type === "health") return { type: "health", amount: r.data.amount };
                if (r.type === "experience") return { type: "experience", amount: r.data.amount };
                if (r.type === "item") return { type: "item", amount: r.data.item?.price || 0 };
                return null;
            }).filter(Boolean);
        };

        const newEffects = extractEffects(tempQuest);
        const newCost = calculateEffectCost(newEffects);

        if (originalQuest) {
            const oldEffects = extractEffects(originalQuest);
            const oldCost = calculateEffectCost(oldEffects);
            const editingCost = Math.max(10, 10 + Math.floor((newCost - oldCost)));
            setCost(editingCost);
        } else {
            const createCost = 50 + newCost;
            setCost(createCost);
        }
    }, [tempQuest.rewards, originalQuest]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTempQuest(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // Handle image upload
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setTempQuest(prev => ({
                    ...prev,
                    image: reader.result // base64 string
                }));
            };
            reader.readAsDataURL(file);
        }
    };

    // Subquest handlers (for sub_quests array)
    const handleAddSubquest = () => {
        if (subquestInput.trim()) {
            setTempQuest(prev => ({
                ...prev,
                sub_quests: [
                    ...(prev.sub_quests || []),
                    {
                        id: Date.now(),
                        name: subquestInput.trim(),
                        completed: false,
                        claim: false,
                        rewards: [],
                    }
                ]
            }));
            setSubquestInput("");
        }
    };

    const handleRemoveSubquest = (idx) => {
        setTempQuest(prev => ({
            ...prev,
            sub_quests: prev.sub_quests.filter((_, i) => i !== idx)
        }));
    };

    return (
        <div className="flex flex-col lg:flex-row w-full items-center px-2  rounded-xl md:px-8 py-5 gap-8 ">
            <div className="lg:w-1/2 w-full space-y-6 ">
                <h2 className="text-2xl font-bold mb-4 text-gray-100 flex items-center gap-2">
                    <FiClipboard className="inline-block text-blue-400" /> Edit Quest
                </h2>

                <div>
                    <label className="text-sm font-semibold text-gray-300 mb-1 flex items-center gap-2">
                        <FiUpload className="text-blue-400" /> Quest Image
                    </label>
                    <div className="flex items-center gap-2">
                        <input
                            type="file"
                            accept="image/*"
                            ref={fileInputRef}
                            onChange={handleImageChange}
                            className="mt-1 block w-full text-gray-100 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700 transition"
                        />
                    </div>
                </div>
                <div>
                    <label className="block text-sm font-semibold text-gray-300 mb-1">Quest Name</label>
                    <input
                        type="text"
                        name="name"
                        value={tempQuest.name}
                        onChange={handleChange}
                        className="mt-1 block w-full border border-[#3d444d] bg-[#0d1117] text-gray-100 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
                        placeholder="Enter quest name"
                    />
                </div>
                <div>
                    <label className="block text-sm font-semibold text-gray-300 mb-1">Description</label>
                    <textarea
                        name="description"
                        value={tempQuest.description}
                        onChange={handleChange}
                        className="mt-1 block w-full border border-[#3d444d] bg-[#0d1117] text-gray-100 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
                        rows={4}
                        placeholder="Describe the quest"
                    />
                </div>

                <div className="flex gap-4 sm:flex-row flex-col">
                    <div className="flex-1">
                        <label className="block text-sm font-semibold text-gray-300 mb-1">End Date</label>
                        {/* Only render input if endDate is defined */}
                        {tempQuest.endDate ? (
                            <input
                                type="datetime-local"
                                name="endDate"
                                value={tempQuest.endDate.slice(0, 16)}
                                onChange={e =>
                                    setTempQuest(prev => ({
                                        ...prev,
                                        endDate: new Date(e.target.value).toISOString()
                                    }))
                                }
                                className="mt-1 h-10 block w-full border border-[#3d444d] bg-[#0d1117] text-gray-100 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
                            />
                        ) : (
                            <input
                                type="datetime-local"
                                name="endDate"
                                value=""
                                onChange={e =>
                                    setTempQuest(prev => ({
                                        ...prev,
                                        endDate: new Date(e.target.value).toISOString()
                                    }))
                                }
                                className="mt-1 h-10 block w-full border border-[#3d444d] bg-[#0d1117] text-gray-100 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
                            />
                        )}
                    </div>
                    <div className="flex-1">
                        <label className="block text-sm font-semibold text-gray-300 mb-1">Priority</label>
                        <select
                            name="priority"
                            value={
                                // Normalize string values to numbers for select
                                tempQuest.priority === "high" ? 1 :
                                    tempQuest.priority === "medium" ? 2 :
                                        tempQuest.priority === "low" ? 3 :
                                            tempQuest.priority || 1
                            }
                            onChange={e =>
                                setTempQuest(prev => ({
                                    ...prev,
                                    priority: Number(e.target.value)
                                }))
                            }
                            className="mt-1 block h-10 w-full border border-[#3d444d] bg-[#0d1117] text-gray-100 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
                        >
                            <option value={1}>High</option>
                            <option value={2}>Medium</option>
                            <option value={3}>Low</option>
                        </select>
                    </div>
                </div>

                {/* Rewards */}
                <RewardSelection
                    rewardTypeInput={rewardTypeInput}
                    setRewardTypeInput={setRewardTypeInput}
                    rewardDataInput={rewardDataInput}
                    setRewardDataInput={setRewardDataInput}
                    tempQuest={tempQuest}
                    setTempQuest={setTempQuest}
                    REWARD_TYPES={REWARD_TYPES}
                    StoreItems={StoreItems}
                    skills={skills}
                />

                {/* Subquests */}
                <div>
                    <label className="block text-sm font-semibold text-gray-300 mb-1">Subquests</label>
                    <div className="text-xs mb-2 flex items-center gap-2">
                        <span className="bg-yellow-900/30 text-[#FF8000] px-2 py-1 rounded">
                            Each subquest rewards 5% of quest coins & experience
                        </span>
                    </div>
                    <div className="flex gap-2 mb-3">
                        <input
                            type="text"
                            value={subquestInput}
                            onChange={e => setSubquestInput(e.target.value)}
                            className="flex-1 border border-[#2d3340] bg-[#161b22] text-gray-100 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none transition placeholder:text-gray-400"
                            placeholder="Add a subquest..."
                        />
                        <button
                            type="button"
                            onClick={handleAddSubquest}
                            className="hover:bg-[#FF8000] bg-[#212830] text-white px-4 py-2 rounded-lg flex items-center gap-1 shadow transition"
                            title="Add Subquest"
                        >
                            <FiPlus /> Add
                        </button>
                    </div>
                    <ul className="space-y-2">
                        {(tempQuest.sub_quests || []).map((sq, idx) => (
                            <li
                                key={sq.id || idx}
                                className="flex items-center justify-between bg-[#1a2230] border border-[#232b3a] rounded-lg px-3 py-2 group transition"
                            >
                                <span className="text-gray-100">{sq.name}</span>
                                <button
                                    type="button"
                                    onClick={() => handleRemoveSubquest(idx)}
                                    className="text-red-400 hover:text-red-600 ml-2 p-1 rounded transition opacity-70 group-hover:opacity-100"
                                    title="Remove Subquest"
                                >
                                    <FiTrash2 />
                                </button>
                            </li>
                        ))}
                        {!(tempQuest.sub_quests && tempQuest.sub_quests.length) && (
                            <li className="text-gray-500 text-sm italic px-2 py-1">No subquests added yet.</li>
                        )}
                    </ul>
                </div>

                <div className="flex items-center gap-2 mt-6 text-lg font-semibold text-gray-300">
                    <span>Creation cost:</span>
                    <span className="flex items-center gap-1">
                        {cost} <BsCoin className="inline-block text-yellow-500" />
                    </span>
                </div>

                <button
                    onClick={() => {
                        console.log(JSON.stringify(tempQuest, null, 2));
                        addQuest(tempQuest, cost)

                    }}
                    disabled={(userCoins < cost) || tempQuest.name.trim() === "" || tempQuest.description.trim() === "" || tempQuest.sub_quests.length === 0}
                    className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 text-white px-4 py-2 rounded-lg w-full flex items-center justify-center gap-2 transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 mt-4"
                >
                    <FiSave /> {userCoins < cost ? "Not enough coins" : originalQuest ? "Update Quest" : "Create Quest"}
                </button>
            </div>
            <div className="lg:w-1/2 w-full flex flex-col items-center justify-center">
                <QuestImage quest={tempQuest} />
            </div>
        </div>
    );
}