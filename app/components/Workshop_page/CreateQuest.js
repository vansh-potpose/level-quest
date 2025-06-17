'use client'
import { useRef, useState } from "react";
import { FiUpload, FiPlus, FiTrash2, FiSave,FiClipboard  } from "react-icons/fi";
import RewardSelection from "./RewardSelection";
import QuestImage from "./QuestImage";

// Reward types constant
const REWARD_TYPES = [
    { value: "coins", label: "Coins" },
    { value: "experience", label: "Experience" },
    { value: "skill", label: "Skill" },
    { value: "item", label: "Item" }
];

export default function CreateQuest({ tempQuest, setTempQuest, StoreItems, skills,addQuest }) {
    const [subquestInput, setSubquestInput] = useState("");
    const [rewardTypeInput, setRewardTypeInput] = useState("");
    const [rewardDataInput, setRewardDataInput] = useState({});
    const fileInputRef = useRef();

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
        <div className="flex flex-col md:flex-row rounded-xl px-8 py-5 gap-8 ">
            <div className="md:w-1/2 w-full space-y-6 ">
                <h2 className="text-2xl font-bold mb-4 text-gray-100 flex items-center gap-2">
                    <FiClipboard  className="inline-block text-blue-400" /> Edit Quest
                </h2>
                {/* Image upload */}
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
                        className="mt-1 block w-full border border-gray-700 bg-gray-800 text-gray-100 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
                        placeholder="Enter quest name"
                    />
                </div>
                <div>
                    <label className="block text-sm font-semibold text-gray-300 mb-1">Description</label>
                    <textarea
                        name="description"
                        value={tempQuest.description}
                        onChange={handleChange}
                        className="mt-1 block w-full border border-gray-700 bg-gray-800 text-gray-100 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
                        rows={4}
                        placeholder="Describe the quest"
                    />
                </div>

                <div className="flex gap-4">
                    <div className="flex-1">
                        <label className="block text-sm font-semibold text-gray-300 mb-1">End Date</label>
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
                            className="mt-1 h-10 block w-full border border-gray-700 bg-gray-800 text-gray-100 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
                        />
                    </div>
                    <div className="flex-1">
                        <label className="block text-sm font-semibold text-gray-300 mb-1">Priority</label>
                        <select
                            name="priority"
                            value={tempQuest.priority}
                            onChange={handleChange}
                            className="mt-1 block h-10 w-full border border-gray-700 bg-gray-800 text-gray-100 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
                        >
                            <option value="Low">Low</option>
                            <option value="Medium">Medium</option>
                            <option value="High">High</option>
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
                    <div className="text-red-500 text-xs mb-1">
                        The reward of each subquest will be 5% of the coins and experience of quest
                    </div>
                    <div className="flex gap-2 mb-2">
                        <input
                            type="text"
                            value={subquestInput}
                            onChange={e => setSubquestInput(e.target.value)}
                            className="flex-1 border border-gray-700 bg-gray-800 text-gray-100 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
                            placeholder="Add subquest"
                        />
                        <button
                            type="button"
                            onClick={handleAddSubquest}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg flex items-center gap-1 transition"
                            title="Add Subquest"
                        >
                            <FiPlus /> Add
                        </button>
                    </div>
                    <ul className="space-y-1">
                        {(tempQuest.sub_quests || []).map((sq, idx) => (
                            <li key={sq.id || idx} className="flex items-center justify-between bg-gray-700 rounded px-2 py-1">
                                <span>{sq.name}</span>
                                <button
                                    type="button"
                                    onClick={() => handleRemoveSubquest(idx)}
                                    className="text-red-400 hover:text-red-600 ml-2 p-1 rounded transition"
                                    title="Remove Subquest"
                                >
                                    <FiTrash2 />
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>

                <button
                    onClick={() => {
                        console.log(JSON.stringify(tempQuest, null, 2));
                        addQuest(tempQuest)
                        
                    }}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg w-full flex items-center justify-center gap-2 transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 mt-4"
                >
                    <FiSave /> Save Quest
                </button>
            </div>
            <div className="md:w-1/2 w-full flex flex-col items-center justify-center">
                <QuestImage quest={tempQuest} />
            </div>
        </div>
    );
}