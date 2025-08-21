import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaCheck, FaTrash } from "react-icons/fa";
import DashboardHeader from "./DashboardHeader";
import { fetchDownlineUsers } from "../Redux/reducer/downlineSlicer";

const DownlineUser = () => {
    const [activeTab, setActiveTab] = useState("active");
    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState("");
    const dispatch = useDispatch();

    // Redux store se users + loading + error
    const { users, loading, error } = useSelector((state) => state.downline);
    const { token } = useSelector((state) => state.auth);

    // ✅ API call
    useEffect(() => {
        dispatch(fetchDownlineUsers(filter));
    }, [dispatch, token, filter]);

    // ✅ Search + Active/Inactive filter
    const filteredUsers = users.filter(
        (u) =>
            u.username?.toLowerCase().includes(search.toLowerCase()) &&
            (activeTab === "active" ? u.status === 1 : u.status !== 1)
    );

    return (
        <>
            <DashboardHeader />

            <div className="max-w-6xl mx-auto p-4 min-h-[60vh]">
                {/* 🔍 Search */}
                <div className="flex justify-between items-center mb-4">
                    <input
                        type="text"
                        placeholder="Search..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-1/3 px-3 py-2 rounded-md border border-gray-300 text-gray-800 focus:outline-none focus:ring focus:ring-blue-500"
                    />
                </div>

                {/* 🔄 Tabs */}
                <div className="flex justify-center mb-4">
                    <button
                        onClick={() => setActiveTab("active")}
                        className={`px-6 py-2 font-semibold border-b-2 ${activeTab === "active"
                            ? "border-green-600 text-green-600"
                            : "border-transparent text-gray-600"
                            }`}
                    >
                        ACTIVE
                    </button>
                    <button
                        onClick={() => setActiveTab("inactive")}
                        className={`px-6 py-2 font-semibold border-b-2 ${activeTab === "inactive"
                            ? "border-green-600 text-green-600"
                            : "border-transparent text-gray-600"
                            }`}
                    >
                        INACTIVE
                    </button>
                </div>

                {/* 📊 Table */}
                <div className="overflow-x-auto">
                    {loading ? (
                        <p className="text-center text-gray-500">Loading users...</p>
                    ) : error ? (
                        <p className="text-center text-red-500">{error}</p>
                    ) : (
                        <table className="min-w-full border border-gray-200 text-sm">
                            <thead>
                                <tr className="bg-gray-100 text-gray-700 text-left">
                                    <th className="p-2">Sr. No</th>
                                    <th className="p-2">Username</th>
                                    <th className="p-2">Name</th>
                                    <th className="p-2">Role</th>
                                    <th className="p-2">Contact</th>
                                    <th className="p-2">Email</th>
                                    <th className="p-2">Referred By</th>
                                    <th className="p-2">Credit</th>
                                    <th className="p-2">Balance</th>
                                    <th className="p-2">Profit/Loss</th>
                                    <th className="p-2">Upper Points</th>
                                    <th className="p-2">Exposure</th>
                                    <th className="p-2">Casino Balance</th>
                                    <th className="p-2">Joined</th>
                                    <th className="p-2">Last Login</th>
                                    <th className="p-2">Status</th>
                                    <th className="p-2">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredUsers.map((user, i) => (
                                    <tr
                                        key={user.id}
                                        className="border-t border-gray-200 hover:bg-gray-50 transition"
                                    >
                                        <td className="p-2">{i + 1}</td>
                                        <td className="p-2">{user.username}</td>
                                        <td className="p-2">{user.name}</td>
                                        <td className="p-2">{user.role}</td>
                                        <td className="p-2">{user.contact}</td>
                                        <td className="p-2">{user.email}</td>
                                        <td className="p-2">{user.referer_name || "-"}</td>
                                        <td className="p-2">{user.credit}</td>
                                        <td className="p-2">{user.balance}</td>
                                        <td className="p-2">{user.profit_loss}</td>
                                        <td className="p-2">{user.upperpoints}</td>
                                        <td className="p-2">{user.exposure_limit}</td>
                                        <td className="p-2">{user.casino_balance}</td>
                                        <td className="p-2">
                                            {new Date(user.created_at).toLocaleDateString()}
                                        </td>
                                        <td className="p-2">
                                            {user.last_login
                                                ? new Date(user.last_login).toLocaleString()
                                                : "-"}
                                        </td>
                                        <td className="p-2">
                                            {user.status === 1 ? (
                                                <FaCheck className="text-green-500" />
                                            ) : (
                                                <span className="text-red-500">✖</span>
                                            )}
                                        </td>
                                        <td className="p-2 flex gap-2">
                                            {/* ✅ Navigate with ID or index */}
                                            <button
                                                onClick={() => navigate(`/userinformation/${user.id}`)}
                                                className="bg-green-500 text-white px-2 py-1 rounded text-xs"
                                            >
                                                D
                                            </button>
                                            <button className="bg-orange-500 text-white px-2 py-1 rounded text-xs">
                                                W
                                            </button>
                                            <button className="bg-yellow-400 text-gray-900 px-2 py-1 rounded text-xs">
                                                P
                                            </button>
                                            <button className="bg-gray-500 text-white px-2 py-1 rounded text-xs">
                                                L
                                            </button>
                                            <button className="bg-blue-500 text-white px-2 py-1 rounded text-xs">
                                                More
                                            </button>
                                            <button className="bg-red-500 text-white px-2 py-1 rounded text-xs">
                                                <FaTrash />
                                            </button>
                                        </td>
                                    </tr>
                                ))}

                                {filteredUsers.length === 0 && (
                                    <tr>
                                        <td
                                            colSpan="17"
                                            className="text-center p-4 text-gray-500"
                                        >
                                            No users found
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
        </>
    );
};

export default DownlineUser;
