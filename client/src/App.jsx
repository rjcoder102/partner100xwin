import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import Forgot from "./pages/Forgot";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import PrivateRoute from "./Redux/PrivateRoute";
import OtpPage from "./pages/OtpPage";
import UserInformation from "./pages/UserInformation";
import Myaccount from "./pages/Myaccount";
import SelfWithdrawl from "./pages/SelfWithdrawl";



function App() {
  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/forgot" element={<Forgot />} />
        <Route path="/register" element={<Register />} />
        <Route path="/otpcode" element={<OtpPage />} />

        {/* Protected routes */}
        <Route element={<PrivateRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/myaccount" element={<Myaccount />} />
          <Route path="/selfwithdrawl" element={<SelfWithdrawl />} />
          <Route path="/userInformation" element={<UserInformation />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
