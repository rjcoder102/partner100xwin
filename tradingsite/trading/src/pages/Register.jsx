import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../Redux/reducer/authSlice";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Register = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        terms: false,
    });

   
    const { loading, error, user } = useSelector((state) => state.auth);

    // Handle input changes
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === "checkbox" ? checked : value,
        });
    };

    // Handle submit
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(registerUser({ email: formData.email, password: formData.password }));
    };

    // Show popup & navigate
    useEffect(() => {
        if (user) {
            toast.success("🎉 Successfully registered!", {
                position: "top-center",
                autoClose: 2000,
                theme: "colored",
            });

            setTimeout(() => {
                navigate("/dashboard");
            }, 2200); // wait for toast before redirect
        }
    }, [user, navigate]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#0D0F21]">
            <div className=" shadow-lg p-8 w-full max-w-md mx-auto">
                <div className="flex flex-col items-center mb-6">
                    <img
                        src="https://quotex-partner.com/partners/media/logos/logo-letter.svg"
                        alt="Logo"
                        className="w-14 mb-3"
                    />
                    <h2 className="text-xl font-semibold text-gray-50">Registration</h2>
                </div>

                {error && <p className="text-red-500 mb-2">{error}</p>}

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

                    <label className="flex items-center text-sm text-gray-50">
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
                        disabled={loading}
                    >
                        {loading ? "Signing up..." : "Register"}
                    </button>
                </form>

                <p className="text-center text-sm text-gray-50 mt-6">
                    Already have an account? <br />
                    <Link to="/signin" className="text-blue-600 hover:underline">
                        Sign in
                    </Link>
                </p>
            </div>

            {/* Toast Popup */}
            <ToastContainer />
        </div>
    );
};

export default Register;
