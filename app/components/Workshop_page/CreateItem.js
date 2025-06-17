'use client'
import { useRef, useState } from "react";
import { FiUpload, FiSave } from "react-icons/fi";
import ItemImage from "./ItemImage";

export default function CreateItem({ addItem }) {
    const [item, setItem] = useState({ id: 1, name: "Shadow Fight Game", price: 300, description: "Epic battles and martial arts.", image: "/image_b.jpg", type: "Object", amount: 1, claimed: false, attribute_name: "agility" });
    const fileInputRef = useRef();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setItem(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setItem(prev => ({
                    ...prev,
                    image: reader.result // base64 string
                }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSave = () => {
        // You can add validation here if needed
        addItem({
            ...item,
            id: Date.now(),
            price: Number(item.price),
            amount: Number(item.amount),
            claimed: false
        });
        setItem({
            name: "",
            price: "",
            description: "",
            image: "",
            type: "Object",
            amount: 1,
            claimed: false,
            attribute_name: "",
        });
    };

    return (
        <div className="flex flex-col md:flex-row rounded-xl px-8 py-5 gap-8">
            <div className="md:w-1/2 w-full space-y-6">
                <h2 className="text-2xl font-bold mb-4 text-gray-100 flex items-center gap-2">
                    <FiUpload className="inline-block text-blue-400" /> Create Item
                </h2>
                {/* Image upload */}
                <div>
                    <label className="text-sm font-semibold text-gray-300 mb-1 flex items-center gap-2">
                        <FiUpload className="text-blue-400" /> Item Image
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
                    <label className="block text-sm font-semibold text-gray-300 mb-1">Item Name</label>
                    <input
                        type="text"
                        name="name"
                        value={item.name}
                        onChange={handleChange}
                        className="mt-1 block w-full border border-gray-700 bg-gray-800 text-gray-100 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
                        placeholder="Enter item name"
                    />
                </div>
                <div>
                    <label className="block text-sm font-semibold text-gray-300 mb-1">Description</label>
                    <textarea
                        name="description"
                        value={item.description}
                        onChange={handleChange}
                        className="mt-1 block w-full border border-gray-700 bg-gray-800 text-gray-100 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
                        rows={3}
                        placeholder="Describe the item"
                    />
                </div>
                <div className="flex gap-4">
                    <div className="flex-1">
                        <label className="block text-sm font-semibold text-gray-300 mb-1">Price</label>
                        <input
                            type="number"
                            name="price"
                            value={item.price}
                            onChange={handleChange}
                            className="mt-1 h-10 block w-full border border-gray-700 bg-gray-800 text-gray-100 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
                            placeholder="Enter price"
                        />
                    </div>
                    <div className="flex-1">
                        <label className="block text-sm font-semibold text-gray-300 mb-1">Type</label>
                        <select
                            name="type"
                            value={item.type}
                            onChange={handleChange}
                            className="mt-1 block h-10 w-full border border-gray-700 bg-gray-800 text-gray-100 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
                        >
                            <option value="Object">Object</option>
                            <option value="Magical Item">Magical Item</option>
                        </select>
                    </div>
                </div>
                <div className="flex gap-4">

                    <div className="flex-1">
                        <label className="block text-sm font-semibold text-gray-300 mb-1">Attribute Name</label>
                        <input
                            type="text"
                            name="attribute_name"
                            value={item.attribute_name}
                            onChange={handleChange}
                            className="mt-1 h-10 block w-full border border-gray-700 bg-gray-800 text-gray-100 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
                            placeholder="e.g. health, strength"
                        />
                    </div>
                </div>
                <button
                    onClick={handleSave}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg w-full flex items-center justify-center gap-2 transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 mt-4"
                >
                    <FiSave /> Save Item
                </button>
            </div>
            <div className="md:w-1/2 w-full  flex items-center justify-center">
                <ItemImage item={item} />
            </div>
        </div>
    );
}