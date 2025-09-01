import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import { getUser } from "./Reducer/adminReducer";
import Spinner from "../component/Spinner";

const PrivateRoute = () => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.admin);
  const [ok, setOk] = useState(true);

  console.log(userInfo)
  // Memoize the userInfo processing to avoid unnecessary computations
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

  return ok ? <Outlet /> : <Spinner />;
};

export default PrivateRoute;
