import React, { useState, useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Footer from "../components/Footer";
import { BsFileEarmarkCodeFill, BsFillBuildingFill } from "react-icons/bs";
import axios from "../utils/authAxios";
import { HttpStatusCode } from "axios";
import { AuthContext } from "../context/authContext";

const Signup = () => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation("signup");
  const [signupStep, setSignupStep] = useState(0);
  const [accountType, setAccountType] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const location = useLocation();
  const { updateAccessToken } = useContext(AuthContext);

  const SignupSection0 = () => {
    const cardSelected = (cardType) => {
      setAccountType(cardType);
    };
    const continuePressed = () => {
      setLoading(true);
      if (location.state) {
        // GOOGLE LOGIN => Call Register endpoint && navigate to /browse
        axios
          .post("/v1/auth/register", {
            auth: {
              auth_type: "google",
              payload: location.state.data,
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
            console.log("ERROR - v1/auth/register - ", e);
            setLoading(false);
          });
      } else {
        // NORMAL LOGIN => Go to next signup step
        setSignupStep(1);
        setLoading(false);
      }
    };

    const Card = ({ cardType, text, icon }) => (
      <button
        onClick={() => cardSelected(cardType)}
        className={`${
          accountType === cardType ? "ring-2 bg-green-600 bg-opacity-10 text-green-700" : "hover:ring-2 text-gray-500"
        } h-full w-full rounded border ring-green-600 transition flex items-start justify-center relative flex-col px-6`}
      >
        {icon}
        <h1 className="text-lg font-bold mt-4 text-start break-keep">{text}</h1>
        <div
          className={`${
            accountType === cardType ? "border-green-600 bg-green-600" : "border-gray-300"
          } w-5 h-5 bg-white rounded-full absolute top-3 right-3 border-2 p-0.5 flex items-center justify-center`}
        >
          {accountType === cardType && <div className="w-full h-full rounded-full bg-green-600 ring-2 ring-white" />}
        </div>
      </button>
    );
    return (
      <div
      style={{ minHeight: "calc(100vh - 8rem)" }}
      className="w-full flex flex-col items-center justify-center relative bg-gray-200 flex-shrink-0"
      >
        <div className="max-w-2xl px-4 w-full">
          <div className="bg-gray-50 px-6 sm:px-10 pt-6 sm:py-12 rounded shadow-lg w-full">
            <h1 className="text-2xl font-bold">{t("companyOrDev")}</h1>
            <div className="flex h-40 w-full mt-8 space-x-6">
              <Card cardType={"employer"} text={t("companyCard")} icon={<BsFillBuildingFill className="w-10 h-10" />} />
              <Card
                cardType={"employee"}
                text={t("developerCard")}
                icon={<BsFileEarmarkCodeFill className="w-10 h-10" />}
              />
            </div>

            <button
              style={{ backgroundColor: accountType || !isLoading ? "#1FAD72" : "#c2c2c2" }}
              onClick={() => continuePressed()}
              disabled={!accountType || isLoading}
              className="p-2 rounded px-6 mt-8 w-full font-bold text-white"
            >
              {isLoading ? (
                <div className="animate-ping h-6 w-6 rounded-full bg-white" />
              ) : location.state ? (
                t("complete")
              ) : (
                t("continue")
              )}
            </button>
          </div>
        </div>
      </div>
    );
  };

  const SignupSection1 = () => {
    const [nameValue, setNameValue] = useState("");
    const [emailValue, setEmailValue] = useState("");
    const [passwordValue, setPasswordValue] = useState("");
    const [passwordConfirmValue, setPasswordConfirmValue] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [isLoading, setLoading] = useState(false);

    const completeRegister = () => {
      setLoading(true);
      setErrorMessage("");
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
              navigate("/");
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
    };

    const handleKeypress = (e) => {
      if (e.keyCode === 13) {
        completeRegister();
      }
    };
    return (
      <div
        style={{ minHeight: "calc(100vh - 8rem)" }}
        className="w-full flex flex-col items-center justify-center relative bg-gray-200 flex-shrink-0"
      >
        <div className="max-w-md px-4">
          <div className="bg-gray-50 px-6 sm:px-10 pt-6 sm:pt-12 rounded shadow-lg">
            <h1 className="text-3xl font-bold">{t("signup")}</h1>

            <div onKeyDown={handleKeypress} className="mt-8 bg-white rounded bg-opacity-10 w-full space-y-5">
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

            {errorMessage && <p className="mt-4 text-xs text-red-500">{errorMessage}</p>}
            <button
              onClick={() => completeRegister()}
              style={{
                backgroundColor:
                  nameValue.length < 1 ||
                  emailValue.length < 1 ||
                  passwordValue.length < 1 ||
                  passwordConfirmValue.length < 1 ||
                  isLoading
                    ? "#c2c2c2"
                    : "#1FAD72",
              }}
              disabled={
                nameValue.length < 1 ||
                emailValue.length < 1 ||
                passwordValue.length < 1 ||
                passwordConfirmValue.length < 1 ||
                isLoading
              }
              type="submit"
              className="p-2 rounded px-6 mt-5 w-full font-bold text-white flex items-center justify-center"
            >
              {isLoading ? <div className="animate-ping h-6 w-6 rounded-full bg-white" /> : t("complete")}
            </button>

            <div className="flex justify-center mt-10 text-gray-700 text-sm h-14 border-t items-center space-x-1">
              <p>{t("already")}</p>
              <Link to="/login">
                <button>
                  <p style={{ color: "#1FAD72" }} className="hover:underline font-bold">
                    {t("login")}
                  </p>
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="w-full h-screen flex flex-col items-center">
      {signupStep === 0 ? <SignupSection0 /> : <SignupSection1 />}
      <Footer />
    </div>
  );
};

export default Signup;
