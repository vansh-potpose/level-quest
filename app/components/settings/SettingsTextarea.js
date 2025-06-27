import React from "react";

export default function SettingsTextarea({ label, name, value, onChange, rows = 3 }) {
    return (
        <label className="flex flex-col gap-1">
            <span className="text-gray-300">{label}</span>
            <textarea
                name={name}
                value={value}
                onChange={onChange}
                rows={rows}
                className="bg-gray-900 text-white border border-gray-700 rounded px-2 py-2 resize-vertical outline-none"
            />
        </label>
    );
}