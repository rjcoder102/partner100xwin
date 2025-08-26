import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createWithdrawal } from "../Redux/reducer/withdrawlSlicer";

const WithdrawalPage = () => {
    const dispatch = useDispatch();

    const [amount, setAmount] = useState("");
    const [usdtAddress, setUsdtAddress] = useState("");
    const [selectedMethod, setSelectedMethod] = useState("");

    const handleWithdraw = async (e) => {
        e.preventDefault();
        // console.log("✅ Withdrawal Request:", amount, usdtAddress);

        if (!amount || !usdtAddress) {
            alert("Please enter amount and USDT address");
            return;
        }

        try {
            const response = await dispatch(
                createWithdrawal({ amount, usdt_address: usdtAddress })
            ).unwrap();

            alert(
                `Withdrawal request submitted!\nAmount: $${response.amount}\nStatus: ${response.status}`
            );

            setAmount("");
            setUsdtAddress("");
        } catch (err) {
            console.error("❌ Withdrawal Error:", err);
            alert(`Error: ${err.message || "Something went wrong"}`);
        }
    };

    return (
        <div className="min-h-screen bg-gray-200">
            <div className="max-w-6xl mx-auto pt-4">
                {/* Alert Banner */}
                <div className="bg-gradient-to-r from-red-500 to-orange-500 text-gray-50 p-2 rounded-lg mb-4 flex items-start gap-3 shadow-md">
                    <div className="mt-0.5">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                    </div>
                    <div>
                        <p className="text-sm text-gray-50 opacity-90 mt-1">
                            Withdrawal will be available when your traders make 10 FTD. Until that moment, the commission is accumulated on your balance.
                        </p>
                    </div>
                </div>

                {/* Main Content */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column - Withdrawal Form */}
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-xl shadow-md overflow-hidden">
                            <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-5 text-white">
                                <h2 className="text-xl font-semibold">Withdraw Funds</h2>
                                <p className="text-blue-100 text-sm mt-1">Transfer your earnings to your wallet</p>
                            </div>

                            <div className="p-6">
                                {/* Payment Method Selection */}
                                <div className="mb-6">
                                    <h3 className="text-sm font-medium text-gray-700 mb-3">Select Payment Method</h3>
                                    <div className="grid grid-cols-2 gap-3">
                                        <button
                                            onClick={() => setSelectedMethod("usdt")}
                                            className={`p-3 border rounded-lg flex items-center justify-center gap-2 transition-all ${selectedMethod === "usdt" ? "border-blue-500 bg-blue-50" : "border-gray-200 hover:border-blue-300"}`}
                                        >
                                            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                            </div>
                                            <span className="text-sm font-medium">USDT</span>
                                        </button>
                                        <button
                                            onClick={() => setSelectedMethod("bank")}
                                            className={`p-3 border rounded-lg flex items-center justify-center gap-2 transition-all ${selectedMethod === "bank" ? "border-blue-500 bg-blue-50" : "border-gray-200 hover:border-blue-300"}`}
                                        >
                                            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                                                </svg>
                                            </div>
                                            <span className="text-sm font-medium">Bank Transfer</span>
                                        </button>
                                    </div>
                                </div>

                                {/* Amount Input */}
                                <div className="mb-6">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Amount (USD)
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <span className="text-gray-500 font-medium">$</span>
                                        </div>
                                        <input
                                            type="number"
                                            placeholder="Enter amount"
                                            value={amount}
                                            onChange={(e) => setAmount(e.target.value)}
                                            className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                                        />
                                    </div>
                                    <p className="text-xs text-gray-500 mt-2">Minimum withdrawal: $10.00</p>
                                </div>

                                {/* USDT Address Input */}
                                <div className="mb-6">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        USDT Wallet Address
                                    </label>
                                    <input
                                        type="text"
                                        value={usdtAddress}
                                        onChange={(e) => setUsdtAddress(e.target.value)}
                                        placeholder="Enter your USDT address"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                                    />
                                </div>

                                {/* Info Box */}
                                <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 mb-6">
                                    <div className="flex">
                                        <div className="flex-shrink-0">
                                            <svg className="h-5 w-5 text-blue-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                                            </svg>
                                        </div>
                                        <div className="ml-3">
                                            <h3 className="text-sm font-medium text-blue-800">Processing Time</h3>
                                            <div className="mt-2 text-sm text-blue-700">
                                                <p>Withdrawals are processed within 24-48 hours. A network fee of $1.50 will be deducted.</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Submit Button */}
                                <button
                                    onClick={handleWithdraw}
                                    disabled={!amount || !usdtAddress }
                                    className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white py-3 px-4 rounded-lg font-medium shadow-md transition disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {/* {loading ?"Processing..." : "Request Withdrawal"} */}
                                    Processing...
                                </button>
                            </div>
                        </div>

                        {/* FAQ Section */}
                        <div className="bg-white rounded-xl shadow-md p-6 mt-8">
                            <h2 className="text-xl font-semibold text-gray-800 mb-6 pb-2 border-b border-gray-100">Frequently Asked Questions</h2>
                            <div className="bg-white rounded-xl shadow-md p-6 mt-8">
                                <h2 className="text-xl font-semibold text-gray-800 mb-6 pb-2 border-b border-gray-100">Frequently Asked Questions</h2>
                                <div className="space-y-6">
                                    {[
                                        {
                                            question: "How do I add a method to withdraw commission?",
                                            answer: "Go to the Account section → Wallets → Add New. Select the method, fill in details, and click Save."
                                        },
                                        {
                                            question: "How can I cancel a withdrawal?",
                                            answer: "Withdrawals with status New can be canceled by contacting support or your manager. Other statuses cannot be canceled."
                                        },
                                        {
                                            question: "The withdrawal has not arrived in full",
                                            answer: "Bank card withdrawals may arrive in parts. If the full amount does not arrive within 3 days, please contact us."
                                        },
                                        {
                                            question: "What does 'Pending' status mean?",
                                            answer: "Funds are with the payment provider and may take up to 3 days to be credited."
                                        },
                                        {
                                            question: "What does 'New' status mean?",
                                            answer: "Your withdrawal request was created and is waiting to be sent. It may take up to 3 days depending on workload."
                                        },
                                        {
                                            question: "Status is 'Complete' but money not received",
                                            answer: "Crediting can take up to 3 days. If not received after 3 days, contact us."
                                        }
                                    ].map((faq, index) => (
                                        <div key={index} className="group">
                                            <h3 className="font-medium text-gray-800 group-hover:text-blue-600 transition-colors">
                                                {faq.question}
                                            </h3>
                                            <p className="text-gray-600 text-sm mt-1">
                                                {faq.answer}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>



                    {/* Right Column - Balance & Help */}
                    <div className="space-y-6">
                        {/* Balance Summary */}
                        <div className="bg-white rounded-xl shadow-md p-6">
                            <h3 className="text-lg font-semibold text-gray-800 mb-4">Balance Summary</h3>
                            <div className="space-y-4">
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Total Balance:</span>
                                    <span className="font-medium">$2,450.00</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Available for Withdrawal:</span>
                                    <span className="font-medium text-green-600">$1,890.00</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Pending Withdrawals:</span>
                                    <span className="font-medium text-amber-600">$560.00</span>
                                </div>
                                <div className="pt-4 border-t border-gray-100">
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Last Withdrawal:</span>
                                        <span className="font-medium">Aug 18, 2025</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Help Card */}
                        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-md overflow-hidden text-white">
                            <div className="p-6">
                                <h3 className="text-lg font-semibold mb-2">Need Help?</h3>
                                <p className="text-blue-100 text-sm mb-4">Our support team is here to help you with your withdrawal questions.</p>
                                <div className="space-y-3">
                                    <div className="flex items-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                        </svg>
                                        <span className="text-sm">+1 (800) 123-4567</span>
                                    </div>
                                    <div className="flex items-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                        </svg>
                                        <span className="text-sm">support@example.com</span>
                                    </div>
                                </div>
                                <button className="w-full mt-4 bg-white text-blue-600 py-2 rounded-lg font-medium text-sm hover:bg-blue-50 transition">
                                    Contact Support
                                </button>
                            </div>
                        </div>

                        {/* USDT QR Code */}
                        <div className="bg-white rounded-xl shadow-md p-6 text-center">
                            <h3 className="text-lg font-semibold text-gray-800 mb-4">USDT Deposit Address</h3>
                            <div className="bg-white p-3 rounded-lg border border-gray-200 inline-block mb-4">
                                <img
                                    src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=USDT_DEPOSIT_ADDRESS_EXAMPLE"
                                    alt="USDT QR Code"
                                    className="w-32 h-32"
                                />
                            </div>
                            <p className="text-sm text-gray-600">Scan this QR code to get our USDT deposit address</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WithdrawalPage;
