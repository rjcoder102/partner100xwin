import React, { useMemo, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FiCopy } from 'react-icons/fi';
import { getDownlineDeposits } from '../Redux/reducer/withdrawlSlicer';

const Deposit = () => {
    const dispatch = useDispatch();
    const deposits = useSelector(state => state.deposits);
    const { downlineDeposits } = useSelector(state => state.withrawal);
    const [filter, setFilter] = useState("month");
    const [dateFilter, setDateFilter] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    const statusStyles = {
        Completed: { bg: "bg-green-100", text: "text-green-800", dot: "bg-green-500" },
        Pending: { bg: "bg-yellow-100", text: "text-yellow-800", dot: "bg-yellow-500" },
        Failed: { bg: "bg-red-100", text: "text-red-800", dot: "bg-red-500" },
        "1": { bg: "bg-green-100", text: "text-green-800", dot: "bg-green-500" },
        "0": { bg: "bg-yellow-100", text: "text-yellow-800", dot: "bg-yellow-500" },
        "2": { bg: "bg-red-100", text: "text-red-800", dot: "bg-red-500" },
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

    // Fetch data when filters change
    useEffect(() => {
        const filters = {};

        if (filter) filters.filter = filter;
        if (dateFilter) {
            filters.startDate = dateFilter;
            filters.endDate = dateFilter;
        }
        dispatch(getDownlineDeposits(filters));
    }, [dispatch, filter, dateFilter]);


    // Filtering Logic for client-side (if needed)
    const filteredDeposits = useMemo(() => {
        if (!deposits?.data || deposits.data.length === 0) return [];

        let data = [...deposits.data];

        if (dateFilter) {
            data = data.filter((d) => {
                const depositDate = new Date(d.updated_at || d.createdAt).toISOString().slice(0, 10);
                return depositDate === dateFilter;
            });
        }

        return data.sort((a, b) => new Date(b.updated_at || b.createdAt) - new Date(a.updated_at || a.createdAt));
    }, [deposits?.data, dateFilter]);

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
            (sum, d) => sum + (d.amount || 0),
            0
        );
        const successful = filteredDeposits.filter(
            (d) => d.status === "Completed" || d.status === 1
        ).length;
        const uniqueUsers = new Set(filteredDeposits.map(d => d.user?.name || d.user_id || d.id)).size;

        return { totalDeposits, totalAmount, successful, uniqueUsers };
    }, [filteredDeposits]);

    const copyToClipboard = (text) => {
        navigator.clipboard?.writeText(text);
    };

    const getStatusText = (status) => {
        const statusMap = {
            "1": "Completed",
            "0": "Pending",
            "2": "Failed",
            "Completed": "Completed",
            "Pending": "Pending",
            "Failed": "Failed"
        };
        return statusMap[status] || status;
    };

    const formatDate = (dateString) => {
        if (!dateString) return '-';
        const date = new Date(dateString);
        return {
            date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
            time: date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
        };
    };

    return (
        <div className="min-h-screen ">
            <div className="max-w-6xl mx-auto md:pt-6">
                {/* Loading and Error States */}
                {/* {deposits.loading && (
                    <div className="bg-blue-100 border-l-4 border-blue-500 text-blue-700 p-4 mb-6 rounded">
                        <p>Loading deposit data...</p>
                    </div>
                )}

                {deposits.error && (
                    <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded">
                        <p>Error: {deposits.error}</p>
                    </div>
                )} */}

                {/* Summary Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
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
                    {/* <div className="bg-white shadow rounded-xl p-4 border-l-4 border-orange-500">
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
                    </div> */}
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
                                        setDateFilter("");
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
                                    setFilter("");
                                    setCurrentPage(1);
                                }}
                                className="border border-gray-300 px-3 py-2 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                            />
                            {dateFilter && (
                                <button
                                    onClick={() => {
                                        setDateFilter("");
                                        setCurrentPage(1);
                                    }}
                                    className="px-3 py-2 text-sm text-red-600 hover:text-red-800"
                                >
                                    Clear
                                </button>
                            )}
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
                                {downlineDeposits.data.length > 0 ? (
                                    downlineDeposits.data.map((d) => {
                                        const statusText = getStatusText(d.status);
                                        const formattedDate = formatDate(d.updated_at || d.createdAt);
                                        return (
                                            <tr
                                                key={d.id || d._id}
                                                className="hover:bg-gray-50 transition-colors"
                                            >
                                                <td className="p-4">
                                                    <div className="flex items-center">
                                                        <button
                                                            onClick={() => copyToClipboard(d.id || d.transaction_id)}
                                                            className="mr-2 text-gray-400 hover:text-blue-500 transition-colors"
                                                            title="Copy Transaction ID"
                                                        >
                                                            <FiCopy className="w-4 h-4" />
                                                        </button>
                                                        <span className="text-sm font-medium text-gray-700">
                                                            {d.id || d.transaction_id || 'N/A'}
                                                        </span>
                                                    </div>
                                                </td>
                                                <td className="p-4">
                                                    <div className="flex items-center">
                                                        <div className="w-8 h-8 bg-gray-300 rounded-full mr-3 flex items-center justify-center">
                                                            <span className="text-sm font-medium text-gray-600">
                                                                {/* {(d.user?.name || d.user_id || 'U').charAt(0).toUpperCase()} */}
                                                            </span>
                                                        </div>
                                                        <div>
                                                            <p className="text-sm font-medium text-gray-900">
                                                                {/* {d.user?.name || d.user_id || 'Unknown User'} */}
                                                            </p>
                                                            <p className="text-xs text-gray-500">
                                                                {/* {d.user?.email || d.email || 'No email'} */}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="p-4">
                                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800`}>
                                                        {d.method?.name || 'Bank Transfer'}
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
                                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusStyles[statusText]?.bg || 'bg-gray-100'} ${statusStyles[statusText]?.text || 'text-gray-800'}`}>
                                                        <span className={`w-2 h-2 rounded-full ${statusStyles[statusText]?.dot || 'bg-gray-500'} mr-1.5`}></span>
                                                        {statusText}
                                                    </span>
                                                </td>
                                                <td className="p-4">
                                                    <p className="text-sm text-gray-900">
                                                        {formattedDate.date}
                                                    </p>
                                                    <p className="text-xs text-gray-500">
                                                        {formattedDate.time}
                                                    </p>
                                                </td>
                                            </tr>
                                        );
                                    })
                                ) : (
                                    <tr>
                                        <td
                                            className="p-4 text-center text-gray-500 text-sm"
                                            colSpan="6"
                                        >
                                            {/* {deposits.loading ? 'Loading...' : 'No deposit records found'} */}
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