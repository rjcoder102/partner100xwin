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
        Pending: { bg: "bg-amber-100", text: "text-amber-800", dot: "bg-amber-500" },
        Failed: { bg: "bg-rose-100", text: "text-rose-800", dot: "bg-rose-500" },
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

    const [rows, setRows] = useState(initialDeposits);
    const [timePeriod, setTimePeriod] = useState("Week");
    const [page, setPage] = useState(1);
    const pageSize = 6;

    const filtered = useMemo(() => {
        let data = [...rows];
        const now = new Date();

        if (timePeriod !== "All") {
            data = data.filter((r) => {
                const created = new Date(r.createdAt);
                switch (timePeriod) {
                    case "Day": {
                        return (
                            created.getFullYear() === now.getFullYear() &&
                            created.getMonth() === now.getMonth() &&
                            created.getDate() === now.getDate()
                        );
                    }
                    case "Week": {
                        const startOfWeek = new Date(now);
                        startOfWeek.setDate(now.getDate() - now.getDay());
                        startOfWeek.setHours(0, 0, 0, 0);

                        const endOfWeek = new Date(startOfWeek);
                        endOfWeek.setDate(startOfWeek.getDate() + 7);

                        return created >= startOfWeek && created < endOfWeek;
                    }
                    case "Month": {
                        return (
                            created.getFullYear() === now.getFullYear() &&
                            created.getMonth() === now.getMonth()
                        );
                    }
                    default:
                        return true;
                }
            });
        }

        // Sort by newest first
        return data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }, [rows, timePeriod]);

    const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
    const pageData = filtered.slice((page - 1) * pageSize, page * pageSize);

    const totalAmount = useMemo(() => {
        return filtered.reduce((sum, deposit) => sum + deposit.amount, 0);
    }, [filtered]);

    const copyToClipboard = (text) => {
        navigator.clipboard?.writeText(text);
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <DashboardHeader />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Summary Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
                        <h3 className="text-sm font-medium text-gray-500 mb-1">Total Deposits</h3>
                        <p className="text-2xl font-semibold text-gray-900">{filtered.length}</p>
                        <p className="text-xs text-gray-500 mt-2">Across all payment methods</p>
                    </div>
                    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
                        <h3 className="text-sm font-medium text-gray-500 mb-1">Total Amount</h3>
                        <p className="text-2xl font-semibold text-gray-900">{currency(totalAmount)}</p>
                        <p className="text-xs text-gray-500 mt-2">This {timePeriod.toLowerCase()}</p>
                    </div>
                    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
                        <h3 className="text-sm font-medium text-gray-500 mb-1">Successful Deposits</h3>
                        <p className="text-2xl font-semibold text-gray-900">
                            {filtered.filter(d => d.status === 'Completed').length}
                        </p>
                        <p className="text-xs text-gray-500 mt-2">
                            {Math.round((filtered.filter(d => d.status === 'Completed').length / filtered.length) * 100)}% success rate
                        </p>
                    </div>
                </div>

                {/* Filters */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-6">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <div className="flex items-center gap-3">
                            <h2 className="text-lg font-semibold text-gray-800">Recent Transactions</h2>
                            <select
                                value={timePeriod}
                                onChange={(e) => { setTimePeriod(e.target.value); setPage(1); }}
                                className="px-3 py-1.5 rounded-lg border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                            >
                                <option value="Day">Today</option>
                                <option value="Week">This Week</option>
                                <option value="Month">This Month</option>
                                <option value="All">All Time</option>
                            </select>
                        </div>
                        <div className="flex items-center gap-2">
                            <button 
                                onClick={() => setPage(p => Math.max(1, p - 1))}
                                disabled={page === 1}
                                className="p-2 rounded-lg border border-gray-300 disabled:opacity-50 hover:bg-gray-50"
                            >
                                <FiArrowLeft className="w-4 h-4" />
                            </button>
                            <span className="text-sm text-gray-600">
                                Page {page} of {totalPages}
                            </span>
                            <button 
                                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                                disabled={page === totalPages}
                                className="p-2 rounded-lg border border-gray-300 disabled:opacity-50 hover:bg-gray-50"
                            >
                                <FiArrowRight className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Transactions Table */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Transaction</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Method</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {pageData.length === 0 ? (
                                    <tr>
                                        <td colSpan={6} className="px-6 py-12 text-center">
                                            <div className="text-gray-500">No transactions found</div>
                                            <div className="mt-2 text-sm text-gray-400">Try adjusting your filters</div>
                                        </td>
                                    </tr>
                                ) : (
                                    pageData.map((transaction) => (
                                        <tr key={transaction.id} className="hover:bg-gray-50 transition-colors">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center">
                                                    <button
                                                        onClick={() => copyToClipboard(transaction.id)}
                                                        className="mr-3 text-gray-400 hover:text-gray-600 transition-colors"
                                                        title="Copy Transaction ID"
                                                    >
                                                        <FiCopy className="w-4 h-4" />
                                                    </button>
                                                    <span className="text-sm font-medium text-gray-900">
                                                        {transaction.id}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center">
                                                    <img 
                                                        src={transaction.user.avatar} 
                                                        alt={transaction.user.name}
                                                        className="w-8 h-8 rounded-full mr-3"
                                                    />
                                                    <div>
                                                        <div className="text-sm font-medium text-gray-900">{transaction.user.name}</div>
                                                        <div className="text-xs text-gray-500">{transaction.user.email}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${transaction.method.color}`}>
                                                    <span className="mr-1">{transaction.method.icon}</span>
                                                    {transaction.method.name}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm font-semibold text-gray-900">
                                                    {currency(transaction.amount, transaction.currency)}
                                                </div>
                                                {transaction.fee > 0 && (
                                                    <div className="text-xs text-gray-500">
                                                        Fee: {currency(transaction.fee, transaction.currency)}
                                                    </div>
                                                )}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusStyles[transaction.status].bg} ${statusStyles[transaction.status].text}`}>
                                                    <span className={`h-2 w-2 rounded-full ${statusStyles[transaction.status].dot} mr-1.5`}></span>
                                                    {transaction.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-900">
                                                    {new Date(transaction.createdAt).toLocaleDateString('en-US', { 
                                                        month: 'short', 
                                                        day: 'numeric' 
                                                    })}
                                                </div>
                                                <div className="text-xs text-gray-500">
                                                    {new Date(transaction.createdAt).toLocaleTimeString('en-US', { 
                                                        hour: '2-digit', 
                                                        minute: '2-digit' 
                                                    })}
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    {pageData.length > 0 && (
                        <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
                            <div className="text-sm text-gray-600">
                                Showing <span className="font-medium">{(page - 1) * pageSize + 1}</span> to{' '}
                                <span className="font-medium">{Math.min(page * pageSize, filtered.length)}</span> of{' '}
                                <span className="font-medium">{filtered.length}</span> transactions
                            </div>
                            <div className="flex space-x-2">
                                <button
                                    onClick={() => setPage(p => Math.max(1, p - 1))}
                                    disabled={page === 1}
                                    className="px-3 py-1.5 rounded-md border border-gray-300 text-sm font-medium disabled:opacity-50 hover:bg-gray-50"
                                >
                                    Previous
                                </button>
                                <button
                                    onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                                    disabled={page === totalPages}
                                    className="px-3 py-1.5 rounded-md border border-gray-300 text-sm font-medium disabled:opacity-50 hover:bg-gray-50"
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