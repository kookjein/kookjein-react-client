import React, { useEffect, useRef, useState } from "react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Footer from "../components/Footer";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import axios from "../utils/authAxios";
import { HttpStatusCode } from "axios";

const Login = (props) => {
  const [accessToken, setAccessToken] = useState(null);
  const navigate = useNavigate();
  const { t } = useTranslation("login");

  useEffect(() => {
    props.setAccessToken(accessToken);
  }, [accessToken, props]);

  const LoginSection = () => {
    const [usernameValue, setUsernameValue] = useState("");
    const [passwordValue, setPasswordValue] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const googleLoginRef = useRef(null);
    const [size, setSize] = useState({});

    const authenticate = (data) => {
      setErrorMessage("");
      axios
        .post(`/v1/auth/login`, data)
        .then((response) => {
          if (response.status === HttpStatusCode.Ok) {
            setAccessToken(response.data.access_token);
            navigate("/browse");
          } else {
            setErrorMessage(t("error.unknown"));
          }
        })
        .catch((e) => {
          if (e.response.status === HttpStatusCode.NotFound) {
            if (data.auth_type !== "email") {
              // 404: Account doesn't exist - Google Login
              navigate("/signup", { state: { data: data.payload } });
            } else {
              // 404:Account doesn't exist - Kookjein Login
              setErrorMessage(t("error.unregistered"));
            }
          } else if (e.response.status === HttpStatusCode.Forbidden) {
            // 403:Wrong email or password
            setErrorMessage(t("error.wrong"));
          } else if (e.response.status === HttpStatusCode.UnprocessableEntity) {
            // 402:Invalid email format
            setErrorMessage(t("error.invalidFormat"));
          } else {
            setErrorMessage(t("error.unknown"));
          }
        });
    };

    useEffect(() => {
      const observer = new ResizeObserver((entries) => {
        for (let entry of entries) {
          const { width } = entry.contentRect;
          setSize({
            width: width,
          });
        }
      });
      observer.observe(googleLoginRef.current);
      return () => observer.disconnect();
    }, []);

    return (
      <div
        style={{ minHeight: "calc(100vh - 3rem)" }}
        className="w-full flex flex-col items-center justify-center relative bg-gradient-to-b from-green-900 to-emerald-900 flex-shrink-0"
      >
        <div className="max-w-md px-4">
          <div className="bg-gray-50 px-6 sm:px-10 pt-6 sm:pt-12 rounded shadow-lg ring-1">
            <h1 className="text-3xl font-bold">{t("title")}</h1>

            <div ref={googleLoginRef} className={"mt-8"} style={{ width: "100%" }}>
              <GoogleOAuthProvider clientId="645098950769-uh4gagb1oenosqb2lujc8abq8l1kntpu.apps.googleusercontent.com">
                <GoogleLogin
                  size={"large"}
                  width={size.width}
                  text={"continue_with"}
                  onSuccess={(credentialResponse) => {
                    authenticate({
                      auth_type: "google",
                      payload: JSON.stringify(credentialResponse),
                    });
                    console.log(credentialResponse);
                  }}
                  onError={() => {
                    console.log("Login Failed");
                  }}
                />
              </GoogleOAuthProvider>
            </div>

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
              onClick={() => authenticate({ auth_type: "email", email: usernameValue, password: passwordValue })}
              style={{ backgroundColor: "#1FAD72" }}
              disabled={errorMessage === "Successfully submitted!"}
              className="p-2 rounded px-6 mt-5 w-full font-bold text-white"
            >
              {t("login")}
            </button>

            <div className="flex justify-end mt-3 text-gray-700 text-sm">
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
