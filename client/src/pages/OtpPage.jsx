import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

const OtpPage = () => {
    const [otp, setOtp] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const navigate = useNavigate();
    const location = useLocation();
    const email = location.state?.email; 

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        setSuccess("");

        // ✅ Replace with API call for OTP validation
        setTimeout(() => {
            if (otp === "123456") {
                setSuccess("OTP Verified Successfully!");
                navigate("/dashboard");
            } else {
                setError("Invalid OTP, please try again.");
            }
            setLoading(false);
        }, 1500);
    };

    const handleResend = () => {
        // ✅ Replace with resend OTP API
        setSuccess(`A new OTP has been sent to ${email || "your email"}.`);
        setError("");
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#0D0F21] px-4">
            <div className="bg-[#0D0F21] text-white w-full max-w-md p-8 rounded-lg shadow-lg">
                <div className="flex justify-center mb-4">
                    <img
                        src="https://quotex-partner.com/partners/media/logos/logo-letter.svg"
                        alt="logo"
                        className="h-14"
                    />
                </div>
                <div className="text-center">
                    <h2 className="text-2xl font-bold mb-2">Quotex Affiliate Center</h2>
                    <p className="text-gray-400 mb-6">
                        Please enter the PIN-code sent to <br />  your email
                    </p>
                </div>

                {error && <p className="text-red-500 mb-2">{error}</p>}
                {success && <p className="text-green-500 mb-2">{success}</p>}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="text"
                        maxLength="6"
                        placeholder="Enter 6-digit code..."
                        value={otp}
                        onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                        className="w-full p-3 rounded-md bg-gray-100 text-black border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <div className="text-end">
                        <button
                            type="button"
                            onClick={handleResend}
                            className="text-blue-400 hover:underline text-sm"
                        >
                            Resend PIN-code
                        </button>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700 p-3 rounded-md font-semibold transition"
                        disabled={loading}
                    >
                        {loading ? "Verifying..." : "Sign In"}
                    </button>
                </form>

                <div className="mt-4 flex flex-col gap-2 text-center">
                    <Link to="/signin" className="text-blue-400 hover:underline text-sm">
                        Go back
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default OtpPage;
