import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchGameHistory, getSingleUserById } from "../Redux/reducer/downlineSlicer";
import { useParams } from "react-router-dom";

const UserInformation = () => {
    const [activeTab, setActiveTab] = useState("info"); // default active tab
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const dispatch = useDispatch();
    const { id } = useParams();

    // Redux state
    const { singleuser, data, history, loading, totalPages } = useSelector((state) => state.downline);
    const error = null;

    // Sample user data
    const userData = {
        userId: singleuser?.id,
        totalBalance: singleuser?.balance,
        lastLoginDate: singleuser?.last_login,
        totalDeposit: data?.totalDepositeAmount,
        totalWithdrawal: data?.totalwithAmount,
        totalRecharge: data?.totalDepositeAmount,
    };

    // Fetch user data when component mounts
    useEffect(() => {
        dispatch(getSingleUserById(id));
    }, [dispatch, id]);

    // Fetch game history when tab is active or page changes
    useEffect(() => {
        if (activeTab === "history") {
            dispatch(fetchGameHistory({ page: currentPage, size: pageSize, playerid: id }));
        }
    }, [activeTab, currentPage, pageSize, dispatch, id]);

    // Format date for display
    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    // Determine status text and class based on status code
    const getStatusInfo = (statusCode) => {
        switch (statusCode) {
            case 2: // Assuming 2 means lost based on your data
                return { text: "Lost", class: "bg-red-100 text-red-800" };
            case 1: // Assuming 1 means won
                return { text: "Won", class: "bg-green-100 text-green-800" };
            default:
                return { text: "Pending", class: "bg-yellow-100 text-yellow-800" };
        }
    };

    // Handle page change
    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setCurrentPage(newPage);
        }
    };

    if (loading && activeTab === "info") {
        return <div className="text-center py-10 text-gray-600">Loading user information...</div>;
    }

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
                                            {singleuser?.name ? singleuser.name.charAt(0).toUpperCase() : "U"}
                                        </div>
                                        <div className="md:ml-6 text-center md:text-left">
                                            <h3 className="text-2xl font-bold text-gray-800">{singleuser?.name}</h3>
                                            <p className="text-gray-600">{singleuser?.email}</p>
                                            <p className="text-gray-500 text-sm mt-1">Joined: {singleuser?.created_at}</p>
                                            
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

                                {/* Page size selector */}
                                <div className="flex justify-between items-center mb-4">
                                    <div className="flex items-center">
                                        <span className="mr-2">Show</span>
                                        <select 
                                            value={pageSize}
                                            onChange={(e) => {
                                                setPageSize(Number(e.target.value));
                                                setCurrentPage(1);
                                            }}
                                            className="border rounded p-1"
                                        >
                                            <option value="10">10</option>
                                            <option value="25">25</option>
                                            <option value="50">50</option>
                                            <option value="100">100</option>
                                        </select>
                                        <span className="ml-2">entries</span>
                                    </div>
                                </div>

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
                                {!loading && !error && history?.length > 0 && (
                                    <>
                                        <div className="overflow-x-auto rounded-lg shadow mb-4">
                                            <table className="w-full border-collapse bg-white">
                                                <thead>
                                                    <tr className="bg-gray-50">
                                                        <th className="py-3 px-4 text-left font-semibold text-gray-700 border-b border-gray-200">Date</th>
                                                        <th className="py-3 px-4 text-left font-semibold text-gray-700 border-b border-gray-200">Game</th>
                                                        <th className="py-3 px-4 text-left font-semibold text-gray-700 border-b border-gray-200">Bet Amount</th>
                                                        <th className="py-3 px-4 text-left font-semibold text-gray-700 border-b border-gray-200">Win Amount</th>
                                                        <th className="py-3 px-4 text-left font-semibold text-gray-700 border-b border-gray-200">Currency</th>
                                                        <th className="py-3 px-4 text-left font-semibold text-gray-700 border-b border-gray-200">Status</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {history.map((bet) => {
                                                        const statusInfo = getStatusInfo(bet.status);
                                                        return (
                                                            <tr key={bet.id} className="hover:bg-gray-50 transition-colors">
                                                                <td className="py-3 px-4 border-b border-gray-200">{formatDate(bet.created_at)}</td>
                                                                <td className="py-3 px-4 border-b border-gray-200">{bet.game_name}</td>
                                                                <td className="py-3 px-4 border-b border-gray-200">{bet.bet_amount} {bet.currency_code}</td>
                                                                <td className="py-3 px-4 border-b border-gray-200">{bet.win_amount} {bet.currency_code}</td>
                                                                <td className="py-3 px-4 border-b border-gray-200">{bet.currency_code}</td>
                                                                <td className="py-3 px-4 border-b border-gray-200">
                                                                    <span
                                                                        className={`px-2 py-1 text-xs font-medium rounded-full ${statusInfo.class}`}
                                                                    >
                                                                        {statusInfo.text}
                                                                    </span>
                                                                </td>
                                                            </tr>
                                                        );
                                                    })}
                                                </tbody>
                                            </table>
                                        </div>
                                        
                                        {/* Pagination */}
                                        <div className="flex justify-between items-center mt-4">
                                            <div>
                                                Showing {(currentPage - 1) * pageSize + 1} to {Math.min(currentPage * pageSize, history.length)} of {history.length} entries
                                            </div>
                                            <div className="flex space-x-2">
                                                <button
                                                    onClick={() => handlePageChange(currentPage - 1)}
                                                    disabled={currentPage === 1}
                                                    className={`px-3 py-1 rounded ${currentPage === 1 ? 'bg-gray-200 text-gray-500' : 'bg-blue-500 text-white'}`}
                                                >
                                                    Previous
                                                </button>
                                                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                                                    <button
                                                        key={page}
                                                        onClick={() => handlePageChange(page)}
                                                        className={`px-3 py-1 rounded ${currentPage === page ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
                                                    >
                                                        {page}
                                                    </button>
                                                ))}
                                                <button
                                                    onClick={() => handlePageChange(currentPage + 1)}
                                                    disabled={currentPage === totalPages}
                                                    className={`px-3 py-1 rounded ${currentPage === totalPages ? 'bg-gray-200 text-gray-500' : 'bg-blue-500 text-white'}`}
                                                >
                                                    Next
                                                </button>
                                            </div>
                                        </div>
                                    </>
                                )}

                                {!loading && !error && (!history || history.length === 0) && (
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