import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from 'sonner';
import Home from "./pages/Home";
import Layout from "./component/DashboardLayout";
import Member from "./pages/Member";
import WithdrawPage from "./pages/Withdraw";
import DepositPage from "./pages/Deposit";
import Login from "./pages/Login";
import Setting from "./pages/Setting";
import DownlineUser from "./pages/DownlineUser";

function App() {
  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Layout><Home /></Layout> } />
        <Route path="/login" element={<Login /> } />
        <Route path="/members" element={<Layout><Member /></Layout> } />
        <Route path="/downline/:id" element={<Layout><DownlineUser /></Layout> } />
        <Route path="/withdraw" element={<Layout><WithdrawPage /></Layout> } />
        <Route path="/deposit" element={<Layout><DepositPage /></Layout> } />
        <Route path="/deposit" element={<Layout><DepositPage /></Layout> } />
        <Route path="/settings" element={<Layout><Setting /></Layout> } />
      </Routes>
          <Toaster 
        position="top-right"
        expand={false}
        richColors
        closeButton
        theme="light"
      />
    </Router>
  );
}

export default App;
