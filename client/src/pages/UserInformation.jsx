import React, { useState } from "react";
import DashboardHeader from "../components/DashboardHeader";

const UserInformation = () => {
    const [activeTab, setActiveTab] = useState("info"); // default active tab

    // Sample user data
    const userData = {
        userId: "USR-78945612",
        totalBalance: "$2,450.00",
        lastLoginDate: "Aug 21, 2025 14:30",
        totalDeposit: "$5,200.00",
        totalWithdrawal: "$2,750.00",
        totalRecharge: "$8,950.00"
    };

    return (
        <div className="min-h-screen">
            {/* Header */}
            <DashboardHeader />

            {/* Main Content */}
            <div className="container mx-auto max-w-6xl">
                {/* Tabs */}
                <div className="bg-white shadow-md rounded-lg overflow-hidden mb-6">
                    <div className="flex border-b">
                        <button
                            className={`flex-1 py-4 text-center font-medium ${activeTab === "info"
                                ? "border-b-2 border-blue-500 text-blue-600"
                                : "text-gray-500 hover:text-gray-700"
                                }`}
                            onClick={() => setActiveTab("info")}
                        >
                            User Info
                        </button>
                        <button
                            className={`flex-1 py-4 text-center font-medium ${activeTab === "history"
                                ? "border-b-2 border-blue-500 text-blue-600"
                                : "text-gray-500 hover:text-gray-700"
                                }`}
                            onClick={() => setActiveTab("history")}
                        >
                            Bet History
                        </button>
                    </div>

                    {/* Tab Content */}
                    <div className="p-6">
                        {activeTab === "info" && (
                            <div>
                                <h2 className="text-2xl font-bold mb-6 text-gray-800">User Information</h2>

                                {/* User Details Card */}
                                <div className="bg-blue-50 rounded-lg p-6 mb-8 border border-blue-100">
                                    <div className="flex flex-col md:flex-row items-center mb-6">
                                        <div className="w-24 h-24 bg-blue-200 rounded-full flex items-center justify-center text-blue-600 text-4xl font-bold mb-4 md:mb-0">
                                            JD
                                        </div>
                                        <div className="md:ml-6 text-center md:text-left">
                                            <h3 className="text-2xl font-bold text-gray-800">John Doe</h3>
                                            <p className="text-gray-600">john@example.com</p>
                                            <p className="text-gray-500 text-sm mt-1">Joined: Jan 20, 2023</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Financial Information Table */}
                                <h3 className="text-xl font-semibold mb-4 text-gray-800">Financial Information</h3>
                                <div className="overflow-x-auto rounded-lg shadow">
                                    <table className="w-full border-collapse bg-white">
                                        <thead>
                                            <tr className="bg-gray-50 border-b border-gray-200">
                                                <th className="py-4 px-6 text-left font-semibold text-gray-700">User ID</th>
                                                <th className="py-4 px-6 text-left font-semibold text-gray-700">Total Balance</th>
                                                <th className="py-4 px-6 text-left font-semibold text-gray-700">Last Login Date</th>
                                                <th className="py-4 px-6 text-left font-semibold text-gray-700">Total Deposit</th>
                                                <th className="py-4 px-6 text-left font-semibold text-gray-700">Total Withdrawal</th>
                                                <th className="py-4 px-6 text-left font-semibold text-gray-700">Total Recharge</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr className="hover:bg-gray-50 transition-colors">
                                                <td className="py-4 px-6 border-b border-gray-200 font-medium text-blue-600">{userData.userId}</td>
                                                <td className="py-4 px-6 border-b border-gray-200 font-bold text-green-600">{userData.totalBalance}</td>
                                                <td className="py-4 px-6 border-b border-gray-200">{userData.lastLoginDate}</td>
                                                <td className="py-4 px-6 border-b border-gray-200">{userData.totalDeposit}</td>
                                                <td className="py-4 px-6 border-b border-gray-200 text-red-600">{userData.totalWithdrawal}</td>
                                                <td className="py-4 px-6 border-b border-gray-200 font-medium text-purple-600">{userData.totalRecharge}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>

                                {/* Stats Cards */}
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                                    <div className="bg-white p-6 rounded-lg shadow border-l-4 border-green-500">
                                        <h4 className="text-gray-500 text-sm font-medium">Available Balance</h4>
                                        <p className="text-2xl font-bold text-gray-800 mt-2">$2,450.00</p>
                                    </div>
                                    <div className="bg-white p-6 rounded-lg shadow border-l-4 border-blue-500">
                                        <h4 className="text-gray-500 text-sm font-medium">Total Wins</h4>
                                        <p className="text-2xl font-bold text-gray-800 mt-2">$8,720.00</p>
                                    </div>
                                    <div className="bg-white p-6 rounded-lg shadow border-l-4 border-purple-500">
                                        <h4 className="text-gray-500 text-sm font-medium">Active Bets</h4>
                                        <p className="text-2xl font-bold text-gray-800 mt-2">3</p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === "history" && (
                            <div>
                                <h2 className="text-2xl font-bold mb-6 text-gray-800">Bet History</h2>
                                <div className="overflow-x-auto rounded-lg shadow">
                                    <table className="w-full border-collapse bg-white">
                                        <thead>
                                            <tr className="bg-gray-50">
                                                <th className="py-3 px-4 text-left font-semibold text-gray-700 border-b border-gray-200">Date</th>
                                                <th className="py-3 px-4 text-left font-semibold text-gray-700 border-b border-gray-200">Event</th>
                                                <th className="py-3 px-4 text-left font-semibold text-gray-700 border-b border-gray-200">Bet Amount</th>
                                                <th className="py-3 px-4 text-left font-semibold text-gray-700 border-b border-gray-200">Odds</th>
                                                <th className="py-3 px-4 text-left font-semibold text-gray-700 border-b border-gray-200">Potential Win</th>
                                                <th className="py-3 px-4 text-left font-semibold text-gray-700 border-b border-gray-200">Status</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr className="hover:bg-gray-50 transition-colors">
                                                <td className="py-3 px-4 border-b border-gray-200">2025-08-21 14:30</td>
                                                <td className="py-3 px-4 border-b border-gray-200">Manchester United vs Chelsea</td>
                                                <td className="py-3 px-4 border-b border-gray-200">$50.00</td>
                                                <td className="py-3 px-4 border-b border-gray-200">2.5</td>
                                                <td className="py-3 px-4 border-b border-gray-200">$125.00</td>
                                                <td className="py-3 px-4 border-b border-gray-200">
                                                    <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">Won</span>
                                                </td>
                                            </tr>
                                            <tr className="hover:bg-gray-50 transition-colors">
                                                <td className="py-3 px-4 border-b border-gray-200">2025-08-20 21:15</td>
                                                <td className="py-3 px-4 border-b border-gray-200">LA Lakers vs Chicago Bulls</td>
                                                <td className="py-3 px-4 border-b border-gray-200">$30.00</td>
                                                <td className="py-3 px-4 border-b border-gray-200">1.8</td>
                                                <td className="py-3 px-4 border-b border-gray-200">$54.00</td>
                                                <td className="py-3 px-4 border-b border-gray-200">
                                                    <span className="px-2 py-1 bg-red-100 text-red-800 text-xs font-medium rounded-full">Lost</span>
                                                </td>
                                            </tr>
                                            <tr className="hover:bg-gray-50 transition-colors">
                                                <td className="py-3 px-4 border-b border-gray-200">2025-08-19 19:45</td>
                                                <td className="py-3 px-4 border-b border-gray-200">Djokovic vs Nadal</td>
                                                <td className="py-3 px-4 border-b border-gray-200">$75.00</td>
                                                <td className="py-3 px-4 border-b border-gray-200">3.2</td>
                                                <td className="py-3 px-4 border-b border-gray-200">$240.00</td>
                                                <td className="py-3 px-4 border-b border-gray-200">
                                                    <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs font-medium rounded-full">Pending</span>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserInformation;