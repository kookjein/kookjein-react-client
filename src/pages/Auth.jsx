import React from "react";
import Signup from "../components/auth/Signup";
import { Route, Routes } from "react-router-dom";
import Login from "../components/auth/Login";

const Auth = () => {
  return (
    <div className="w-full flex flex-col items-center">
      <div
        style={{ minHeight: "calc(100vh - 8rem)" }}
        className="w-full flex flex-col items-center justify-center relative bg-gray-100 flex-shrink-0 py-12"
      >
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </div>
    </div>
  );
};

export default Auth;
