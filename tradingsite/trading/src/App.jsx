import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import Forgot from "./pages/Forgot";   // ✅ Capitalize file names consistently
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
// import PrivateRoute from "../src/Redux/PrivateRoute";

function App() {
  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/forgot" element={<Forgot />} />
        <Route path="/register" element={<Register />} />
        {/* <Route path="/dashboard" element={<Dashboard />} /> */}

        {/* Protected routes */}
        {/* <Route element={<PrivateRoute />}> */}
          <Route path="/dashboard" element={<Dashboard />} />
        {/* </Route> */}
      </Routes>
    </Router>
  );
}

export default App;
