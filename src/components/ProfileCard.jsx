import React, { useEffect, useState } from "react";
import Tags from "./Tags";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import moment from "moment/moment";

const ProfileCard = ({ item }) => {
  const { t, i18n } = useTranslation("profileCard");
  const [, info] = item;
  const lang = i18n.language.includes("en") ? "en" : "ko";
  const [kYos, setKYos] = useState(0);

  useEffect(() => {
    const kExpList = info.user_profile[0].k_experience;
    var tempYos = 0;
    for (let i = 0; i < kExpList?.length; i++) {
      const yos = moment.duration(kExpList[i].to - kExpList[i].from).years();
      tempYos = tempYos + yos;
    }
    setKYos(tempYos + 1);
    return () => {};
  }, [info.user_profile]);

  return (
    <Link to={`/user/${info.user_id}`}>
      <div
        style={{ color: "#272D37" }}
        className="w-full ring-1 ring-gray-200 rounded overflow-hidden hover:shadow filter hover:bg-gray-50 transition"
      >
        <div className="w-full h-56 bg-gray-100 flex-shrink-0 flex items-center justify-center relative border-b">
          {info.user_img ? (
            <img src={info.user_img} className="object-cover w-full h-full" alt="" />
          ) : (
            <p className="font-nanum text-sm font-bold text-gray-400">{t("inProgress")}</p>
          )}
        </div>
        <div className="w-full px-4 py-4 px-4 space-y-3 h-56">
          <p className="font-bold text-lg">{info.user_profile[0].name?.[lang]}</p>

          {info.user_profile[0].title && (
            <p className="text-sm rounded-full text-green-700 font-bold">{info.user_profile[0].title?.[lang]}</p>
          )}
          <p style={{ color: "#555" }} className="font-bold text-sm">
            {t("kookjein")} {kYos}
            {t("years")} ·{" "}
            {`${(info.user_profile[0].price ? info.user_profile[0].price : 1800000).toLocaleString("en-US", {
              style: "currency",
              currency: "KRW",
            })} KRW`}
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
            {info.user_profile[0].oneLiner?.[lang]}
          </p>

          <div className="flex flex-wrap gap-2">
            {info.user_profile[0].tech?.slice(0, 3).map((item, index) => (
              <Tags key={index} item={item.text} size="sm" />
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProfileCard;
