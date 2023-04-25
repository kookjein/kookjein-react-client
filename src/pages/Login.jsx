import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Footer from "../components/Footer";
import GoogleLogo from "../assets/google_logo.png";

const Login = () => {
  const navigate = useNavigate();
  const { t } = useTranslation("login");

  const LoginSection = () => {
    const [usernameValue, setUsernameValue] = useState("");
    const [passwordValue, setPasswordValue] = useState("");
    const [rememberChecked, setRememberChecked] = useState(false);
    const [errorMessage] = useState("");

    return (
      <div
        style={{ minHeight: "calc(100vh - 3rem)" }}
        className="w-full flex flex-col items-center justify-center relative bg-gradient-to-b from-green-900 to-emerald-900 flex-shrink-0"
      >
        <div className="max-w-md px-4">
          <div className="bg-gray-50 px-6 sm:px-10 pt-6 sm:pt-12 rounded shadow-lg ring-1">
            <h1 className="text-3xl font-bold">{t("title")}</h1>

            <button className="w-full h-11 bg-white p-1 rounded flex items-center mt-8 rounded shadow-sm ring-1 ring-gray-200 hover:bg-gray-100 transition">
              <div style={{ aspectRatio: 1 }} className="w-10 h-10 h-full p-1.5 rounded-full">
                <img src={GoogleLogo} alt="" className="h-full w-full object-contain" />
              </div>
              <div className="w-full flex items-center justify-center text-black h-full pr-9">{t("google")}</div>
            </button>

            <div className="flex items-center h-1 py-8 w-full">
              <div className="border-t h-px w-full border-gray-300"></div>
              <p className="flex-shrink-0 px-3 text-sm text-gray-400">{t("or")}</p>
              <div className="border-t h-px w-full border-gray-300"></div>
            </div>

            <div className="bg-white rounded bg-opacity-10 w-full space-y-5">
              <input
                placeholder={t("username")}
                value={usernameValue}
                onChange={(e) => setUsernameValue(e.target.value)}
                className="w-full border rounded px-3 py-2 outline-none"
              />
              <input
                placeholder={t("password")}
                type={"password"}
                value={passwordValue}
                onChange={(e) => setPasswordValue(e.target.value)}
                className="w-full border rounded px-3 py-2 outline-none"
              />
            </div>

            {errorMessage && <p className="mt-4 text-xs text-red-500">{errorMessage}</p>}
            <button
              onClick={() => navigate("/main")}
              style={{ backgroundColor: "#1FAD72" }}
              disabled={errorMessage === "Successfully submitted!"}
              className="p-2 rounded px-6 mt-5 w-full font-bold text-white"
            >
              {t("login")}
            </button>

            <div className="flex justify-between mt-3 text-gray-700 text-sm">
              <button onClick={() => setRememberChecked(!rememberChecked)}>
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    className="cursor-pointer"
                    checked={rememberChecked}
                    onChange={({ target: { checked } }) => setRememberChecked(checked)}
                  />
                  <p>{t("rememberMe")}</p>
                </div>
              </button>
              <button>
                <p style={{ color: "#1FAD72" }} className="hover:underline">
                  {t("forgotPassword")}
                </p>
              </button>
            </div>

            <div className="flex justify-center mt-10 text-gray-700 text-sm h-14 border-t items-center space-x-1">
              <p>{t("notAMember")}</p>
              <a href="/signup">
                <button>
                  <p style={{ color: "#1FAD72" }} className="hover:underline font-bold">
                    {t("signUp")}
                  </p>
                </button>
              </a>
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
