import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { FiGlobe, FiChevronDown, FiUser, FiX, FiMenu } from 'react-icons/fi';

const Header = () => {
    const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const languageMenuRef = useRef(null);
    const mobileMenuRef = useRef(null);

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

    // Close dropdowns when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (languageMenuRef.current && !languageMenuRef.current.contains(event.target)) {
                setIsLanguageMenuOpen(false);
            }
            if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target)) {
                setIsMobileMenuOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    // Close mobile menu when resizing to desktop
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth > 768) {
                setIsMobileMenuOpen(false);
            }
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <header className="w-full bg-[#0D0F21] shadow-sm sticky top-0 z-50">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex justify-between items-center">
                <div className="flex items-center">
                    {/* Logo */}
                    <Link to="/" className="flex items-center">
                        <img
                            className="h-8"
                            src="https://quotex-partner.com/affiliate_site/images/landing/header-logo.svg"
                            alt="logo"
                        />
                    </Link>
                </div>

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center gap-4">
                    <div
                        className="relative"
                        ref={languageMenuRef}
                    >
                        <button
                            className="flex items-center gap-2 px-3 py-2 text-white rounded hover:bg-gray-800/45 hover:bg-opacity-10 transition-colors"
                            onClick={() => setIsLanguageMenuOpen(!isLanguageMenuOpen)}
                        >
                            <FiGlobe className="w-5 h-5 text-blue-600" />
                            <span className="font-medium">EN</span>
                            <FiChevronDown className={`w-4 h-4 transition-transform ${isLanguageMenuOpen ? 'rotate-180' : ''}`} />
                        </button>

                        {isLanguageMenuOpen && (
                            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                                {languages.map((lang) => (
                                    <Link
                                        key={lang.code}
                                        className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                                        onClick={() => setIsLanguageMenuOpen(false)}
                                    >
                                        {lang.name}
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className="h-6 w-px bg-gray-300 mx-2"></div>

                    <Link
                        to="/signin"
                        className="px-4 py-2 bg-blue-600 text-white rounded font-medium hover:bg-blue-700 transition-colors"
                    >
                        Sign in
                    </Link>
                </div>

                {/* Mobile Navigation */}
                {isMobileMenuOpen && (
                    <div
                        className="md:hidden absolute top-16 left-0 right-0 bg-[#141626] shadow-lg py-4 px-6"
                        ref={mobileMenuRef}
                    >
                        <div className="flex flex-col space-y-4">
                            <div className="relative">
                                <button
                                    className="flex items-center gap-2 px-3 py-2 text-white rounded hover:bg-gray-100 hover:bg-opacity-10 w-full"
                                    onClick={() => setIsLanguageMenuOpen(!isLanguageMenuOpen)}
                                >
                                    <FiGlobe className="w-5 h-5 text-white" />
                                    <span className="font-medium">Select Language</span>
                                    <FiChevronDown className={`w-4 h-4 transition-transform ${isLanguageMenuOpen ? 'rotate-180' : ''}`} />
                                </button>

                                {isLanguageMenuOpen && (
                                    <div className="mt-2 bg-gray-800 rounded-md py-1">
                                        {languages.map((lang) => (
                                            <Link
                                                key={lang.code}
                                                to={`/${lang.code}`}
                                                className="block px-4 py-2 text-white hover:bg-gray-700"
                                                onClick={() => {
                                                    setIsLanguageMenuOpen(false);
                                                    setIsMobileMenuOpen(false);
                                                }}
                                            >
                                                {lang.name}
                                            </Link>
                                        ))}
                                    </div>
                                )}
                            </div>

                            <div className="h-px bg-gray-300 my-2"></div>

                            <Link
                                to="/signin"
                                className="px-4 py-2 bg-blue-600 text-white rounded font-medium hover:bg-blue-700 transition-colors text-center"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                Sign in
                            </Link>
                        </div>
                    </div>
                )}

                {/* Mobile menu button */}
                    <button
                        className="md:hidden text-white mr-4"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >
                        {isMobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
                    </button>
            </div>
        </header>
    );
};

export default Header;