import React, { useState } from 'react';
import DashboardHeader from '../components/DashboardHeader';

const Myaccount = () => {
    const [user, setUser] = useState({
        firstName: "",
        nickname: "",
        email: "kundansharma@maxifysol", // Pre-filled from your image
        telegramId: "",
        country: "India",
        trafficSources: "",
    });

    const [security, setSecurity] = useState({
        twoFactor: true,
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
    });

    const handleProfileChange = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    };

    const handleSecurityChange = (e) => {
        const { name, value, type, checked } = e.target;
        setSecurity({ ...security, [name]: type === "checkbox" ? checked : value });
    };

    const handleProfileSave = () => {
        console.log("Profile Data:", user);
        alert("Profile saved successfully!");
    };

    const handleChangePassword = () => {
        if (security.newPassword !== security.confirmPassword) {
            alert("New password and confirm password do not match!");
            return;
        }
        console.log("Password Change Data:", security);
        alert("Password changed successfully!");
    };

    const inputClass = `w-full p-3 rounded-lg bg-gray-100 text-gray-800
                       focus:outline-none 
                        focus:ring-[0.5px] focus:ring-[#e5ea55] focus:border-[#e5ea55]
                        transition-all duration-200`;

    return (
        <>
            <div>
                <DashboardHeader />
            </div>
            <div className="flex flex-col md:flex-row gap-6 bg-gray-50 p-6 rounded-lg shadow-md">
                {/* Profile Section */}
                <div className="bg-white p-6 rounded-lg shadow w-full md:w-2/3">
                    <h2 className="text-xl font-semibold mb-4">Your Profile</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="text-[#b5b5c3] text-sm">First Name</label>
                            <input
                                type="text"
                                name="firstName"
                                placeholder="Enter your First name"
                                value={user.firstName}
                                onChange={handleProfileChange}
                                className={inputClass}
                            />
                        </div>
                        <div>
                            <label className="text-[#b5b5c3] text-sm">Nickname in the Top</label>
                            <input
                                type="text"
                                name="nickname"
                                placeholder="Enter your Nickname"
                                value={user.nickname}
                                onChange={handleProfileChange}
                                className={inputClass}
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                        <div>
                            <label className="text-[#b5b5c3] text-sm">Email</label>
                            <input
                                type="text"
                                name="email"
                                value={user.email}
                                disabled
                                className={`${inputClass} cursor-not-allowed bg-gray-200`}
                            />
                        </div>
                        <div>
                            <label className="text-[#b5b5c3] text-sm">Telegram-ID</label>
                            <input
                                type="text"
                                name="telegramId"
                                placeholder="Enter your Telegram username"
                                value={user.telegramId}
                                onChange={handleProfileChange}
                                className={inputClass}
                            />
                        </div>
                        <div>
                            <label className="text-[#b5b5c3] text-sm">Country</label>
                            <select
                                name="country"
                                value={user.country}
                                onChange={handleProfileChange}
                                className={inputClass}
                            >
                                <option value="India">India</option>
                                <option value="USA">USA</option>
                                <option value="UK">UK</option>
                            </select>
                        </div>
                    </div>

                    <div className="mt-4">
                        <label className="text-[#b5b5c3] text-sm">Traffic Sources</label>
                        <textarea
                            name="trafficSources"
                            placeholder="Provide links to your projects, groups, channels, websites, social networks through which you refer clients to us."
                            value={user.trafficSources}
                            onChange={handleProfileChange}
                            className={inputClass}
                        ></textarea>
                    </div>

                    <div className="mt-6 flex justify-between items-center">
                        <button className="text-red-500 text-sm hover:underline">✖ Delete account</button>
                        <button
                            onClick={handleProfileSave}
                            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition"
                        >
                            Save
                        </button>
                    </div>
                </div>

                {/* Security Section */}
                <div className="bg-white p-6 rounded-lg shadow w-full md:w-1/3">
                    <h2 className="text-xl font-semibold mb-4">Security</h2>

                    <div className="flex items-center mb-4">
                        <input
                            type="checkbox"
                            name="twoFactor"
                            checked={security.twoFactor}
                            onChange={handleSecurityChange}
                            className="mr-2"
                        />
                        <label className="text-gray-700">Two-factor authentication on login</label>
                    </div>

                    <div className="space-y-3">
                        <div>
                            <label className="text-[#b5b5c3]">Old Password</label>
                            <input
                                type="password"
                                name="oldPassword"
                                placeholder="Please enter your Old Password"
                                value={security.oldPassword}
                                onChange={handleSecurityChange}
                                className={inputClass}
                            />
                        </div>
                        <div>
                            <label className="text-[#b5b5c3]">New Password</label>
                            <input
                                type="password"
                                name="newPassword"
                                placeholder="Please enter your New Password"
                                value={security.newPassword}
                                onChange={handleSecurityChange}
                                className={inputClass}
                            />
                        </div>
                        <div>
                            <label className="text-[#b5b5c3]">Confirm Password</label>
                            <input
                                type="password"
                                name="confirmPassword"
                                placeholder="Please confirm your New Password"
                                value={security.confirmPassword}
                                onChange={handleSecurityChange}
                                className={inputClass}
                            />
                        </div>
                    </div>

                    <button
                        onClick={handleChangePassword}
                        className="bg-blue-500 hover:bg-blue-600 text-white w-full mt-4 py-2 rounded-lg transition"
                    >
                        Change Password
                    </button>
                </div>
            </div>
        </>
    );
};

export default Myaccount;
