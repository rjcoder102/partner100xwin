import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaCheck, FaTrash } from "react-icons/fa";
import DashboardHeader from "./DashboardHeader";
import { fetchDownlineUsers } from "../Redux/reducer/downlineSlicer";

const DownlineUser = () => {
    const [activeTab, setActiveTab] = useState("active");
    const [search, setSearch] = useState("");
    const dispatch = useDispatch();

    const { users, loading, error } = useSelector((state) => state.downline);
    console.log(users,"qwertyuio")
    const { token } = useSelector((state) => state.auth); // ✅ token from auth slice
const [filter,setFilter]=useState("")
    // Fetch data on mount
    useEffect(() => {
      
            dispatch(fetchDownlineUsers( filter));
    
    }, [dispatch, token]);

    // ✅ filter logic
    const filteredUsers = users.filter(
        (u) =>
            u.username?.toLowerCase().includes(search.toLowerCase()) &&
            u.status === activeTab
    );

    console.log("📌 Filtered Users:", filteredUsers);

    return (
        <>
            <DashboardHeader />

            <div className="max-w-6xl mx-auto p-4 bg-gray-900 min-h-[60vh] text-white">
                {/* Search */}
                <div className="flex justify-between items-center mb-4">
                    <input
                        type="text"
                        placeholder="Search..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-1/3 px-3 py-2 rounded-md border border-gray-600 bg-gray-800 text-white focus:outline-none focus:ring focus:ring-blue-500"
                    />
                </div>

                {/* Tabs */}
                <div className="flex justify-center mb-4">
                    <button
                        onClick={() => setActiveTab("active")}
                        className={`px-6 py-2 font-semibold border-b-2 ${activeTab === "active"
                                ? "border-green-500 text-green-400"
                                : "border-transparent"
                            }`}
                    >
                        ACTIVE
                    </button>
                    <button
                        onClick={() => setActiveTab("inactive")}
                        className={`px-6 py-2 font-semibold border-b-2 ${activeTab === "inactive"
                                ? "border-green-500 text-green-400"
                                : "border-transparent"
                            }`}
                    >
                        INACTIVE
                    </button>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                    {loading ? (
                        <p className="text-center text-gray-400">Loading users...</p>
                    ) : error ? (
                        <p className="text-center text-red-400">{error}</p>
                    ) : (
                        <table className="min-w-full border border-gray-700 text-sm">
                            <thead>
                                <tr className="bg-yellow-500 text-gray-900 text-left">
                                    <th className="p-2">Sr. No</th>
                                    <th className="p-2">Username</th>
                                    <th className="p-2">Role</th>
                                    <th className="p-2">Contact</th>
                                    <th className="p-2">Referred By</th>
                                    <th className="p-2">C/L</th>
                                    <th className="p-2">Limit</th>
                                    <th className="p-2">C/PL</th>
                                    <th className="p-2">C/BL</th>
                                    <th className="p-2">Expo</th>
                                    <th className="p-2">Av.BL</th>
                                    <th className="p-2">Status</th>
                                    <th className="p-2">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredUsers.map((user, i) => (
                                    <tr
                                        key={user.id}
                                        className="border-t border-gray-700 hover:bg-gray-800 transition"
                                    >
                                        <td className="p-2">{i + 1}</td>
                                        <td className="p-2">{user.username}</td>
                                        <td className="p-2">{user.role}</td>
                                        <td className="p-2">{user.contact}</td>
                                        <td className="p-2">{user.referredBy || "-"}</td>
                                        <td className="p-2">0</td>
                                        <td className="p-2">0.00</td>
                                        <td className="p-2">-</td>
                                        <td className="p-2">-</td>
                                        <td className="p-2">0.00</td>
                                        <td className="p-2">0.00</td>
                                        <td className="p-2">
                                            {user.status === "active" ? (
                                                <FaCheck className="text-green-400" />
                                            ) : (
                                                <span className="text-red-400">✖</span>
                                            )}
                                        </td>
                                        <td className="p-2 flex gap-2">
                                            <button className="bg-green-500 text-white px-2 py-1 rounded text-xs">
                                                D
                                            </button>
                                            <button className="bg-orange-500 text-white px-2 py-1 rounded text-xs">
                                                W
                                            </button>
                                            <button className="bg-yellow-500 text-gray-900 px-2 py-1 rounded text-xs">
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
                                            colSpan="13"
                                            className="text-center p-4 text-gray-400"
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
