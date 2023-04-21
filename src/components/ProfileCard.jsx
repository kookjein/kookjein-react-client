import React from "react";
import Tags from "./Tags";
import { useTranslation } from "react-i18next";

const ProfileCard = ({ item }) => {
  const { t, i18n } = useTranslation("profileCard");
  console.log("ASDASD", item)
  const [userId, info] = item
  const lang = i18n.language.includes("en") ? "en" : "ko";

  return (
    <a href={`/developer/${userId}`}>
      <div
        style={{ color: "#272D37" }}
        className="w-full ring-1 ring-gray-200 shadow-sm rounded-sm"
      >
        <div className="w-full h-56 bg-gray-100 flex-shrink-0 flex items-center justify-center">
          {info.img ? (
            <img src={info.img} className="object-cover w-full h-full" alt="" />
          ) : (
            <p className="font-nanum text-sm font-bold text-gray-400">
              {t("inProgress")}
            </p>
          )}
        </div>
        <div className="w-full p-3 px-4 space-y-3">
          <div className="flex space-x-2">
            <Tags item="React.js" size="sm" />
            <Tags item="Node.js" size="sm" />
          </div>

          <p className="font-bold text-lg">{info.name[lang]}</p>
          <p style={{ color: "#176343" }} className="font-bold text-sm">
            {info.year}
            {t("years")} · {info.price}
            {t("cost")}
          </p>

          <p
            style={{
              width: "100%",
              overflow: "hidden",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
            }}
            className="text-xs break-keep h-8"
          >
            {info.intro[lang]}
          </p>

          <button
            style={{ color: "#1FAD72" }}
            className="font-bold font-nanum text-sm hover:underline py-3"
          >
            {t("learnMore")}
          </button>
        </div>
      </div>
    </a>
  );
};

export default ProfileCard;
