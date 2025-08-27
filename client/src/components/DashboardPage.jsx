import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaRegBookmark } from "react-icons/fa";
import { FiFilter, FiLink } from "react-icons/fi";
import { BiMessageDetail } from "react-icons/bi";
import { BsRobot } from "react-icons/bs";
import { FiCalendar } from "react-icons/fi";
import DashboardHeader from './DashboardHeader';
import { useSelector, useDispatch } from 'react-redux';
import { getUser } from '../Redux/reducer/authSlice';

const DashboardPage = () => {

    const dispatch = useDispatch()

    const { userInfo, loading } = useSelector((state) => state.auth);

    // console.log("from dashbnoard page", userInfo);


    useEffect(() => {
        // const token = Cookies.get("token");
        if (!userInfo) {
            dispatch(getUser());
        }
    }, [dispatch]);

    // params path

    // const location = useLocation();
    // const queryParams = new URLSearchParams(location.search);
    // const redirect = queryParams.get("redirect");

    // console.log("Redirect:", redirect);

    return (
        <div className=' '>
            {/* main content */}
            <div className=" bg-gray-200 pt-6">
                <div className="max-w-6xl mx-auto space-y-6">
                    {/* Top Section */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Balance Card */}
                        <div className="bg-[#1E1E2D] text-white rounded-2xl p-6 flex flex-col justify-between">
                            <div>
                                <p className="text-gray-300">Your balance</p>
                                <h2 className="text-4xl font-bold mt-2">{userInfo?.balance}</h2>
                            </div>
                            <Link to="/selfwithdrawl" className="mt-4 bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg font-medium transition">
                                Go to Withdrawal →
                            </Link>
                            <div className="mt-4 bg-[#2A2A3D] p-3 rounded-lg">
                                <p className="text-gray-400 text-sm">Earnings for all time</p>
                                <p className="font-bold">{userInfo?.shere_wallet}</p>
                            </div>
                        </div>

                        {/* Fast Links */}
                        <div className="md:col-span-2 bg-white rounded-2xl p-6 shadow">
                            <h3 className="text-lg font-semibold mb-4">Fast Links</h3>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                <div className="bg-yellow-100 hover:bg-yellow-200 p-6 rounded-xl cursor-pointer flex flex-col items-center justify-center transition">
                                    <FaRegBookmark className="text-yellow-600 text-2xl mb-2" />
                                    <p className="text-yellow-700 font-semibold text-sm">
                                        Promo Materials
                                    </p>
                                </div>
                                <div className="bg-purple-100 hover:bg-purple-200 p-6 rounded-xl cursor-pointer flex flex-col items-center justify-center transition">
                                    <FiLink className="text-purple-600 text-2xl mb-2" />
                                    <p className="text-purple-700 font-semibold text-sm">Links</p>
                                </div>
                                <div className="bg-red-100 hover:bg-red-200 p-6 rounded-xl cursor-pointer flex flex-col items-center justify-center transition">
                                    <BiMessageDetail className="text-red-600 text-2xl mb-2" />
                                    <p className="text-red-700 font-semibold text-sm">FAQ</p>
                                </div>
                                <div className="bg-blue-100 hover:bg-blue-200 p-6 rounded-xl cursor-pointer flex flex-col items-center justify-center transition">
                                    <BsRobot className="text-blue-600 text-2xl mb-2" />
                                    <p className="text-blue-700 font-semibold text-sm">
                                        Telegram bot
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Statistics */}
                    <div className="">
                        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-4 mt-7">
                            <div className='flex items-center gap-3'>
                                <h3 className="text-lg font-semibold">Statistics</h3>
                                <div className="flex items-center gap-2">
                                    <input
                                        type="date"
                                        // value={dateFilter}
                                        onChange={(e) => {
                                            setDateFilter(e.target.value);
                                            setCurrentPage(1);
                                        }}
                                        className="border border-gray-400 px-3 py-2 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                                    />
                                </div>
                            </div>
                            <div className="flex items-center gap-2 mt-2 md:mt-0">

                                <button className="text-blue-500 text-sm font-medium hover:underline">
                                    View all statistics →
                                </button>
                            </div>
                        </div>

                        {/* Stat Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                            <div className="bg-[#1E1E2D] text-white p-6 rounded-2xl">
                                <p className="text-2xl font-bold">$0</p>
                                <p className="text-sm text-gray-300 mt-2">0 deposits</p>
                            </div>
                            <div className="bg-purple-50 p-6 rounded-2xl">
                                <p className="text-2xl font-bold">$0</p>
                                <p className="text-sm text-purple-600 mt-2">0 FTD’s</p>
                            </div>
                            <div className="bg-yellow-50 p-6 rounded-2xl">
                                <p className="text-2xl font-bold">0</p>
                                <p className="text-sm text-yellow-600 mt-2">Clicks</p>
                            </div>
                            <div className="bg-blue-50 p-6 rounded-2xl">
                                <p className="text-2xl font-bold">0</p>
                                <p className="text-sm text-blue-600 mt-2">Registrations</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow p-6 mb-10">
                        {/* Chart Header */}
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                            <h2 className="text-xl font-bold text-gray-800 mb-2 md:mb-0">
                                Clicks / Registrations / FTD Chart
                            </h2>
                            <div className="flex items-center space-x-2">
                                <span className="text-sm text-gray-500">For all links</span>
                                <div className="flex flex-wrap gap-2">
                                    {["day", "week", "month"].map((type, i) => (
                                        <button
                                            key={i}
                                            onClick={() => {
                                                setFilter(type);
                                                setCurrentPage(1);
                                            }}
                                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${FiFilter === type
                                                ? "bg-blue-600 text-white shadow-md"
                                                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                                }`}
                                        >
                                            {type.charAt(0).toUpperCase() + type.slice(1)}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Chart Container */}
                        <div className="flex h-64">
                            {/* Y-axis labels */}
                            <div className="flex flex-col justify-between pb-8 pr-2 text-right text-xs text-gray-500">
                                {[...Array(6)].map((_, i) => (
                                    <div key={i} >{5 - i}</div>
                                ))}
                            </div>


                        </div>


                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardPage;