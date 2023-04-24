import React from "react";
import Tags from "./Tags";
import { useTranslation } from "react-i18next";

const ProfileCard = ({ item }) => {
  const { t, i18n } = useTranslation("profileCard");
  const [userId, info] = item;
  const lang = i18n.language.includes("en") ? "en" : "ko";

  return (
    <a href={`/developer/${userId}`}>
      <div
        style={{ color: "#272D37" }}
        className="w-full ring-1 ring-gray-200 shadow-sm rounded-sm"
      >
        <div className="w-full h-56 bg-gray-100 flex-shrink-0 flex items-center justify-center relative">
          {info.img ? (
            <img src={info.img} className="object-cover w-full h-full" alt="" />
          ) : (
            <p className="font-nanum text-sm font-bold text-gray-400">
              {t("inProgress")}
            </p>
          )}
          <p
            style={{
              background: "linear-gradient(to right, #176544D9, #176544D9)",
            }}
            className="text-xs absolute bottom-2 right-2 text-white p-2 rounded-full px-3 shadow-lg"
          >
            {info.title[lang]}
          </p>
        </div>
        <div className="w-full p-3 px-4 space-y-3">
          <div className="flex flex-wrap gap-2">
            {info.tech.slice(0, 3).map((item) => (
              <Tags item={item} size="sm" />
            ))}
          </div>
          <p className="font-bold text-lg">{info.name[lang]}</p>

          <p style={{ color: "#555" }} className="font-bold text-sm">
            {info.year}
            {t("years")} ·{" "}
            {(info.price * 10000).toLocaleString("en-US", {
              style: "currency",
              currency: "KRW",
            })}
          </p>

          <p
            style={{
              width: "100%",
              overflow: "hidden",
              display: "-webkit-box",
              WebkitLineClamp: 3,
              WebkitBoxOrient: "vertical",
              color: "#555",
            }}
            className="text-xs break-keep h-12"
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
