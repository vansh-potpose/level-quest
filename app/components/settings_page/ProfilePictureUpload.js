import React from "react";

export default function ProfilePictureUpload({ preview, onChange }) {
    return (
        <div className="flex flex-col items-center gap-2">
            <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-gray-700 bg-gray-900 flex items-center justify-center mb-2">
                {preview ? (
                    <img
                        src={preview}
                        alt="Profile"
                        className="w-full h-full object-cover"
                    />
                ) : (
                    <span className="text-gray-400 text-4xl">?</span>
                )}
            </div>
            <label
                htmlFor="profilePic"
                className="bg-gray-900 text-gray-300 border border-gray-700 rounded px-4 py-1 cursor-pointer font-medium transition-colors hover:bg-gray-800"
            >
                Change Profile Picture
                <input
                    id="profilePic"
                    type="file"
                    accept="image/*"
                    onChange={onChange}
                    className="hidden"
                />
            </label>
        </div>
    );
}