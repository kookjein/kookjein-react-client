import React from "react";
import LogoWhite from "../assets/logo_white.png";
import LogoGreen from "../assets/logo_green.png";
import {
  // IoChatboxOutline,
  // IoNotificationsOutline,
  IoReorderThreeOutline,
  IoSearch,
} from "react-icons/io5";
// import { GoThreeBars } from "react-icons/go";
import { useTranslation } from "react-i18next";
import { useState } from "react";

const Navbar = ({ light }) => {
  const { t, i18n } = useTranslation("navBar2");

  function changeLanguage() {
    i18n.language.includes("en") ? i18n.changeLanguage("ko") : i18n.changeLanguage("en");
  }

  const ProfileDropdown = () => (
    <ul className="bg-white text-black rounded-lg px-4 w-56 py-2">
      <a href="/user/1" className="w-full h-12 text-gray-700 flex items-center group hover:text-blue-500 font-medium">
        <div className="flex items-center">{t("myProfile")}</div>
      </a>

      {/* <a
        href="/browse"
        className="w-full h-10 text-gray-700 flex items-center group hover:text-blue-500 font-medium"
      >
        <div className="flex items-center">언어 설정</div>
      </a> */}
      <a href="/" className="w-full h-12 text-gray-700 flex items-center group hover:text-blue-500 font-medium">
        <div className="flex items-center">{t("toMain")}</div>
      </a>
      <button
        onClick={() => changeLanguage()}
        className="transition h-12 flex items-center justify-between w-full group"
      >
        <p className="group-hover:text-blue-500">{t("language")}</p>
        <img src={t("flag")} className="w-5 ring-1" alt="" />
      </button>
    </ul>
  );

  const ProfileButton = () => (
    <button className="w-9 h-9 rounded-full relative flex items-center justify-center">
      {/* <GoThreeBars className="w-6 h-6 text-gray-500" /> */}
      <div className="w-9 h-9 rounded-full bg-gray-200 flex-shrink-0 overflow-hidden relative flex items-center justify-center">
        <div className="w-4 h-4 rounded-full bg-gray-400 -mt-1 opacity-75" />
        <div className="absolute -bottom-4 w-7 h-7 rounded-full bg-gray-400 opacity-75" />
      </div>
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
            } absolute top-9 pt-1 -right-8 shadow-xl rounded-lg ring-1 ring-gray-200`}
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
          style={{ outlineColor: "#176343" }}
          className="border h-full w-full font-nanum text-sm px-3 rounded-l-md max-w-2xl"
          placeholder="어떤 개발자를 찾으시나요?"
        />
        <button
          style={{ backgroundColor: "#0E5034" }}
          className="text-white text px-4 py-1 rounded-r-md hover:opacity-90 transition font-nanum font-semibold text-sm h-full outline-px"
        >
          <IoSearch className="text-white w-5 h-5" />
        </button>
      </div>
    );
  };

  return (
    <header className="w-full flex h-20 z-50 border-b justify-center">
      <div
        style={{ maxWidth: "1280px" }}
        className={`${light ? "text-black" : "text-white"} w-full flex h-full px-4 items-center z-50 flex-shrink-0`}
      >
        <div className="flex items-center text-sm font-nanum pr-6 flex-shrink-0">
          <a
            href="/browse"
            aria-label="Homepage"
            className="flex items-center justify-center flex-shrink-0 transform transition hover:scale-105 mr-1 sm:mr-3"
          >
            <img
              src={light ? LogoGreen : LogoWhite}
              alt="Kookjein logo"
              className="h-6 sm:h-8 object-contain"
              draggable={false}
            />
          </a>
        </div>
        <div className="w-full h-full flex items-center">
          <SearchBar />
        </div>
        <div className="hidden sm:flex space-x-6 font-poppins sm:text-base text-sm justify-end items-center flex-shrink-0 pl-6">
          {/* <button className="relative">
            <IoNotificationsOutline className="w-5 h-5 text-gray-500" />
            <div className="absolute top-0 right-0 w-1.5 h-1.5 bg-red-500 ring-1 ring-white rounded-full"></div>
          </button>
          <button className="relative">
            <IoChatboxOutline className="w-5 h-5 text-gray-500" />
            <div className="absolute top-0 right-0 w-1.5 h-1.5 bg-red-500 ring-1 ring-white rounded-full"></div>
          </button> */}

          <a href="/manage">
            <button
              style={{ backgroundColor: "#0E5034" }}
              className="text-white text px-4 py-2 rounded hover:opacity-90 transition font-nanum font-semibold text-sm"
            >
              {t("management")}
            </button>
          </a>
          <Dropdown button={<ProfileButton />} dropdown={<ProfileDropdown />} />
          {/* <button className="transition hover:opacity-75 rounded-lg h-8 px-4 font-nanum text-sm font-bold">
          {t("login")}
        </button>
        <button className="transition hover:opacity-75 rounded-lg h-8 px-4 font-nanum text-sm border font-bold">
          {t("signup")}
        </button> */}
        </div>

        <button className="sm:hidden transition hover:opacity-75 rounded-lg pl-6">
          <IoReorderThreeOutline size={36} />
        </button>
      </div>
    </header>
  );
};

export default Navbar;
