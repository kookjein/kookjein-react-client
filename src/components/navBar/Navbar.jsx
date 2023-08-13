import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { AuthContext } from "../../context/authContext";
import SearchBar from "./SearchBar";
import Dropdown from "./Dropdown";
import ProfileDropdown from "./ProfileDropdown";
import SolutionDropdown from "./SolutionDropdown";
import CompanyDropdown from "./CompanyDropdown";
import ResourcesDropdown from "./ResourcesDropdown";
import NotificationButton from "./NotificationButton";
import ProfileButton from "./ProfileButton";
// ASSETS
import LogoGreen from "../../assets/logo_green.png";
import { BiChevronDown } from "react-icons/bi";
import { GoThreeBars } from "react-icons/go";

const Navbar = ({ hasNewMessageBubble }) => {
  const { t } = useTranslation("navBar");
  const { userState } = useContext(AuthContext);

  const NavButton = ({ title }) => (
    <button className="flex items-center font-light group transition h-9 px-3 text-gray-700">
      <p className="group-hover:opacity-75 transition font-bold">{title}</p>
      <BiChevronDown className={`opacity-75 text-xl`} />
    </button>
  );

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
              <Dropdown button={<NavButton title={t("service.service")} />} dropdown={<SolutionDropdown />} />
              <Dropdown button={<NavButton title={t("company.company")} />} dropdown={<CompanyDropdown />} />
              <Dropdown button={<NavButton title={t("resources.resources")} />} dropdown={<ResourcesDropdown />} />
              <Link to="/pricing">
                <button className="hidden sm:flex items-center font-bold group transition hover:opacity-75 px-3">
                  <p>{t("pricing")}</p>
                </button>
              </Link>
            </>
          ) : (
            <div className="flex space-x-6">
              {userState.user.userType === "employee" ? (
                <></>
              ) : (
                <Link to={"/browse"}>
                  <button className="h-9 px-2 text-gray-700 rounded hover:brightness-125 font-sm font-bold">
                    개발자 찾기
                  </button>
                </Link>
              )}
              <Link to="/history" className="flex items-center">
                <button className="relative p-1 hover:opacity-80 text-gray-700 font-bold">
                  <p>결제 내역</p>
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
                <NotificationButton />
                <ProfileButton />
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
