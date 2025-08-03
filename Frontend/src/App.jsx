import React from "react";
import { Routes, Route } from "react-router-dom";

import Register from "./components/Register";
import Login from "./components/Login";
import ResetPasswordRequest from "./components/ResetPasswordRequest";
import ResetPasswordForm from "./components/ResetPasswordForm";
import Dashboard from "./components/Dashboard";
import Home from "./components/Home";


export default function App() {
  return (
    <Routes>
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/forgot-password" element={<ResetPasswordRequest />} />
      <Route path="/reset-password" element={<ResetPasswordForm />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/home" element={<Home />} />

      <Route path="*" element={<Home />} />
    </Routes>
  );
}
