import React, { useState, useContext, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { BsFileEarmarkCodeFill, BsFillBuildingFill } from "react-icons/bs";
import axios from "../../utils/authAxios";
import { HttpStatusCode } from "axios";
import { AuthContext } from "../../context/authContext";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import SEOMetaTag from "../../utils/SEOMetaTag";

const Signup = ({ isAnon, setRegistered }) => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation("signup");
  const { updateAccessToken } = useContext(AuthContext);
  const location = useLocation();
  const googleLoginRef = useRef(null);

  const [googleInfo, setGoogleInfo] = useState(location.state || null);
  const [accountType, setAccountType] = useState(isAnon ? "employer" : null);
  const [isLoading, setLoading] = useState(false);

  const [nameValue, setNameValue] = useState("");
  const [emailValue, setEmailValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [passwordConfirmValue, setPasswordConfirmValue] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  // const [isLoading, setLoading] = useState(false);

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
            setGoogleInfo({ data: item.auth.payload });
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

  const cardSelected = (cardType) => {
    setAccountType(cardType);
  };

  const registerGoogle = () => {
    if (googleInfo) {
      axios
        .post("/v1/auth/register", {
          auth: {
            auth_type: "google",
            payload: googleInfo.data,
          },
          user: {
            user_type: accountType,
            user_language: i18n.language,
          },
        })
        .then((response) => {
          if (response.status === HttpStatusCode.Ok) {
            updateAccessToken(response.data.access_token).then();
            navigate("/");
          }
          setLoading(false);
        })
        .catch((e) => {
          setLoading(false);
        });
    }
  };

  const Card = ({ cardType, text, icon }) => (
    <button
      onClick={() => cardSelected(cardType)}
      className={`${
        accountType === cardType ? "ring-2 bg-green-600 bg-opacity-10 text-green-700" : "hover:ring-2 text-gray-500"
      } h-20 w-full rounded border ring-green-600 transition flex items-center relative px-4`}
    >
      <div className="">{icon}</div>
      <h1 className="text-start break-keep ml-2">{text}</h1>
      <div
        className={`${
          accountType === cardType ? "border-green-600 bg-green-600" : "border-gray-300"
        } w-5 h-5 bg-white rounded-full absolute top-3 right-3 border-2 p-0.5 flex items-center justify-center`}
      >
        {accountType === cardType && <div className="w-full h-full rounded-full bg-green-600 ring-2 ring-white" />}
      </div>
    </button>
  );

  const completeRegister = () => {
    setLoading(true);
    setErrorMessage("");
    if (googleInfo) {
      registerGoogle();
    } else {
      if (passwordConfirmValue !== passwordValue) {
        setErrorMessage("Password doesn't match");
        setLoading(false);
      } else {
        axios
          .post("/v1/auth/register", {
            auth: {
              auth_type: "email",
              user_email: emailValue,
              user_password: passwordValue,
            },
            user: {
              user_type: accountType,
              user_name: nameValue,
              user_language: i18n.language,
            },
          })
          .then((response) => {
            if (response.status === HttpStatusCode.Ok) {
              updateAccessToken(response.data.access_token).then();
              if (!isAnon) navigate("/");
              else setRegistered(true);
            }
            setLoading(false);
          })
          .catch((e) => {
            if (e.response.status === HttpStatusCode.UnprocessableEntity) {
              setErrorMessage("Invalid email format");
            } else if (e.response.status === HttpStatusCode.Conflict) {
              setErrorMessage("This email is already in use");
            }
            setLoading(false);
          });
      }
    }
  };

  const handleKeypress = (e) => {
    if (e.keyCode === 13) {
      completeRegister();
    }
  };

  return (
    <div className="max-w-lg px-4 w-full">
      <SEOMetaTag title={t("title")} url={`https://www.kookjein.com/auth/signup`} description={t("description")} />
      <div className={` px-6 sm:px-10 sm:pb-4 rounded-lg w-full ${isAnon ? "" : "shadow-lg bg-white"}`}>
        <div className="py-6">
          <h1 className="text-2xl font-bold">{t("signup")}</h1>
        </div>

        <h1 className="text-gray-600 font-bold">{t("companyOrDev")}</h1>
        <div className="flex w-full mt-4 space-x-2">
          <Card cardType={"employer"} text={t("companyCard")} icon={<BsFillBuildingFill className="w-6 h-6" />} />
          {!isAnon && (
            <Card
              cardType={"employee"}
              text={t("developerCard")}
              icon={<BsFileEarmarkCodeFill className="w-6 h-6" />}
            />
          )}
        </div>
        {!googleInfo && (
          <div className="mt-8">
            <h1 className="text-gray-600 font-bold">{t("info")}</h1>
            <div onKeyDown={handleKeypress} className="mt-4 bg-white rounded bg-opacity-10 w-full space-y-5">
              <input
                placeholder={t("name")}
                value={nameValue}
                onChange={(e) => setNameValue(e.target.value)}
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
                type={"password"}
                value={passwordValue}
                onChange={(e) => setPasswordValue(e.target.value)}
                className="w-full border rounded px-3 py-2 outline-none"
              />

              <input
                placeholder={t("passwordConfirm")}
                type={"password"}
                value={passwordConfirmValue}
                onChange={(e) => setPasswordConfirmValue(e.target.value)}
                className="w-full border rounded px-3 py-2 outline-none"
              />
            </div>
          </div>
        )}
        <div className="mt-8">
          {errorMessage && <p className="mt-4 text-xs text-red-500">{errorMessage}</p>}
          <button
            onClick={() => completeRegister()}
            style={{
              backgroundColor: !googleInfo
                ? nameValue.length < 1 ||
                  emailValue.length < 1 ||
                  passwordValue.length < 1 ||
                  passwordConfirmValue.length < 1 ||
                  !accountType ||
                  isLoading
                  ? "#c2c2c2"
                  : "#1FAD72"
                : !accountType || isLoading
                ? "#c2c2c2"
                : "#1FAD72",
            }}
            disabled={
              !googleInfo
                ? nameValue.length < 1 ||
                  emailValue.length < 1 ||
                  passwordValue.length < 1 ||
                  passwordConfirmValue.length < 1 ||
                  !accountType ||
                  isLoading
                : !accountType || isLoading
            }
            type="submit"
            className="p-2 rounded px-6 mt-5 w-full font-bold text-white flex items-center justify-center"
          >
            {isLoading ? <div className="animate-ping h-6 w-6 rounded-full bg-white" /> : t("complete")}
          </button>

          {!googleInfo && (
            <>
              <div className="flex items-center h-1 py-8 w-full">
                <div className="border-t h-px w-full border-gray-300"></div>
                <p className="flex-shrink-0 px-3 text-sm text-gray-400">{t("or")}</p>
                <div className="border-t h-px w-full border-gray-300"></div>
              </div>
              <div ref={googleLoginRef} className={"flex w-full justify-center"} style={{ width: "100%" }}>
                <GoogleOAuthProvider clientId="645098950769-uh4gagb1oenosqb2lujc8abq8l1kntpu.apps.googleusercontent.com">
                  <GoogleLogin
                    size={"large"}
                    width="600px"
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
            </>
          )}

          {!isAnon && (
            <div className="flex justify-center mt-10 text-gray-700 text-sm h-14 border-t items-center space-x-1">
              <p>{t("already")}</p>
              <Link to="/auth/login">
                <button>
                  <p style={{ color: "#1FAD72" }} className="hover:underline font-bold">
                    {t("login")}
                  </p>
                </button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Signup;
