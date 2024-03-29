import React, { useContext, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import axios from "../../utils/authAxios";
import { HttpStatusCode } from "axios";
import { AuthContext } from "../../context/authContext";
import SEOMetaTag from "../../utils/SEOMetaTag";

const Login = () => {
  const navigate = useNavigate();
  const { t } = useTranslation("login");
  const [usernameValue, setUsernameValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setLoading] = useState(false);
  const googleLoginRef = useRef(null);
  const { updateAccessToken } = useContext(AuthContext);

  const authenticate = (item) => {
    setLoading(true);
    setErrorMessage("");
    axios
      .post(`/v1/auth/login`, item)
      .then((response) => {
        if (response.status === HttpStatusCode.Ok) {
          updateAccessToken(response.data.access_token).then();
          navigate("/");
        } else {
          setErrorMessage(t("error.unknown"));
        }
        setLoading(false);
      })
      .catch((e) => {
        if (e.response.status === HttpStatusCode.NotFound) {
          if (item.auth.auth_type !== "email") {
            // 404: Account doesn't exist - Google Login
            navigate("/auth/signup", { state: { data: item.auth.payload } });
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
        setLoading(false);
      });
  };

  const handleKeypress = (e) => {
    if (e.keyCode === 13) {
      authenticate({ auth: { auth_type: "email", user_email: usernameValue, user_password: passwordValue } });
    }
  };

  return (
    <div className="max-w-md px-4" onKeyDown={handleKeypress}>
      <SEOMetaTag title={t("title")} url={`https://www.kookjein.com/auth/login`} description={t("description")} />
      <div className="bg-white px-6 sm:px-10 pt-6 sm:pt-12 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold">{t("login")}</h1>

        <div ref={googleLoginRef} className={"mt-8"} style={{ width: "100%" }}>
          <GoogleOAuthProvider clientId="645098950769-uh4gagb1oenosqb2lujc8abq8l1kntpu.apps.googleusercontent.com">
            <GoogleLogin
              size={"large"}
              width={335}
              text={"continue_with"}
              onSuccess={(credentialResponse) => {
                authenticate({
                  auth: {
                    auth_type: "google",
                    payload: JSON.stringify(credentialResponse),
                  },
                });
              }}
              onError={() => {}}
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
          onClick={() =>
            authenticate({ auth: { auth_type: "email", user_email: usernameValue, user_password: passwordValue } })
          }
          style={{
            backgroundColor: usernameValue.length < 1 || passwordValue.length < 1 || isLoading ? "#c2c2c2" : "#1FAD72",
          }}
          disabled={usernameValue.length < 1 || passwordValue.length < 1 || isLoading}
          className="p-2 rounded px-6 mt-5 w-full font-bold text-white flex items-center justify-center"
        >
          {isLoading ? <div className="animate-ping h-6 w-6 rounded-full bg-white" /> : t("login")}
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
          <Link to="/auth/signup">
            <button>
              <p style={{ color: "#1FAD72" }} className="hover:underline font-bold">
                {t("signUp")}
              </p>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
