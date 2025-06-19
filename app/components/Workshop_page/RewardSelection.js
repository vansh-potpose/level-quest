'use client'
import { 
    FiPlus, 
    FiTrash2, 
    FiAward, 
    FiBox, 
    FiStar, 
    FiDollarSign 
} from "react-icons/fi";

export default function RewardSelection({
    rewardTypeInput,
    setRewardTypeInput,
    rewardDataInput,
    setRewardDataInput,
    tempQuest,
    setTempQuest,
    REWARD_TYPES,
    StoreItems,
    skills
}) {

    // Rewards handlers
    const handleRewardTypeChange = (e) => {
        setRewardTypeInput(e.target.value);
        setRewardDataInput({});
    };

    const handleRewardDataChange = (field, value) => {
        setRewardDataInput(prev => ({
            ...prev,
            [field]: value
        }));
    };

    // Integrated handleAddReward logic as requested
    const handleAddReward = () => {
        if (!rewardTypeInput) return;
        let data = {};
        if (rewardTypeInput === "coins" || rewardTypeInput === "experience") {
            if (!rewardDataInput.amount) return;
            data = { amount: Number(rewardDataInput.amount) };
            setTempQuest(prev => {
                const existingIdx = (prev.rewards || []).findIndex(r => r.type === rewardTypeInput);
                if (existingIdx !== -1) {
                    // Sum the amounts
                    const updatedRewards = [...prev.rewards];
                    updatedRewards[existingIdx] = {
                        ...updatedRewards[existingIdx],
                        data: {
                            ...updatedRewards[existingIdx].data,
                            amount: updatedRewards[existingIdx].data.amount + data.amount
                        }
                    };
                    return { ...prev, rewards: updatedRewards };
                } else {
                    return {
                        ...prev,
                        rewards: [
                            ...(prev.rewards || []),
                            { type: rewardTypeInput, data }
                        ]
                    };
                }
            });
        } else if (rewardTypeInput === "skill") {
            if (!rewardDataInput.skill || !rewardDataInput.amount) return;
            data = { skill: rewardDataInput.skill, amount: Number(rewardDataInput.amount) };
            setTempQuest(prev => {
                const existingIdx = (prev.rewards || []).findIndex(
                    r => r.type === "skill" && r.data.skill === data.skill
                );
                if (existingIdx !== -1) {
                    // Sum the amounts for the same skill
                    const updatedRewards = [...prev.rewards];
                    updatedRewards[existingIdx] = {
                        ...updatedRewards[existingIdx],
                        data: {
                            ...updatedRewards[existingIdx].data,
                            amount: updatedRewards[existingIdx].data.amount + data.amount
                        }
                    };
                    return { ...prev, rewards: updatedRewards };
                } else {
                    return {
                        ...prev,
                        rewards: [
                            ...(prev.rewards || []),
                            { type: rewardTypeInput, data }
                        ]
                    };
                }
            });
        } else if (rewardTypeInput === "item") {
            if (!rewardDataInput.itemId) return;
            const itemObj = StoreItems.find(item => String(item.id) === String(rewardDataInput.itemId));
            if (!itemObj) return;
            data = { item: itemObj };
            setTempQuest(prev => {
                const existingIdx = (prev.rewards || []).findIndex(
                    r => r.type === "item" && r.data.item.id === itemObj.id
                );
                if (existingIdx !== -1) {
                    // Do not add duplicate items
                    return prev;
                } else {
                    return {
                        ...prev,
                        rewards: [
                            ...(prev.rewards || []),
                            { type: rewardTypeInput, data }
                        ]
                    };
                }
            });
        }
        setRewardTypeInput("");
        setRewardDataInput({});
    };

    const handleRemoveReward = (idx) => {
        setTempQuest(prev => ({
            ...prev,
            rewards: prev.rewards.filter((_, i) => i !== idx)
        }));
    };

    return (
        <div>
            <label className="text-sm font-semibold text-gray-300 mb-2 flex items-center gap-2">
                <FiAward className="text-yellow-400" />
                Rewards
            </label>
            <div className="flex flex-wrap gap-2 mb-3 items-end">
                <select
                    value={rewardTypeInput}
                    onChange={handleRewardTypeChange}
                    className="flex-1 min-w-[160px] border border-[#3d444d] bg-[#0d1117] text-gray-100 rounded-lg px-3 py-2 h-10 focus:ring-2 focus:ring-green-500"
                >
                    <option value="">Select reward type</option>
                    {REWARD_TYPES.map(rt => (
                        <option key={rt.value} value={rt.value}>{rt.label}</option>
                    ))}
                </select>
                {/* Dynamic reward fields */}
                {rewardTypeInput === "coins" && (
                    <div className="flex items-center gap-1">
                        <FiDollarSign className="text-yellow-400" />
                        <input
                            type="number"
                            min={1}
                            value={rewardDataInput.amount || ""}
                            onChange={e => handleRewardDataChange("amount", e.target.value)}
                            placeholder="Amount"
                            className="w-28 border border-[#3d444d] bg-[#0d1117] text-gray-100 rounded-lg px-3 py-2 h-10 focus:ring-2 focus:ring-yellow-400"
                        />
                    </div>
                )}
                {rewardTypeInput === "experience" && (
                    <div className="flex items-center gap-1">
                        <FiStar className="text-blue-400" />
                        <input
                            type="number"
                            min={1}
                            value={rewardDataInput.amount || ""}
                            onChange={e => handleRewardDataChange("amount", e.target.value)}
                            placeholder="Amount"
                            className="w-28 border border-[#3d444d] bg-[#0d1117] text-gray-100 rounded-lg px-3 py-2 h-10 focus:ring-2 focus:ring-blue-400"
                        />
                    </div>
                )}
                {rewardTypeInput === "skill" && (
                    <>
                        <select
                            value={rewardDataInput.skill || ""}
                            onChange={e => handleRewardDataChange("skill", e.target.value)}
                            className="flex-1 min-w-[120px] border border-[#3d444d] bg-[#0d1117] text-gray-100 rounded-lg px-3 py-2 h-10 focus:ring-2 focus:ring-purple-400"
                        >
                            <option value="">Select skill</option>
                            {skills && skills.map(s => (
                                <option key={s.skill} value={s.skill}>{s.skill}</option>
                            ))}
                        </select>
                        <input
                            type="number"
                            min={1}
                            value={rewardDataInput.amount || ""}
                            onChange={e => handleRewardDataChange("amount", e.target.value)}
                            placeholder="Amount"
                            className="w-24 border border-[#3d444d] bg-[#0d1117] text-gray-100 rounded-lg px-3 py-2 h-10 focus:ring-2 focus:ring-purple-400"
                        />
                    </>
                )}
                {rewardTypeInput === "item" && (
                    <div className="flex items-center gap-1">
                        <FiBox className="text-green-400" />
                        <select
                            value={rewardDataInput.itemId || ""}
                            onChange={e => handleRewardDataChange("itemId", e.target.value)}
                            className="flex-1 min-w-[120px] border border-[#3d444d] bg-[#0d1117] text-gray-100 rounded-lg px-3 py-2 h-10 focus:ring-2 focus:ring-green-400"
                        >
                            <option value="">Select item</option>
                            {StoreItems && StoreItems.map(item => (
                                <option key={item.id} value={item.id}>{item.name}</option>
                            ))}
                        </select>
                    </div>
                )}
                <button
                    type="button"
                    onClick={handleAddReward}
                    className="bg-[#212830] hover:bg-blue-700 text-white px-3 py-2 h-10 rounded-lg flex items-center gap-1 transition"
                    title="Add reward"
                >
                    <FiPlus />
                    Add
                </button>
            </div>
            <ul className="space-y-2">
                {(tempQuest.rewards || []).map((reward, idx) => (
                    <li
                        key={idx}
                        className="flex items-center justify-between bg-[#151b23] rounded-sm px-3 py-2 shadow-sm"
                    >
                        <span className="flex items-center gap-2 text-gray-100">
                            {reward.type === "coins" && (
                                <>
                                    <FiDollarSign className="text-yellow-400" />
                                    <span>Coins: <span className="font-semibold">{reward.data.amount}</span></span>
                                </>
                            )}
                            {reward.type === "experience" && (
                                <>
                                    <FiStar className="text-blue-400" />
                                    <span>Experience: <span className="font-semibold">{reward.data.amount}</span></span>
                                </>
                            )}
                            {reward.type === "skill" && (
                                <>
                                    <FiAward className="text-purple-400" />
                                    <span>
                                        Skill: <span className="font-semibold">{reward.data.skill}</span>
                                        <span className="ml-1 text-xs text-gray-400">({reward.data.amount})</span>
                                    </span>
                                </>
                            )}
                            {reward.type === "item" && (
                                <>
                                    <FiBox className="text-green-400" />
                                    <span>Item: <span className="font-semibold">{reward.data.item.name}</span></span>
                                </>
                            )}
                        </span>
                        <button
                            type="button"
                            onClick={() => handleRemoveReward(idx)}
                            className="text-red-400 hover:text-red-600 ml-2 p-1 rounded transition"
                            title="Remove reward"
                        >
                            <FiTrash2 />
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}