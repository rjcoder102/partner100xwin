import React, { useState, useEffect, useMemo, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import DashboardHeader from "./DashboardHeader";
import { fetchDownlineUsers } from "../Redux/reducer/downlineSlicer";
import { Link } from "react-router-dom";

const DownlineUser = () => {
    const [activeTab, setActiveTab] = useState("active");
    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const dispatch = useDispatch();

    // Redux store se users + loading + error - with proper fallback for undefined state
    const { users, loading, error } = useSelector((state) => state.downline || {});

    // ✅ API call with all filters
    useEffect(() => {
        dispatch(fetchDownlineUsers({ filter, startDate, endDate }));
    }, [dispatch, filter, startDate, endDate]);

    // Memoized filtered users for better performance with fallback for undefined users
    const filteredUsers = useMemo(() => {
        const userList = users || [];
        return userList.filter(
            (u) =>
                (u.username?.toLowerCase().includes(search.toLowerCase()) ||
                    u.name?.toLowerCase().includes(search.toLowerCase()) ||
                    u.email?.toLowerCase().includes(search.toLowerCase()) ||
                    u.contact?.includes(search)) &&
                (activeTab === "active" ? u.status === 1 : u.status !== 1)
        );
    }, [users, search, activeTab]);

    // Pagination settings
    const itemsPerPage = 10;
    const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);

    // Memoized paginated users
    const paginatedUsers = useMemo(() => {
        return filteredUsers.slice(
            (currentPage - 1) * itemsPerPage,
            currentPage * itemsPerPage
        );
    }, [filteredUsers, currentPage, itemsPerPage]);

    const handleResetFilters = useCallback(() => {
        setFilter("");
        setStartDate("");
        setEndDate("");
        setSearch("");
        setCurrentPage(1);
    }, []);

    // Stats for summary cards with fallback for undefined users
    const stats = useMemo(() => {
        const userList = users || [];
        const activeUsers = userList.filter(u => u.status === 1).length;
        const inactiveUsers = userList.filter(u => u.status !== 1).length;

        return {
            total: userList.length,
            active: activeUsers,
            inactive: inactiveUsers,
            filtered: filteredUsers.length
        };
    }, [users, filteredUsers]);

    return (
        <>
            <div className="max-w-6xl mx-auto pt-4 min-h-[100vh]">
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
                        <p className="text-2xl font-bold">{stats.total}</p>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow">
                        <p className="text-gray-500 text-sm">Active Users</p>
                        <p className="text-2xl font-bold">{stats.active}</p>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow">
                        <p className="text-gray-500 text-sm">Inactive Users</p>
                        <p className="text-2xl font-bold">{stats.inactive}</p>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow">
                        <p className="text-gray-500 text-sm">Filtered Results</p>
                        <p className="text-2xl font-bold">{stats.filtered}</p>
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
                                {/* Mobile Cards View */}
                                <div className="block md:hidden space-y-4 p-4">
                                    {paginatedUsers.map((user, i) => (
                                        <div key={user.id || i} className="bg-white rounded-xl shadow-md p-4 border border-gray-100">
                                            <div className="flex justify-between items-start mb-3">
                                                <div>
                                                    <h3 className="font-semibold text-gray-800">{user.name}</h3>
                                                    <p className="text-sm text-gray-500">@{user.username}</p>
                                                </div>
                                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${user.status === 1 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                                    {user.status === 1 ? 'Active' : 'Inactive'}
                                                </span>
                                            </div>

                                            <div className="grid grid-cols-2 gap-2 text-sm mb-3">
                                                <div className="text-gray-500">Role:</div>
                                                <div className="text-gray-800">{user.role}</div>

                                                <div className="text-gray-500">Email:</div>
                                                <div className="text-gray-800 truncate">{user.email}</div>

                                                <div className="text-gray-500">Contact:</div>
                                                <div className="text-gray-800">{user.contact || '-'}</div>

                                                <div className="text-gray-500">Balance:</div>
                                                <div className="text-gray-800">${user.balance}</div>

                                                <div className="text-gray-500">Joined:</div>
                                                <div className="text-gray-800">{user.created_at ? new Date(user.created_at).toLocaleDateString() : '-'}</div>
                                            </div>

                                            <div className="flex justify-between items-center pt-3 border-t border-gray-100">
                                                <Link
                                                    to="/userInformation"
                                                    className="bg-blue-500 text-white px-3 py-1.5 rounded-lg text-xs hover:bg-blue-600 transition-colors flex items-center"
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                                    </svg>
                                                    Profile
                                                </Link>

                                                <div className="flex space-x-2">
                                                    <button className="p-1.5 text-gray-400 hover:text-blue-500 hover:bg-blue-50 rounded-full transition-colors">
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                        </svg>
                                                    </button>
                                                    <button className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors">
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                        </svg>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}

                                    {filteredUsers.length === 0 && (
                                        <div className="bg-white rounded-xl shadow-md p-8 text-center">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-400 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                            <h3 className="text-lg font-medium text-gray-700 mb-1">No users found</h3>
                                            <p className="text-gray-500">Try adjusting your search or filter criteria</p>
                                        </div>
                                    )}
                                </div>

                                {/* Desktop Table View */}
                                <div className="hidden md:block bg-white rounded-xl shadow-md overflow-hidden">
                                    <div className="overflow-x-auto">
                                        <table className="w-full">
                                            <thead>
                                                <tr className="bg-gray-50 text-gray-700 text-left">
                                                    <th className="p-4 font-semibold text-xs uppercase tracking-wider whitespace-nowrap">Sr. No</th>
                                                    <th className="p-4 font-semibold text-xs uppercase tracking-wider">Username</th>
                                                    <th className="p-4 font-semibold text-xs uppercase tracking-wider">Name</th>
                                                    <th className="p-4 font-semibold text-xs uppercase tracking-wider">Role</th>
                                                    <th className="p-4 font-semibold text-xs uppercase tracking-wider">Contact</th>
                                                    <th className="p-4 font-semibold text-xs uppercase tracking-wider">Email</th>
                                                    <th className="p-4 font-semibold text-xs uppercase tracking-wider">Credit</th>
                                                    <th className="p-4 font-semibold text-xs uppercase tracking-wider">Balance</th>
                                                    <th className="p-4 font-semibold text-xs uppercase tracking-wider">P/L</th>
                                                    <th className="p-4 font-semibold text-xs uppercase tracking-wider">Exposure</th>
                                                    <th className="p-4 font-semibold text-xs uppercase tracking-wider">Joined</th>
                                                    <th className="p-4 font-semibold text-xs uppercase tracking-wider">Last Login</th>
                                                    <th className="p-4 font-semibold text-xs uppercase tracking-wider">Status</th>
                                                    <th className="p-4 font-semibold text-xs uppercase tracking-wider text-center">Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-gray-100">
                                                {paginatedUsers.map((user, i) => (
                                                    <tr
                                                        key={user.id || i}
                                                        className="hover:bg-gray-50 transition-colors"
                                                    >
                                                        <td className="p-4 text-gray-600">{(currentPage - 1) * itemsPerPage + i + 1}</td>
                                                        <td className="p-4">
                                                            <div className="flex items-center">
                                                                <div className="h-10 w-10 flex-shrink-0 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                                                                    <span className="font-medium text-blue-600">{user.username?.charAt(0).toUpperCase() || 'U'}</span>
                                                                </div>
                                                                <div>
                                                                    <div className="font-medium text-gray-900">{user.username}</div>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td className="p-4 text-gray-900 font-medium">{user.name}</td>
                                                        <td className="p-4">
                                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                                                                {user.role}
                                                            </span>
                                                        </td>
                                                        <td className="p-4 text-gray-600">{user.contact || '-'}</td>
                                                        <td className="p-4 text-gray-600">{user.email}</td>
                                                        <td className="p-4 text-gray-900 font-medium">${user.credit || 0}</td>
                                                        <td className="p-4">
                                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                                                ${user.balance || 0}
                                                            </span>
                                                        </td>
                                                        <td className="p-4">
                                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${(user.profit_loss || 0) >= 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                                                {(user.profit_loss || 0) >= 0 ? '+' : ''}{user.profit_loss || 0}%
                                                            </span>
                                                        </td>
                                                        <td className="p-4 text-gray-600">{user.exposure_limit || 0}</td>
                                                        <td className="p-4 text-gray-600 whitespace-nowrap">{user.created_at ? new Date(user.created_at).toLocaleDateString() : '-'}</td>
                                                        <td className="p-4 text-gray-600">
                                                            {user.last_login
                                                                ? new Date(user.last_login).toLocaleString()
                                                                : "-"}
                                                        </td>
                                                        <td className="p-4">
                                                            {user.status === 1 ? (
                                                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                                                    <svg className="-ml-0.5 mr-1.5 h-2 w-2 text-green-400" fill="currentColor" viewBox="0 0 8 8">
                                                                        <circle cx={4} cy={4} r={3} />
                                                                    </svg>
                                                                    Active
                                                                </span>
                                                            ) : (
                                                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                                                                    <svg className="-ml-0.5 mr-1.5 h-2 w-2 text-red-400" fill="currentColor" viewBox="0 0 8 8">
                                                                        <circle cx={4} cy={4} r={3} />
                                                                    </svg>
                                                                    Inactive
                                                                </span>
                                                            )}
                                                        </td>
                                                        <td className="p-4">
                                                            <div className="flex justify-center space-x-2">
                                                                <Link
                                                                    to={`/userInformation/${user?.id}`}
                                                                    className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition-colors"
                                                                    title="View Profile"
                                                                >
                                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                                                    </svg>
                                                                </Link>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>

                                        {filteredUsers.length === 0 && (
                                            <div className="text-center py-12">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                                <h3 className="text-lg font-medium text-gray-700 mb-2">No users found</h3>
                                                <p className="text-gray-500">Try adjusting your search or filter criteria</p>
                                            </div>
                                        )}
                                    </div>

                                    {/* Pagination */}
                                    {filteredUsers.length > 0 && (
                                        <div className="px-6 py-4 border-t border-gray-100 bg-gray-50">
                                            <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
                                                <div className="text-sm text-gray-700">
                                                    Showing <span className="font-medium">{(currentPage - 1) * itemsPerPage + 1}</span> to{" "}
                                                    <span className="font-medium">
                                                        {Math.min(currentPage * itemsPerPage, filteredUsers.length)}
                                                    </span> of <span className="font-medium">{filteredUsers.length}</span> results
                                                </div>
                                                <div className="flex space-x-1">
                                                    <button
                                                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                                                        disabled={currentPage === 1}
                                                        className={`px-3 py-1.5 rounded-md text-sm font-medium ${currentPage === 1
                                                            ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                                                            : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-300"
                                                            }`}
                                                    >
                                                        Previous
                                                    </button>
                                                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                                                        (page) => (
                                                            <button
                                                                key={page}
                                                                onClick={() => setCurrentPage(page)}
                                                                className={`px-3 py-1.5 rounded-md text-sm font-medium ${currentPage === page
                                                                    ? "bg-blue-600 text-white"
                                                                    : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-300"
                                                                    }`}
                                                            >
                                                                {page}
                                                            </button>
                                                        )
                                                    )}
                                                    <button
                                                        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                                                        disabled={currentPage === totalPages}
                                                        className={`px-3 py-1.5 rounded-md text-sm font-medium ${currentPage === totalPages
                                                            ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                                                            : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-300"
                                                            }`}
                                                    >
                                                        Next
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default DownlineUser;