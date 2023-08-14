import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import axios from "../../utils/authAxios";
import { AuthContext } from "../../context/authContext";
import JobFilter from "../../components/JobFilter";
import { BiLinkExternal } from "react-icons/bi";
import DefaultImage from "../../assets/default-profile.png";
import DefaultCompany from "../../assets/default-company.png";
import { useState } from "react";

const RightPanel = ({ selectedTab }) => {
  const { userState } = useContext(AuthContext);
  const { i18n } = useTranslation("profile");
  const [myInfo, setMyInfo] = useState();
  const lang = i18n.language.includes("en") ? "en" : "ko";

  useEffect(() => {
    axios
      .get(`/v1/user/`, { params: { user_id: userState.user.userId } })
      .then((response) => {
        console.log(response.data);
        setMyInfo(response.data);
      })
      .catch((e) => {
        console.log("V1/USER/ ERROR : ", e);
      });
  }, [userState]);

  const MyProfileSummary = () => (
    <div className="mt-4 w-full border rounded-xl flex-shrink-0 flex flex-col items-center p-6 bg-white shadow-lg">
      <Link to={`/user/${userState.user.userId}`}>
        <div className="flex flex-col items-center group">
          <img
            onError={({ currentTarget }) => {
              currentTarget.onerror = null; // prevents looping
              currentTarget.src = DefaultImage;
            }}
            src={DefaultImage}
            alt=""
            draggable={false}
            className="w-16 h-16 bg-gray-100 rounded-full mb-4"
          />
          <p className="text-lg group-hover:text-green-600 group-hover:underline">
            {myInfo?.user.user_profile[0].name?.[lang]}
          </p>
          <p className="text-xs line-clamp-1 text-gray-600">{myInfo?.user.user_profile[0].oneLiner?.[lang]}</p>
        </div>
        <div className="w-full mt-6 text-sm text-green-700 font-bold">
          <p>프로필을 완료하세요</p>
          <div className="flex items-center space-x-3">
            <div className="w-full h-1 rounded-full bg-gray-300">
              <div className="w-1/2 h-full bg-green-700"></div>
            </div>
            <p className="text-xs font-normal text-gray-600">50%</p>
          </div>
        </div>
      </Link>
    </div>
  );

  const CompanySummary = () => (
    <div className="mt-4 w-full border rounded-xl flex-shrink-0 p-6 bg-white shadow-lg">
      {false ? (
        <>
          <Link to={"/create-company"}>
            <button className="h-9 px-6 bg-green-600 text-white rounded-full hover:brightness-125 w-full text-sm">
              기업 등록
            </button>
          </Link>
          <div className="w-full mt-6 text-sm text-green-700 font-bold">
            <p>기업 프로필을 완료하세요</p>
            <div className="flex items-center space-x-3">
              <div className="w-full h-1 rounded-full bg-gray-300">
                <div className="w-0 h-full bg-green-700"></div>
              </div>
              <p className="text-xs font-normal text-gray-600">0%</p>
            </div>
          </div>
        </>
      ) : (
        <Link to={`/company/${userState.user.userId}`}>
          <div className="flex items-center group space-x-3">
            <img
              onError={({ currentTarget }) => {
                currentTarget.onerror = null; // prevents looping
                currentTarget.src = DefaultCompany;
              }}
              src={DefaultCompany}
              alt=""
              draggable={false}
              className="w-12 h-12 bg-gray-100 rounded-full flex-shrink-0"
            />
            <div className="">
              <p className="group-hover:text-green-600 group-hover:underline">국제인</p>
              <p className="text-xs line-clamp-1 text-gray-600">국제 HR 플랫폼</p>
            </div>
          </div>
          <div className="w-full mt-6 text-sm text-green-700 font-bold">
            <p>기업 프로필을 완료하세요</p>
            <div className="flex items-center space-x-3">
              <div className="w-full h-1 rounded-full bg-gray-300">
                <div className="w-1/2 h-full bg-green-700"></div>
              </div>
              <p className="text-xs font-normal text-gray-600">50%</p>
            </div>
          </div>
        </Link>
      )}
    </div>
  );

  const ClientHelp = () => (
    <div className="mt-4 w-full border rounded-xl flex-shrink-0 flex flex-col p-6 bg-white shadow-lg space-y-4 text-gray-600">
      <p className="text-sm break-keep font-bold">
        안녕하세요. ****님의 프로젝트 성공을 돕기 위해 배정된 국제인 어시스턴트 장동해입니다.
      </p>

      <div className="flex space-x-3 items-center py-4">
        <div className="w-10 h-10 rounded-full bg-gray-200 flex-shrink-0"></div>
        <div>
          <p className="font-bold text-sm">장동해</p>
          <p className="text-xs">국제인 어시스턴트</p>
        </div>
      </div>

      <a href="/">
        <div className="flex space-x-2 items-center hover:text-blue-500">
          <p className="text-sm font-bold underline">어시스턴트 메일 보내기</p>
          <BiLinkExternal />
        </div>
      </a>
      <a href="/">
        <div className="flex space-x-2 items-center hover:text-blue-500">
          <p className="text-sm font-bold underline">어시스턴트와 통화하기</p>
          <BiLinkExternal />
        </div>
      </a>
    </div>
  );
  const DeveloperHelp = () => (
    <div className="mt-4 w-full border rounded-xl flex-shrink-0 flex flex-col p-6 bg-white shadow-lg space-y-4 text-gray-600">
      <p className="text-xs">
        Make sure to join Kookjein's Discord server when you apply for projects to get full support from our team.
      </p>
      <a href="/">
        <div className="flex space-x-2 items-center hover:text-blue-500">
          <p className="text-sm font-bold underline">Kookjein's Discord Server</p>
          <BiLinkExternal />
        </div>
      </a>
      <a href="/">
        <div className="flex space-x-2 items-center hover:text-blue-500">
          <p className="text-sm font-bold underline">Download DEV Manual</p>
          <BiLinkExternal />
        </div>
      </a>
      <a href="/">
        <div className="flex space-x-2 items-center hover:text-blue-500">
          <p className="text-sm font-bold underline">Help Center</p>
          <BiLinkExternal />
        </div>
      </a>
    </div>
  );

  if (userState.user.userType === "employer")
    return (
      <div className="w-64 space-y-4 flex-shrink-0">
        <MyProfileSummary />
        <CompanySummary />
        <ClientHelp />
      </div>
    );
  else if (userState.user.userType === "employee")
    return (
      <div className="w-64 space-y-4 flex-shrink-0">
        <MyProfileSummary />
        <DeveloperHelp />
        {selectedTab === "프로젝트 찾기" && <JobFilter />}
      </div>
    );
};

export default RightPanel;
