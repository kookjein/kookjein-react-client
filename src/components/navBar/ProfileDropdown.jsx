import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { HttpStatusCode } from "axios";
import axios from "../../utils/authAxios";
import { AuthContext } from "../../context/authContext";
import DefaultImage from "../../assets/default-profile.png";
import { IoLanguage } from "react-icons/io5";
import { FiLogOut } from "react-icons/fi";

const ProfileDropdown = () => {
  const { t, i18n } = useTranslation("navBar");
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

  return (
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
};

export default ProfileDropdown;
