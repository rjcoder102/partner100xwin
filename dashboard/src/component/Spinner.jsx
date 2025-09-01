import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
const Spinner = ({ path = "login" }) => {
  const [count, setCount] = useState(3);
  const navigate = useNavigate();
  const location = useLocation();
  const { userInfo } = useSelector((state) => state.admin);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prevValue) => --prevValue);
    }, 1000);
    if (userInfo) {
      navigate({
        state: location.pathname,
      });
    }
    count === 0 &&
      navigate(`/${path}`, {
        state: location.pathname,
      });
    return () => clearInterval(interval);
  }, [count, navigate, location, path]);
  return (
    <>
      {count !== 0 ? (
        /* From Uiverse.io by clarencedion */
        <div className="w-full fixed h-[100vh] mx-auto overflow-hidden flex justify-center items-center bg-white">
   
<div class="flex-col gap-4 w-full flex items-center justify-center">
  <div class="w-28 h-28 border-8 text-[#08c18a] text-4xl animate-spin border-gray-300 flex items-center justify-center border-t-[#08c18a] rounded-full">

  </div>
</div>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default Spinner;
