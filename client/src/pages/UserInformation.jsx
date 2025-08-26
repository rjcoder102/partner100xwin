import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchGameHistory } from "../Redux/reducer/downlineSlicer";

const UserInformation = () => {
    const [activeTab, setActiveTab] = useState("info"); // default active tab
    const dispatch = useDispatch();

    // Redux state
    // const { data, loading, error } = useSelector((state) => state.gameHistory);
    const data = useSelector((state) => state.gameHistory);
    const loading = loading || false;
    const error = error || null;

    // Sample user data
    const userData = {
        userId: "USR-78945612",
        totalBalance: "$2,450.00",
        lastLoginDate: "Aug 21, 2025 14:30",
        totalDeposit: "$5,200.00",
        totalWithdrawal: "$2,750.00",
        totalRecharge: "$8,950.00",
    };

    // Fetch game history when tab is active
    useEffect(() => {
        if (activeTab === "history") {
            dispatch(fetchGameHistory({ page: 1, size: 50 }));
        }
    }, [activeTab, dispatch]);

    return (
        <div className="min-h-screen">
            <div className="container mx-auto max-w-6xl pt-6">
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
                                <h2 className="text-2xl font-bold mb-6 text-gray-800">
                                    User Information
                                </h2>
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
                            </div>
                        )}

                        {activeTab === "history" && (
                            <div>
                                <h2 className="text-2xl font-bold mb-6 text-gray-800">Bet History</h2>

                                {/* Loading */}
                                {loading && (
                                    <div className="text-center py-10 text-gray-600">Loading game history...</div>
                                )}

                                {/* Error */}
                                {error && (
                                    <div className="text-center py-10 text-red-600">
                                        Error: {error.message || error}
                                    </div>
                                )}

                                {/* Data Table */}
                                {!loading && !error && data?.data?.length > 0 && (
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
                                                {data.data.map((bet) => (
                                                    <tr key={bet.id} className="hover:bg-gray-50 transition-colors">
                                                        <td className="py-3 px-4 border-b border-gray-200">{bet.date}</td>
                                                        <td className="py-3 px-4 border-b border-gray-200">{bet.event}</td>
                                                        <td className="py-3 px-4 border-b border-gray-200">${bet.betAmount}</td>
                                                        <td className="py-3 px-4 border-b border-gray-200">{bet.odds}</td>
                                                        <td className="py-3 px-4 border-b border-gray-200">${bet.potentialWin}</td>
                                                        <td className="py-3 px-4 border-b border-gray-200">
                                                            <span
                                                                className={`px-2 py-1 text-xs font-medium rounded-full ${bet.status === "Won"
                                                                    ? "bg-green-100 text-green-800"
                                                                    : bet.status === "Lost"
                                                                        ? "bg-red-100 text-red-800"
                                                                        : "bg-yellow-100 text-yellow-800"
                                                                    }`}
                                                            >
                                                                {bet.status}
                                                            </span>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                )}

                                {!loading && !error && data?.data?.length === 0 && (
                                    <div className="text-center py-10 text-gray-500">No bet history found.</div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserInformation;
