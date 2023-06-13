import React, { useContext, useEffect, useReducer, useRef, useState } from "react";
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
import moment from "moment/moment";
import ProfileEmployer from "./ProfileEmployer";

const Profile = () => {
  const navigate = useNavigate();
  const generalInfo = useRef({});
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
  const [kYos, setKYos] = useState(0);
  const [, forceUpdate] = useReducer((x) => x + 1, 0);

  useEffect(() => {
    setIsMyProfile(userState.user?.userId === parseInt(userId));
  }, [userState, userId]);

  useEffect(() => {
    Modal.setAppElement("body");
    return () => {};
  }, []);

  useEffect(() => {
    setLoading(true);
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
        setLoading(false);
        forceUpdate();
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
        {generalInfo.current?.company && (
          <div className="flex items-center text-sm -mr-3">
            <p className="mr-1">at</p>{" "}
            <Link to={`/company/${generalInfo.current.company?.company_id}`}>
              <button className="text-green-700 hover:underline filter hover:brightness-125">
                {generalInfo.current.company?.company_name}
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

      {developerInfo.current.tech?.length > 0 ? (
        <>
          <div className="w-full space-y-4">
            <TitleText text={t("programming_lang")} />
            <div className="w-full gap-2 flex flex-wrap">
              {developerInfo.current?.tech?.map((item) => (
                <Tags key={item.id} size={"sm"} item={item.text} />
              ))}
            </div>
          </div>
          <Divider />
        </>
      ) : (
        isMyProfile && (
          <>
            <div className="w-full space-y-4">
              <TitleText text={t("programming_lang")} />
              <Placeholder type={"Skill sets"} />
            </div>
            <Divider />
          </>
        )
      )}

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
          <SummaryCell
            value={
              developerInfo.current?.employment_status ? developerInfo.current?.employment_status : t("status1.value")
            }
            title={t("status1.title")}
            icon={<MdOutlineWork />}
          />
          <SummaryCell
            value={developerInfo.current?.country ? developerInfo.current?.country : t("status2.value")}
            title={t("status2.title")}
            icon={<IoLocationSharp />}
          />
          <SummaryCell
            value={`${kYos || 1} ${t("status4.value")}`}
            title={t("status3.title")}
            icon={<AiTwotoneCalendar />}
          />
          <SummaryCell
            value={`${developerInfo.current?.yos || 1} ${t("status4.value")}`}
            title={t("status3.title1")}
            icon={<AiTwotoneCalendar />}
          />
          <SummaryCell
            value={`${(developerInfo.current?.price ? developerInfo.current?.price : 1800000).toLocaleString("en-US", {
              style: "currency",
              currency: "KRW",
            })} KRW`}
            title={t("status5.title")}
            icon={<MdOutlineAttachMoney />}
          />
          <SummaryCell
            value={moment(registerDate.current).format("YYYY.MM.DD")}
            title={t("status6.title")}
            icon={<BiTime />}
          />
        </div>
      </div>
    </div>
  );

  const RightPanel = () => {
    const CompanyCell = ({ img, company, title, from, to }) => {
      const yos = moment.duration(to - from).years();
      return (
        <div>
          <div className="w-full py-1 flex items-center space-x-2">
            <div className="w-10 h-10 bg-gray-100 rounded-full overflow-hidden">
              <img src={img} alt="" className="object-cover w-full h-full" />
            </div>
            <div className="space-y-1">
              <p className="text-sm font-bold text-gray-600">
                {company} - {title}
              </p>
              <p className="text-xs text-gray-500">
                {yos < 1 ? "< 1" : yos + 1} year{yos > 1 && "s"} · {moment(from).format("YYYY.MM")} ~{" "}
                {moment(to).format("YYYY.MM")}
              </p>
            </div>
          </div>
        </div>
      );
    };

    const CompanyCell2 = ({ title, company, from, to, desc }) => {
      const yos = moment.duration(to - from).years();
      return (
        <div>
          <div className="w-full py-1 flex items-center space-x-2">
            <div className="space-y-1">
              <p className="text-sm font-bold text-gray-600">{`${company} | ${title}`}</p>
              <p className="text-xs text-gray-500">
                {yos < 1 ? "< 1" : yos + 1} year{yos > 1 && "s"} · {moment(from).format("YYYY.MM")} ~{" "}
                {moment(to).format("YYYY.MM")}
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
            {yos < 1 ? "< 1" : yos + 1} year{yos > 1 && "s"} · {moment(from).format("YYYY.MM")} ~{" "}
            {moment(to).format("YYYY.MM")}
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
      !developerInfo.current.intro?.[lang] &&
      (!developerInfo.current?.k_experience || developerInfo.current.k_experience?.length === 0) &&
      (!developerInfo.current?.experience || developerInfo.current.experience?.length === 0) &&
      (!developerInfo.current?.projects || developerInfo.current.projects?.length === 0) &&
      (!developerInfo.current?.education || developerInfo.current.education?.length === 0) &&
      (!developerInfo.current?.certification || developerInfo.current.certification?.length === 0) &&
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
        className="w-full flex h-full flex-col p-8 space-y-6 px-6 sm:px-12 relative"
      >
        {generalInfo.current?.company && (
          <div className="flex bg-white border p-3 rounded-lg shadow text-sm">
            <p className="mr-1 font-bold">{developerInfo.current.name?.[lang]} - </p>
            {developerInfo.current?.title?.[lang] && <p className="">{developerInfo.current?.title?.[lang]}</p>}
            <div className="flex items-center">
              <p className="mx-1">at</p>
              <Link to={`/company/${generalInfo.current.company?.company_id}`}>
                <button className="text-green-700 hover:underline filter hover:brightness-125 font-bold">
                  {generalInfo.current.company?.company_name}
                </button>
              </Link>
              <BsPatchCheckFill className="text-sky-500 w-3 h-3 ml-1" />
            </div>
          </div>
        )}
        {developerInfo.current.intro?.[lang] ? (
          <>
            <TitleText text={t("intro")} />
            <p className="break-keep text-sm">{developerInfo.current?.intro?.[lang]}</p>
            <Divider />
          </>
        ) : (
          isMyProfile && (
            <>
              <TitleText text={t("intro")} />
              <Placeholder type={"Introduction"} />
              <Divider />
            </>
          )
        )}

        {developerInfo.current.k_experience?.length > 0 && (
          <>
            <TitleText text={t("k_exp")} />
            {developerInfo.current?.k_experience?.map((item) => (
              <CompanyCell
                key={item.company}
                company={item.company}
                title={item.title?.[lang]}
                img={item.logo}
                from={item.from}
                to={item.to}
              />
            ))}
            <Divider />
          </>
        )}

        {developerInfo.current.experience?.length > 0 ? (
          <>
            <TitleText text={t("exp")} />
            {developerInfo.current?.experience?.map((item, index) => (
              <CompanyCell2
                key={index}
                from={item.from}
                to={item.to}
                company={item.company}
                title={item.title?.[lang]}
                desc={item.desc?.[lang]}
              />
            ))}
            <Divider />
          </>
        ) : (
          isMyProfile && (
            <>
              <TitleText text={t("exp")} />
              <Placeholder type={"Experience"} />
              <Divider />
            </>
          )
        )}

        {developerInfo.current.projects?.length > 0 ? (
          <>
            <TitleText text={t("projects")} />
            {developerInfo.current?.projects?.map((item) => (
              <ProjectCell key={item.name} name={item.name} link={item.link} desc={item.desc?.[lang]} />
            ))}
            <Divider />
          </>
        ) : (
          isMyProfile && (
            <>
              <TitleText text={t("projects")} />
              <Placeholder type={"Portfolio"} />
              <Divider />
            </>
          )
        )}

        {developerInfo.current.education?.length > 0 ? (
          <>
            <TitleText text={t("education")} />
            {developerInfo.current?.education?.map((item) => (
              <EducationCell
                key={item.name}
                name={item.name}
                title={item.title?.[lang]}
                from={item.from}
                to={item.to}
                desc={item.desc?.[lang]}
              />
            ))}
            <Divider />
          </>
        ) : (
          isMyProfile && (
            <>
              <TitleText text={t("education")} />
              <Placeholder type={"Education"} />
              <Divider />
            </>
          )
        )}

        {developerInfo.current.certification?.length > 0 ? (
          <>
            <TitleText text={t("certificates")} />
            {developerInfo.current?.certification?.map((item, index) => (
              <CertificateCell key={index} name={item.name} date={item.date} />
            ))}
            <Divider />
          </>
        ) : (
          isMyProfile && (
            <>
              <TitleText text={t("certificates")} />
              <Placeholder type={"Awards & Certs"} />
              <Divider />
            </>
          )
        )}

        <div className="h-16" />
      </div>
    );
  };

  if (!isLoading)
    if (generalInfo.current.user.user_type === "employer")
      return <ProfileEmployer generalInfo={generalInfo.current} isMyProfile={isMyProfile} />;
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
            <div style={{ maxWidth: "1280px" }} className="w-full h-full sm:px-4 px-1 flex sm:flex-row flex-col">
              <LeftPanel />
              <RightPanel />
            </div>
            <Footer />
          </div>
        </>
      );
};

export default Profile;
