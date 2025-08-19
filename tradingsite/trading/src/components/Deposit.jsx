import React, { useMemo, useState } from 'react';
import DashboardHeader from './DashboardHeader';
import { FiCopy, FiArrowLeft, FiArrowRight } from 'react-icons/fi';

const Deposit = () => {
    // Enhanced sample data with more realistic entries
    const initialDeposits = [
        {
            id: "DPT-982341",
            user: {
                name: "Aman Sharma",
                email: "aman@example.com",
                avatar: "https://randomuser.me/api/portraits/men/32.jpg"
            },
            method: {
                name: "UPI",
                icon: "💸",
                color: "bg-purple-100 text-purple-800"
            },
            amount: 12500,
            currency: "INR",
            fee: 10,
            status: "Completed",
            createdAt: new Date().toISOString().slice(0, 16).replace("T", " "),
        },
        {
            id: "DPT-982345",
            user: {
                name: "Priya Patel",
                email: "priya@example.com",
                avatar: "https://randomuser.me/api/portraits/women/44.jpg"
            },
            method: {
                name: "Paytm Wallet",
                icon: "📱",
                color: "bg-blue-100 text-blue-800"
            },
            amount: 8500,
            currency: "INR",
            fee: 0,
            status: "Completed",
            createdAt: new Date(Date.now() - 86400000).toISOString().slice(0, 16).replace("T", " "), // Yesterday
        },
        {
            id: "DPT-982342",
            user: {
                name: "Rahul Verma",
                email: "rahul@example.com",
                avatar: "https://randomuser.me/api/portraits/men/67.jpg"
            },
            method: {
                name: "Bank Transfer",
                icon: "🏦",
                color: "bg-green-100 text-green-800"
            },
            amount: 25000,
            currency: "INR",
            fee: 0,
            status: "Pending",
            createdAt: new Date(Date.now() - 172800000).toISOString().slice(0, 16).replace("T", " "), // 2 days ago
        },
        {
            id: "DPT-982343",
            user: {
                name: "Neha Gupta",
                email: "neha@example.com",
                avatar: "https://randomuser.me/api/portraits/women/63.jpg"
            },
            method: {
                name: "Credit Card",
                icon: "💳",
                color: "bg-yellow-100 text-yellow-800"
            },
            amount: 7499,
            currency: "INR",
            fee: 75,
            status: "Failed",
            createdAt: new Date(Date.now() - 259200000).toISOString().slice(0, 16).replace("T", " "), // 3 days ago
        },
        {
            id: "DPT-982344",
            user: {
                name: "Vikram Singh",
                email: "vikram@example.com",
                avatar: "https://randomuser.me/api/portraits/men/71.jpg"
            },
            method: {
                name: "Google Pay",
                icon: "📲",
                color: "bg-teal-100 text-teal-800"
            },
            amount: 5600,
            currency: "INR",
            fee: 0,
            status: "Completed",
            createdAt: new Date(Date.now() - 345600000).toISOString().slice(0, 16).replace("T", " "), // 4 days ago
        },
        {
            id: "DPT-982346",
            user: {
                name: "Ananya Joshi",
                email: "ananya@example.com",
                avatar: "https://randomuser.me/api/portraits/women/33.jpg"
            },
            method: {
                name: "PhonePe",
                icon: "📱",
                color: "bg-indigo-100 text-indigo-800"
            },
            amount: 3200,
            currency: "INR",
            fee: 0,
            status: "Completed",
            createdAt: new Date(Date.now() - 432000000).toISOString().slice(0, 16).replace("T", " "), // 5 days ago
        },
        {
            id: "DPT-982347",
            user: {
                name: "Rohan Malhotra",
                email: "rohan@example.com",
                avatar: "https://randomuser.me/api/portraits/men/45.jpg"
            },
            method: {
                name: "Net Banking",
                icon: "💻",
                color: "bg-orange-100 text-orange-800"
            },
            amount: 15000,
            currency: "INR",
            fee: 0,
            status: "Pending",
            createdAt: new Date(Date.now() - 518400000).toISOString().slice(0, 16).replace("T", " "), // 6 days ago
        }
    ];

    const statusStyles = {
        Completed: { bg: "bg-green-100", text: "text-green-800", dot: "bg-green-500" },
        Pending: { bg: "bg-yellow-100", text: "text-yellow-800", dot: "bg-yellow-500" },
        Failed: { bg: "bg-red-100", text: "text-red-800", dot: "bg-red-500" },
    };

    function currency(amount, code = "INR") {
        try {
            return new Intl.NumberFormat("en-IN", {
                style: "currency",
                currency: code,
                minimumFractionDigits: 0
            }).format(amount);
        } catch (e) {
            return `${code} ${amount}`;
        }
    }

    const [filter, setFilter] = useState("month"); // day, week, month
    const [dateFilter, setDateFilter] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    // Filtering Logic
    const filteredDeposits = useMemo(() => {
        let data = [...initialDeposits];
        const today = new Date();

        if (filter === "day") {
            data = data.filter(
                (d) => new Date(d.createdAt).toDateString() === today.toDateString()
            );
        } else if (filter === "week") {
            const weekAgo = new Date();
            weekAgo.setDate(today.getDate() - 7);
            data = data.filter(
                (d) => new Date(d.createdAt) >= weekAgo && new Date(d.createdAt) <= today
            );
        } else if (filter === "month") {
            const monthAgo = new Date();
            monthAgo.setMonth(today.getMonth() - 1);
            data = data.filter(
                (d) => new Date(d.createdAt) >= monthAgo && new Date(d.createdAt) <= today
            );
        }

        if (dateFilter) {
            data = data.filter((d) => d.createdAt.slice(0, 10) === dateFilter);
        }

        // Sort by newest first
        return data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }, [filter, dateFilter]);

    // Pagination Logic
    const totalPages = Math.ceil(filteredDeposits.length / itemsPerPage);
    const paginatedDeposits = useMemo(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        return filteredDeposits.slice(startIndex, startIndex + itemsPerPage);
    }, [filteredDeposits, currentPage]);

    // Summary Stats
    const summary = useMemo(() => {
        const totalDeposits = filteredDeposits.length;
        const totalAmount = filteredDeposits.reduce(
            (sum, d) => sum + d.amount,
            0
        );
        const successful = filteredDeposits.filter(
            (d) => d.status === "Completed"
        ).length;
        const uniqueUsers = new Set(filteredDeposits.map(d => d.user.name)).size;

        return { totalDeposits, totalAmount, successful, uniqueUsers };
    }, [filteredDeposits]);

    const copyToClipboard = (text) => {
        navigator.clipboard?.writeText(text);
    };

    return (
        <div className="min-h-screen bg-gray-100">
            <DashboardHeader />

            <div className="max-w-6xl mx-auto md:p-1 sm:p-6">
                {/* Summary Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                    <div className="bg-white shadow rounded-xl p-4 border-l-4 border-blue-500">
                        <p className="text-gray-500 text-sm font-medium">Total Deposits</p>
                        <p className="text-2xl font-bold text-gray-800">
                            {summary.totalDeposits}
                        </p>
                        <p className="text-xs text-gray-400 mt-1">All payment methods</p>
                    </div>
                    <div className="bg-white shadow rounded-xl p-4 border-l-4 border-green-500">
                        <p className="text-gray-500 text-sm font-medium">Total Amount</p>
                        <p className="text-2xl font-bold text-gray-800">
                            {currency(summary.totalAmount)}
                        </p>
                        <p className="text-xs text-gray-400 mt-1">Current period</p>
                    </div>
                    <div className="bg-white shadow rounded-xl p-4 border-l-4 border-purple-500">
                        <p className="text-gray-500 text-sm font-medium">
                            Successful Deposits
                        </p>
                        <p className="text-2xl font-bold text-gray-800">
                            {summary.successful}
                        </p>
                        <p className="text-xs text-gray-400 mt-1">
                            {filteredDeposits.length > 0
                                ? `${Math.round(
                                    (summary.successful / filteredDeposits.length) * 100
                                )}% success rate`
                                : "No data"}
                        </p>
                    </div>
                    <div className="bg-white shadow rounded-xl p-4 border-l-4 border-orange-500">
                        <p className="text-gray-500 text-sm font-medium">
                            Unique Users
                        </p>
                        <p className="text-2xl font-bold text-gray-800">
                            {summary.uniqueUsers}
                        </p>
                        <p className="text-xs text-gray-400 mt-1">
                            {filteredDeposits.length > 0
                                ? `Avg ${(filteredDeposits.length / summary.uniqueUsers).toFixed(1)} deposits per user`
                                : "No data"}
                        </p>
                    </div>
                </div>

                {/* Filters */}
                <div className="bg-white shadow-md rounded-xl p-4 mb-6">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        {/* Time Period Buttons */}
                        <div className="flex flex-wrap gap-2">
                            {["day", "week", "month"].map((type) => (
                                <button
                                    key={type}
                                    onClick={() => {
                                        setFilter(type);
                                        setCurrentPage(1);
                                    }}
                                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${filter === type
                                            ? "bg-blue-600 text-white shadow-md"
                                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                        }`}
                                >
                                    {type.charAt(0).toUpperCase() + type.slice(1)}
                                </button>
                            ))}
                        </div>

                        {/* Date Filter */}
                        <div className="flex items-center gap-2">
                            <span className="text-sm text-gray-600 font-medium">
                                Specific Date:
                            </span>
                            <input
                                type="date"
                                value={dateFilter}
                                onChange={(e) => {
                                    setDateFilter(e.target.value);
                                    setCurrentPage(1);
                                }}
                                className="border border-gray-300 px-3 py-2 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                            />
                        </div>
                    </div>
                </div>

                {/* Deposits Table */}
                <div className="bg-white shadow-md rounded-xl overflow-hidden mb-8">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50">
                                <tr className="text-gray-600 text-sm">
                                    <th className="p-4 font-semibold text-left">Transaction</th>
                                    <th className="p-4 font-semibold text-left">User</th>
                                    <th className="p-4 font-semibold text-left">Method</th>
                                    <th className="p-4 font-semibold text-left">Amount</th>
                                    <th className="p-4 font-semibold text-left">Status</th>
                                    <th className="p-4 font-semibold text-left">Date</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {paginatedDeposits.length > 0 ? (
                                    paginatedDeposits.map((d) => (
                                        <tr
                                            key={d.id}
                                            className="hover:bg-gray-50 transition-colors"
                                        >
                                            <td className="p-4">
                                                <div className="flex items-center">
                                                    <button
                                                        onClick={() => copyToClipboard(d.id)}
                                                        className="mr-2 text-gray-400 hover:text-blue-500 transition-colors"
                                                        title="Copy Transaction ID"
                                                    >
                                                        <FiCopy className="w-4 h-4" />
                                                    </button>
                                                    <span className="text-sm font-medium text-gray-700">
                                                        {d.id}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="p-4">
                                                <div className="flex items-center">
                                                    <img
                                                        src={d.user.avatar}
                                                        alt={d.user.name}
                                                        className="w-8 h-8 rounded-full mr-3"
                                                    />
                                                    <div>
                                                        <p className="text-sm font-medium text-gray-900">{d.user.name}</p>
                                                        <p className="text-xs text-gray-500">{d.user.email}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="p-4">
                                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${d.method.color}`}>
                                                    <span className="mr-1">{d.method.icon}</span>
                                                    {d.method.name}
                                                </span>
                                            </td>
                                            <td className="p-4">
                                                <p className="text-sm font-semibold text-gray-900">
                                                    {currency(d.amount, d.currency)}
                                                </p>
                                                {d.fee > 0 && (
                                                    <p className="text-xs text-gray-500">
                                                        Fee: {currency(d.fee, d.currency)}
                                                    </p>
                                                )}
                                            </td>
                                            <td className="p-4">
                                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusStyles[d.status].bg} ${statusStyles[d.status].text}`}>
                                                    <span className={`w-2 h-2 rounded-full ${statusStyles[d.status].dot} mr-1.5`}></span>
                                                    {d.status}
                                                </span>
                                            </td>
                                            <td className="p-4">
                                                <p className="text-sm text-gray-900">
                                                    {new Date(d.createdAt).toLocaleDateString('en-US', {
                                                        month: 'short',
                                                        day: 'numeric'
                                                    })}
                                                </p>
                                                <p className="text-xs text-gray-500">
                                                    {new Date(d.createdAt).toLocaleTimeString('en-US', {
                                                        hour: '2-digit',
                                                        minute: '2-digit'
                                                    })}
                                                </p>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td
                                            className="p-4 text-center text-gray-500 text-sm"
                                            colSpan="6"
                                        >
                                            No deposit records found
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    {filteredDeposits.length > 0 && (
                        <div className="flex items-center justify-between px-4 py-3 border-t border-gray-100">
                            <div className="text-sm text-gray-500">
                                Showing{" "}
                                <span className="font-medium">
                                    {(currentPage - 1) * itemsPerPage + 1}
                                </span>{" "}
                                to{" "}
                                <span className="font-medium">
                                    {Math.min(currentPage * itemsPerPage, filteredDeposits.length)}
                                </span>{" "}
                                of <span className="font-medium">{filteredDeposits.length}</span>{" "}
                                results
                            </div>
                            <div className="flex space-x-2">
                                <button
                                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
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
                                    onClick={() =>
                                        setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                                    }
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
                </div>
            </div>
        </div>
    );
};

export default Deposit;