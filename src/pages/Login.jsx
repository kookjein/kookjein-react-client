import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
// import { useTranslation } from "react-i18next";
import Footer from "../components/Footer";

const Login = () => {
  const navigate = useNavigate();
  // const { t } = useTranslation("mainPage");

  const LoginSection = () => {
    const [usernameValue, setUsernameValue] = useState("");
    const [passwordValue, setPasswordValue] = useState("");
    const [errorMessage] = useState("");

    return (
      <div
        style={{ minHeight: "calc(100vh - 3rem)" }}
        className="w-full flex flex-col items-center justify-center relative bg-gradient-to-b from-green-900 to-emerald-900 flex-shrink-0"
      >
        <div className="max-w-2xl px-4">
          <div className="bg-gray-50 px-6 sm:px-12 pt-6 sm:pt-12 rounded shadow-lg ring-1">
            <h1 className="text-3xl font-bold">국제인 로그인</h1>
            <h1 className="mt-3">글로벌 개발자 매칭 플랫폼</h1>

            <div className="mt-8 bg-white rounded bg-opacity-10 w-full space-y-5">
              <input
                placeholder="아이디 또는 이메일"
                value={usernameValue}
                onChange={(e) => setUsernameValue(e.target.value)}
                className="w-full border rounded px-3 py-2 outline-none"
              />
              <input
                placeholder="비밀번호"
                type={"password"}
                value={passwordValue}
                onChange={(e) => setPasswordValue(e.target.value)}
                className="w-full border rounded px-3 py-2 outline-none"
              />
            </div>

            {errorMessage && (
              <p className="mt-4 text-xs text-red-500">{errorMessage}</p>
            )}
            <button
              onClick={() => navigate("/main")}
              style={{ backgroundColor: "#1FAD72" }}
              disabled={errorMessage === "Successfully submitted!"}
              className="p-2 rounded px-6 mt-5 w-full font-bold text-white"
            >
              로그인
            </button>

            <div className="flex justify-between mt-3 text-gray-700 text-sm">
              <div className="flex items-center space-x-2">
                <input type="checkbox" className="cursor-pointer" />
                <p>Remember me</p>
              </div>
              <p style={{ color: "#1FAD72" }} className="hover:underline">
                Forgot Password?
              </p>
            </div>

            <div className="flex justify-center mt-10 text-gray-700 text-sm h-14 border-t items-center space-x-1">
              <p>Not a member yet?</p>
              <button>
                <p style={{ color: "#1FAD72" }} className="hover:underline font-bold">
                  Join now
                </p>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="w-full h-screen flex flex-col items-center">
      <Navbar />
      <LoginSection />
      <Footer />
    </div>
  );
};

export default Login;
