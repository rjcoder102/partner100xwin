import React, { useState } from "react";
import DashboardPage from "../components/DashboardPage";
import {
    FaChartBar, FaLink, FaGift, FaBook, FaTrophy, FaCrown,
    FaTelegramPlane, FaHeadset, FaUsers, FaUserFriends
} from "react-icons/fa";
import { MdWindow } from "react-icons/md";
import LinksPage from "../components/LinksPage";
import Deposit from "../components/Deposit";
import Withdrawl from "./Withdrawl";
import DownlineUser from "../components/DownlineUser";
import SelfWithdrawl from "./SelfWithdrawl";

const Dashboard = () => {
    const [activePage, setActivePage] = useState("Dashboard");



    // Sidebar items with icons
    const menuItems = [
        { label: "Dashboard", icon: <MdWindow /> },
        { label: "Links", icon: <FaLink /> },
        { label: "Deposit", icon: <FaChartBar /> },
        { label: "Withdrawl", icon: <FaGift /> },
        { label: "Downline User", icon: <FaBook /> },
        { label: "SelfWithdrawl", icon: <FaBook /> },
        { label: "Contests", icon: <FaTrophy /> },
        { label: "TOP10 Partners", icon: <FaCrown /> },
        { label: "Telegram bot", icon: <FaTelegramPlane /> },
        { label: "Support", icon: <FaHeadset /> },
        { label: "Affiliate programs", icon: <FaUsers /> },
        { label: "Sub-Affiliate", icon: <FaUserFriends /> },
    ];

    // Different content for each page
    const renderContent = () => {
        switch (activePage) {
            case "Dashboard":
                return <DashboardPage />;
            case "Deposit":
                return (
                    <Deposit />
                );
            case "Links":
                return (
                    <LinksPage />
                );
            case "Withdrawl":
                return (
                    <Withdrawl />
                );
            case "Downline User":
                return (
                    <DownlineUser />
                );
            case "SelfWithdrawl":
                return (
                    <SelfWithdrawl />
                );
            default:
                return (
                    <div className="bg-white p-6 rounded-lg shadow">
                        <h2 className="text-xl font-bold mb-4">{activePage}</h2>
                        <p>Content for {activePage} goes here.</p>
                    </div>
                );
        }
    };

    return (
        <div className="min-h-screen flex">
            {/* Sidebar */}
            <div className="fixed left-0 top-0 h-full w-72 bg-[#1b1b28] shadow-md">
                <div className="py-3.5 bg-[#0D0F21] flex items-center justify-center ">
                    <img
                        className="h-10"
                        src="https://quotex-partner.com/affiliate_site/images/landing/header-logo.svg"
                        alt="logo"
                    />
                </div>

                <nav className="pt-7">
                    <ul className="space-y-2">
                        {menuItems.map((item) => (
                            <li key={item.label}>
                                <button
                                    onClick={() => setActivePage(item.label)}
                                    className={`flex items-center gap-3 w-full text-left px-4 py-2 transition 
                                        ${activePage === item.label
                                            ? "bg-[#0D0F21] text-white"
                                            : "text-gray-400 hover:bg-[#2a2a3d]"}`
                                    }
                                >
                                    <span className="text-lg">{item.icon}</span>
                                    <span>{item.label}</span>
                                </button>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>

            {/* Main Content */}
            <div className="ml-72 w-full bg-gray-200 ">{renderContent()}</div>
        </div>
    );
};

export default Dashboard;
