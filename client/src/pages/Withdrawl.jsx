import React, { useState, useMemo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDownlineWithdrawals } from "../Redux/reducer/withdrawlSlicer";

const Withdrawl = () => {
    const dispatch = useDispatch();

    // ✅ Get withdrawals state from Redux - fixed selector
    const withdrawalState = useSelector((state) => state.withrawal);
    const downlineWithdrawals = withdrawalState.downlineWithdrawals;
    
    // Extract the withdrawals data with proper null checks
    const withdrawalsData = downlineWithdrawals?.data?.downlineWithdrowal || [];
    const loading = downlineWithdrawals?.loading || false;
    const error = downlineWithdrawals?.error || null;

    // Local UI states
    const [filter, setFilter] = useState("all"); // day | week | month
    const [dateFilter, setDateFilter] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    // ✅ Fetch data when filters change
    useEffect(() => {
        const filters = {};
        if (filter) filters.filter = filter;
        if (startDate) filters.startDate = startDate;
        if (endDate) filters.endDate = endDate;

        dispatch(getDownlineWithdrawals(filters));
    }, [dispatch, filter, startDate, endDate]);

    // ✅ Filtering logic - fixed to work with API data structure
    const filteredWithdrawals = useMemo(() => {
        if (!withdrawalsData || withdrawalsData.length === 0) return [];

        let data = [...withdrawalsData];
        const today = new Date();

        if (filter === "day") {
            data = data.filter(
                (w) => new Date(w.updated_at).toDateString() === today.toDateString()
            );
        } else if (filter === "week") {
            const weekAgo = new Date();
            weekAgo.setDate(today.getDate() - 7);
            data = data.filter(
                (w) => new Date(w.updated_at) >= weekAgo && new Date(w.updated_at) <= today
            );
        } else if (filter === "month") {
            const monthAgo = new Date();
            monthAgo.setMonth(today.getMonth() - 1);
            data = data.filter(
                (w) => new Date(w.updated_at) >= monthAgo && new Date(w.updated_at) <= today
            );
        }

        if (dateFilter) {
            data = data.filter((w) => new Date(w.updated_at).toISOString().split('T')[0] === dateFilter);
        }

        return data;
    }, [withdrawalsData, filter, dateFilter]);

    // ✅ Pagination
    const totalPages = Math.ceil(filteredWithdrawals.length / itemsPerPage);
    const paginatedWithdrawals = useMemo(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        return filteredWithdrawals.slice(startIndex, startIndex + itemsPerPage);
    }, [filteredWithdrawals, currentPage]);

    // ✅ Summary cards - fixed to work with API data structure
    const summary = useMemo(() => {
        const totalWithdrawals = filteredWithdrawals.length;
        const totalAmount = filteredWithdrawals.reduce(
            (sum, w) => sum + (w.amount || 0),
            0
        );
        const successful = filteredWithdrawals.filter(
            (w) => w.status === 1 // Assuming status 1 means success
        ).length;
        
        // Calculate unique users
        const uniqueUsers = new Set(filteredWithdrawals.map(w => w.user)).size;

        return { totalWithdrawals, totalAmount, successful, uniqueUsers };
    }, [filteredWithdrawals]);

    // ✅ Show loading / error
    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center text-xl text-gray-600">
                Loading withdrawal data...
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center text-xl text-red-600">
                Error: {error.message || "Failed to load withdrawal data"}
            </div>
        );
    }

    return (
        <div className="min-h-screen">
            <div className="max-w-6xl mx-auto md:pt-6">
                {/* ✅ Summary Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                    <div className="bg-white shadow-md rounded-lg p-5 border-l-4 border-blue-500">
                        <p className="text-gray-500 text-sm font-medium">Total Withdrawals</p>
                        <p className="text-2xl font-bold text-gray-800">{summary.totalWithdrawals}</p>
                        <p className="text-xs text-gray-400 mt-1">All time records</p>
                    </div>
                    <div className="bg-white shadow-md rounded-lg p-5 border-l-4 border-green-500">
                        <p className="text-gray-500 text-sm font-medium">Total Amount</p>
                        <p className="text-2xl font-bold text-gray-800">
                            ₹{summary.totalAmount.toLocaleString()}
                        </p>
                        <p className="text-xs text-gray-400 mt-1">Current period</p>
                    </div>
                    <div className="bg-white shadow-md rounded-lg p-5 border-l-4 border-purple-500">
                        <p className="text-gray-500 text-sm font-medium">Successful Withdrawals</p>
                        <p className="text-2xl font-bold text-gray-800">{summary.successful}</p>
                        <p className="text-xs text-gray-400 mt-1">
                            {filteredWithdrawals.length > 0
                                ? `${Math.round(
                                    (summary.successful / filteredWithdrawals.length) * 100
                                )}% success rate`
                                : "No data"}
                        </p>
                    </div>
                </div>

                {/* ✅ Filters */}
                <div className="bg-white shadow-md rounded-lg p-4 mb-6">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <div className="flex flex-wrap gap-2">
                            {["all", "day", "week", "month"].map((type) => (
                                <button
                                    key={type}
                                    onClick={() => {
                                        setFilter(type);
                                        setCurrentPage(1);
                                    }}
                                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                                        filter === type
                                            ? "bg-blue-600 text-white shadow-md"
                                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                    }`}
                                >
                                    {type.charAt(0).toUpperCase() + type.slice(1)}
                                </button>
                            ))}
                        </div>

                        <div className="flex items-center gap-2">
                            <span className="text-sm text-gray-600 font-medium whitespace-nowrap">
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

                {/* ✅ Withdrawal Table */}
                <div className="bg-white shadow-md rounded-xl overflow-hidden mb-8">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50">
                                <tr className="text-gray-600 text-sm">
                                    <th className="p-4 font-semibold text-left">ID</th>
                                    <th className="p-4 font-semibold text-left">User</th>
                                    <th className="p-4 font-semibold text-left">Date</th>
                                    <th className="p-4 font-semibold text-left">Amount</th>
                                    <th className="p-4 font-semibold text-left">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {paginatedWithdrawals.length > 0 ? (
                                    paginatedWithdrawals.map((w) => (
                                        <tr
                                            key={w.id}
                                            className="hover:bg-gray-50 transition-colors"
                                        >
                                            <td className="p-4 text-sm font-medium text-gray-700">{w.id}</td>
                                            <td className="p-4 text-sm text-gray-600">{w.username}</td>
                                            <td className="p-4 text-sm text-gray-600">
                                                {new Date(w.updated_at).toLocaleDateString()}
                                            </td>
                                            <td className="p-4 text-sm font-medium text-gray-700">
                                                ₹{w.amount.toLocaleString()}
                                            </td>
                                            <td className="p-4">
                                                <span
                                                    className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                                                        w.status === 1
                                                            ? "bg-green-100 text-green-800"
                                                            : w.status === "Pending"
                                                                ? "bg-yellow-100 text-yellow-800"
                                                                : "bg-red-100 text-red-800"
                                                    }`}
                                                >
                                                    {w.status === 1 ? "Success" : "Pending"}
                                                </span>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td
                                            className="p-4 text-center text-gray-500 text-sm"
                                            colSpan="5"
                                        >
                                            No withdrawal records found
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* ✅ Pagination */}
                    {filteredWithdrawals.length > 0 && (
                        <div className="flex items-center justify-between px-4 py-3 border-t border-gray-100">
                            <div className="text-sm text-gray-500">
                                Showing{" "}
                                <span className="font-medium">
                                    {(currentPage - 1) * itemsPerPage + 1}
                                </span>{" "}
                                to{" "}
                                <span className="font-medium">
                                    {Math.min(currentPage * itemsPerPage, filteredWithdrawals.length)}
                                </span>{" "}
                                of <span className="font-medium">{filteredWithdrawals.length}</span>{" "}
                                results
                            </div>
                            <div className="flex space-x-2">
                                <button
                                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                                    disabled={currentPage === 1}
                                    className={`px-3 py-1 rounded-md text-sm ${
                                        currentPage === 1
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
                                            className={`px-3 py-1 rounded-md text-sm ${
                                                currentPage === page
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
                                    className={`px-3 py-1 rounded-md text-sm ${
                                        currentPage === totalPages
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

export default Withdrawl;

