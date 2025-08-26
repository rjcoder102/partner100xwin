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
import Deposit from "./components/Deposit";
import DashboardPage from "./components/DashboardPage";
import Withdrawl from "./pages/Withdrawl";
import DownlineUser from "./components/DownlineUser";
import Layout from "./layout/Layout";
import LinksPage from "./pages/LinksPage";

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

        {/* Wrap Layout inside PrivateRoute if needed */}
        <Route element={<PrivateRoute />}>
          <Route path="" element={<Layout />}>
            <Route path="userinformation" element={<UserInformation />} />
            <Route path="myaccount" element={<Myaccount />} />
            <Route path="selfwithdrawl" element={<SelfWithdrawl />} />
            <Route path="deposit" element={<Deposit />} />
            <Route path="dasboardpage" element={<DashboardPage />} />
            <Route path="withdrawl" element={<Withdrawl />} />
            <Route path="downlineuser" element={<DownlineUser />} />
            <Route path="linkpages" element={<LinksPage />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
