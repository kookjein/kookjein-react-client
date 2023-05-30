import React, { useContext, useEffect, useRef, useState } from "react";
import Navbar2 from "../components/Navbar2";
import Tags from "../components/Tags";
import { IoLocationSharp } from "react-icons/io5";
import { BiTime } from "react-icons/bi";
import { AiTwotoneCalendar } from "react-icons/ai";
import { MdOutlineAttachMoney, MdOutlineWork } from "react-icons/md";
import Footer from "../components/Footer";
import { useTranslation } from "react-i18next";
import { Link, useNavigate, useParams } from "react-router-dom";
import Modal from "react-modal";
import axios from "../utils/authAxios";
import { AuthContext } from "../utils/authContext";
import DefaultImage from "../assets/default-profile.png";
import EditProfileModal from "../components/EditProfileModal";
import { BsPatchCheckFill } from "react-icons/bs";
import UploadProfile from "../components/UploadProfile";
import { languageArray } from "../utils/arrays";
import { useCallback } from "react";
import moment from "moment/moment";

const Profile = () => {
  const navigate = useNavigate();
  const developerInfo = useRef({});
  const registerDate = useRef({});
  const { userState } = useContext(AuthContext);
  const { t, i18n } = useTranslation("developerProfile");
  const { userId } = useParams();
  const [isMyProfile, setIsMyProfile] = useState(false);
  const lang = i18n.language.includes("en") ? "en" : "ko";
  const [isLoading, setLoading] = useState(true);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [modalInitialTab, setModalInitialTab] = useState("Basic");

  useEffect(() => {
    setIsMyProfile(userState.user?.userId === parseInt(userId));
  }, [userState, userId]);

  useEffect(() => {
    Modal.setAppElement("body");
    return () => {};
  }, []);

  const getUserInfo = useCallback(() => {
    axios
      .get(`/v1/user/`, { params: { user_id: userId } })
      .then((response) => {
        developerInfo.current = response.data.user_profile[0];
        registerDate.current = response.data.user_created_at;
        setLoading(false);
        console.log(response.data);
      })
      .catch((e) => {
        console.log("V1/USER/ ERROR : ", e);
        navigate("/error404");
        setLoading(false);
      });
  }, [userId, navigate]);

  useEffect(() => {
    getUserInfo();
  }, [userId, navigate, getUserInfo]);

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

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
  }

  function closeModal() {
    setIsOpen(false);
    setModalInitialTab("Basic");
  }

  const Divider = () => <div className="w-full h-px border-t border-gray-300 mb-6 mt-3" />;

  const TitleText = ({ text }) => (
    <p style={{ color: "#176544" }} className="text-lg font-bold text-gray-400">
      {text}
    </p>
  );

  const SummaryCell = ({ icon, title, value }) => (
    <div className="w-full flex justify-between">
      <div className="space-x-2 flex items-center">
        <div className="text-gray-400 text-sm">{icon}</div>
        <p className="text-sm text-gray-600">{title}</p>
      </div>
      <p className="text-sm font-bold text-gray-500">{value}</p>
    </div>
  );

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

  const LeftPanel = () => (
    <div
      style={{ minHeight: "calc(100vh - 20rem)", color: "#272D37" }}
      className="w-96 flex border-r flex-col items-center p-8 space-y-6 flex-shrink-0 relative"
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

      <p className="text-xl">{developerInfo.current.name?.[lang]}</p>
      {developerInfo.current?.title?.[lang] && (
        <p className="text-sm text-green-700 font-bold mb-1">{developerInfo.current?.title?.[lang]}</p>
      )}
      {developerInfo.current?.company?.[lang] && (
        <div className="flex items-center space-x-1 text-sm text-gray-500">
          <BsPatchCheckFill className="text-sky-500 w-4 h-4" />
          <p style={{ color: "#0E5034" }} className="font-bold">
            {developerInfo.current?.company?.[lang]}
          </p>
        </div>
      )}
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
          <Link to="/manage/0/chat" state={{ tabStatus: 1 }}>
            <button className="px-4 flex items-center justify-center h-8 rounded text-sm bg-gray-100 hover:bg-gray-200 transition shadow border flex-shrink-0">
              {t("sendMessage")}
            </button>
          </Link>
          <button className="px-4 flex items-center justify-center h-8 rounded text-sm bg-gray-100 hover:bg-gray-200 transition shadow border flex-shrink-0">
            {t("hire")}
          </button>
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

      {(developerInfo.current?.tech || isMyProfile) && (
        <>
          <div className="w-full space-y-4">
            <TitleText text={t("programming_lang")} />
            <div className="w-full gap-2 flex flex-wrap">
              {developerInfo.current?.tech?.map((item) => (
                <Tags key={item[userState.user.userLanguage]} size={"sm"} item={item[lang]} />
              )) || <Placeholder type={"Skill sets"} />}
            </div>
          </div>
          <Divider />
        </>
      )}

      {(developerInfo.current?.lang || isMyProfile) && (
        <>
          <div className="w-full space-y-4">
            <TitleText text={t("lang")} />
            <div className="w-full gap-2 flex flex-wrap">
              {developerInfo.current?.lang?.map((item) => (
                <Tags key={item} size={"sm"} item={languageArray[item][lang]} />
              )) || <Placeholder type={"Skill sets"} />}
            </div>
          </div>
          <Divider />
        </>
      )}

      <div className="w-full space-y-4">
        <div className="w-full flex flex-col space-y-3">
          <SummaryCell value={t("status1.value")} title={t("status1.title")} icon={<MdOutlineWork />} />
          <SummaryCell value={t("status2.value")} title={t("status2.title")} icon={<IoLocationSharp />} />
          <SummaryCell value={`1 ${t("status4.value")}`} title={t("status3.title")} icon={<AiTwotoneCalendar />} />
          <SummaryCell
            value={`${(developerInfo.current?.price * 10000).toLocaleString("en-US", {
              style: "currency",
              currency: "KRW",
            })} KRW`}
            title={t("status5.title")}
            icon={<MdOutlineAttachMoney />}
          />
          <SummaryCell value={moment(registerDate).format("YYYY.MM.DD")} title={t("status6.title")} icon={<BiTime />} />
        </div>
      </div>
    </div>
  );

  const RightPanel = () => {
    const CompanyCell = ({ img, title, year, period }) => (
      <div>
        <div className="w-full py-1 flex items-center space-x-2">
          <div className="w-10 h-10 bg-gray-100 rounded-full overflow-hidden">
            <img src={img} alt="" className="object-cover w-full h-full" />
          </div>
          <div className="space-y-1">
            <p className="text-sm font-bold text-gray-600">{title}</p>
            <p className="text-xs text-gray-500">
              {year} · {period}
            </p>
          </div>
        </div>
      </div>
    );

    const CompanyCell2 = ({ title, company, from, to, desc }) => {
      const yos = moment.duration(to - from).years();
      return (
        <div>
          <div className="w-full py-1 flex items-center space-x-2">
            <div className="space-y-1">
              <p className="text-sm font-bold text-gray-600">{`${company} | ${title}`}</p>
              <p className="text-xs text-gray-500">
                {yos} year{yos > 1 && "s"} · {moment(from).format("YYYY.MM")} ~ {moment(to).format("YYYY.MM")}
              </p>
            </div>
          </div>
          <div className="my-3">
            <p className="text-sm break-keep">{desc}</p>
          </div>
        </div>
      );
    };

    const ProjectCell = ({ name, link, desc }) => (
      <div className="space-y-1">
        <div className="w-full py-1 flex items-center space-x-2">
          <div className="space-y-1">
            <p className="text-sm font-bold text-gray-600">{name}</p>
          </div>
        </div>
        <a href={link} className="text-sm text-blue-500 font-bold">
          {link}
        </a>
        <p className="text-sm break-keep">{desc}</p>
      </div>
    );

    const EducationCell = ({ name, title, from, to, desc }) => {
      const yos = moment.duration(to - from).years();
      return (
        <div className="space-y-1">
          <p className="text-sm font-bold text-gray-600">
            {name} | {title}
          </p>
          <p className="text-xs text-gray-500">
            {yos} year{yos > 1 && "s"} · {moment(from).format("YYYY.MM")} ~ {moment(to).format("YYYY.MM")}
          </p>
          <p className="text-sm break-keep py-2">{desc}</p>
        </div>
      );
    };

    const CertificateCell = ({ name, date }) => (
      <div className="space-y-1">
        <p className="text-sm font-bold text-gray-600">{name}</p>
        <p className="text-xs text-gray-500">{moment(date).format("YYYY.MM.DD")}</p>
      </div>
    );

    if (
      !developerInfo.current?.intro &&
      !developerInfo.current?.k_experience &&
      !developerInfo.current?.experience &&
      !developerInfo.current?.projects &&
      !developerInfo.current?.education &&
      !developerInfo.current?.certificates &&
      !isMyProfile
    )
      return (
        <div
          style={{ minHeight: "calc(100vh - 20rem)" }}
          className="w-full flex items-center justify-center text-gray-400 text-sm"
        >
          {t("noInfo")}
        </div>
      );

    return (
      <div
        style={{ minHeight: "calc(100vh - 20rem)", color: "#272D37" }}
        className="w-full flex h-full flex-col p-8 space-y-6 px-12 relative"
      >
        {(developerInfo.current?.intro || isMyProfile) && (
          <>
            <TitleText text={t("intro")} />
            <p className="break-keep text-sm">
              {developerInfo.current?.intro?.[lang] || <Placeholder type={"Introduction"} />}
            </p>
            <Divider />
          </>
        )}

        {developerInfo.current?.k_experience && (
          <>
            <TitleText text={t("k_exp")} />
            {developerInfo.current?.k_experience?.map((item) => (
              <CompanyCell
                key={item.company?.[lang]}
                img={item.logo}
                period={`${item.from?.[lang]} ~ ${item.to?.[lang]}`}
                year="8개월"
                title={`${item.company?.[lang]} | ${item.title?.[lang]}`}
              />
            ))}
            <Divider />
          </>
        )}

        {(developerInfo.current?.experience || isMyProfile) && (
          <>
            <TitleText text={t("exp")} />
            {developerInfo.current?.experience?.length === 0 ? (
              <Placeholder type={"Experience"} />
            ) : (
              developerInfo.current?.experience?.map((item, index) => (
                <CompanyCell2
                  key={index}
                  from={item.from}
                  to={item.to}
                  company={item.company}
                  title={item.title?.[userState.user.userLanguage]}
                  desc={item.desc?.[lang]}
                />
              ))
            )}
            <Divider />
          </>
        )}

        {(developerInfo.current?.projects || isMyProfile) && (
          <>
            <TitleText text={t("projects")} />
            {developerInfo.current?.projects?.length === 0 ? (
              <Placeholder type={"Portfolio"} />
            ) : (
              developerInfo.current?.projects?.map((item) => (
                <ProjectCell key={item.name} name={item.name} link={item.link} desc={item.desc?.[lang]} />
              ))
            )}
            <Divider />
          </>
        )}

        {(developerInfo.current?.education || isMyProfile) && (
          <>
            <TitleText text={t("education")} />
            {developerInfo.current?.education?.length === 0 ? (
              <Placeholder type={"Education"} />
            ) : (
              developerInfo.current?.education?.map((item) => (
                <EducationCell
                  key={item.name}
                  name={item.name}
                  title={item.title?.[lang]}
                  from={item.from}
                  to={item.to}
                  desc={item.desc?.[lang]}
                />
              ))
            )}
            <Divider />
          </>
        )}

        {(developerInfo.current?.certification || isMyProfile) && (
          <>
            <TitleText text={t("certificates")} />
            {developerInfo.current?.certification?.length === 0 ? (
              <Placeholder type={"Awards & Certs"} />
            ) : (
              developerInfo.current?.certification?.map((item, index) => (
                <CertificateCell key={index} name={item.name} date={item.date} />
              ))
            )}
            <Divider />
          </>
        )}

        <div className="h-16" />
      </div>
    );
  };

  const LeftPanelEmployer = () => (
    <div
      style={{ minHeight: "calc(100vh - 5rem)", color: "#272D37" }}
      className="w-96 flex border-r flex-col items-center p-8 space-y-6 flex-shrink-0 relative"
    >
      <div className="w-36 h-36 bg-gray-100 rounded-full overflow-hidden">
        <img src="" alt="" className="object-cover w-full h-full" />
      </div>

      <p className="text-xl">고용인 이름</p>
      <div className="text-sm text-gray-500 flex flex-col items-center space-y-1">
        <p className="">Title</p>
        <p style={{ color: "#0E5034" }} className="font-bold">
          Company name
        </p>
      </div>
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
        고용인 한줄 소개 고용인 한줄 소개 고용인 한줄 소개 고용인 한줄 소개 고용인 한줄 소개 고용인 한줄 소개 고용인
        한줄 소개
      </p>

      <Divider />

      <div className="w-full space-y-4">
        <TitleText text={t("lang")} />
        <div className="w-full gap-2 flex flex-wrap">
          {developerInfo.current?.lang?.[lang].map((item) => (
            <Tags key={item} size={"sm"} item={item} />
          ))}
        </div>
      </div>

      <Divider />

      <div className="w-full space-y-4">
        <div className="w-full flex flex-col space-y-3">
          <SummaryCell value={"구인중"} title={"구인 상태"} icon={<MdOutlineWork />} />
          <SummaryCell value={t("status2.value")} title={t("status2.title")} icon={<IoLocationSharp />} />
          <SummaryCell value={t("status6.value")} title={t("status6.title")} icon={<BiTime />} />
        </div>
      </div>

      <Divider />
    </div>
  );

  const RightPanelEmployer = () => {
    return (
      <div
        style={{ minHeight: "calc(100vh - 5rem)", color: "#272D37" }}
        className="w-full flex h-full flex-col p-8 space-y-6 px-12 relative"
      >
        <TitleText text={"회사 소개"} />
        <p className="break-keep text-sm">{developerInfo.current?.intro?.[lang]}</p>
        <Divider />

        <TitleText text={"업종"} />
        <p className="break-keep text-sm">{developerInfo.current?.intro?.[lang]}</p>
        <Divider />

        <TitleText text={"대표"} />
        <p className="break-keep text-sm">장동해</p>
        <Divider />

        <TitleText text={"홈페이지"} />
        <p className="break-keep text-sm">namsancompany.com</p>
        <Divider />

        <TitleText text={"기업주소"} />
        <p className="break-keep text-sm">퇴계로 18길 33</p>
        <Divider />

        <TitleText text={"사원수"} />
        <p className="break-keep text-sm">12</p>
        <Divider />

        <TitleText text={"국제인 직원"} />
        <p className="break-keep text-sm">{developerInfo.current?.intro?.[lang]}</p>
        <Divider />

        <div className="h-16" />
      </div>
    );
  };

  if (!isLoading)
    if (false)
      return (
        <>
          <Modal
            isOpen={modalIsOpen}
            onAfterOpen={afterOpenModal}
            onRequestClose={closeModal}
            style={customStyles}
            shouldCloseOnOverlayClick={false}
          >
            <EditProfileModal />
          </Modal>

          <div className="w-full min-h-screen h-full flex flex-col items-center overflow-x-hidden z-10">
            <Navbar2 light />
            <div
              style={{ backgroundColor: "#0E5034" }}
              className="w-full h-12 bg-red-100 flex justify-center bg-opacity-40"
            >
              <div
                style={{ maxWidth: "1280px" }}
                className="w-full h-full px-4 flex justify-end items-center space-x-2"
              >
                <button
                  onClick={() => openModal()}
                  className="px-4 flex items-center justify-center h-8 bg-green-600 text-white font-bold rounded text-sm hover:bg-green-500 transition shadow"
                  style={{ display: isMyProfile ? "" : "none" }}
                >
                  프로필 수정
                </button>
              </div>
            </div>

            <div style={{ maxWidth: "1280px" }} className="w-full h-full px-4 flex">
              <LeftPanelEmployer />
              <RightPanelEmployer />
            </div>
            <Footer />
          </div>
        </>
      );
    else
      return (
        <>
          <Modal
            isOpen={modalIsOpen}
            onAfterOpen={afterOpenModal}
            onRequestClose={closeModal}
            style={customStyles}
            shouldCloseOnOverlayClick={false}
            // ariaHideApp={false}
          >
            <EditProfileModal initialTab={modalInitialTab} closeModal={closeModal} developerInfo={developerInfo} />
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

export default Profile;
