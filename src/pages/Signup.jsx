import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Footer from "../components/Footer";
import { BsFileEarmarkCodeFill, BsFillBuildingFill } from "react-icons/bs";

const Signup = () => {
  const navigate = useNavigate();
  const { t } = useTranslation("signup");
  const [signupStep, setSignupStep] = useState(0);

  const SignupSection0 = () => {
    const [type, setType] = useState(null);

    const Card = ({ cardType, text, icon }) => (
      <button
        onClick={() => setType(cardType)}
        className={`${
          type === cardType ? "ring-2 bg-green-600 bg-opacity-10 text-green-700" : "hover:ring-2 text-gray-500"
        } flex h-full w-full rounded border ring-green-600 transition flex items-start justify-center relative flex-col px-6`}
      >
        {icon}
        <h1 className="text-xl font-bold mt-4 text-start">{text}</h1>
        <div
          className={`${
            type === cardType ? "border-green-600 bg-green-600" : "border-gray-300"
          } w-5 h-5 bg-white rounded-full absolute top-3 right-3 border-2 p-0.5`}
        >
          {type === cardType && <div className="w-full h-full rounded-full bg-green-600 ring-2 ring-white" />}
        </div>
      </button>
    );
    return (
      <div
        style={{ minHeight: "calc(100vh - 3rem)" }}
        className="w-full flex flex-col items-center justify-center relative bg-gradient-to-b from-green-900 to-emerald-900 flex-shrink-0"
      >
        <div className="max-w-2xl px-4 w-full">
          <div className="bg-gray-50 px-6 sm:px-10 pt-6 sm:py-12 rounded shadow-lg ring-1 w-full">
            <h1 className="text-2xl font-bold">{t("companyOrDev")}</h1>
            <div className="flex h-40 w-full mt-8 space-x-6">
              <Card
                cardType={"company"}
                text={t("companyCard")}
                icon={<BsFillBuildingFill className="w-10 h-10" />}
              />
              <Card
                cardType={"developer"}
                text={t("developerCard")}
                icon={<BsFileEarmarkCodeFill className="w-10 h-10" />}
              />
            </div>

            <button
              style={{ backgroundColor: type ? "#1FAD72" : "#c2c2c2" }}
              onClick={() => setSignupStep(1)}
              disabled={!type}
              className="p-2 rounded px-6 mt-8 w-full font-bold text-white"
            >
              {t("continue")}
            </button>
          </div>
        </div>
      </div>
    );
  };

  const SignupSection1 = () => {
    const [firstnameValue, setFirstnameValue] = useState("");
    const [passwordValue, setPasswordValue] = useState("");
    const [errorMessage] = useState("");
    const [emailValue, setEmailValue] = useState("");

    return (
      <div
        style={{ minHeight: "calc(100vh - 3rem)" }}
        className="w-full flex flex-col items-center justify-center relative bg-gradient-to-b from-green-900 to-emerald-900 flex-shrink-0"
      >
        <div className="max-w-md px-4">
          <div className="bg-gray-50 px-6 sm:px-10 pt-6 sm:pt-12 rounded shadow-lg ring-1">
            <h1 className="text-3xl font-bold">{t("signup")}</h1>

            <div className="mt-8 bg-white rounded bg-opacity-10 w-full space-y-5">
              <input
                placeholder={t("name")}
                value={firstnameValue}
                onChange={(e) => setFirstnameValue(e.target.value)}
                className="w-full border rounded px-3 py-2 outline-none"
              />

              <input
                placeholder={t("companyName")}
                value={emailValue}
                onChange={(e) => setEmailValue(e.target.value)}
                className="w-full border rounded px-3 py-2 outline-none"
              />

              <input
                placeholder={t("email")}
                value={emailValue}
                onChange={(e) => setEmailValue(e.target.value)}
                className="w-full border rounded px-3 py-2 outline-none"
              />

              <input
                placeholder={t("password")}
                // type={"password"}
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
              {t("complete")}
            </button>

            <div className="flex justify-center mt-10 text-gray-700 text-sm h-14 border-t items-center space-x-1">
              <p>{t("already")}</p>
              <a href="/login">
                <button>
                  <p style={{ color: "#1FAD72" }} className="hover:underline font-bold">
                    {t("login")}
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
      {signupStep === 0 ? <SignupSection0 /> : <SignupSection1 />}
      <Footer />
    </div>
  );
};

export default Signup;
