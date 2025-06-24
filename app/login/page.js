'use client';
import React, { useState } from "react";

const validateEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

const LoginPage = () => {
    const [isSignUp, setIsSignUp] = useState(false);
    const [form, setForm] = useState({ email: "", password: "", name: "" });
    const [errors, setErrors] = useState({});
    const [submitting, setSubmitting] = useState(false);
    const [animating, setAnimating] = useState(false);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        setErrors({ ...errors, [e.target.name]: "" });
    };

    const validate = () => {
        const newErrors = {};
        if (isSignUp && !form.name.trim()) newErrors.name = "Name is required";
        if (!form.email.trim()) newErrors.email = "Email is required";
        else if (!validateEmail(form.email)) newErrors.email = "Invalid email";
        if (!form.password) newErrors.password = "Password is required";
        else if (form.password.length < 6)
            newErrors.password = "Password must be at least 6 characters";
        return newErrors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const validation = validate();
        if (Object.keys(validation).length) {
            setErrors(validation);
            return;
        }
        setSubmitting(true);
        setTimeout(() => {
            alert(
                isSignUp
                    ? `Sign Up: ${form.name}, ${form.email}`
                    : `Login: ${form.email}`
            );
            setSubmitting(false);
        }, 800);
    };

    // Animation: fade out, then switch, then fade in
    const handleSwitch = () => {
        setAnimating(true);
        setTimeout(() => {
            setIsSignUp((prev) => !prev);
            setErrors({});
            setForm({ email: "", password: "", name: "" });
            setTimeout(() => setAnimating(false), 300); // match transition duration
        }, 300);
    };

    return (
        <div className="min-h-screen bg-transparent text-[#f0f6fc] flex items-center justify-center">
            <div
            className="absolute inset-0 -z-10"
            style={{
                background: "linear-gradient(135deg, #000 50%, rgba(0,60,130,0.85) 100%)",
                filter: "blur(40px)",
                transition: "background 0.8s cubic-bezier(0.4,0,0.2,1)",
            }}
        />
            <div
                className={`bg-[#0d1117] p-10 rounded-2xl shadow-lg w-[340px] border border-[#3d444d]
                    transition-all duration-300
                    ${animating ? "opacity-0 translate-y-4 pointer-events-none" : "opacity-100 translate-y-0"}
                `}
            >
                <h2 className="text-center mb-6 text-2xl font-bold text-[#FF8000] tracking-wide">
                    {isSignUp ? "Sign Up" : "Login"}
                </h2>
                <form
                    className="flex flex-col gap-4"
                    onSubmit={handleSubmit}
                    autoComplete="off"
                >
                    {isSignUp && (
                        <div>
                            <input
                                type="text"
                                name="name"
                                placeholder="Name"
                                value={form.name}
                                onChange={handleChange}
                                disabled={submitting}
                                className={`w-full p-3 bg-[#151b23] text-[#f0f6fc] border ${errors.name ? "border-[#FF8000]" : "border-[#3d444d]"} rounded-lg outline-none text-base mb-1`}
                            />
                            {errors.name && (
                                <span className="text-[#FF8000] text-xs">{errors.name}</span>
                            )}
                        </div>
                    )}
                    <div>
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={form.email}
                            onChange={handleChange}
                            disabled={submitting}
                            className={`w-full p-3 bg-[#151b23] text-[#f0f6fc] border ${errors.email ? "border-[#FF8000]" : "border-[#3d444d]"} rounded-lg outline-none text-base mb-1`}
                        />
                        {errors.email && (
                            <span className="text-[#FF8000] text-xs">{errors.email}</span>
                        )}
                    </div>
                    <div>
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={form.password}
                            onChange={handleChange}
                            disabled={submitting}
                            className={`w-full p-3 bg-[#151b23] text-[#f0f6fc] border ${errors.password ? "border-[#FF8000]" : "border-[#3d444d]"} rounded-lg outline-none text-base mb-1`}
                        />
                        {errors.password && (
                            <span className="text-[#FF8000] text-xs">{errors.password}</span>
                        )}
                    </div>
                    <button
                        type="submit"
                        disabled={submitting}
                        className={`p-3 ${submitting ? "bg-[#9198a1] cursor-not-allowed" : "bg-[#FF8000] cursor-pointer"} text-[#f0f6fc] border-none rounded-lg font-bold text-base mt-1 transition-colors duration-200`}
                    >
                        {submitting
                            ? isSignUp
                                ? "Signing Up..."
                                : "Logging In..."
                            : isSignUp
                            ? "Sign Up"
                            : "Login"}
                    </button>
                </form>
                <p className="text-center mt-4 text-[#d8dee3] text-sm">
                    {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
                    <span
                        className="text-[#FF8000] font-bold cursor-pointer ml-1 underline"
                        onClick={animating ? undefined : handleSwitch}
                    >
                        {isSignUp ? "Login" : "Sign Up"}
                    </span>
                </p>
            </div>
        </div>
    );
};

export default LoginPage;