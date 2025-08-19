import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';

const SignIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!email || !password) {
            alert("Please fill in both Email and Password.");
            return;
        }

        // ✅ Handle login logic (API call can go here)
        console.log({ email, password, rememberMe });
        alert(`Login Successful!\nEmail: ${email}\nPassword: ${password}\nRemember: ${rememberMe}`);
    };

    return (
        <div>
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
                    <h2 className="text-2xl font-bold text-center mb-2">
                        Quotex Affiliate Center
                    </h2>
                    <p className="text-gray-400 text-center mb-6">
                        Enter your details to login to your account
                    </p>

                    {/* Form */}
                    <form className="space-y-4" onSubmit={handleSubmit}>
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full p-3 rounded-md bg-gray-50 text-black border border-gray-700 focus:outline-none focus:ring-0"
                            required
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full p-3 rounded-md bg-gray-50 text-black border border-gray-700 focus:outline-none focus:ring-0"
                            required
                        />

                        {/* Remember me & forgot password */}
                        <div className="flex items-center justify-between text-sm">
                            <label className="flex items-center space-x-2">
                                <input
                                    type="checkbox"
                                    checked={rememberMe}
                                    onChange={(e) => setRememberMe(e.target.checked)}
                                    className="w-4 h-4 text-blue-600"
                                />
                                <span>Remember me</span>
                            </label>
                            <Link to="/forgot" className="text-blue-500 hover:underline">
                                Forgot password?
                            </Link>
                        </div>

                        {/* Button */}
                        <button
                            type="submit"
                            className="w-full bg-blue-600 hover:bg-blue-700 p-3 rounded-md font-semibold"
                        >
                            Sign In
                        </button>
                    </form>

                    {/* Signup link */}
                    <p className="mt-6 text-center text-gray-400">
                        Don’t have an account yet? <br />
                        <Link to="/register" className="text-blue-500 hover:underline">
                            Sign Up!
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default SignIn;
