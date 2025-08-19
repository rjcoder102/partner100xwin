import React, { useState } from "react";
import { Link } from "react-router-dom";

const Forgot = () => {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!email) {
            setMessage("⚠️ Please enter your email address.");
            return;
        }

        // ✅ Here you can call your backend API for password reset
        // Example: axios.post("/api/forgot-password", { email })
        console.log("Password reset request for:", email);

        setMessage(
            `✅ If an account exists with ${email}, a reset link has been sent to your email.`
        );
        setEmail(""); // clear input
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#0D0F21]">
            <div className="bg-[#0D0F21] text-white w-full max-w-md p-8 rounded-lg shadow-lg">
                {/* Logo */}
                <Link to="/" className="flex items-center justify-center mb-4">
                    <img
                        className="h-14"
                        src="https://quotex-partner.com/partners/media/logos/logo-letter.svg"
                        alt="logo"
                    />
                </Link>

                {/* Title */}
                <h2 className="text-3xl font-bold text-center mb-2">
                    Forgotten Password?
                </h2>
                <p className="text-gray-400 text-center mb-6">
                    Enter your email to reset your password
                </p>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full p-3 rounded-md bg-gray-50 text-black border border-gray-700 focus:outline-none focus:ring-0 "
                        required
                    />

                    <button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700 p-3 rounded-md font-semibold"
                    >
                        Reset password
                    </button>
                </form>

                {/* Message */}
                {message && (
                    <p className="mt-4 text-center text-sm text-gray-300">{message}</p>
                )}

                {/* Back to login */}
                <p className="mt-6 text-center text-gray-400">
                    Remember your password?{" "} <br/>
                    <Link to="/signin" className="text-blue-500 hover:underline">
                        Sign In
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Forgot;
