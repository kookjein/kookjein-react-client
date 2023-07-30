import React from "react";
import LogoGreen from "../assets/logo_green.png";
import {
  IoChatboxOutline,
  IoLanguage,
  // IoNotificationsOutline,
  IoSearch,
} from "react-icons/io5";
import { GoThreeBars } from "react-icons/go";
import { useTranslation } from "react-i18next";
import { useState, useContext } from "react";
import axios from "../utils/authAxios";
import { Link, useNavigate } from "react-router-dom";
import { HttpStatusCode } from "axios";
import { FiLogOut } from "react-icons/fi";
import { AuthContext } from "../utils/authContext";
import DefaultImage from "../assets/default-profile.png";
import { AiOutlineRollback } from "react-icons/ai";

const Navbar = ({ hasNewMessageBubble }) => {
  const { t, i18n } = useTranslation("navBar2");
  const navigate = useNavigate();
  const { userState, updateAccessToken } = useContext(AuthContext);

  function changeLanguage() {
    i18n.language.includes("en") ? i18n.changeLanguage("ko") : i18n.changeLanguage("en");
  }

  function logout() {
    axios
      .post(`/v1/auth/logout`)
      .then((response) => {
        if (response.status === HttpStatusCode.Ok) {
          updateAccessToken(null).then();
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
    <ul className="bg-white text-black rounded-lg w-52 py-2">
      {userState.isAuthenticated && (
        <Link
          to={`/user/${userState.user.userId}`}
          className="w-full h-12 text-gray-700 text-sm flex items-center group hover:text-blue-500 font-medium hover:bg-gray-100 px-4"
        >
          <div className="flex items-center space-x-4 w-full">
            <img
              src={userState.user.userImage || DefaultImage}
              className="w-6 h-6 rounded-full bg-gray-200 flex-shrink-0 overflow-hidden relative flex items-center justify-center object-cover border"
              onError={({ currentTarget }) => {
                currentTarget.onerror = null; // prevents looping
                currentTarget.src = DefaultImage;
              }}
              alt="Profile"
            />
            <div className="w-full flex justify-between">
              <p className="font-semibold">{t("myProfile")}</p>
            </div>
          </div>
        </Link>
      )}
      {!userState.isAuthenticated && (
        <Link
          to="/"
          className="w-full h-12 text-gray-700 text-sm flex items-center group hover:text-blue-500 font-medium hover:bg-gray-100 px-4"
        >
          <div className="flex items-center space-x-4 w-full">
            <AiOutlineRollback className="text-gray-400 flex-shrink-0 group-hover:text-blue-500" size={22} />
            <div className="w-full flex justify-between">
              <p className="font-semibold">{t("toMain")}</p>
            </div>
          </div>
        </Link>
      )}
      <button
        onClick={() => changeLanguage()}
        className="w-full h-12 text-gray-700 text-sm flex items-center group hover:text-blue-500 font-medium hover:bg-gray-100 px-4"
      >
        <div className="flex items-center space-x-4 w-full">
          <IoLanguage className="text-gray-400 flex-shrink-0 group-hover:text-blue-500" size={22} />
          <div className="w-full flex justify-between items-center">
            <p className="font-semibold">{t("language")}</p>
            <img src={t("flag")} className="h-3 object-contain flex-shrink-0" alt="" />
          </div>
        </div>
      </button>
      {userState.isAuthenticated && (
        <button
          onClick={() => logout()}
          className="w-full h-12 text-gray-700 text-sm flex items-center group hover:text-red-500 font-medium hover:bg-gray-100 px-4"
        >
          <div className="flex items-center space-x-4 w-full">
            <FiLogOut className="text-gray-400 flex-shrink-0 group-hover:text-red-500" size={22} />
            <div className="w-full flex justify-between">
              <p className="font-semibold">{t("logout")}</p>
            </div>
          </div>
        </button>
      )}
    </ul>
  );

  const ProfileButton = () => (
    <button className="w-9 h-9 rounded-full relative flex items-center justify-center">
      {/* <GoThreeBars className="w-6 h-6 text-gray-500" /> */}
      <img
        src={userState.user.userImage || DefaultImage}
        className="w-9 h-9 rounded-full bg-gray-200 flex-shrink-0 overflow-hidden relative flex items-center justify-center object-cover border"
        onError={({ currentTarget }) => {
          currentTarget.onerror = null; // prevents looping
          currentTarget.src = DefaultImage;
        }}
        alt="Profile"
      />
    </button>
  );

  const Dropdown = ({ button, dropdown }) => {
    const [dropdownVisibility, setDropdownVisibility] = useState(false);

    return (
      <div
        className="relative flex"
        onMouseEnter={() => setDropdownVisibility(true)}
        onMouseLeave={() => setDropdownVisibility(false)}
      >
        {button}
        {dropdownVisibility && (
          <article
            className={`${
              dropdownVisibility ? "slide-fade-in-dropdown" : "slide-fade-out-dropdown"
            } absolute top-9 -right-2 sm:-right-8 shadow-xl rounded-lg ring-1 ring-gray-200 bg-white`}
          >
            {dropdown}
          </article>
        )}
      </div>
    );
  };

  const SearchBar = () => {
    return (
      <div className="w-full flex items-center h-9 sm:h-10 justify-center">
        <input
          className="border h-full w-full font-nanum text-xs sm:text-sm px-2 sm:px-3 rounded-l-md max-w-2xl outline-none"
          placeholder={t("placeholder")}
        />
        <button className="bg-green-800 text-white text px-3 sm:px-4 py-1 rounded-r-md hover:opacity-90 transition font-nanum font-semibold text-sm h-full outline-px">
          <IoSearch className="text-white w-5 h-5" />
        </button>
      </div>
    );
  };

  return (
    <header className="w-full flex h-16 sm:h-20 z-50 border-b justify-center bg-white">
      <div
        style={{ maxWidth: "1280px" }}
        className={`text-black w-full flex h-full px-4 items-center z-50 flex-shrink-0 justify-between`}
      >
        <div className="flex items-center text-sm font-nanum pr-2 sm:pr-6 flex-shrink-0">
          <Link
            to="/browse"
            aria-label="Homepage"
            className="flex items-center justify-center flex-shrink-0 transition mr-1 sm:mr-3 filter hover:brightness-150"
          >
            <img src={LogoGreen} alt="Kookjein logo" className="h-8 object-contain" draggable={false} />
          </Link>
        </div>
        <div className="w-full h-full hidden  sm:flex items-center">
          <SearchBar />
        </div>
        <div className="flex space-x-4 sm:space-x-7 sm:text-base text-sm justify-end items-center flex-shrink-0 pl-4 sm:pl-10">
          {userState.isAuthenticated ? (
            <>
              {userState.user.userType === "employer" && (
                <Link to={"/post-job/flow-1"}>
                  <button className="h-9 px-4 bg-green-800 text-sm text-white rounded hover:brightness-125 font-sm">
                    프로젝트 등록
                  </button>
                </Link>
              )}

              {/* <button className="relative">
                <IoNotificationsOutline className="w-6 h-6 text-gray-500" />
                <div className="absolute top-0 right-0 w-1.5 h-1.5 bg-red-500 ring-1 ring-white rounded-full"></div>
              </button> */}
              <Link to="/manage" className="flex items-center">
                <button className="relative p-1 hover:opacity-80">
                  <IoChatboxOutline className="w-7 h-7 text-gray-500" />
                  {hasNewMessageBubble && (
                    <div className="absolute top-1 right-1 w-2 h-2 bg-red-500 ring-2 ring-white rounded-full"></div>
                  )}
                </button>
              </Link>
              <Dropdown button={<ProfileButton />} dropdown={<ProfileDropdown />} />
            </>
          ) : (
            <div className="flex items-center space-x-3">
              <Link to="/login">
                <button className="text-white text px-4 py-2 rounded hover:opacity-90 transition font-nanum font-semibold text-sm bg-green-800">
                  {t("signin")}
                </button>
              </Link>
              <Dropdown
                button={
                  <button className="transition hover:opacity-75 rounded-lg pl-1 sm:pl-6 h-9">
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
