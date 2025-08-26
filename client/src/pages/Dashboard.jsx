import React, { useState, useEffect } from "react";
import { Outlet, useLocation, useParams, Link } from "react-router-dom";
import { FaChartBar, FaLink, FaGift, FaBook } from "react-icons/fa";
import { MdWindow } from "react-icons/md";

const Dashboard = () => {
    const location = useLocation();
    const { en } = useParams();

    // ✅ Active state
    const [active, setActive] = useState("Dashboard");

    // ✅ Update active state whenever URL changes
    useEffect(() => {
        setActive(location.pathname);
    }, [location.pathname]);

    const menuItems = [
        { label: "Dashboard", icon: <MdWindow />, link: "/dasboardpage" },
        { label: "Links", icon: <FaLink />, link: "/linkpages" },
        { label: "Deposit", icon: <FaChartBar />, link: "/deposit" },
        { label: "Withdrawl", icon: <FaGift />, link: "/withdrawl" },
        { label: "Downline User", icon: <FaBook />, link: "/downlineuser" },
        // { label: "SelfWithdrawl", icon: <FaBook />, link: "/selfwithdrawl" },
    ];

    return (
        <div className="min-h-screen flex">
            {/* ✅ Sidebar */}
            <div className="fixed left-0 top-0 h-full w-[20%] bg-[#1b1b28]  hidden md:block">
                <div className="py-3.5 bg-[#0D0F21] flex items-center justify-center">
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
                                <Link
                                    to={item.link}
                                    onClick={() => setActive(item.link)} // ✅ Click se setActive
                                    className={`flex items-center w-full gap-3 text-left px-4 py-2 transition ${active === item.link
                                            ? "bg-[#0D0F21] text-white"
                                            : "text-gray-400 hover:bg-[#2a2a3d]"
                                        }`}
                                >
                                    <span className="text-lg">{item.icon}</span>
                                    <span>{item.label}</span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>

            {/* ✅ Page Content */}
            <div className="lg:ml-[20%] sm:ml-0 flex-1 bg-gray-200 p-4">
                <Outlet />
            </div>
        </div>
    );
};

export default Dashboard;
