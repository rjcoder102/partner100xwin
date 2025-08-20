import React, { useState } from "react";
import DashboardHeader from "../components/DashboardHeader";

const WithdrawalPage = () => {
    // Local form state
    const [amount, setAmount] = useState("");
    const [usdtAddress, setUsdtAddress] = useState(""); // ✅ Added this

    // Handle submit (dummy)
    const handleWithdraw = () => {
        if (!amount || !usdtAddress) {
            alert("Please enter amount and USDT address");
            return;
        }
        alert(`Withdrawal request submitted!\nAmount: $${amount}\nUSDT Address: ${usdtAddress}`);
        setAmount("");
        setUsdtAddress("");
    };

    return (
        <>
            <div>
                <DashboardHeader />
            </div>
            <div className="min-h-screen flex flex-col items-center">
                {/* Alert */}
                <div className="w-full max-w-6xl">
                    <div className="bg-red-500 text-white px-4 py-3 rounded-md mb-6 flex items-center gap-2">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                        </svg>
                        <span>
                            Withdrawal will be available when your traders make 10 FTD. Until
                            that moment, the commission is accumulated on the balance.
                        </span>
                    </div>
                </div>

                {/* Main Section */}
                <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-6 ">
                    {/* Left: Withdrawal Form */}
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <h2 className="text-xl font-semibold mb-4">Withdrawal</h2>

                        {/* Amount */}
                        <label className="block mb-2 text-sm font-medium text-gray-700">
                            Amount
                        </label>
                        <input
                            type="number"
                            placeholder="Please enter amount in USD"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            className="w-full px-4 py-3 border rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />

                        {/* USDT Address */}
                        <label className="block mb-2 text-sm font-medium text-gray-700">
                            USDT Wallet Address
                        </label>
                        <input
                            type="text"
                            placeholder="Enter your USDT wallet address"
                            value={usdtAddress}
                            onChange={(e) => setUsdtAddress(e.target.value)}
                            className="w-full px-4 py-3 border rounded-lg mb-6 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />

                        {/* Button */}
                        <button
                            onClick={handleWithdraw}
                            className="w-full bg-blue-400 hover:bg-blue-500 text-white py-3 rounded-lg transition"
                        >
                            Withdraw
                        </button>
                    </div>

                    {/* Right: Help Section */}
                    <div>
                        <img src="https://i.ibb.co/RdXzLNB/kundan.png" alt="" className="w-full" />
                    </div>
                </div>

                {/* FAQ */}
                <div className="bg-white rounded-lg shadow p-6 mt-8 md:mt-8">
                    <h2 className="text-xl font-semibold mb-4 text-gray-900">
                        Frequently Asked Questions
                    </h2>
                    <div className="space-y-6">
                        <div>
                            <h3 className="font-medium text-gray-800">
                                How do I add a method to withdraw commission?
                            </h3>
                            <p className="text-gray-600">
                                Go to the Account section → Wallets → Add New. Select the method,
                                fill in details, and click Save.
                            </p>
                        </div>

                        <div>
                            <h3 className="font-medium text-gray-800">
                                How can I cancel a withdrawal?
                            </h3>
                            <p className="text-gray-600">
                                Withdrawals with status <strong>New</strong> can be canceled by
                                contacting support or your manager. Other statuses cannot be
                                canceled.
                            </p>
                        </div>

                        <div>
                            <h3 className="font-medium text-gray-800">
                                The withdrawal has not arrived in full
                            </h3>
                            <p className="text-gray-600">
                                Bank card withdrawals may arrive in parts. If the full amount does
                                not arrive within 3 days, please contact us.
                            </p>
                        </div>

                        <div>
                            <h3 className="font-medium text-gray-800">
                                What does “Pending” status mean?
                            </h3>
                            <p className="text-gray-600">
                                Funds are with the payment provider and may take up to 3 days to be
                                credited.
                            </p>
                        </div>

                        <div>
                            <h3 className="font-medium text-gray-800">
                                What does “New” status mean?
                            </h3>
                            <p className="text-gray-600">
                                Your withdrawal request was created and is waiting to be sent. It
                                may take up to 3 days depending on workload.
                            </p>
                        </div>

                        <div>
                            <h3 className="font-medium text-gray-800">
                                Status is “Complete” but money not received
                            </h3>
                            <p className="text-gray-600">
                                Crediting can take up to 3 days. If not received after 3 days,
                                contact us.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default WithdrawalPage;
