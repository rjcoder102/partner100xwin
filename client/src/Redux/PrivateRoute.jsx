import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { getUser } from "./reducer/authSlice";

const PrivateRoute = () => {
    const dispatch = useDispatch();
    const { userInfo, loading } = useSelector((state) => state.auth);
    const [shouldRedirect, setShouldRedirect] = useState(false);

    // console.log("userInfo", userInfo);

    useEffect(() => {
        if (!userInfo) {
            dispatch(getUser());
        }
    }, [dispatch, userInfo]);

    // Delay redirect by 2s
    useEffect(() => {
        let timer;
        if (!loading && !userInfo) {
            timer = setTimeout(() => setShouldRedirect(true), 2000);
        } else {
            setShouldRedirect(false);
        }
        return () => clearTimeout(timer);
    }, [loading, userInfo]);

    // Show spinner while loading
    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                Loading...
            </div>
        );
    }

    // Redirect after 2 seconds if no user
    if (shouldRedirect) {
        return <Navigate to="/signin" replace />;
    }

    // Show outlet if authenticated
    if (userInfo) {
        return <Outlet />;
    }

    // While waiting for 2s delay, you can show a fallback
    return (
        <div className="flex justify-center items-center h-screen">
            Checking authentication...
        </div>
    );
};

export default PrivateRoute;
