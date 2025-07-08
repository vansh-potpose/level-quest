"use client"; // This file uses React hooks and context, so it needs to be a client component
import React, { useState } from "react";
import ProfilePictureUpload from "./ProfilePictureUpload";
import SettingsInput from "./SettingsInput";
import SettingsTextarea from "./SettingsTextarea";
import { useGame } from "../context/GameContext"; // 1. Import the hook
import { useSelector } from "react-redux";

export default function SettingsPage() {
  const { user } = useSelector((state) => state.user); // 2. Use context instead of props
  const { setUser } = useGame(); // 2. Use context instead of props

  const [form, setForm] = useState({
    name: user.name || "",
    job: user.job || "",
    about: user.about || "",
    stregth: user.stregth || "",
    weakness: user.weakness || "",
    masterObjective: user.masterObjective || "",
    minorObjective: user.minorObjective || "",
    profilePic: user.profilePic || "",
  });
  const [preview, setPreview] = useState(user.profilePic || "");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setForm((prev) => ({ ...prev, profilePic: reader.result }));
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setUser({ ...user, ...form });
  };

  return (
    <div className="flex justify-center items-center text-white px-2 w-full ">
      <div className="  w-full max-w-screen-2xl m-2 md:m-4 p-4 md:p-8 flex flex-col gap-8">
        <div className="flex flex-col lg:flex-row gap-8 items-center w-full">
          <div className="flex flex-col h-full justify-center items-center w-full lg:w-1/3">
            <ProfilePictureUpload
              preview={preview}
              onChange={handleImageChange}
            />
            <span className="text-gray-400 text-sm mt-2">Profile Picture</span>
          </div>
          <form
            onSubmit={handleSubmit}
            className="flex-1 flex flex-col gap-5 w-full"
            autoComplete="off"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <SettingsInput
                label="Name:"
                name="name"
                value={form.name}
                onChange={handleChange}
              />
              <SettingsInput
                label="Job:"
                name="job"
                value={form.job}
                onChange={handleChange}
              />
            </div>
            <SettingsTextarea
              label="About Me:"
              name="about"
              value={form.about}
              onChange={handleChange}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <SettingsInput
                label="Strength:"
                name="stregth"
                value={form.stregth}
                onChange={handleChange}
              />
              <SettingsInput
                label="Weakness:"
                name="weakness"
                value={form.weakness}
                onChange={handleChange}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <SettingsInput
                label="Master Objective:"
                name="masterObjective"
                value={form.masterObjective}
                onChange={handleChange}
              />
              <SettingsInput
                label="Minor Objective:"
                name="minorObjective"
                value={form.minorObjective}
                onChange={handleChange}
              />
            </div>
            <button
              type="submit"
              className="bg-orange-500 text-white rounded-lg px-6 py-3 font-bold mt-4 hover:bg-orange-600 transition-colors shadow-md w-full md:w-auto"
            >
              Save Changes
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
