import "../../utils/drawer.css";
import React, { useContext, useState } from "react";
import { Link, useParams } from "react-router-dom";
import moment from "moment/moment";
import { useTranslation } from "react-i18next";
import Modal from "react-modal";
import { AuthContext } from "../../context/authContext";
import Drawer from "react-modern-drawer";
//COMPONENTS
import Tags from "../../components/Tags";
import UploadProfile from "../../components/UploadProfile";
import EditProfileModal from "../../components/EditProfileModal";
import ComposeProfile from "../../components/ComposeProfile";
//ASSETS
import { languageArray } from "../../utils/arrays";
import DefaultImage from "../../assets/default-profile.png";
import { IoLocationSharp } from "react-icons/io5";
import { BiTime } from "react-icons/bi";
import { AiTwotoneCalendar } from "react-icons/ai";
import { MdOutlineAttachMoney, MdOutlineWork } from "react-icons/md";
import { BsPatchCheckFill } from "react-icons/bs";
import { RxCross2 } from "react-icons/rx";

const ProfileDeveloper = ({ generalInfo, isMyProfile, developerInfo, kYos, registerDate }) => {
  const { t, i18n } = useTranslation("profile");
  const lang = i18n.language.includes("en") ? "en" : "ko";
  const { userId } = useParams();

  const { userState } = useContext(AuthContext);

  const [modalIsOpen, setIsOpen] = useState(false);
  const [composeModalIsOpen, setComposeModalOpen] = useState(false);
  const [modalInitialTab, setModalInitialTab] = useState("Basic");
  const [isDrawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setDrawerOpen((prevState) => !prevState);
  };

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
            alt={developerInfo.current.name?.[lang]}
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
          {!isMyProfile && (
            <>
              <button
                onClick={() => openComposeModal()}
                className="px-4 flex items-center justify-center h-8 rounded text-sm transition border flex-shrink-0 border-green-600 text-green-600 hover:brightness-125 filter"
              >
                {t("sendMessage")}
              </button>
              <button
                onClick={toggleDrawer}
                className="px-4 flex items-center justify-center h-8 rounded text-sm bg-green-600 text-white hover:brightness-125 transition flex-shrink-0"
              >
                {t("hire")}
              </button>
            </>
          )}

          <button
            onClick={() => openModal()}
            className="px-4 flex items-center justify-center h-8 bg-green-600 text-white rounded text-sm hover:bg-green-500 transition flex-shrink-0"
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
              <img src={img} alt={company} className="object-cover w-full h-full" />
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

  return (
    <>
      <Modal isOpen={modalIsOpen} onRequestClose={closeModal} style={customStyles} shouldCloseOnOverlayClick={false}>
        <EditProfileModal initialTab={modalInitialTab} closeModal={closeModal} developerInfo={developerInfo} />
      </Modal>

      <Drawer open={isDrawerOpen} onClose={toggleDrawer} direction="right" size={450}>
        <div className="w-full h-16 border-b flex items-center justify-between px-6">
          <p className="text-gray-700">채용 신청</p>
          <button onClick={toggleDrawer}>
            <RxCross2 className="w-7 h-7" />
          </button>
        </div>
        <div className="p-6">
          <p className="text-xl">인사말/간단한 소개</p>
          <input className="w-full h-32 border rounded mt-4" />

          <p className="text-xl mt-4">내 프로젝트</p>
          <div className="w-full h-24 rounded bg-gray-100 mt-4 flex items-center justify-center text-blue-500">
            선택하기
          </div>

          <p className="text-xl mt-4">어시스턴트 옵션</p>
          <div className="w-full py-4 border mt-4 p-4">
            <div className="flex justify-between w-full">
              <div>
                <p className="text-xl">무료플랜</p>
                <p className="text-sm text-gray-500 mt-2">₩0원/월</p>
              </div>
              <div className="text-sm text-gray-600">
                <p>고객 지원 및 분쟁 해결</p>
                <p>개발자 매칭 시 마일스톤 검증</p>
              </div>
            </div>
          </div>
          <div className="w-full py-4 border mt-4 p-4">
            <div className="flex justify-between w-full">
              <div>
                <p className="text-xl">스탠다드 플랜</p>
                <p className="text-sm text-gray-500 mt-2">₩40만원/월</p>
              </div>
              <div className="text-sm text-gray-600">
                <p>고객 지원 및 분쟁 해결</p>
                <p>개발자 매칭 시 마일스톤 검증</p>
              </div>
            </div>
          </div>
          <div className="w-full py-4 border mt-4 p-4">
            <div className="flex justify-between w-full">
              <div>
                <p className="text-xl">엔터프라이즈 플랜</p>
                <p className="text-sm text-gray-500 mt-2">₩160만F원/월</p>
              </div>
              <div className="text-sm text-gray-600">
                <p>고객 지원 및 분쟁 해결</p>
                <p>개발자 매칭 시 마일스톤 검증</p>
              </div>
            </div>
          </div>
          <div className="absolute bottom-0 h-24 border-t w-full bg-gray-100 -ml-6 p-4 flex items-center justify-end">
            <button className="h-9 px-6 bg-green-600 text-white rounded hover:brightness-125">계약 및 채용하기</button>
          </div>
        </div>
      </Drawer>

      {userState.isAuthenticated && !isMyProfile && userState.user.userType !== "employee" && (
        <ComposeProfile
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
      </div>
    </>
  );
};

export default ProfileDeveloper;
