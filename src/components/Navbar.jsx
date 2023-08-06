import React from "react";
import LogoGreen from "../assets/logo_green.png";
import { IoLanguage, IoNotificationsOutline, IoSearch } from "react-icons/io5";
import { GoThreeBars } from "react-icons/go";
import { useTranslation } from "react-i18next";
import { useState, useContext } from "react";
import axios from "../utils/authAxios";
import { Link, useNavigate } from "react-router-dom";
import { HttpStatusCode } from "axios";
import { FiLogOut } from "react-icons/fi";
import { AuthContext } from "../context/authContext";
import DefaultImage from "../assets/default-profile.png";
import { AiOutlineRollback } from "react-icons/ai";
import { BiChevronDown } from "react-icons/bi";
import { MdOutlinePerson, MdWorkOutline } from "react-icons/md";
import { RiCustomerServiceLine } from "react-icons/ri";

const Navbar = ({ hasNewMessageBubble }) => {
  const { t, i18n } = useTranslation("navBar");
  const navigate = useNavigate();
  const { userState, updateAccessToken } = useContext(AuthContext);

  function changeLanguage() {
    i18n.language.includes("en") ? i18n.changeLanguage("ko") : i18n.changeLanguage("en");
  }

  const Divider = () => <div className="w-full h-px border-t border-gray-300 mb-6 mt-3" />;

  const SolutionDropdown = () => {
    return (
      <ul className="bg-white text-black rounded-lg p-5 w-72">
        <div className="flex">
          <p
            style={{ color: "#1FAD72", fontSize: "0.7rem" }}
            className="font-black text-xs font-nanum text-white py-1 rounded-full"
          >
            {t("service.for")}
          </p>
        </div>
        <Link
          to="/service/company"
          className="w-full h-16 text-gray-700 text-sm flex items-center group hover:text-blue-500 font-medium"
        >
          <div className="flex items-center space-x-4">
            <MdWorkOutline className="text-gray-400 group-hover:text-blue-500 flex-shrink-0" size={24} />
            <div className="w-full flex flex-col items-start space-y-px">
              <p className="font-semibold">{t("service.title1")}</p>
              <p className="text-xs text-gray-500 group-hover:text-blue-500">{t("service.subtitle1")}</p>
            </div>
          </div>
        </Link>
        <Link
          to="/service/developer"
          className="w-full h-16 text-gray-700 text-sm flex items-center group hover:text-blue-500 font-medium"
        >
          <div className="flex items-center space-x-4">
            <MdOutlinePerson className="text-gray-400 flex-shrink-0 group-hover:text-blue-500" size={24} />
            <div className="w-full flex flex-col items-start space-y-px">
              <p className="font-semibold">{t("service.title2")}</p>
              <p className="text-xs text-gray-500 group-hover:text-blue-500">{t("service.subtitle2")}</p>
            </div>
          </div>
        </Link>
        <div className="flex mt-4">
          <p
            style={{ color: "#1FAD72", fontSize: "0.7rem" }}
            className="font-black text-xs font-nanum text-white py-1 rounded-full"
          >
            {t("service.addition")}
          </p>
        </div>
        <Link
          to="/pricing"
          className="w-full h-16 text-gray-700 text-sm flex items-center group hover:text-blue-500 font-medium"
        >
          <div className="flex items-center space-x-4">
            <RiCustomerServiceLine className="text-gray-400 flex-shrink-0 group-hover:text-blue-500" size={24} />
            <div className="w-full flex flex-col items-start space-y-px">
              <p className="font-semibold">{t("service.title3")}</p>
              <p className="text-xs text-gray-500 group-hover:text-blue-500">{t("service.subtitle3")}</p>
            </div>
          </div>
        </Link>
      </ul>
    );
  };

  const CompanyDropdown = () => (
    <ul className="bg-white text-black rounded-lg p-5 w-56 text-sm">
      <p className="font-semibold font-sans text-gray-600 mb-2">{t("company.internal")}</p>
      <Link
        to="https://candle-chemistry-608.notion.site/62a540c630b948e8817bdb36f262d5c8"
        className="w-full h-10 text-gray-700 flex items-center group hover:text-blue-500 font-medium"
      >
        <div className="flex items-center">{t("company.partners")}</div>
      </Link>
      <Link
        to="https://www.namsancompany.com"
        className="w-full h-10 text-gray-700 flex items-center group hover:text-blue-500 font-medium"
      >
        <div className="flex items-center">{t("company.team")}</div>
      </Link>
      <Link
        to="https://candle-chemistry-608.notion.site/Tech-65b1bae7371f461db0238f6cabe18484"
        className="w-full h-10 text-gray-700 flex items-center group hover:text-blue-500 font-medium"
      >
        <div className="flex items-center">{t("company.blog")}</div>
      </Link>

      <Divider />
      <p className="font-semibold font-sans text-gray-600 mb-2">{t("company.external")}</p>
      <Link
        to="https://candle-chemistry-608.notion.site/7f34a912fa764803aa270f1f21754d5e"
        className="w-full h-10 text-gray-700 flex items-center group hover:text-blue-500 font-medium"
      >
        <div className="flex items-center">{t("company.news")}</div>
      </Link>
      <Link
        to="https://candle-chemistry-608.notion.site/5bfc7fb3a6234942bf9ab43be65268f3?v=2e8c1d8335954f6a923bd196baaa2d1a"
        className="w-full h-10 text-gray-700 flex items-center group hover:text-blue-500 font-medium"
      >
        <div className="flex items-center">{t("company.investor")}</div>
      </Link>
    </ul>
  );

  const ResourcesDropdown = () => (
    <ul className="bg-white text-black rounded-lg p-5 w-56 text-sm">
      <Link
        to="https://candle-chemistry-608.notion.site/FAQ-9b9927f37295435dbe5114157a498e48"
        className="w-full h-10 text-gray-700 flex items-center group hover:text-blue-500 font-medium"
      >
        <div className="flex items-center">{t("resources.faq")}</div>
      </Link>
      <Link
        to="https://candle-chemistry-608.notion.site/e5ec81c45bd141f49b716ce8fc7b9b0e"
        className="w-full h-10 text-gray-700 flex items-center group hover:text-blue-500 font-medium"
      >
        <div className="flex items-center">{t("resources.community")}</div>
      </Link>
      <Link
        to="https://candle-chemistry-608.notion.site/08aae9cfc4bb4b1ea1dbcbdafd6a6b1a"
        className="w-full h-10 text-gray-700 flex items-center group hover:text-blue-500 font-medium"
      >
        <div className="flex items-center">{t("resources.customer")}</div>
      </Link>
      <Link
        to="https://candle-chemistry-608.notion.site/Legal-9faf14d01dd14883ab0096f1702e0824"
        className="w-full h-10 text-gray-700 flex items-center group hover:text-blue-500 font-medium"
      >
        <div className="flex items-center">{t("resources.legal")}</div>
      </Link>
    </ul>
  );

  const SolutionButton = () => (
    <button className="flex items-center font-light group transition h-9 px-3 text-gray-700">
      <p className="group-hover:opacity-75 transition font-bold">{t("service.service")}</p>
      <BiChevronDown className={`opacity-75 text-xl`} />
    </button>
  );

  const CompanyButton = () => (
    <button className="flex items-center font-light group transition h-9 px-3 text-gray-700">
      <p className="group-hover:opacity-75 transition font-bold">{t("company.company")}</p>
      <BiChevronDown className="opacity-75 text-xl" />
    </button>
  );

  const ResourcesButton = () => (
    <button className="flex items-center font-light group transition h-9 px-3 text-gray-700">
      <p className="group-hover:opacity-75 transition font-bold">{t("resources.resources")}</p>
      <BiChevronDown className="opacity-75 text-xl" />
    </button>
  );

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
    const [searchType, setSearchType] = useState("employee");
    return (
      <div className="w-full flex items-center h-9 sm:h-10 justify-center relative max-w-md rounded-full border pl-11 pr-1">
        <input
          className="h-full w-full font-nanum text-xs sm:text-sm pr-3 outline-none rounded-r-full"
          placeholder={userState.user.userType === searchType ? t("placeholderEmployee") : t("placeholderEmployer")}
        />
        <button
          onClick={() => (searchType === "employee" ? setSearchType("employer") : setSearchType("employee"))}
          className="h-8 px-4 flex text-xs flex-shrink-0 flex items-center rounded-full border hover:bg-green-600 hover:text-white"
        >
          {userState.user.userType === searchType ? "프로젝트 검색" : "개발자 검색"}
        </button>
        <IoSearch className="text-gray-400 w-5 h-5 absolute left-4 cursor-pointer hover:text-green-600" />
      </div>
    );
  };

  return (
    <header className="w-full flex h-16 z-50 border-b justify-center bg-white">
      <div
        style={{ maxWidth: "1280px" }}
        className={`text-black w-full flex h-full px-4 items-center z-50 flex-shrink-0 justify-between`}
      >
        <div className="w-full flex items-center">
          <div className="flex items-center text-sm font-nanum pr-2 sm:pr-6 flex-shrink-0">
            <Link
              to={"/"}
              aria-label="Homepage"
              className="flex items-center justify-center flex-shrink-0 transition mr-1 sm:mr-3 filter hover:brightness-150"
            >
              <img src={LogoGreen} alt="Kookjein logo" className="h-7 object-contain" draggable={false} />
            </Link>
          </div>

          {!userState.isAuthenticated ? (
            <>
              <Dropdown button={<SolutionButton />} dropdown={<SolutionDropdown />} />
              <Dropdown button={<CompanyButton />} dropdown={<CompanyDropdown />} />
              <Dropdown button={<ResourcesButton />} dropdown={<ResourcesDropdown />} />
              <Link to="/pricing">
                <button className="hidden sm:flex items-center font-bold group transition hover:opacity-75 px-3">
                  <p>{t("pricing")}</p>
                </button>
              </Link>
            </>
          ) : (
            <div className="flex space-x-6">
              {userState.user.userType === "employee" ? (
                <Link to={"/browse-jobs"}>
                  <button className="h-9 px-2 text-gray-700 rounded hover:brightness-125 font-sm font-bold">
                    지원 현황
                  </button>
                </Link>
              ) : (
                <Link to={"/browse"}>
                  <button className="h-9 px-2 text-gray-700 rounded hover:brightness-125 font-sm font-bold">
                    개발자 찾기
                  </button>
                </Link>
              )}
              <Link to="/" className="flex items-center">
                <button className="relative p-1 hover:opacity-80 text-gray-700 font-bold">
                  <p>계약 내역</p>
                </button>
              </Link>
              <Link to="/chat" className="flex items-center">
                <button className="relative p-1 hover:opacity-80 text-gray-700 font-bold">
                  <p>메세지</p>
                  {hasNewMessageBubble && (
                    <div className="absolute top-1 -right-2 w-2 h-2 bg-red-500 ring-2 ring-white rounded-full"></div>
                  )}
                </button>
              </Link>
            </div>
          )}
        </div>

        <div className="flex items-center justify-end w-full">
          {userState.isAuthenticated && <SearchBar />}
          <div className="flex space-x-4 sm:space-x-7 sm:text-base text-sm justify-end items-center flex-shrink-0 pl-4 sm:pl-8">
            {userState.isAuthenticated ? (
              <>
                <button className="relative">
                  <IoNotificationsOutline className="w-6 h-6 text-gray-500" />
                  <div className="absolute top-0 right-0 w-2 h-2 bg-red-500 ring-2 ring-white rounded-full"></div>
                </button>
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
      </div>
    </header>
  );
};

export default Navbar;
