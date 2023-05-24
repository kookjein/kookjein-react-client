import React, { useContext, useEffect, useState } from "react";
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

const Profile = () => {
  const { t, i18n } = useTranslation("developerProfile");
  const { userId } = useParams();
  const [isMyProfile, setIsMyProfile] = useState(false);
  const lang = i18n.language.includes("en") ? "en" : "ko";
  const [developerInfo, setDeveloperInfo] = useState({});
  const [isLoading, setLoading] = useState(true);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [modalInitialTab, setModalInitialTab] = useState("Basic");
  const { userState } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    setIsMyProfile(userState.user?.userId === parseInt(userId));
  }, [userState, userId]);

  useEffect(() => {
    Modal.setAppElement("body");
    return () => {};
  }, []);

  useEffect(() => {
    axios
      .get(`/v1/user/`, { params: { user_id: userId } })
      .then((response) => {
        setDeveloperInfo(response.data.user_profile[0]);
        setLoading(false);
        console.log(response.data.user_profile[0]);
      })
      .catch((e) => {
        console.log("V1/USER/ ERROR : ", e);
        navigate("/error404");
        setLoading(false);
      });
  }, [userId, navigate]);

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
          <UploadProfile width={"9rem"} height={"9rem"} initialImage={developerInfo?.img} borderRadius={"100%"} />
        ) : (
          <img
            onError={({ currentTarget }) => {
              currentTarget.onerror = null; // prevents looping
              currentTarget.src = DefaultImage;
            }}
            src={developerInfo?.img || DefaultImage}
            alt=""
            draggable={false}
            className="object-cover w-full h-full"
          />
        )}
      </div>

      <p className="text-xl">{developerInfo.name?.[lang]}</p>
        {developerInfo?.title?.[lang] && <p className="text-sm text-gray-500 mb-1">{developerInfo?.title?.[lang]}</p>}
        {developerInfo?.company?.[lang] && (
          <div className="flex items-center space-x-1 text-sm text-gray-500">
            <BsPatchCheckFill className="text-sky-500 w-4 h-4" />
            <p style={{ color: "#0E5034" }} className="font-bold">
              {developerInfo?.company?.[lang]}
            </p>
          </div>
        )}
      {developerInfo?.oneLiner?.[lang] && (
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
          {developerInfo?.oneLiner?.[lang]}
        </p>
      )}

      {userState.isAuthenticated && (
        <div className="w-full flex justify-center items-center space-x-2">
          <Link to="/manage/0/chat" state={{ tabStatus: 1 }}>
            <button className="px-4 flex items-center justify-center h-8 bg-white rounded text-sm bg-gray-100 hover:bg-gray-200 transition shadow border">
              {t("sendMessage")}
            </button>
          </Link>
          <button className="px-4 flex items-center justify-center h-8 bg-white rounded text-sm bg-gray-100 hover:bg-gray-200 transition shadow border">
            {t("hire")}
          </button>
          <button
            onClick={() => openModal()}
            className="px-4 flex items-center justify-center h-8 bg-green-600 text-white rounded text-sm hover:bg-green-500 transition shadow border"
            style={{ display: isMyProfile ? "" : "none" }}
          >
            {t("editProfile")}
          </button>
        </div>
      )}

      <Divider />

      {(developerInfo?.tech || isMyProfile) && (
        <>
          <div className="w-full space-y-4">
            <TitleText text={t("programming_lang")} />
            <div className="w-full gap-2 flex flex-wrap">
              {developerInfo?.tech?.map((item) => <Tags key={item} size={"sm"} item={item} />) || (
                <Placeholder type={"Skill sets"} />
              )}
            </div>
          </div>
          <Divider />
        </>
      )}

      {(developerInfo?.lang || isMyProfile) && (
        <>
          <div className="w-full space-y-4">
            <TitleText text={t("lang")} />
            <div className="w-full gap-2 flex flex-wrap">
              {developerInfo?.lang?.[lang].map((item) => <Tags key={item} size={"sm"} item={item} />) || (
                <Placeholder type={"Skill sets"} />
              )}
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
            value={`${(developerInfo?.price * 10000).toLocaleString("en-US", {
              style: "currency",
              currency: "KRW",
            })} KRW`}
            title={t("status5.title")}
            icon={<MdOutlineAttachMoney />}
          />
          <SummaryCell value={t("status6.value")} title={t("status6.title")} icon={<BiTime />} />
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

    const CompanyCell2 = ({ title, year, period, desc }) => (
      <div>
        <div className="w-full py-1 flex items-center space-x-2">
          <div className="space-y-1">
            <p className="text-sm font-bold text-gray-600">{title}</p>
            <p className="text-xs text-gray-500">
              {year} · {period}
            </p>
          </div>
        </div>
        <div className="my-3">
          <p className="text-sm break-keep">{desc}</p>
        </div>
      </div>
    );

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

    const EducationCell = ({ name, title, from, to, desc }) => (
      <div className="space-y-1">
        <p className="text-sm font-bold text-gray-600">
          {name} | {title}
        </p>
        <p className="text-xs text-gray-500">
          {from} ~ {to}
        </p>
        <p className="text-sm break-keep py-2">{desc}</p>
      </div>
    );

    const CertificateCell = ({ time }) => (
      <div className="space-y-1">
        <p className="text-sm font-bold text-gray-600">AWS Certificate</p>
        <p className="text-xs text-gray-500">{time}</p>
      </div>
    );

    if (
      !developerInfo?.intro &&
      !developerInfo?.k_experience &&
      !developerInfo?.experience &&
      !developerInfo?.projects &&
      !developerInfo?.education &&
      !developerInfo?.certificates &&
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
        {(developerInfo?.intro || isMyProfile) && (
          <>
            <TitleText text={t("intro")} />
            <p className="break-keep text-sm">
              {developerInfo?.intro?.[lang] || <Placeholder type={"Introduction"} />}
            </p>
            <Divider />
          </>
        )}

        {developerInfo?.k_experience && (
          <>
            <TitleText text={t("k_exp")} />
            {developerInfo?.k_experience?.map((item) => (
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

        {(developerInfo?.experience || isMyProfile) && (
          <>
            <TitleText text={t("exp")} />
            {developerInfo?.experience?.map((item) => (
              <CompanyCell2
                key={item.company}
                period={`${item.from?.[lang]} ~ ${item.to?.[lang]}`}
                year="8개월"
                title={`${item.company} | ${item.title?.[lang]}`}
                desc={item.desc?.[lang]}
              />
            )) || <Placeholder type={"Experience"} />}
            <Divider />
          </>
        )}

        {(developerInfo?.projects || isMyProfile) && (
          <>
            <TitleText text={t("projects")} />
            {developerInfo?.projects?.map((item) => (
              <ProjectCell key={item.name} name={item.name} link={item.link} desc={item.desc?.[lang]} />
            )) || <Placeholder type={"Portfolio"} />}
            <Divider />
          </>
        )}

        {(developerInfo?.education || isMyProfile) && (
          <>
            <TitleText text={t("education")} />
            {developerInfo?.education?.map((item) => (
              <EducationCell
                key={item.name}
                name={item.name}
                title={item.title?.[lang]}
                from={item.from?.[lang]}
                to={item.to?.[lang]}
                desc={item.desc?.[lang]}
              />
            )) || <Placeholder type={"Education"} />}
            <Divider />
          </>
        )}

        {(developerInfo?.certificates || isMyProfile) && (
          <>
            <TitleText text={t("certificates")} />
            <CertificateCell time={"2021.01.12"} />
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
          {developerInfo?.lang?.[lang].map((item) => (
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
        <p className="break-keep text-sm">{developerInfo?.intro?.[lang]}</p>
        <Divider />

        <TitleText text={"업종"} />
        <p className="break-keep text-sm">{developerInfo?.intro?.[lang]}</p>
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
        <p className="break-keep text-sm">{developerInfo?.intro?.[lang]}</p>
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
            <EditProfileModal initialTab={modalInitialTab} closeModal={closeModal} />
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
