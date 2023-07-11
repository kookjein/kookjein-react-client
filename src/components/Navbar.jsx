import React from "react";
import LogoWhite from "../assets/logo_white.png";
import LogoGreen from "../assets/logo_green.png";
import { BiChevronDown } from "react-icons/bi";
import { MdOutlinePerson, MdWorkOutline } from "react-icons/md";
import { RiCustomerServiceLine } from "react-icons/ri";
import { IoLanguage, IoReorderThreeOutline } from "react-icons/io5";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = ({ light }) => {
  const { t, i18n } = useTranslation("navBar");

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
    <button className="flex items-center font-light group transition h-9 px-3">
      <p className="group-hover:opacity-75 transition font-bold">{t("service.service")}</p>
      <BiChevronDown className={`opacity-75 text-xl`} />
    </button>
  );

  const CompanyButton = () => (
    <button className="flex items-center font-light group transition h-9 px-3">
      <p className="group-hover:opacity-75 transition font-bold">{t("company.company")}</p>
      <BiChevronDown className="opacity-75 text-xl" />
    </button>
  );

  const ResourcesButton = () => (
    <button className="flex items-center font-light group transition h-9 px-3">
      <p className="group-hover:opacity-75 transition font-bold">{t("resources.resources")}</p>
      <BiChevronDown className="opacity-75 text-xl" />
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
            } absolute top-9 -left-1 shadow-xl rounded-lg ring-1 ring-gray-100`}
          >
            {dropdown}
          </article>
        )}
      </div>
    );
  };

  const MobileDropdown = ({ button, dropdown }) => {
    const [dropdownVisibility, setDropdownVisibility] = useState(false);
    return (
      <div
        className="relative flex sm:hidden"
        onMouseEnter={() => setDropdownVisibility(true)}
        onMouseLeave={() => setDropdownVisibility(false)}
      >
        {button}
        {dropdownVisibility && (
          <article
            className={`${
              dropdownVisibility ? "slide-fade-in-dropdown" : "slide-fade-out-dropdown"
            } absolute top-9 -right-1 shadow-xl rounded-lg ring-1 ring-gray-100`}
          >
            {dropdown}
          </article>
        )}
      </div>
    );
  };

  const MobileMenu = () => {
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

        <p
          style={{ color: "#1FAD72", fontSize: "0.7rem" }}
          className="font-black text-xs font-nanum text-white py-1 rounded-full"
        >
          {t("lang")}
        </p>
        <button
          onClick={() => changeLanguage()}
          className="w-full h-16 text-gray-700 text-sm flex items-center group hover:text-blue-500 font-medium"
        >
          <div className="flex items-center space-x-4 w-full">
            <IoLanguage className="text-gray-400 flex-shrink-0 group-hover:text-blue-500" size={24} />
            <div className="w-full flex justify-between">
              <p className="font-semibold">{t("language")}</p>
              <img src={t("flag")} className="h-4 object-contain flex-shrink-0" alt="" />
            </div>
          </div>
        </button>
      </ul>
    );
  };

  return (
    <header className="w-full flex justify-center absolute top-0">
      <div
        style={{ maxWidth: "1280px" }}
        className={`${
          light ? "text-black" : "text-white"
        } w-full flex h-16 px-4 items-center justify-between z-50 flex-shrink-0`}
      >
        <div className="flex items-center text-sm font-nanum">
          <Link
            to="/"
            aria-label="Homepage"
            className="flex items-center justify-center flex-shrink-0 transform transition hover:scale-105 mr-3"
          >
            <img
              src={light ? LogoGreen : LogoWhite}
              alt="Kookjein logo"
              className="h-8 object-contain"
              draggable={false}
            />
          </Link>

          <Dropdown button={<SolutionButton />} dropdown={<SolutionDropdown />} />
          <Dropdown button={<CompanyButton />} dropdown={<CompanyDropdown />} />
          <Dropdown button={<ResourcesButton />} dropdown={<ResourcesDropdown />} />
          <Link to="/pricing">
            <button className="hidden sm:flex items-center font-bold group transition hover:opacity-75 px-3">
              <p>{t("pricing")}</p>
            </button>
          </Link>
        </div>
        <div className="flex space-x-2 font-poppins sm:text-base text-sm justify-end items-center">
          <Link to="/login">
            <button className="transition hover:opacity-75 rounded h-8 px-4 font-nanum text-sm border font-bold flex-shrink-0">
              {t("login")}
            </button>
          </Link>

          <button
            onClick={() => changeLanguage()}
            className="hidden sm:flex transition hover:opacity-75 rounded-lg h-8 px-3 font-nanum text-sm font-bold items-center"
          >
            <img src={t("flag")} className="w-6" alt="" />
          </button>

          <MobileDropdown
            button={
              <button className="block transition hover:opacity-75 rounded-lg px-1">
                <IoReorderThreeOutline size={36} />
              </button>
            }
            dropdown={<MobileMenu />}
          />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
