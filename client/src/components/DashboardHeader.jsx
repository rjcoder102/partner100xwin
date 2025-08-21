import React, { useEffect, useState } from "react";
import { FaArrowRight, FaChevronDown } from 'react-icons/fa';
import { FiChevronDown, FiGlobe } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../Redux/reducer/authSlice";
// import { getUserProfile, logoutUser } from "../Redux/reducer/authSlice";


const languages = [
    { code: 'de', name: 'Deutsch' },
    { code: 'es', name: 'Español' },
    { code: 'fr', name: 'Français' },
    { code: 'hi', name: 'हिन्दी' },
    { code: 'id', name: 'Indonesia' },
    { code: 'it', name: 'Italiano' },
    { code: 'ms', name: 'Malay' },
    { code: 'pt', name: 'Português' },
    { code: 'ru', name: 'Русский' },
    { code: 'th', name: 'ไทย' },
    { code: 'tr', name: 'Türkçe' },
    { code: 'vt', name: 'Tiếng Việt' },
    { code: 'fl', name: 'Filipino' }
];

const DashboardHeader = () => {
    const [showLevelsDropdown, setShowLevelsDropdown] = useState(false);
    const [showAccountDropdown, setShowAccountDropdown] = useState(false);
    const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false);

    const dispatch = useDispatch();
    const { userInfo, loading } = useSelector((state) => state.auth);

    // console.log("userInfo", userInfo);


    useEffect(() => {
        // const token = Cookies.get("token");
        if (!userInfo) {
            dispatch(getUser());
        }
    }, [dispatch]);

    // ✅ Get first letter from email (fallback "U")
    const userInitial =
        userInfo?.name?.charAt(0).toUpperCase() ||
        userInfo?.email?.charAt(0).toUpperCase() ||
        "U";

    // ✅ Masked email (dashboard****@gmail.com style)
    const maskEmail = (email) => {
        if (!email) return "No Email";
        const [localPart, domain] = email.split("@");
        if (localPart.length <= 4) {
            return localPart[0] + "****@" + domain;
        }
        return (
            localPart.substring(0, 4) +
            "****@" +
            domain
        );
    };

    // ✅ Logout Handler
    const handleLogout = async () => {
        await dispatch(logoutUser());
        setShowAccountDropdown(false);
        navigate("/login"); // Redirect to login page
    };

    return (
        <div className=''>
            {/* Header */}
            <div className="bg-white shadow-sm px-6 py-2 mb-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    {/* Balance Section */}
                    <div className="mb-4 md:mb-0">
                        <div className='flex items-center space-x-3 mb-1'>
                            <h2 className="text-xl font-bold text-gray-800">{userInfo.balance || 0.00}.00</h2>
                            <Link
                                to="/withdraw"
                                className="bg-emerald-500 hover:bg-emerald-600 p-2 rounded-lg transition-colors duration-200"
                                title="Go to Withdrawal"
                            >
                                <FaArrowRight className='text-white text-xs' />
                            </Link>
                        </div>
                        <p className="text-gray-500 font-semibold text-sm">
                            Vol: {userInfo.balance || 0.00}.00 / Rev: {userInfo.shere_wallet || 0.00} .00
                        </p>
                    </div>

                    {/* Right Side Controls */}
                    <div className="flex flex-col space-y-3 sm:flex-row sm:space-y-0 sm:space-x-4 sm:items-center">
                        <a
                            // href="https://t.me/quotex_partner"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-blue-500 hover:text-blue-600 font-medium cursor-pointer"
                        >
                            <div className="w-6 h-6">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="21"
                                    height="21"
                                    viewBox="0 0 21 21"
                                    fill="none"
                                >
                                    <path
                                        d="M18.1209 3.19768C18.1209 3.19768 19.8208 2.53487 19.6791 4.14456C19.6319 4.80738 19.2069 7.12722 18.8764 9.63646L17.7432 17.0695C17.7432 17.0695 17.6488 18.1583 16.7989 18.3477C15.9489 18.5371 14.6741 17.6849 14.438 17.4955C14.2491 17.3535 10.8967 15.223 9.71626 14.1815C9.38573 13.8974 9.00799 13.3293 9.76347 12.6665L14.7213 7.93209C15.2879 7.36396 15.8545 6.03833 13.4936 7.64802L6.88323 12.1457C6.88323 12.1457 6.12776 12.6191 4.71126 12.193L1.64212 11.2462C1.64212 11.2462 0.508905 10.536 2.44482 9.82581C7.16656 7.60064 12.9743 5.32814 18.1209 3.19768Z"
                                        fill="#3699FF"
                                    />
                                </svg>
                            </div>
                            <span>@100xwins_partner</span>
                        </a>
                        {/* Language Dropdown */}
                        <div className="relative">
                            <button
                                className="flex items-center gap-2 px-3 py-2 text-gray-800 rounded transition-colors"
                                onClick={() => setIsLanguageMenuOpen(!isLanguageMenuOpen)}
                            >
                                <FiGlobe className="w-5 h-5 text-blue-600" />
                                <span className="font-medium">EN</span>
                                <FiChevronDown className={`w-4 h-4 transition-transform ${isLanguageMenuOpen ? 'rotate-180' : ''}`} />
                            </button>
                            {isLanguageMenuOpen && (
                                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                                    {languages.map((lang) => (
                                        <button
                                            key={lang.code}
                                            className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100"
                                            onClick={() => setIsLanguageMenuOpen(false)}
                                        >
                                            {lang.name}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Level Badge */}
                        <div>
                            <button
                                onClick={() => setShowLevelsDropdown(!showLevelsDropdown)}
                                className="bg-blue-100 text-blue-800 px-3 py-1 rounded-md text-sm font-medium inline-flex items-center justify-center"
                            >
                                LEVEL {userInfo.leve}
                                <FaChevronDown
                                    className={`ml-2 text-xs transition-transform duration-200 ${showLevelsDropdown ? 'rotate-180' : ''
                                        }`}
                                />
                            </button>

                            {showLevelsDropdown && (
                                <div className="absolute right-72 mt-2 w-80 bg-white rounded-xl shadow-lg z-20 border border-gray-100 overflow-hidden">
                                    <div className="p-4">
                                        <div className="flex items-start">
                                            <div className="bg-blue-50 p-3 rounded-lg">
                                                {/* Icon */}
                                                <svg
                                                    width="48"
                                                    height="48"
                                                    viewBox="0 0 62 62"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        d="M31 62C47.3852 62 60.668 48.7172 60.668 32.332C60.668 15.9469 47.3852 2.66406 31 2.66406C14.6148 2.66406 1.33203 15.9469 1.33203 32.332C1.33203 48.7172 14.6148 62 31 62Z"
                                                        fill="#1A2B63"
                                                    />
                                                </svg>
                                            </div>
                                            <div className="ml-4">
                                                <h3 className="font-bold text-gray-800">Affiliate Levels</h3>
                                                <p className="text-sm text-gray-500 mt-1">
                                                    Increase deposits to earn more!
                                                </p>
                                            </div>
                                        </div>

                                        {/* Current Level */}
                                        <div className="mt-4">
                                            <div className="bg-blue-50 rounded-lg p-3 mb-2">
                                                <div className="text-xs text-blue-600 font-medium mb-2">
                                                    Your position
                                                </div>
                                                <div className="grid grid-cols-3 items-center">
                                                    <div className="font-bold text-blue-800">Level 1</div>
                                                    <div className="text-center">2.0%</div>
                                                    <div className="text-right text-gray-500">0-14</div>
                                                </div>
                                                <div className="mt-3">
                                                    <div className="relative pt-1">
                                                        <div className="flex items-center justify-between">
                                                            <span className="text-xs font-semibold text-blue-600">
                                                                0/15 deposits
                                                            </span>
                                                        </div>
                                                        <div className="overflow-hidden h-2 mb-1 flex rounded bg-blue-100">
                                                            <div
                                                                style={{ width: '0%' }}
                                                                className="shadow-none flex bg-blue-500"
                                                            ></div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Other Levels */}
                                            <div className="max-h-60 overflow-y-auto">
                                                {[2, 3, 4, 5, 6, 7].map((level) => (
                                                    <div
                                                        key={level}
                                                        className="grid grid-cols-3 py-2 px-1 border-t border-gray-100 hover:bg-gray-50"
                                                    >
                                                        <div className="font-medium">Level {level}</div>
                                                        <div className="text-center">
                                                            {(2 + (level - 1) * 0.5).toFixed(1)}%
                                                        </div>
                                                        <div className="text-right text-gray-500">
                                                            {level === 2 && '15-49'}
                                                            {level === 3 && '50-99'}
                                                            {level === 4 && '100-199'}
                                                            {level === 5 && '200-399'}
                                                            {level === 6 && '400-699'}
                                                            {level === 7 && '700+'}
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Account Dropdown */}
                        <div className="relative">
                            <button
                                className="flex items-center text-gray-700 hover:text-blue-600 px-3 py-1 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                                onClick={() => setShowAccountDropdown(!showAccountDropdown)}
                            >
                                <div className="bg-blue-500 text-white rounded-md w-8 h-8 flex items-center justify-center font-medium">
                                    {loading ? "…" : userInitial}
                                </div>
                                <span className="ml-2 mr-1 text-sm hidden sm:inline">
                                    {loading ? "Loading..." : maskEmail(userInfo?.email)}
                                </span>
                                <FaChevronDown
                                    className={`ml-1 text-xs transition-transform duration-200 ${showAccountDropdown ? "rotate-180" : ""
                                        }`}
                                />
                            </button>


                            {showAccountDropdown && (
                                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg z-20 border border-gray-100 py-1">
                                    <Link
                                        to=""
                                        className="block px-4 py-2 text-gray-700 hover:bg-gray-50"
                                        onClick={() => setShowAccountDropdown(false)}
                                    >
                                        My Account
                                    </Link>
                                    <Link
                                        to=""
                                        className="block px-4 py-2 text-gray-700 hover:bg-gray-50"
                                        onClick={handleLogout}
                                    >
                                        Sign Out
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default DashboardHeader;


