import React, { useState } from "react";
import { FaChartPie, FaSyncAlt, FaGlobe } from "react-icons/fa";
import Header from '../components/Header';
import lefticon from "../assets/header-left.svg";
import righticon from "../assets/header-right.svg";
import { FaStar } from "react-icons/fa";
import { FaUser, FaDollarSign, FaCheckCircle } from "react-icons/fa";
import statistics from "../assets/statistics.svg";
import conversion from "../assets/conversion.svg";
import geographical from "../assets/geographical.svg";
import collaboration from '../assets/collaboration.svg';
import { Link } from "react-router-dom";

const cards = [
    {
        img: "https://i.ibb.co/ZRzcRKKh/earn-traffic.png",
        title: "Do you have a personal traffic source?",
        text: "For example, your website, forum, YouTube channel, social media account, or other sources of traffic.",
    },
    {
        img: "https://i.ibb.co/7xy8Lg8V/earn-arbitrage.png",
        title: "Are you involved in traffic arbitrage?",
        text: "Unlock limitless potential with support for all advertising channels and traffic generation methods.",
    },
    {
        img: "https://i.ibb.co/xKzQQcJf/earn-provide.png",
        title: "Do you provide services in the field of trading?",
        text: "For example, training courses, trading webinars, trade signal services, financial consultations, or client portfolio management.",
    },
];

const features = [
    {
        id: 1,
        title: "Detailed statistics",
        desc: "Featuring one of the best management panels among all affiliate programs, our platform offers easy campaign tracking and optimization.",
        icon: <FaChartPie className="text-white text-xl" />,
        image: "https://i.ibb.co/YMfNTSj/statistics-detailed-1.png",
    },
    {
        id: 2,
        title: "High conversion rates",
        desc: "Our advertising procurement team meticulously tests the effectiveness of our landing pages and marketing materials.",
        icon: <FaSyncAlt className="text-white text-xl" />,
        image: "https://i.ibb.co/mCxWK4xy/statistics-detailed-2.png",
    },
    {
        id: 3,
        title: "Wide geographical coverage",
        desc: "Attract clients from anywhere in the world and work with the countries that suit your needs.",
        icon: <FaGlobe className="text-white text-xl" />,
        image: "https://i.ibb.co/d4gSqFgq/statistics-detailed-3.png",
    },
];

const reviews = [
    {
        name: "Benji",
        text: `I have been working with them since summer of 2021, I bring traffic from different countries (Brazil, Indonesia, Mexico, India, Turkey, Nigeria, Colombia, Bangladesh, Vietnam, Pakistan, Thailand, Philippines, Malaysia etc…). 
    The Company is very loyal and user-friendly, has multi-language support, offers local payment methods and currencies. 
    Statistics is transparent and you can check everything you need... so till now I'm quite satisfied and can recommend it to everyone.`,
    },
    {
        name: "Nerves Trading",
        text: `Have tried multiple affiliate programs, and I can say that at quotex they have the best support service out there! 
    Commissions are really good. Payments are fast! Best affiliate program I've ever joined.`,
    },
    {
        name: "Robert",
        text: `I have never seen a binary options broker that pays so much to affiliates, and whenever I request a withdrawal it’s paid on the same day. 
    There's nothing to complain about, just try it and see the magic happen. I guarantee there's nothing like it.`,
    },
];

const Home = () => {
    const [activeTab, setActiveTab] = useState(1);
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        terms: false,
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === "checkbox" ? checked : value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.terms) {
            alert("You must accept the Terms and Conditions");
            return;
        }
        alert("Form submitted!");
    };

    return (
        <div className='min-h-screen bg-gradient-to-b from-[#0D0F21] to-[#1A1C35] overflow-hidden'>
            {/* Header */}
            <div className='sticky top-0 z-50'>
                <Header />
            </div>

            <div className='max-w-6xl mx-auto'>
                <div>
                    <div className='flex items-start justify-between mt-20'>
                        <div>
                            <img src={lefticon} alt="lefticon" className='' />
                        </div>
                        <div>
                            <div className=" text-white flex flex-col items-center text-center">
                                <h2 className="text-3xl md:text-5xl font-extrabold leading-snug max-w-4xl">
                                    Quotex presents a lucrative and <br />
                                    transparent affiliate program <br />
                                    designed to boost your <br />
                                    profitability
                                </h2>

                                <p className="text-gray-300 mt-6 max-w-3xl text-lg">
                                    Lightweight, fast, and intuitive platform. Partner’s commission is up to{" "}
                                    <span className="font-semibold">80% on revenue</span> and up to{" "}
                                    <span className="font-semibold">5% on turnover</span>. Weekly payouts.
                                    Loyal and responsive support service.
                                </p>

                                <button className="mt-8 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-lg shadow-md transition duration-300">
                                    TRY NOW
                                </button>
                            </div>
                        </div>
                        <div>
                            <img src={righticon} alt="righticon" className='' />
                        </div>

                    </div>
                    <div className="text-white py-12 px-4 sm:px-6 lg:px-8 shadow-lg">
                        <div className="max-w-3xl mx-auto">
                            {/* Main Statistics Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-3 text-center text-white py-10">
                                {/* Active Traders */}
                                <div className="px-6 relative">
                                    <div className="text-xl sm:text-2xl md:text-3xl font-bold mb-2">
                                        44 798 121
                                    </div>
                                    <div className="text-gray-400 text-lg">Active traders</div>

                                    {/* Divider (right side) */}
                                    <div className="hidden md:block absolute top-1/2 right-0 transform -translate-y-1/2 w-[1px] h-16 bg-gradient-to-b from-transparent via-gray-400 to-transparent blur-[1px]" />
                                </div>

                                {/* Thriving Partners */}
                                <div className="px-6 relative">
                                    <div className="text-xl sm:text-2xl md:text-3xl font-bold mb-2">
                                        311 428
                                    </div>
                                    <div className="text-gray-400 text-lg">Thriving partners</div>

                                    {/* Divider (right side) */}
                                    <div className="hidden md:block absolute top-1/2 right-0 transform -translate-y-1/2 w-[1px] h-16 bg-gradient-to-b from-transparent via-gray-400 to-transparent blur-[1px]" />
                                </div>

                                {/* Earned by Partners */}
                                <div className="px-6">
                                    <div className="text-xl sm:text-2xl md:text-3xl font-bold mb-2 text-green-500">
                                        6 219 988 $
                                    </div>
                                    <div className="text-green-400 text-lg">
                                        Earned by our partners over the past week
                                    </div>
                                </div>
                            </div>

                            {/* Divider */}
                            <div className="border-t border-gray-700 my-8"></div>

                            {/* Payment Methods */}
                            <div className="text-center flex items-center justify-center bg-[#20233e] ">
                                <div className="text-2xl md:text-sm font-bold mb-6">
                                    <div>WEEKLY PAYOUTS WITH</div> <div>CONVENIENT METHODS</div>
                                </div>
                                <div className="flex flex-wrap justify-center gap-6">
                                    <div className="flex items-center gap-2 bg-[#1A1C35] px-4 py-2 rounded-lg">
                                        <span>🚠️</span>
                                        <span className="font-medium">tether</span>
                                    </div>
                                    <div className="flex items-center gap-2 bg-[#1A1C35] px-4 py-2 rounded-lg">
                                        <span>Perfect Money</span>
                                    </div>
                                    <div className="flex items-center gap-2 bg-[#1A1C35] px-4 py-2 rounded-lg">
                                        <span>🔍</span>
                                        <span className="font-medium">pix</span>
                                    </div>
                                    <div className="flex items-center gap-2 bg-[#1A1C35] px-4 py-2 rounded-lg">
                                        <span className="font-medium">AND MORE</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="bg-[#0D0F21] py-16 ">
                {/* Heading */}
                <h2 className="text-center text-3xl md:text-4xl font-bold text-white mb-12">
                    Anyone can earn with us
                </h2>

                {/* Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {cards.map((card, idx) => (
                        <div
                            key={idx}
                            className="rounded-2xl overflow-hidden bg-white/5 shadow-lg"
                        >
                            {/* Image */}
                            <div className=" md:h-64 w-full overflow-hidden">
                                <img
                                    src={card.img}
                                    alt={card.title}
                                    className="w-full h-full object-cover"
                                />
                            </div>

                            {/* Text Box */}
                            <div className="bg-white text-black  rounded-t-2xl p-6 -mt-8 relative z-10">
                                <h3 className="font-bold text-xl mb-3 text-center">
                                    {card.title}
                                </h3>
                                <p className="text-gray-600 text-center text-sm">{card.text}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="bg-[#0D0F21] py-16 px-6 md:px-12">
                <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
                    {/* Left Side */}
                    <div>
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">
                            It is easy and profitable to work with us!
                        </h2>

                        <div className="space-y-6">
                            {features.map((feature) => (
                                <div
                                    key={feature.id}
                                    className={`flex items-start gap-4 p-4 rounded-lg cursor-pointer transition ${activeTab === feature.id
                                        ? "bg-[#14172E] border-l-4 border-blue-500"
                                        : "hover:bg-[#14172E]/60"
                                        }`}
                                    onClick={() => setActiveTab(feature.id)}
                                >

                                    <div>
                                        <div className="flex items-center gap-2">
                                            <div className="bg-blue-600 p-2 rounded-full">{feature.icon}</div>
                                            <h3 className="text-white font-bold text-lg">{feature.title}</h3>
                                        </div>
                                        <p className="text-gray-400 text-sm mt-1">{feature.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <button className="mt-8 bg-blue-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-blue-700 transition">
                            START EARNING
                        </button>
                    </div>

                    {/* Right Side (Image changes with active tab) */}
                    <div className="flex justify-center items-center">
                        <img
                            src={features.find((f) => f.id === activeTab)?.image}
                            alt="feature"
                            className="w-full max-w-lg rounded-xl shadow-lg transition-all duration-500"
                        />
                    </div>
                </div>
            </div>

            <section className="bg-[#0D0F21] text-white py-16 px-6">
                <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
                    Partner reviews
                </h2>

                <div className="grid md:grid-cols-3 gap-8 max-w-6xl h- mx-auto">
                    {reviews.map((review, index) => (
                        <div
                            key={index}
                            className="bg-white text-black rounded-lg shadow-lg p-7 flex flex-col justify-between"
                        >
                            {/* Profile section */}
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-12 h-12 rounded-full flex items-center justify-center">
                                    <img src="https://i.ibb.co/mFcsydZC/user.png" alt="" />
                                </div>
                                <h3 className="font-bold text-lg">{review.name}</h3>
                            </div>

                            {/* Review text */}
                            <p className="text-sm leading-relaxed mb-4">{review.text}</p>

                            {/* Stars */}
                            <div className="flex text-blue-600">
                                {[...Array(5)].map((_, i) => (
                                    <FaStar key={i} />
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            <div className="min-h-screen bg-[#141626] flex items-center justify-center px-6">
                <div className="max-w-6xl w-full grid md:grid-cols-2 gap-12 items-center">
                    {/* Left Side (Graphic) */}
                    <div className="flex justify-center">
                        <div className="relative w-80 h-80">
                            {/* <div className="absolute inset-0 flex items-center justify-center">
                                <svg
                                    className="w-full h-full"
                                    viewBox="0 0 300 300"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <circle
                                        cx="150"
                                        cy="150"
                                        r="140"
                                        stroke="url(#gradient)"
                                        strokeWidth="2"
                                        fill="none"
                                    />
                                    <defs>
                                        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                            <stop offset="0%" stopColor="#005eff" />
                                            <stop offset="100%" stopColor="#00ffea" />
                                        </linearGradient>
                                    </defs>
                                </svg>
                            </div> */}


                            {/* Icons around the circle */}
                            {/* <div className="absolute top-0 left-1/2 transform -translate-x-1/2">
                                <FaUser className="text-white text-2xl bg-[#005eff] p-2 rounded-full" />
                            </div>
                            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2">
                                <FaDollarSign className="text-white text-2xl bg-green-600 p-2 rounded-full" />
                            </div>
                            <div className="absolute left-0 top-1/2 transform -translate-y-1/2">
                                <FaUser className="text-white text-2xl bg-[#005eff] p-2 rounded-full" />
                            </div>
                            <div className="absolute right-0 top-1/2 transform -translate-y-1/2">
                                <FaDollarSign className="text-white text-2xl bg-green-600 p-2 rounded-full" />
                            </div> */}
                        </div>
                        <img src={collaboration} alt="" />
                    </div>

                    {/* Right Side (Text) */}
                    <div >
                        <h2 className="text-3xl font-bold text-white mb-6">
                            How collaboration with us works:
                        </h2>

                        <div className="space-y-8">
                            <div className="flex items-start gap-4">
                                <FaCheckCircle className="text-blue-500 text-xl mt-1" />
                                <div>
                                    <h3 className="text-lg font-semibold text-white">
                                        Acquire your affiliate link
                                    </h3>
                                    <p className="text-gray-400 text-sm">
                                        Register an account in our system and receive a unique link
                                        through which you can earn your commission.
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <FaCheckCircle className="text-cyan-400 text-xl mt-1" />
                                <div>
                                    <h3 className="text-lg font-semibold text-white">
                                        Invite new traders
                                    </h3>
                                    <p className="text-gray-400 text-sm">
                                        Place advertisements to attract maximum traffic.
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <FaDollarSign className="text-green-500 text-xl mt-1" />
                                <div>
                                    <h3 className="text-lg font-semibold text-white">
                                        Earn a percentage of the profits!
                                    </h3>
                                    <p className="text-gray-400 text-sm">
                                        Revenue share is up to 80%!
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Button */}
                        <button className="mt-8 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition">
                            BECOME A PARTNER
                        </button>
                    </div>
                </div>
            </div>

            <div className="bg-[#0D0F21] flex items-center justify-center px-4">
                <div className="grid md:grid-cols-2 gap-12 max-w-6xl w-full">
                    {/* Left Side */}
                    <div className="flex flex-col justify-center text-white">
                        <h1 className="text-3xl md:text-4xl font-bold mb-6">
                            Do you have any remaining questions? <br />
                            Contact our support service to get the answers you need!
                        </h1>
                        <a className="flex items-center text-lg mt-4"
                        >
                            <img
                                src="https://upload.wikimedia.org/wikipedia/commons/8/82/Telegram_logo.svg"
                                alt="Telegram"
                                className="w-7 h-7 mr-2"
                            />
                            @quotex_partner
                        </a>
                    </div>

                    {/* Right Side - Registration Card */}
                    <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md mx-auto">
                        <div className="flex flex-col items-center mb-6">
                            <img
                                src="https://quotex-partner.com/partners/media/logos/logo-letter.svg"
                                alt="Logo"
                                className="w-14 mb-3"
                            />
                            <h2 className="text-xl font-semibold text-gray-800">Registration</h2>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <input
                                type="email"
                                name="email"
                                placeholder="Email"
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full px-4 py-3 rounded-lg bg-gray-100 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />

                            <input
                                type="password"
                                name="password"
                                placeholder="Password"
                                value={formData.password}
                                onChange={handleChange}
                                className="w-full px-4 py-3 rounded-lg bg-gray-100 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />

                            <label className="flex items-center text-sm text-gray-600">
                                <input
                                    type="checkbox"
                                    name="terms"
                                    checked={formData.terms}
                                    onChange={handleChange}
                                    className="mr-2"
                                />
                                I accept the{" "}
                                <a href="#" className="text-blue-600 hover:underline ml-1">
                                    Terms and Conditions.
                                </a>
                            </label>

                            <button
                                type="submit"
                                className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition"
                            >
                                Register
                            </button>
                        </form>

                        <p className="text-center text-sm text-gray-600 mt-6">
                            Already have an account?{" "} <br/>
                            <Link to="/signin" className="text-blue-600 hover:underline">
                                Sign in
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
            {/* footer */}
            <footer className="bg-[#0D0D1A] text-gray-300 py-10 ">
                <div className="container mx-auto flex justify-between items-center px-4 max-w-6xl">
                    {/* Left Side */}
                    <p className="text-sm font-semibold">© Quotex 2025. All right reserved</p>

                    {/* Right Side */}
                    <div className="flex space-x-6">
                        <Link
                            to="/register"
                            className="text-sm font-semibold hover:text-white transition-colors"
                        >
                            Registration
                        </Link>
                        <Link
                            to="/signin"
                            className="text-sm font-semibold hover:text-white transition-colors"
                        >
                            Sign In
                        </Link>
                    </div>
                </div>
            </footer>
        </div>

    );
};

export default Home;