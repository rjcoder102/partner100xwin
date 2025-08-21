import React, { useEffect, useState } from 'react';
import { FaArrowRight, FaChevronDown } from 'react-icons/fa';
import { FiChevronDown, FiGlobe } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { FaRegBookmark } from "react-icons/fa";
import { FiLink } from "react-icons/fi";
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

    return (
        <div className='min-h-screen '>
            <div>
                <DashboardHeader />
            </div>
            {/* main content */}
            <div className="">
                <div className="max-w-6xl mx-auto space-y-6">
                    {/* Top Section */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Balance Card */}
                        <div className="bg-[#1E1E2D] text-white rounded-2xl p-6 flex flex-col justify-between">
                            <div>
                                <p className="text-gray-300">Your balance</p>
                                <h2 className="text-4xl font-bold mt-2">{userInfo.balance}</h2>
                            </div>
                            <button className="mt-4 bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg font-medium transition">
                                Go to Withdrawal →
                            </button>
                            <div className="mt-4 bg-[#2A2A3D] p-3 rounded-lg">
                                <p className="text-gray-400 text-sm">Earnings for all time</p>
                                <p className="font-bold">{userInfo.shere_wallet}</p>
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
                                <div className="flex items-center border rounded-lg px-3 py-2 text-gray-500 text-sm">
                                    <FiCalendar className="mr-2" />
                                    11 Aug 2025 – 18 Aug 2025
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
                            <div className="flex space-x-2">
                                <span className="text-sm text-gray-500">For all links</span>
                                <div className="flex border border-gray-200 rounded-md overflow-hidden">
                                    <button className="px-3 py-1 text-xs bg-gray-100 text-gray-700 font-medium">
                                        Month
                                    </button>
                                    <button className="px-3 py-1 text-xs text-gray-600 hover:bg-gray-50">
                                        Week
                                    </button>
                                    <button className="px-3 py-1 text-xs text-gray-600 hover:bg-gray-50">
                                        Day
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Chart Container */}
                        <div className="flex h-64">
                            {/* Y-axis labels */}
                            <div className="flex flex-col justify-between pb-8 pr-2 text-right text-xs text-gray-500">
                                {[...Array(6)].map((_, i) => (
                                    <div key={`y-label-${i}`} >{5 - i}</div>
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