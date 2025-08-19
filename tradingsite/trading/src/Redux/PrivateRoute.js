import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import { getUser } from "../Redux/reducer/authSlice";

const PrivateRoute = () => {
    const dispatch = useDispatch();
    const { userInfo } = useSelector((state) => state.auth);
    const [ok, setOk] = useState(true);

    const processedUserInfo = useMemo(() => {
        return userInfo ? userInfo : null;
    }, [userInfo]);

    useEffect(() => {
        if (!processedUserInfo) {
            dispatch(getUser());
        }
    }, [dispatch, processedUserInfo]);

    useEffect(() => {
        setOk(!!processedUserInfo);
    }, [processedUserInfo]);

    return <Outlet /> 
};

export default PrivateRoute;
