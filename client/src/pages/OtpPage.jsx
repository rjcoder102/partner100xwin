import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { verifyOtp, resendOtp } from "../Redux/reducer/authSlice";


const OtpPage = () => {
    const [otp, setOtp] = useState("");
    const navigate = useNavigate();
    const location = useLocation();
    const email = location.state?.email;
    const [resendMsg, setResendMsg] = useState("");
    const [localError, setLocalError] = useState("");


    const dispatch = useDispatch();
    const { loading, error, success } = useSelector((state) => state.auth);

    const handleSubmit = (e) => {
        console.log("ewkjhg");

        e.preventDefault();

        if (!otp || otp.length < 6) {
            setLocalError("Please enter a valid 6-digit OTP.");
            return;
        }

        setLocalError("");
        dispatch(verifyOtp({ otp }))
            .unwrap()
            .then((res) => {
                if (res.success) {
                    navigate("/dashboard");
                }
            })
            .catch((err) => {
                console.log(err.message);

            });
    };

    // ✅ Proper resendOtp integration
    const handleResend = () => {
        setResendMsg("");
        dispatch(resendOtp())
            .unwrap()
            .then((res) => {
                setResendMsg(res.message || "OTP has been resent successfully.");
            })
            .catch((err) => {
                setResendMsg(err || "Failed to resend OTP. Try again.");
            });
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
                        Please enter the PIN-code sent to <br /> your email
                    </p>
                </div>

                {localError && <p className="text-red-500 mb-2">india </p>}
                {error && <p className="text-red-500 mb-2">{resendMsg}</p>}
                {success && <p className="text-green-500 mb-2">{resendMsg}</p>}

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
                            disabled={loading}
                        >
                            Resend PIN-code
                        </button>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700 p-3 rounded-md font-semibold transition"
                        disabled={loading}
                    >
                        {loading ? "Processing..." : "Sign In"}
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
