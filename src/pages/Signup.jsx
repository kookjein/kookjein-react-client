import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Footer from "../components/Footer";

const Signup = () => {
  const navigate = useNavigate();
  const { t } = useTranslation("login");
  const [signupStep, setSignupStep] = useState(0);

  const SignupSection1 = () => {
    const [emailValue, setEmailValue] = useState("");
    const [errorMessage] = useState("");

    return (
      <div
        style={{ minHeight: "calc(100vh - 3rem)" }}
        className="w-full flex flex-col items-center justify-center relative bg-gradient-to-b from-green-900 to-emerald-900 flex-shrink-0"
      >
        <div className="max-w-md px-4 w-full">
          <div className="bg-gray-50 px-6 sm:px-10 pt-6 sm:pt-12 rounded shadow-lg ring-1 w-full">
            <h1 className="text-3xl font-bold">국제인 회원가입</h1>
            <h1 className="mt-3">Step 1. 이메일로 가입</h1>

            <div className="mt-8 bg-white rounded bg-opacity-10 w-full">
              <input
                placeholder="이메일"
                value={emailValue}
                onChange={(e) => setEmailValue(e.target.value)}
                className="w-full border rounded px-3 py-2 outline-none"
              />
            </div>

            {errorMessage && (
              <p className="mt-4 text-xs text-red-500">{errorMessage}</p>
            )}
            <button
              onClick={() => setSignupStep(1)}
              style={{ backgroundColor: "#1FAD72" }}
              disabled={errorMessage === "Successfully submitted!"}
              className="p-2 rounded px-6 mt-5 w-full font-bold text-white"
            >
              계속
            </button>

            <div className="flex justify-center mt-10 text-gray-700 text-sm h-14 border-t items-center space-x-1">
              <p>이미 회원이신가요?</p>
              <a href="/login">
                <button>
                  <p
                    style={{ color: "#1FAD72" }}
                    className="hover:underline font-bold"
                  >
                    로그인
                  </p>
                </button>
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  };
  const SignupSection2 = () => {
    const [firstnameValue, setFirstnameValue] = useState("");
    const [lastnameValue, setLastnameValue] = useState("");
    const [passwordValue, setPasswordValue] = useState("");
    const [errorMessage] = useState("");

    return (
      <div
        style={{ minHeight: "calc(100vh - 3rem)" }}
        className="w-full flex flex-col items-center justify-center relative bg-gradient-to-b from-green-900 to-emerald-900 flex-shrink-0"
      >
        <div className="max-w-md px-4">
          <div className="bg-gray-50 px-6 sm:px-10 pt-6 sm:pt-12 rounded shadow-lg ring-1">
            <h1 className="text-3xl font-bold">국제인 회원가입</h1>
            <h1 className="mt-3">Step 2. 이름과 비밀번호 설정</h1>

            <div className="mt-8 bg-white rounded bg-opacity-10 w-full space-y-5">
              <div className="flex space-x-2">
                <input
                  placeholder="이름"
                  value={firstnameValue}
                  onChange={(e) => setFirstnameValue(e.target.value)}
                  className="w-full border rounded px-3 py-2 outline-none"
                />
                <input
                  placeholder="성"
                  value={lastnameValue}
                  onChange={(e) => setLastnameValue(e.target.value)}
                  className="w-full border rounded px-3 py-2 outline-none"
                />
              </div>

              <input
                placeholder={t("password")}
                // type={"password"}
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
              회원가입 완료
            </button>

            <div className="flex justify-center mt-10 text-gray-700 text-sm h-14 border-t items-center space-x-1">
              <p>이미 회원이신가요?</p>
              <a href="/login">
                <button>
                  <p
                    style={{ color: "#1FAD72" }}
                    className="hover:underline font-bold"
                  >
                    로그인
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
      {signupStep === 0 ? <SignupSection1 /> : <SignupSection2 />}
      <Footer />
    </div>
  );
};

export default Signup;
