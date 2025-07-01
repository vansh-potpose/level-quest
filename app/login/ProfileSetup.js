import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function ProfileSetup({ onComplete }) {
    const router = useRouter();
    const [profile, setProfile] = useState({
        job: "",
        about: "",
        skills: []
    });
    const [skillInput, setSkillInput] = useState("");
    const [success, setSuccess] = useState("");

    const handleProfileChange = (e) => {
        setProfile({ ...profile, [e.target.name]: e.target.value });
    };

    const handleAddSkill = (e) => {
        e.preventDefault();
        const skill = skillInput.trim();
        if (skill && !profile.skills.includes(skill)) {
            setProfile({ ...profile, skills: [...profile.skills, skill] });
            setSkillInput("");
        }
    };

    const handleRemoveSkill = (skillToRemove) => {
        setProfile({
            ...profile,
            skills: profile.skills.filter((s) => s !== skillToRemove)
        });
    };

    // Prevent form submit on Enter except for textarea
    const handleKeyDown = (e) => {
        if (e.key === "Enter" && e.target.tagName !== "TEXTAREA") {
            e.preventDefault();
        }
    };

    const handleProfileSubmit = (e) => {
        e.preventDefault();
        setSuccess("Profile setup complete!");
        if (onComplete) onComplete(profile);
        setTimeout(() => {
            router.push("/");
        }, 600);
    };

    return (
        <form className="flex flex-col gap-4 w-full  mx-auto" onSubmit={handleProfileSubmit} onKeyDown={handleKeyDown}>
            <h2 className="text-center mb-4 text-xl font-bold text-[#FF8000]">Set Up Your Profile</h2>
            <input
                type="text"
                name="job"
                placeholder="Job (e.g. Hunter)"
                value={profile.job}
                onChange={handleProfileChange}
                className="w-full p-3 bg-[#151b23] text-[#f0f6fc] border border-[#3d444d] rounded-lg outline-none text-base mb-1"
                required
            />
            <textarea
                name="about"
                placeholder="About you"
                value={profile.about}
                onChange={handleProfileChange}
                className="w-full p-3 bg-[#151b23] text-[#f0f6fc] border border-[#3d444d] rounded-lg outline-none text-base mb-1"
                required
            />
            <div>
                <label className="block mb-1 text-[#FF8000]">Skills</label>
                <p className="text-xs text-[#FF8000] mb-2">
                    Note: Choose wisely! These are the skills you'll level up as you progress. Once locked in, you won't be able to change them.
                </p>
                <div className="flex gap-2 mb-2">
                    <input
                        type="text"
                        value={skillInput}
                        onChange={e => setSkillInput(e.target.value)}
                        placeholder="Enter a skill"
                        className="flex-1 p-2 bg-[#151b23] text-[#f0f6fc] border border-[#3d444d] rounded"
                    />
                    <button
                        type="button"
                        onClick={handleAddSkill}
                        className="px-4 py-2 bg-[#FF8000] text-[#f0f6fc] rounded font-bold"
                        disabled={!skillInput.trim()}
                    >
                        Add
                    </button>
                </div>
                <div className="flex flex-wrap gap-2">
                    {profile.skills.map((skill, idx) => (
                        <span
                            key={idx}
                            className="bg-[#222b36] text-[#FF8000] px-3 py-1 rounded-full flex items-center gap-2"
                        >
                            {skill}
                            <button
                                type="button"
                                onClick={() => handleRemoveSkill(skill)}
                                className="ml-1 text-[#f0f6fc] hover:text-red-400"
                                title="Remove"
                            >
                                ×
                            </button>
                        </span>
                    ))}
                </div>
            </div>

            <button
                type="submit"
                className="p-3 bg-[#FF8000] text-[#f0f6fc] border-none rounded-lg font-bold text-base mt-1 transition-colors duration-200"
            >
                Save Profile
            </button>
            {success && (
                <div className="text-green-400 text-xs text-center">{success}</div>
            )}
        </form>
    );
}