import React, { useContext, useEffect, useRef, useState } from "react";
import Tags from "../components/Tags";
import { IoLocationSharp } from "react-icons/io5";
import { BiTime } from "react-icons/bi";
import { MdOutlineWork } from "react-icons/md";
import Footer from "../components/Footer";
import { useTranslation } from "react-i18next";
import Modal from "react-modal";
import { AuthContext } from "../context/authContext";
import DefaultImage from "../assets/default-profile.png";
import DefaultCompany from "../assets/default-company.png";
import { BsPatchCheckFill } from "react-icons/bs";
import UploadProfile from "../components/UploadProfile";
import { languageArray } from "../utils/arrays";
import moment from "moment/moment";
import EditProfileModalEmployer from "../components/EmployerEditProfileModal";
import { AiOutlineExclamationCircle } from "react-icons/ai";
import axios from "../utils/authAxios";
import { Link, useParams } from "react-router-dom";
import ProfileCompose from "../components/ProfileCompose";

const ProfileEmployer = ({ generalInfo, isMyProfile }) => {
  const { userState } = useContext(AuthContext);
  const { userId } = useParams();
  const developerInfo = useRef(generalInfo.user.user_profile[0]);
  const companyInfo = useRef();
  const { t, i18n } = useTranslation("profileEmployer");
  const lang = i18n.language.includes("en") ? "en" : "ko";
  const [modalIsOpen, setIsOpen] = useState(false);
  const [modalInitialTab, setModalInitialTab] = useState("Basic");
  const [isLoading, setLoading] = useState(false);
  const [composeModalIsOpen, setComposeModalOpen] = useState(false);

  useEffect(() => {
    setLoading(true);
    if (generalInfo.company?.company_id) {
      axios
        .get(`/v1/company/`, { params: { company_id: generalInfo.company?.company_id } })
        .then((response) => {
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

  function openComposeModal() {
    setComposeModalOpen(true);
  }

  function closeComposeModal() {
    setComposeModalOpen(false);
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
      className="w-full sm:w-96 flex sm:border-r flex-col items-center p-6 sm:p-8 space-y-6 flex-shrink-0 relative pb-16"
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
            <Link to={`/company/${companyInfo.current?.company?.company_id}`}>
              <button className="text-green-700 hover:underline filter hover:brightness-125">
                {companyInfo.current?.company?.company_info[0]?.name}
              </button>
            </Link>
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
          <button
            onClick={() => openModal()}
            className="px-4 flex items-center justify-center h-8 bg-green-600 text-white rounded text-sm hover:bg-green-500 transition border flex-shrink-0"
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
          <SummaryCell value={t("status1.value")} title={t("status1.title")} icon={<MdOutlineWork />} />
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
    const ProjectCell = () => {
      const Tags = ({ title }) => <div className="text-xs px-2 border py-1 rounded">{title}</div>;
      return (
        <div className="w-full py-4 border-b">
          <div className="flex justify-between">
            <Link to={`/jobs/1`}>
              <p className="text-xl font-bold text-green-700 hover:underline cursor-pointer">
                020 커머스 서비스 플랫폼 개발
              </p>
            </Link>
            <div className="flex space-x-1">
              <div className="h-7 px-2 bg-blue-500 text-white rounded-lg flex items-center text-sm">단기 프로젝트</div>
              <div className="h-7 px-2 bg-blue-500 text-white rounded-lg flex items-center text-sm">인력 구인</div>
            </div>
          </div>
          <div className="flex space-x-2 mt-2">
            <Tags title="React.js" />
            <Tags title="Javascript" />
            <Tags title="front-end" />
            <Tags title="backend" />
            <Tags title="aws" />
          </div>

          <div className="w-full h-10 bg-gray-100 mt-3 rounded flex overflow-hidden">
            <div className="w-1/3 border-r flex items-center justify-center text-sm border-white border-2">
              예상비용 4,000 만원
            </div>
            <div className="w-1/3 border-r flex items-center justify-center text-sm border-white border-2">
              예상기간 120일
            </div>
            <div className="w-1/3 flex items-center justify-center text-sm border-white border-2">마감일정 D-4</div>
          </div>

          <div className="p-3">
            <div className="text-sm mt-3 line-clamp-3">
              ※ 프로젝트의 진행 방식 - 최초 온라인 인터뷰 - 계약 방식 : 기간제 계약 - 근무 형태 : 주 5회 풀상주 - 근무지
              : 서울특별시, 영등포구 - 근무기간 : 6개월 ~ 1년 :: 협의 가능 - 근무시간 : 오전 9시 ~ 오후 6시 - 희망 근무
              시작일 : 8월 1째주 이내 (ASAP) - 개인장비 지참가능합니다. 필요 시 지원가능합니다. - 연차 협의 가능합니다.
              + 필요인력 및 월급여 - front-end | 중고급(6년 차 이 개인장비 지참가능합니다. 필요 시 지원가능합니다. -
              연차 협의 가능합니다. + 필요인력 및 월급여 - front-end
            </div>
          </div>
        </div>
      );
    };

    const Title = ({ title }) => {
      return (
        <div className="flex space-x-2 items-center text-green-800">
          <div className="h-7 w-1 bg-green-800 rounded"></div>
          <p className="text-2xl text-green-800">{title}</p>
        </div>
      );
    };
    if (!companyInfo.current)
      return (
        <div
          style={{ minHeight: "calc(100vh - 5rem)", color: "#272D37" }}
          className="w-full flex h-full flex-col p-8 px-12 relative"
        >
          <Title title={t("companyIntro")} />

          {isMyProfile && (
            <div className="flex bg-white border p-3 rounded-lg shadow text-sm mb-12 mt-4">
              <div className="flex items-center">
                <AiOutlineExclamationCircle className="w-4 h-4" />
                <p className="mx-1">{t("createCompany")}</p>
                <Link to="/create-company" state={companyInfo.current}>
                  <button className="text-green-700 underline filter hover:brightness-125">{t("createHere")}</button>
                </Link>
              </div>
            </div>
          )}

          <Title title={t("projects")} />

          <div className="space-y-2 mt-4">
            <p className="mx-1 text-sm text-gray-500">※ 회사 정보 등록 후에 프로젝트를 등록할 수 있습니다.</p>
          </div>
        </div>
      );
    else
      return (
        <div
          style={{ minHeight: "calc(100vh - 5rem)", color: "#272D37" }}
          className="w-full flex h-full flex-col p-8 space-y-8 px-6 sm:px-12 relative"
        >
          <Title title={t("companyIntro")} />

          <Link to={`/company/${companyInfo.current?.company?.company_id}`} className="w-full">
            <button className="flex items-center justify-start space-x-4 p-3 rounded-lg border hover:bg-gray-100 transition w-full">
              <div className="w-14 h-14 rounded-full overflow-hidden flex-shrink-0">
                <img
                  onError={({ currentTarget }) => {
                    currentTarget.onerror = null; // prevents looping
                    currentTarget.src = DefaultCompany;
                  }}
                  src={companyInfo.current?.company?.company_info[0]?.img || DefaultCompany}
                  alt=""
                  draggable={false}
                  className="hover:cursor-pointer object-cover h-full w-full border rounded-lg"
                />
              </div>
              <div className="space-y-1 w-full text-left">
                <p className="text-xl font-bold">{companyInfo.current?.company?.company_info[0]?.name}</p>
                <div className="flex text-xs">
                  <p className="mr-1 font-bold flex-shrink-0">{developerInfo.current.name?.[lang]} - </p>
                  {generalInfo?.company && (
                    <div className="flex items-center flex-shrink-0">
                      {developerInfo.current?.title?.[lang] && (
                        <p className="">{developerInfo.current?.title?.[lang]}</p>
                      )}
                      <p className="mx-1">at</p>
                      <Link to={`/company/${companyInfo.current.company?.company_id}`}>
                        <button className="text-green-700 hover:underline filter hover:brightness-125 font-bold">
                          {companyInfo.current?.company?.company_info[0]?.name}
                        </button>
                      </Link>
                      <BsPatchCheckFill className="text-sky-500 w-3 h-3 ml-1" />
                    </div>
                  )}
                </div>
              </div>
            </button>
          </Link>

          <Title title={t("projects")} />

          {false ? (
            <div className="text-sm text-gray-600">※ 등록된 프로젝트가 없습니다.</div>
          ) : (
            <div className="space-y-2">
              <ProjectCell />
              <ProjectCell />
            </div>
          )}
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
        {!isMyProfile && userState.user.userType !== "employee" && (
          <ProfileCompose
            userId={userId}
            openComposeModal={openComposeModal}
            closeComposeModal={closeComposeModal}
            composeModalIsOpen={composeModalIsOpen}
            developerInfo={developerInfo}
          />
        )}

        <div className="w-full min-h-screen h-full flex flex-col items-center overflow-x-hidden z-10">
          <div style={{ maxWidth: "1280px" }} className="w-full h-full sm:px-4 px-1 flex sm:flex-row flex-col">
            <LeftPanel />
            <RightPanel />
          </div>
          <Footer />
        </div>
      </>
    );
};

export default ProfileEmployer;
