import React, { useContext, useEffect, useRef, useState } from "react";
import Navbar2 from "../components/Navbar2";
import Tags from "../components/Tags";
import { IoLocationSharp } from "react-icons/io5";
import { BiTime } from "react-icons/bi";
import { MdOutlineWork } from "react-icons/md";
import Footer from "../components/Footer";
import { useTranslation } from "react-i18next";
import // Link,
"react-router-dom";
import Modal from "react-modal";
import { AuthContext } from "../utils/authContext";
import DefaultImage from "../assets/default-profile.png";
import { BsPatchCheckFill } from "react-icons/bs";
import UploadProfile from "../components/UploadProfile";
import { languageArray } from "../utils/arrays";
import moment from "moment/moment";
import EditProfileModalEmployer from "../components/EmployerEditProfileModal";
import { AiOutlineExclamationCircle } from "react-icons/ai";
import CompanyEditProfileModal from "../components/CompanyEditProfileModal";
import axios from "../utils/authAxios";

const ProfileEmployer = ({ generalInfo, isMyProfile }) => {
  const developerInfo = useRef(generalInfo.user.user_profile[0]);
  const companyInfo = useRef();
  const { userState } = useContext(AuthContext);
  const { t, i18n } = useTranslation("developerProfile");
  const lang = i18n.language.includes("en") ? "en" : "ko";
  const [modalIsOpen, setIsOpen] = useState(false);
  const [modalInitialTab, setModalInitialTab] = useState("Basic");
  const [companyModalIsOpen, setCompanyModalIsOpen] = useState(false);
  const [companyModalInitialTab, setCompanyModalInitialTab] = useState("Basic");
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    if (generalInfo.company?.company_id) {
      axios
        .get(`/v1/company/`, { params: { company_id: generalInfo.company?.company_id } })
        .then((response) => {
          console.log(response.data);
          companyInfo.current = response.data;
          setLoading(false);
        })
        .catch((e) => {
          console.log("V1/USER/ ERROR : ", e);
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
    return () => {};
  }, [generalInfo.company?.company_id]);

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      padding: 0,
      transform: "translate(-50%, -50%)",
      border: 0,
      borderRadius: 10,
      boxShadow: "2px 2px 10px #00000030",
    },
    overlay: { zIndex: 1000, backgroundColor: "rgba(0, 0, 0, 0.75)" },
  };

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
    setModalInitialTab("Basic");
  }

  function openCompanyModal() {
    setCompanyModalIsOpen(true);
  }

  function closeCompanyModal() {
    setCompanyModalIsOpen(false);
    setCompanyModalInitialTab("Basic");
  }

  const Divider = () => <div className="w-full h-px border-t border-gray-300 mb-6 mt-3" />;

  const Placeholder = ({ type }) => {
    return (
      <button
        onClick={() => {
          setModalInitialTab(type);
          setIsOpen(true);
        }}
        className="w-full h-12 text-blue-500 flex items-center justify-center text-sm hover:underline"
      >
        {t("addInfo")}
      </button>
    );
  };

  const TitleText = ({ text }) => (
    <div className="flex items-center space-x-2">
      <p style={{ color: "#176544" }} className="text-lg font-bold text-gray-400">
        {text}
      </p>
      {text === t("k_exp") && <BsPatchCheckFill className="text-sky-500 w-4 h-4" />}
    </div>
  );

  const SummaryCell = ({ icon, title, value }) => {
    return (
      <div className="w-full flex justify-between">
        <div className="space-x-2 flex items-center">
          <div className="text-gray-400 text-sm">{icon}</div>
          <p className="text-sm text-gray-600">{title}</p>
        </div>
        <p className="text-sm font-bold text-gray-500">{value}</p>
      </div>
    );
  };

  const LeftPanel = () => (
    <div
      style={{ minHeight: "calc(100vh - 20rem)", color: "#272D37" }}
      className="w-96 flex border-r flex-col items-center p-8 space-y-6 flex-shrink-0 relative pb-16"
    >
      <div className="w-36 h-36 bg-gray-100 rounded-full overflow-hidden">
        {isMyProfile ? (
          <UploadProfile width={"9rem"} height={"9rem"} developerInfo={developerInfo} borderRadius={"100%"} />
        ) : (
          <img
            onError={({ currentTarget }) => {
              currentTarget.onerror = null; // prevents looping
              currentTarget.src = DefaultImage;
            }}
            src={developerInfo.current?.img || DefaultImage}
            alt=""
            draggable={false}
            className="object-cover w-full h-full"
          />
        )}
      </div>

      <p className="text-2xl">{developerInfo.current.name?.[lang]}</p>
      <div className="flex flex-col items-center space-y-1 font-bold text-gray-600">
        {developerInfo.current?.title?.[lang] && <p className="text-sm mb-1">{developerInfo.current?.title?.[lang]}</p>}
        {generalInfo?.company && (
          <div className="flex items-center text-sm -mr-3">
            <p className="mr-1">at</p>
            <button className="text-green-700 hover:underline filter hover:brightness-125">
              {companyInfo.current?.company?.company_info[0]?.name}
            </button>
            <BsPatchCheckFill className="text-sky-500 w-3 h-3 ml-1" />
          </div>
        )}
      </div>
      {developerInfo.current?.oneLiner?.[lang] && (
        <p
          style={{
            width: "100%",
            overflow: "hidden",
            display: "-webkit-box",
            // WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
          }}
          className="text-xs break-keep text-center text-gray-500"
        >
          {developerInfo.current?.oneLiner?.[lang]}
        </p>
      )}

      {userState.isAuthenticated && (
        <div className="w-full flex justify-center items-center space-x-2">
          {/* <Link to="/manage/0/chat" state={{ tabStatus: 1 }}>
            <button className="px-4 flex items-center justify-center h-8 rounded text-sm bg-gray-100 hover:bg-gray-200 transition shadow border flex-shrink-0">
              {t("sendMessage")}
            </button>
          </Link>
          <button className="px-4 flex items-center justify-center h-8 rounded text-sm bg-gray-100 hover:bg-gray-200 transition shadow border flex-shrink-0">
            {t("hire")}
          </button> */}
          <button
            onClick={() => openModal()}
            className="px-4 flex items-center justify-center h-8 bg-green-600 text-white rounded text-sm hover:bg-green-500 transition shadow border flex-shrink-0"
            style={{ display: isMyProfile ? "" : "none" }}
          >
            {t("editProfile")}
          </button>
        </div>
      )}

      <Divider />

      {developerInfo.current.lang?.length > 0 ? (
        <>
          <div className="w-full space-y-4">
            <TitleText text={t("lang")} />
            <div className="w-full gap-2 flex flex-wrap">
              {developerInfo.current?.lang?.map((item) => (
                <Tags key={item} size={"sm"} item={languageArray[item][lang]} />
              ))}
            </div>
          </div>
          <Divider />
        </>
      ) : (
        isMyProfile && (
          <>
            <div className="w-full space-y-4">
              <TitleText text={t("lang")} />
              <Placeholder type={"Skill sets"} />
            </div>
            <Divider />
          </>
        )
      )}

      <div className="w-full space-y-4">
        <div className="w-full flex flex-col space-y-3">
          <SummaryCell value={"구인중"} title={"구인 상태"} icon={<MdOutlineWork />} />
          <SummaryCell
            value={developerInfo.current?.country ? developerInfo.current?.country : t("status2.value1")}
            title={t("status2.title")}
            icon={<IoLocationSharp />}
          />
          <SummaryCell
            value={moment(generalInfo.user.user_created_at).format("YYYY.MM.DD")}
            title={t("status6.title")}
            icon={<BiTime />}
          />
        </div>
      </div>
    </div>
  );

  const RightPanel = () => {
    const Cell = ({ title, text }) => (
      <div className="flex text-sm">
        <p className="w-24 text-left text-gray-500 flex-shrink-0">{title}</p>
        <p>{text}</p>
      </div>
    );
    if (!companyInfo.current)
      return (
        <div
          style={{ minHeight: "calc(100vh - 5rem)", color: "#272D37" }}
          className="w-full flex h-full flex-col p-8 space-y-6 px-12 relative"
        >
          {isMyProfile && (
            <div className="flex bg-white border p-3 rounded-lg shadow text-sm">
              <div className="flex items-center">
                <AiOutlineExclamationCircle className="w-4 h-4" />
                <p className="mx-1">Register your company</p>
                <button
                  onClick={() => openCompanyModal()}
                  className="text-green-700 underline filter hover:brightness-125"
                >
                  here
                </button>
              </div>
            </div>
          )}
          <div className="flex items-center space-x-6">
            <div className="w-32 h-32 bg-gray-100 rounded-lg"></div>
            <div className="space-y-2">
              <p className="text-3xl font-bold bg-gradient-to-r from-gray-100 via-gray-100 to-white w-56 h-8 rounded"></p>
              <p className="text-sm bg-gradient-to-r from-gray-100 via-gray-100 to-white w-40 h-6 rounded"></p>
            </div>
          </div>

          <div className="flex space-x-2 items-center">
            <div className="h-7 w-1 bg-gray-600 rounded"></div>
            <p className="text-2xl text-gray-600">기업소개</p>
          </div>

          <div className="space-y-2">
            <p className="bg-gradient-to-r from-gray-100 via-gray-100 to-white w-64 h-6"></p>
            <p className="bg-gradient-to-r from-gray-100 via-gray-100 to-white w-40 h-6"></p>
          </div>

          <div className="flex space-x-2 items-center">
            <div className="h-7 w-1 bg-gray-600 rounded"></div>
            <p className="text-2xl text-gray-600">기업정보</p>
          </div>

          <div className="space-y-2">
            <p className="bg-gradient-to-r from-gray-100 via-gray-100 to-white w-64 h-6"></p>
            <p className="bg-gradient-to-r from-gray-100 via-gray-100 to-white w-40 h-6"></p>
          </div>

          <div className="h-16" />
        </div>
      );
    return (
      <div
        style={{ minHeight: "calc(100vh - 5rem)", color: "#272D37" }}
        className="w-full flex h-full flex-col p-8 space-y-6 px-12 relative"
      >
        <div className="flex bg-white border p-3 rounded-lg shadow text-sm">
          <p className="mr-1 font-bold flex-shrink-0">{developerInfo.current.name?.[lang]} - </p>
          {developerInfo.current?.title?.[lang] && (
            <p className="flex-shrink-0">{developerInfo.current?.title?.[lang]}</p>
          )}
          {generalInfo?.company && (
            <div className="flex items-center flex-shrink-0">
              <p className="mx-1">at</p>
              <button className="text-green-700 hover:underline filter hover:brightness-125 font-bold">
                {companyInfo.current?.company?.company_info[0]?.name}
              </button>
              <BsPatchCheckFill className="text-sky-500 w-3 h-3 ml-1" />
            </div>
          )}
          {isMyProfile && (
            <div className="flex items-center justify-end w-full mr-3">
              <p className="mx-1">Edit your company info</p>
              <button
                onClick={() => openCompanyModal()}
                className="text-green-700 underline filter hover:brightness-125"
              >
                here
              </button>
            </div>
          )}
        </div>

        <div className="flex items-center space-x-6">
          <div className="w-32 h-32 bg-gray-100 rounded-lg"></div>
          <div className="space-y-2">
            <p className="text-3xl font-bold">{companyInfo.current?.company?.company_info[0]?.name}</p>
            <p className="text-sm">영화·음반·배급</p>
          </div>
        </div>

        <div className="flex space-x-2 items-center">
          <div className="h-7 w-1 bg-gray-600 rounded"></div>
          <p className="text-2xl text-gray-600">기업소개</p>
        </div>

        <p className="">
          푸르모디티 푸르모디티 푸르모디티 푸르모디티 푸르모디티 푸르모디티 푸르모디티 푸르모디티 푸르모디티 푸르모디티
          푸르모디티 푸르모디티 푸르모디티 푸르모디티 푸르모디티 푸르모디티 푸르모디티 푸르모디티 푸르모디티 푸르모디티
          푸르모디티 푸르모디티 푸르모디티 푸르모디티 푸르모디티 푸르모디티 푸르모디티 푸르모디티 푸르모디티 푸르모디티
          푸르모디티 푸르모디티 푸르모디티 푸르모디티 푸르모디티 푸르모디티 푸르모디티 푸르모디티 푸르모디티 푸르모디티
          푸르모디티 푸르모디티 푸르모디티 푸르모디티 푸르모디티 푸르모디티 푸르모디티 푸르모디티 푸르모디티 푸르모디티
          푸르모디티 푸르모디티 푸르모디티 푸르모디티 푸르모디티 푸르모디티
        </p>

        <div className="flex space-x-2 items-center">
          <div className="h-7 w-1 bg-gray-600 rounded"></div>
          <p className="text-2xl text-gray-600">기업정보</p>
        </div>

        <div className="p-8 border rounded-lg grid grid-cols-2 gap-4">
          <Cell title="산업" text="영화·음반·배급" />
          <Cell title="사원수" text="20명" />
          <Cell title="기업구분" text="중소기업" />
          <Cell title="설립일" text="2004" />
          <Cell title="자본금" text="1억 6,000만원" />
          <Cell title="매출액" text="20억" />
          <Cell title="대표자" text="장규호" />
          <Cell title="주요사업" text="방송프로그램 재제작, 영상번역" />
          <Cell title="홈페이지" text="http://www.furmo.co.kr" />
          <Cell title="주소" text="서울 영등포구 영등포동7가 94-282 수석빌딩 2층" />
        </div>

        <div className="flex space-x-2 items-center">
          <div className="h-7 w-1 bg-gray-600 rounded"></div>
          <p className="text-2xl text-gray-600">국제인 등록 직원</p>
        </div>

        <div className="h-16" />
      </div>
    );
  };

  if (!isLoading)
    return (
      <>
        <Modal isOpen={modalIsOpen} onRequestClose={closeModal} style={customStyles} shouldCloseOnOverlayClick={false}>
          <EditProfileModalEmployer
            initialTab={modalInitialTab}
            closeModal={closeModal}
            developerInfo={developerInfo}
          />
        </Modal>
        <Modal
          isOpen={companyModalIsOpen}
          onRequestClose={closeCompanyModal}
          style={customStyles}
          shouldCloseOnOverlayClick={false}
        >
          <CompanyEditProfileModal
            initialTab={companyModalInitialTab}
            closeModal={closeCompanyModal}
            companyInfo={companyInfo}
          />
        </Modal>

        <div className="w-full min-h-screen h-full flex flex-col items-center overflow-x-hidden z-10">
          <Navbar2 light />
          <div style={{ maxWidth: "1280px" }} className="w-full h-full px-4 flex">
            <LeftPanel />
            <RightPanel />
          </div>
          <Footer />
        </div>
      </>
    );
};

export default ProfileEmployer;
