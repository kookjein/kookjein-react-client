import "../../utils/drawer.css";
import React, { useContext, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import moment from "moment/moment";
import axios from "../../utils/authAxios";
import { AuthContext } from "../../context/authContext";
//COMPONENTS
import ProfileEmployer from "./ProfileEmployer";
import ProfileDeveloper from "./ProfileDeveloper";
import SEOMetaTag from "../../utils/SEOMetaTag";
import { useTranslation } from "react-i18next";

const Profile = () => {
  const navigate = useNavigate();
  const { userState } = useContext(AuthContext);
  const { userId } = useParams();
  const { t, i18n } = useTranslation("profile");
  const lang = i18n.language.includes("en") ? "en" : "ko";

  const generalInfo = useRef({});
  const developerInfo = useRef({});
  const registerDate = useRef({});

  const [kYos, setKYos] = useState(0);

  useEffect(() => {
    axios
      .get(`/v1/user/`, { params: { user_id: userId } })
      .then((response) => {
        generalInfo.current = response.data;
        developerInfo.current = response.data.user.user_profile[0];
        registerDate.current = response.data.user.user_created_at;

        const kExpList = developerInfo.current?.k_experience;
        var tempYos = 0;
        for (let i = 0; i < kExpList?.length; i++) {
          const yos = moment.duration(kExpList[i].to - kExpList[i].from).years();
          tempYos = tempYos + yos;
        }
        setKYos(tempYos + 1);
      })
      .catch((e) => {
        navigate("/error404");
      });
  }, [userId, navigate]);

  return (
    <>
      <SEOMetaTag
        title={`${developerInfo.current.name?.[lang]} | ${t("profile")} | ${t("kookjein")} `}
        description={developerInfo.current?.intro ? developerInfo.current?.intro?.[lang] : t("description")}
        keywords={t("keywords")}
        url={`https://www.kookjein.com/profile/${userId}`}
        imgsrc={developerInfo.current?.img || "https://kookjein.s3.ap-northeast-2.amazonaws.com/ogImage.png"}
      />
      {generalInfo.current.user?.user_type === "employer" ? (
        <ProfileEmployer generalInfo={generalInfo.current} isMyProfile={userState.user?.userId === parseInt(userId)} />
      ) : (
        <ProfileDeveloper
          generalInfo={generalInfo}
          developerInfo={developerInfo}
          registerDate={registerDate}
          isMyProfile={userState.user?.userId === parseInt(userId)}
          kYos={kYos}
        />
      )}
    </>
  );
};

export default Profile;
