import React from "react";

export default function SettingsInput({ label, name, value, onChange }) {
    return (
        <label className="flex flex-col gap-1 w-full">
            <span className="text-gray-300">{label}</span>
            <input
                name={name}
                value={value}
                onChange={onChange}
                className="bg-gray-900 text-white border border-gray-700 rounded px-2 py-2 outline-none w-full"
            />
        </label>
    );
}