import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../Redux/reducer/authSlice";

const Register = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const dispatch = useDispatch();
    const { loading, error, user } = useSelector((state) => state.auth);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!email || !password) {
            alert("Please fill in both Email and Password.");
            return;
        }
        dispatch(registerUser({ email, password }));
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#0D0F21]">
            <div className="bg-[#0D0F21] text-white w-full max-w-md p-8 rounded-lg shadow-lg">
                <Link to="/" className="flex items-center justify-center mb-4">
                    <img
                        className="h-14"
                        src="https://quotex-partner.com/partners/media/logos/logo-letter.svg"
                        alt="logo"
                    />
                </Link>

                <h2 className="text-2xl font-bold text-center mb-2">
                    Quotex Affiliate Center
                </h2>
                <p className="text-gray-400 text-center mb-6">
                    Enter your details to create your account
                </p>

                {error && <p className="text-red-500 mb-2">{error}</p>}
                {user && <p className="text-green-500 mb-2">Welcome {user.email}</p>}

                <form className="space-y-4" onSubmit={handleSubmit}>
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full p-3 rounded-md bg-gray-50 text-black border border-gray-700"
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full p-3 rounded-md bg-gray-50 text-black border border-gray-700"
                    />

                    <button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700 p-3 rounded-md font-semibold"
                        disabled={loading}
                    >
                        {loading ? "Signing up..." : "Sign Up"}
                    </button>
                </form>

                <p className="mt-6 text-center text-gray-400">
                    Already have an account? <br />
                    <Link to="/signin" className="text-blue-500 hover:underline">
                        Sign In!
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Register;
