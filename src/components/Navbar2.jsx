import React from "react";
import LogoWhite from "../assets/logo_white.png";
import LogoGreen from "../assets/logo_green.png";
import { IoChatboxOutline, IoNotificationsOutline, IoSearch } from "react-icons/io5";
import { GoThreeBars } from "react-icons/go";
import { useTranslation } from "react-i18next";
import { useState, useContext } from "react";
import axios from "../utils/authAxios";
import { Link, useNavigate } from "react-router-dom";
import { HttpStatusCode } from "axios";
import { FiLogOut } from "react-icons/fi";
import { AuthContext } from "../utils/authContext";
import DefaultImage from "../assets/default-profile.png";

const Navbar = ({ light }) => {
  const { t, i18n } = useTranslation("navBar2");
  const navigate = useNavigate();
  const { setAccessToken, userState } = useContext(AuthContext);

  function changeLanguage() {
    i18n.language.includes("en") ? i18n.changeLanguage("ko") : i18n.changeLanguage("en");
  }

  function logout() {
    axios
      .post(`/v1/auth/logout`)
      .then((response) => {
        if (response.status === HttpStatusCode.Ok) {
          setAccessToken(null);
          navigate("/");
        } else {
          console.log("ERROR - v1/auth/logout");
        }
      })
      .catch((e) => {
        console.log("ERROR - v1/auth/logout", e);
      });
  }

  const ProfileDropdown = () => (
    <ul className="bg-white text-black rounded-lg px-4 w-56 py-2">
      {userState.isAuthenticated && (
        <Link
          to={`/user/${userState.user.userId}`}
          className="w-full h-12 text-gray-700 flex items-center group hover:text-blue-500 font-medium"
        >
          <div className="flex items-center">{t("myProfile")}</div>
        </Link>
      )}
      {!userState.isAuthenticated && (
        <Link to="/" className="w-full h-12 text-gray-700 flex items-center group hover:text-blue-500 font-medium">
          <div className="flex items-center">{t("toMain")}</div>
        </Link>
      )}
      <button
        onClick={() => changeLanguage()}
        className="transition h-12 flex items-center justify-between w-full group"
      >
        <p className="group-hover:text-blue-500">{t("language")}</p>
        <img src={t("flag")} className="w-5 ring-1" alt="" />
      </button>
      {userState.isAuthenticated && (
        <button onClick={() => logout()} className="transition h-12 flex items-center justify-between w-full group">
          <p className="group-hover:text-red-500">{t("logout")}</p>
          <FiLogOut className="w-4 group-hover:text-red-500 text-gray-500" />
        </button>
      )}
    </ul>
  );

  const ProfileButton = () => (
    <button className="w-9 h-9 rounded-full relative flex items-center justify-center">
      {/* <GoThreeBars className="w-6 h-6 text-gray-500" /> */}
      <img
        src={"" || DefaultImage}
        className="w-9 h-9 rounded-full bg-gray-200 flex-shrink-0 overflow-hidden relative flex items-center justify-center"
        onError={({ currentTarget }) => {
          currentTarget.onerror = null; // prevents looping
          currentTarget.src = DefaultImage;
        }}
        alt="Profile"
      />
      {/* <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 ring-2 ring-white rounded-full"></div> */}
    </button>
  );

  const Dropdown = ({ button, dropdown }) => {
    const [dropdownVisibility, setDropdownVisibility] = useState(false);

    return (
      <div
        className="relative hidden sm:flex"
        onMouseEnter={() => setDropdownVisibility(true)}
        onMouseLeave={() => setDropdownVisibility(false)}
      >
        {button}
        {dropdownVisibility && (
          <article
            className={`${
              dropdownVisibility ? "slide-fade-in-dropdown" : "slide-fade-out-dropdown"
            } absolute top-9 pt-1 -right-8 shadow-xl rounded-lg ring-1 ring-gray-200 bg-white`}
          >
            {dropdown}
          </article>
        )}
      </div>
    );
  };

  const SearchBar = () => {
    return (
      <div className="w-full flex items-center h-10 justify-center">
        <input
          className="border h-full w-full font-nanum text-sm px-3 rounded-l-md max-w-2xl outline-green-800"
          placeholder="어떤 개발자를 찾으시나요?"
        />
        <button className="bg-green-800 text-white text px-4 py-1 rounded-r-md hover:opacity-90 transition font-nanum font-semibold text-sm h-full outline-px">
          <IoSearch className="text-white w-5 h-5" />
        </button>
      </div>
    );
  };

  return (
    <header className="w-full flex h-20 z-50 border-b justify-center bg-white">
      <div
        style={{ maxWidth: "1280px" }}
        className={`${light ? "text-black" : "text-white"} w-full flex h-full px-4 items-center z-50 flex-shrink-0`}
      >
        <div className="flex items-center text-sm font-nanum pr-6 flex-shrink-0">
          <Link
            to="/browse"
            aria-label="Homepage"
            className="flex items-center justify-center flex-shrink-0 transform transition hover:scale-105 mr-1 sm:mr-3"
          >
            <img
              src={light ? LogoGreen : LogoWhite}
              alt="Kookjein logo"
              className="h-6 sm:h-8 object-contain"
              draggable={false}
            />
          </Link>
        </div>
        <div className="w-full h-full flex items-center">
          <SearchBar />
        </div>
        <div className="hidden sm:flex space-x-7 font-poppins sm:text-base text-sm justify-end items-center flex-shrink-0 pl-10">
          {userState.isAuthenticated ? (
            <>
              <button className="relative">
                <IoNotificationsOutline className="w-6 h-6 text-gray-500" />
                <div className="absolute top-0 right-0 w-1.5 h-1.5 bg-red-500 ring-1 ring-white rounded-full"></div>
              </button>
              <Link to="/manage" state={{ tabStatus: 1 }} className="flex items-center">
                <button className="relative">
                  <IoChatboxOutline className="w-6 h-6 text-gray-500" />
                  <div className="absolute top-0 right-0 w-1.5 h-1.5 bg-red-500 ring-1 ring-white rounded-full"></div>
                </button>
              </Link>
              {userState.user.userType === "employer" && (
                <Link to="/work-post/register" state={{ tabStatus: 0 }}>
                  <button className="px-1 py-2 rounded text-green-800 transition font-semibold text-sm filter hover:brightness-125">
                    {t("workPost")}
                  </button>
                </Link>
              )}
              <Dropdown button={<ProfileButton />} dropdown={<ProfileDropdown />} />
            </>
          ) : (
            <div className="flex items-center space-x-2">
              <Link to="/login">
                <button
                  style={{ backgroundColor: "#0E5034" }}
                  className="text-white text px-4 py-2 rounded hover:opacity-90 transition font-nanum font-semibold text-sm"
                >
                  {t("signin")}
                </button>
              </Link>
              <Dropdown
                button={
                  <button className="transition hover:opacity-75 rounded-lg pl-6 h-9">
                    <GoThreeBars size={36} className="w-7 h-7 text-gray-500" />
                  </button>
                }
                dropdown={<ProfileDropdown />}
              />
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
