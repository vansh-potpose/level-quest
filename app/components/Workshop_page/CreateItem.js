'use client';
import { useRef, useState, useEffect } from "react";
import { FiUpload, FiSave, FiBox } from "react-icons/fi";
import { BsCoin } from "react-icons/bs";
import ItemImage from "./ItemImage";

const ATTRIBUTE_OPTIONS = [
    { value: "health", label: "Health" },
    { value: "experience", label: "Experience" },
    { value: "skills", label: "Skills" },
];

export default function CreateItem({
    skills,
    item,
    setItem,
    addItemToStore,
    originalItem,
    userCoins,
    calculateEffectCost
}) {
    const fileInputRef = useRef();
    const [selectedAttribute, setSelectedAttribute] = useState("health");
    const [cost, setCost] = useState(0);
    const [minPrice, setMinPrice] = useState(10);

    // Update cost and minPrice based on item state
    useEffect(() => {
        if (item.type !== "Magical Item") {
            setCost(originalItem ? 5 : 10);
            setMinPrice(5);
            return;
        }

        const getEffectType = (attr) =>
            attr === "experience" ? "experience" :
            attr === "health" ? "health" : "skill";

        const effects = [{
            type: getEffectType(item.attribute_name),
            amount: item.amount || 0
        }];
        const newCost = calculateEffectCost(effects);

        if (originalItem) {
            const oldEffects = [{
                type: getEffectType(originalItem.attribute_name),
                amount: originalItem.amount || 0
            }];
            const oldCost = calculateEffectCost(oldEffects);
            setCost(Math.max(5, 5 + Math.floor(newCost - oldCost)));
        } else {
            setCost(Math.max(20, newCost));
        }
        setMinPrice(Math.max(20, newCost));
    }, [item.attribute_name, item.amount, item.type, originalItem, calculateEffectCost]);

    // Ensure price is never below minPrice
    useEffect(() => {
        if (item.price < minPrice) {
            setItem(prev => ({ ...prev, price: minPrice }));
        }
    }, [minPrice, item.price, setItem]);

    // Handle input changes
    const handleChange = (e) => {
        const { name, value, type } = e.target;
        setItem(prev => ({
            ...prev,
            [name]: type === "number" ? Number(value) : value
        }));
    };

    // Handle image upload
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onloadend = () => {
            setItem(prev => ({ ...prev, image: reader.result }));
        };
        reader.readAsDataURL(file);
    };

    // Handle attribute selection
    const handleAttributeChange = (e) => {
        const value = e.target.value;
        setSelectedAttribute(value);
        setItem(prev => ({
            ...prev,
            attribute_name: value === "skills" ? "" : value,
            amount: 0
        }));
    };

    // Validation for save button
    const isSaveDisabled =
        item.name.trim() === "" ||
        item.price <= 0 ||
        (item.type === "Magical Item" && (item.attribute_name === "" || item.amount <= 0)) ||
        userCoins < cost;

    return (
        <div className="flex flex-col md:flex-row rounded-xl px-8 py-5 gap-8">
            <div className="md:w-1/2 w-full space-y-6">
                <h2 className="text-2xl font-bold mb-4 text-gray-100 flex items-center gap-2">
                    <FiBox className="inline-block text-blue-400" /> Create Item
                </h2>

                {/* Image Upload */}
                <div>
                    <label className="text-sm font-semibold text-gray-300 mb-1 flex items-center gap-2">
                        <FiUpload className="text-blue-400" /> Item Image
                    </label>
                    <input
                        type="file"
                        accept="image/*"
                        ref={fileInputRef}
                        onChange={handleImageChange}
                        className="mt-1 block w-full text-gray-100 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700 transition"
                    />
                </div>

                {/* Name */}
                <div>
                    <label className="block text-sm font-semibold text-gray-300 mb-1">Item Name</label>
                    <input
                        type="text"
                        name="name"
                        value={item.name}
                        onChange={handleChange}
                        className="mt-1 block w-full border border-[#3d444d] bg-[#0d1117] text-gray-100 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
                        placeholder="Enter item name"
                    />
                </div>

                {/* Description */}
                <div>
                    <label className="block text-sm font-semibold text-gray-300 mb-1">Description</label>
                    <textarea
                        name="description"
                        value={item.description}
                        onChange={handleChange}
                        className="mt-1 block w-full border border-[#3d444d] bg-[#0d1117] text-gray-100 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
                        rows={3}
                        placeholder="Describe the item"
                    />
                </div>

                {/* Price & Type */}
                <div className="flex gap-4">
                    <div className="flex-1">
                        <label className="block text-sm font-semibold text-gray-300 mb-1">Price</label>
                        <input
                            type="number"
                            name="price"
                            value={item.price}
                            onChange={handleChange}
                            min={minPrice}
                            className="mt-1 h-10 block w-full border border-[#3d444d] bg-[#0d1117] text-gray-100 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
                            placeholder="Enter price"
                        />
                    </div>
                    <div className="flex-1">
                        <label className="block text-sm font-semibold text-gray-300 mb-1">Type</label>
                        <select
                            name="type"
                            value={item.type}
                            onChange={handleChange}
                            className="mt-1 block h-10 w-full border border-[#3d444d] bg-[#0d1117] text-gray-100 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
                        >
                            <option value="Object">Object</option>
                            <option value="Magical Item">Magical Item</option>
                        </select>
                    </div>
                </div>

                {/* Magical Item Attributes */}
                {item.type === "Magical Item" && (
                    <>
                        <div className="flex gap-4">
                            <div className="flex-1">
                                <label className="block text-sm font-semibold text-gray-300 mb-1">Attribute Name</label>
                                <select
                                    value={selectedAttribute}
                                    onChange={handleAttributeChange}
                                    className="mt-1 h-10 block w-full border border-[#3d444d] bg-[#0d1117] text-gray-100 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
                                >
                                    {ATTRIBUTE_OPTIONS.map(opt => (
                                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        {(selectedAttribute === "health" || selectedAttribute === "experience") && (
                            <div>
                                <label className="block text-sm font-semibold text-gray-300 mb-1">
                                    {selectedAttribute.charAt(0).toUpperCase() + selectedAttribute.slice(1)} Amount
                                </label>
                                <input
                                    type="number"
                                    name="amount"
                                    value={item.amount || 0}
                                    onChange={handleChange}
                                    className="mt-1 h-10 block w-full border border-[#3d444d] bg-[#0d1117] text-gray-100 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
                                    placeholder={`Enter ${selectedAttribute} amount`}
                                />
                            </div>
                        )}

                        {selectedAttribute === "skills" && (
                            <div className="flex gap-4">
                                <div className="flex-1">
                                    <label className="block text-sm font-semibold text-gray-300 mb-1">Skill</label>
                                    <select
                                        name="attribute_name"
                                        value={item.attribute_name || ""}
                                        onChange={handleChange}
                                        className="mt-1 h-10 block w-full border border-[#3d444d] bg-[#0d1117] text-gray-100 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:outline-none transition"
                                    >
                                        {skills && skills.map(s => (
                                            <option key={s.skill} value={s.skill}>{s.skill}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="flex-1">
                                    <label className="block text-sm font-semibold text-gray-300 mb-1">Amount</label>
                                    <input
                                        type="number"
                                        name="amount"
                                        value={item.amount || 0}
                                        onChange={handleChange}
                                        className="mt-1 h-10 block w-full border border-[#3d444d] bg-[#0d1117] text-gray-100 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:outline-none transition"
                                        placeholder="Enter amount"
                                    />
                                </div>
                            </div>
                        )}
                    </>
                )}

                {/* Cost */}
                <div className="flex items-center gap-2">
                    <label className="text-md flex items-center gap-1 font-semibold text-gray-300">
                        Cost: {cost} <BsCoin className="inline-block text-yellow-500" />
                    </label>
                </div>

                {/* Save Button */}
                <button
                    onClick={() => addItemToStore(item, cost)}
                    disabled={isSaveDisabled}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg w-full flex items-center justify-center gap-2 transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 mt-4"
                >
                    <FiSave /> {isSaveDisabled ? "Insufficient Coins" : originalItem ? "Update Item" : "Create Item"}
                </button>
            </div>

            {/* Preview */}
            <div className="md:w-1/2 w-full flex items-center justify-center">
                <ItemImage item={item} />
            </div>
        </div>
    );
}
