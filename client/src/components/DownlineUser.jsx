import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaCheck, FaTrash } from "react-icons/fa";
import DashboardHeader from "./DashboardHeader";
import { fetchDownlineUsers } from "../Redux/reducer/downlineSlicer";
import { Link, useLocation } from "react-router-dom";

const DownlineUser = () => {
    const [activeTab, setActiveTab] = useState("active");
    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const dispatch = useDispatch();

    // Redux store se users + loading + error
    const { users, loading, error } = useSelector((state) => state.downline);

    // ✅ API call with all filters
    useEffect(() => {
        dispatch(fetchDownlineUsers({ filter, startDate, endDate }));
    }, [dispatch, filter, startDate, endDate]);

    // ✅ Search + Active/Inactive filter
    const filteredUsers = users.filter(
        (u) =>
            (u.username?.toLowerCase().includes(search.toLowerCase()) ||
                u.name?.toLowerCase().includes(search.toLowerCase()) ||
                u.email?.toLowerCase().includes(search.toLowerCase()) ||
                u.contact?.includes(search)) &&
            (activeTab === "active" ? u.status === 1 : u.status !== 1)
    );

    // Pagination settings
    const itemsPerPage = 10;
    const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
    const paginatedUsers = filteredUsers.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const handleResetFilters = () => {
        setFilter("");
        setStartDate("");
        setEndDate("");
        setSearch("");
        setCurrentPage(1);
    };

    return (
        <>
            <div className="max-w-6xl mx-auto pt-4 min-h-[100vh] ">
                {/* Filters Section */}
                <div className="bg-white shadow-md rounded-lg p-4 mb-6">
                    <div className="w-full flex flex-col sm:flex-row sm:items-center md:justify-between gap-4">
                        {/* Time Period Buttons */}
                        <div className="flex flex-wrap gap-2">
                            {["", "day", "week", "month"].map((type) => (
                                <button
                                    key={type || "all"}
                                    onClick={() => {
                                        setFilter(type);
                                        setCurrentPage(1);
                                    }}
                                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${filter === type
                                            ? "bg-blue-600 text-white shadow-md"
                                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                        }`}
                                >
                                    {type ? type.charAt(0).toUpperCase() + type.slice(1) : "All Time"}
                                </button>
                            ))}
                        </div>

                        {/* 🔍 Search */}
                        <div className="flex-1">
                            <input
                                type="text"
                                placeholder="Search by username, name, email or contact..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="w-full px-3 py-2 rounded-md border border-gray-300 text-gray-800 focus:outline-none focus:ring focus:ring-blue-500"
                            />
                        </div>

                        {/* Reset Filters Button */}
                        <button
                            onClick={handleResetFilters}
                            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-300"
                        >
                            Reset 
                        </button>
                    </div>

                    {/* Date Range Filter */}
                    <div className="mt-4 flex flex-col sm:flex-row gap-4 items-center">
                        <div className="flex items-center gap-2">
                            <span className="text-sm text-gray-600 font-medium whitespace-nowrap">
                                Start Date:
                            </span>
                            <input
                                type="date"
                                value={startDate}
                                onChange={(e) => {
                                    setStartDate(e.target.value);
                                    setCurrentPage(1);
                                }}
                                className="border border-gray-300 px-3 py-2 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                            />
                        </div>

                        <div className="flex items-center gap-2">
                            <span className="text-sm text-gray-600 font-medium whitespace-nowrap">
                                End Date:
                            </span>
                            <input
                                type="date"
                                value={endDate}
                                onChange={(e) => {
                                    setEndDate(e.target.value);
                                    setCurrentPage(1);
                                }}
                                className="border border-gray-300 px-3 py-2 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                            />
                        </div>
                    </div>

                    {/* Active/Inactive Tabs */}
                    <div className="mt-4 flex border-b border-gray-200">
                        {["active", "inactive"].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`px-4 py-2 text-sm font-medium ${activeTab === tab
                                        ? "border-b-2 border-blue-500 text-blue-600"
                                        : "text-gray-500 hover:text-gray-700"
                                    }`}
                            >
                                {tab.charAt(0).toUpperCase() + tab.slice(1)} Users
                            </button>
                        ))}
                    </div>
                </div>

                {/* Stats Summary */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                    <div className="bg-white p-4 rounded-lg shadow">
                        <p className="text-gray-500 text-sm">Total Users</p>
                        <p className="text-2xl font-bold">{users.length}</p>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow">
                        <p className="text-gray-500 text-sm">Active Users</p>
                        <p className="text-2xl font-bold">
                            {users.filter(u => u.status === 1).length}
                        </p>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow">
                        <p className="text-gray-500 text-sm">Inactive Users</p>
                        <p className="text-2xl font-bold">
                            {users.filter(u => u.status !== 1).length}
                        </p>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow">
                        <p className="text-gray-500 text-sm">Filtered Results</p>
                        <p className="text-2xl font-bold">{filteredUsers.length}</p>
                    </div>
                </div>

                {/* 📊 Table */}
                <div className="bg-white shadow-md rounded-lg overflow-hidden">
                    <div className="overflow-x-auto">
                        {loading ? (
                            <div className="p-8 text-center text-gray-500">
                                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
                                <p className="mt-2">Loading users...</p>
                            </div>
                        ) : error ? (
                            <div className="p-8 text-center text-red-500">
                                <p>Error: {error}</p>
                                <button
                                    onClick={() => dispatch(fetchDownlineUsers({ filter, startDate, endDate }))}
                                    className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
                                >
                                    Retry
                                </button>
                            </div>
                        ) : (
                            <>
                                <table className="min-w-full bg-white border border-gray-50 text-sm ">
                                    <thead>
                                        <tr className="bg-gray-50 text-gray-700 text-left">
                                            <th className="p-3 font-semibold whitespace-nowrap">Sr. No</th>
                                            <th className="p-3 font-semibold">Username</th>
                                            <th className="p-3 font-semibold">Name</th>
                                            <th className="p-3 font-semibold">Role</th>
                                            <th className="p-3 font-semibold">Contact</th>
                                            <th className="p-3 font-semibold">Email</th>
                                            <th className="p-3 font-semibold">Credit</th>
                                            <th className="p-3 font-semibold">Balance</th>
                                            <th className="p-3 font-semibold">Profit/Loss</th>
                                            <th className="p-3 font-semibold">Exposure</th>
                                            <th className="p-3 font-semibold">Joined</th>
                                            <th className="p-3 font-semibold">Last Login</th>
                                            <th className="p-3 font-semibold">Status</th>
                                            <th className="p-3 font-semibold">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {paginatedUsers.map((user, i) => (
                                            <tr
                                                key={user.id}
                                                className="border-t border-gray-200 hover:bg-gray-50 transition"
                                            >
                                                <td className="p-3">{(currentPage - 1) * itemsPerPage + i + 1}</td>
                                                <td className="p-3">{user.username}</td>
                                                <td className="p-3">{user.name}</td>
                                                <td className="p-3">{user.role}</td>
                                                <td className="p-3">{user.contact}</td>
                                                <td className="p-3">{user.email}</td>
                                                <td className="p-3">{user.credit}</td>
                                                <td className="p-3">{user.balance}</td>
                                                <td className="p-3">{user.profit_loss}</td>
                                                <td className="p-3">{user.exposure_limit}</td>
                                                <td className="p-3">
                                                    {new Date(user.created_at).toLocaleDateString()}
                                                </td>
                                                <td className="p-3">
                                                    {user.last_login
                                                        ? new Date(user.last_login).toLocaleString()
                                                        : "-"}
                                                </td>
                                                <td className="p-3">
                                                    {user.status === 1 ? (
                                                        <span className="inline-flex items-center px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                                                            <FaCheck className="mr-1" /> Active
                                                        </span>
                                                    ) : (
                                                        <span className="inline-flex items-center px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs">
                                                            ✖ Inactive
                                                        </span>
                                                    )}
                                                </td>
                                                <td className="p-3">
                                                    <Link
                                                        to={"/userInformation"}
                                                        className="bg-blue-500 text-white px-3 py-1 rounded text-xs hover:bg-blue-600"
                                                    >
                                                        Profile
                                                    </Link>
                                                </td>
                                            </tr>
                                        ))}

                                        {filteredUsers.length === 0 && (
                                            <tr>
                                                <td
                                                    colSpan="14"
                                                    className="text-center p-6 text-gray-500"
                                                >
                                                    No users found matching your criteria
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>

                                {/* Pagination */}
                                {filteredUsers.length > 0 && (
                                    <div className="flex items-center justify-between px-4 py-3 border-t border-gray-200">
                                        <div className="text-sm text-gray-500">
                                            Showing{" "}
                                            <span className="font-medium">
                                                {(currentPage - 1) * itemsPerPage + 1}
                                            </span>{" "}
                                            to{" "}
                                            <span className="font-medium">
                                                {Math.min(currentPage * itemsPerPage, filteredUsers.length)}
                                            </span>{" "}
                                            of <span className="font-medium">{filteredUsers.length}</span>{" "}
                                            results
                                        </div>
                                        <div className="flex space-x-2">
                                            <button
                                                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                                                disabled={currentPage === 1}
                                                className={`px-3 py-1 rounded-md text-sm ${currentPage === 1
                                                        ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                                                        : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                                                    }`}
                                            >
                                                Previous
                                            </button>
                                            {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                                                (page) => (
                                                    <button
                                                        key={page}
                                                        onClick={() => setCurrentPage(page)}
                                                        className={`px-3 py-1 rounded-md text-sm ${currentPage === page
                                                                ? "bg-blue-600 text-white"
                                                                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                                                            }`}
                                                    >
                                                        {page}
                                                    </button>
                                                )
                                            )}
                                            <button
                                                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                                                disabled={currentPage === totalPages}
                                                className={`px-3 py-1 rounded-md text-sm ${currentPage === totalPages
                                                        ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                                                        : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                                                    }`}
                                            >
                                                Next
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default DownlineUser;