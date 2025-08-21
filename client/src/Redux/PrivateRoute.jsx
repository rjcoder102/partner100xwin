import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";
// import { getUserProfile } from "../Redux/reducer/authSlice";
import Cookies from "js-cookie";

const PrivateRoute = () => {
    const dispatch = useDispatch();
    const { user, loading } = useSelector((state) => state.auth);

    useEffect(() => {
        const token = Cookies.get("token");
        // if (token && !user && !loading) {
        dispatch
        // }
    }, [dispatch, user, loading]);

    if (loading) return <p>Loading...</p>;

    return user ? <Outlet /> : <Navigate to="/signin" replace />;
};

export default PrivateRoute;
