import React, { useEffect, useState } from "react";
import Navbar2 from "../components/Navbar2";
import Tags from "../components/Tags";
import { IoLocationSharp } from "react-icons/io5";
import { BiTime } from "react-icons/bi";
import { RxCross2 } from "react-icons/rx";
import { AiTwotoneCalendar } from "react-icons/ai";
import { MdOutlineAttachMoney, MdOutlineWork } from "react-icons/md";
import Footer from "../components/Footer";
import { useTranslation } from "react-i18next";
import { useParams, useSearchParams } from "react-router-dom";
import Modal from "react-modal";
import axios from "axios";
import { BsFillPencilFill } from "react-icons/bs";

const DeveloperProfile = () => {
  const { t, i18n } = useTranslation("developerProfile");
  const { userId } = useParams();
  const [searchParams] = useSearchParams();
  const isMyProfile = searchParams.get("up_rollout") === "true";
  const lang = i18n.language.includes("en") ? "en" : "ko";
  const [developerInfo, setDeveloperInfo] = useState({});
  const [isLoading, setLoading] = useState(true);
  const [modalIsOpen, setIsOpen] = useState(false);

  useEffect(() => {
    Modal.setAppElement('body')
    return () => {}
  }, [])
  
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

  useEffect(() => {
    axios
      .get("https://kookjein.s3.ap-northeast-2.amazonaws.com/sample/data.json")
      .then((res) => {
        setDeveloperInfo(res.data[userId]);
        setLoading(false);
      })
      .catch((e) => {
        setLoading(false);
        console.log(e);
      });
    return () => {};
  }, [userId]);

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
  }

  function closeModal() {
    setIsOpen(false);
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

  const LeftPanel = () => (
    <div
      style={{ minHeight: "calc(100vh - 5rem)", color: "#272D37" }}
      className="w-96 flex border-r flex-col items-center p-8 space-y-6 flex-shrink-0 relative"
    >
      <button
        className="absolute top-4 right-4 w-8 h-8 bg-green-800 hover:bg-green-700 flex items-center justify-center text-white rounded-full transition"
        onClick={() => openModal()}
      >
        <BsFillPencilFill />
      </button>

      <div className="w-36 h-36 bg-gray-100 rounded-full overflow-hidden">
        <img src={developerInfo.img} alt="" className="object-cover w-full h-full" />
      </div>

      <p className="text-xl">
        {developerInfo.name[lang]} {isMyProfile && "*"}
      </p>
      <div className="text-sm text-gray-500 flex flex-col items-center space-y-1">
        <p className="">{developerInfo.title[lang]}</p>
        <p style={{ color: "#0E5034" }} className="font-bold">
          {developerInfo.company[lang]}
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
        {developerInfo.oneLiner[lang]}
      </p>

      <Divider />

      <div className="w-full space-y-4">
        <TitleText text={t("programming_lang")} />
        <div className="w-full gap-2 flex flex-wrap">
          {developerInfo.tech.map((item) => (
            <Tags key={item} size={"sm"} item={item} />
          ))}
        </div>
      </div>

      <Divider />

      <div className="w-full space-y-4">
        <TitleText text={t("lang")} />
        <div className="w-full gap-2 flex flex-wrap">
          {developerInfo.lang[lang].map((item) => (
            <Tags key={item} size={"sm"} item={item} />
          ))}
        </div>
      </div>

      <Divider />

      <div className="w-full space-y-4">
        <div className="w-full flex flex-col space-y-3">
          <SummaryCell value={t("status1.value")} title={t("status1.title")} icon={<MdOutlineWork />} />
          <SummaryCell value={t("status2.value")} title={t("status2.title")} icon={<IoLocationSharp />} />
          <SummaryCell value={`1 ${t("status4.value")}`} title={t("status3.title")} icon={<AiTwotoneCalendar />} />
          <SummaryCell
            value={`${(developerInfo.price * 10000).toLocaleString("en-US", {
              style: "currency",
              currency: "KRW",
            })} KRW`}
            title={t("status5.title")}
            icon={<MdOutlineAttachMoney />}
          />
          <SummaryCell value={t("status6.value")} title={t("status6.title")} icon={<BiTime />} />
        </div>
      </div>

      <Divider />
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
        <a className="text-sm text-blue-500 font-bold" href="/user/profile">
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

    return (
      <div
        style={{ minHeight: "calc(100vh - 5rem)", color: "#272D37" }}
        className="w-full flex h-full flex-col p-8 space-y-6 px-12 relative"
      >
        <button
          className="absolute top-4 right-4 w-8 h-8 bg-green-800 hover:bg-green-700 flex items-center justify-center text-white rounded-full transition"
          onClick={() => openModal()}
        >
          <BsFillPencilFill />
        </button>
        <TitleText text={t("intro")} />
        <p className="break-keep text-sm">{developerInfo.intro[lang]}</p>

        {developerInfo.k_experience.length > 0 && (
          <>
            <Divider />

            <TitleText text={t("k_exp")} />

            {developerInfo.k_experience.map((item) => (
              <CompanyCell
                key={item.company[lang]}
                img={item.logo}
                period={`${item.from[lang]} ~ ${item.to[lang]}`}
                year="8개월"
                title={`${item.company[lang]} | ${item.title[lang]}`}
              />
            ))}
          </>
        )}

        <Divider />

        <TitleText text={t("exp")} />

        {developerInfo.experience.map((item) => (
          <CompanyCell2
            key={item.company}
            period={`${item.from[lang]} ~ ${item.to[lang]}`}
            year="8개월"
            title={`${item.company} | ${item.title[lang]}`}
            desc={item.desc[lang]}
          />
        ))}

        <Divider />
        <TitleText text={t("projects")} />

        {developerInfo.projects.map((item) => (
          <ProjectCell key={item.name} name={item.name} link={item.link} desc={item.desc[lang]} />
        ))}

        <Divider />
        <TitleText text={t("education")} />

        {developerInfo.education.map((item) => (
          <EducationCell
            key={item.name}
            name={item.name}
            title={item.title[lang]}
            from={item.from[lang]}
            to={item.to[lang]}
            desc={item.desc[lang]}
          />
        ))}
        <Divider />
        <TitleText text={t("certificates")} />
        <CertificateCell time={"2021.01.12"} />

        <Divider />
        <div className="h-16" />
      </div>
    );
  };

  const EditProfileModal = () => {
    const [selectedTab, setSelectedTab] = useState("Basic");

    const SaveComponent = () => (
      <button
        style={{ backgroundColor: "#0E5034" }}
        className="text-white text px-6 py-2 rounded hover:opacity-90 transition font-semibold text-sm shadow-lg border-t"
      >
        Save
      </button>
    );

    const LeftPanel = () => {
      const TabButton = ({ title }) => (
        <button
          onClick={() => setSelectedTab(title)}
          className={`${
            selectedTab === title ? "text-green-800 font-bold" : "text-gray-500 hover:bg-gray-200"
          } h-10 flex items-center text-sm relative w-full`}
        >
          {selectedTab === title && <div className="absoulte left-0 h-5 w-1 bg-green-700 rounded-r"></div>}
          <p className="px-6">{title}</p>
        </button>
      );
      return (
        <div style={{ height: "calc(100vh - 11.5rem)" }} className="w-48 border-r bg-gray-50 py-2 flex-shrink-0">
          <div className="h-10 flex items-center px-4 text-sm font-bold">Profile</div>
          <TabButton title={"Basic"} />
          <TabButton title={"Skill sets"} />
          <div className="h-10 flex items-center px-4 text-sm font-bold">Resume</div>
          <TabButton title={"Introduction"} />
          <TabButton title={"Experience"} />
          <TabButton title={"Portfolio"} />
          <TabButton title={"Education"} />
          <TabButton title={"Awards & Certs"} />
        </div>
      );
    };

    const RightPanel1 = () => (
      <div className="relative w-full">
        <div className="p-4 px-6 w-full overflow-y-auto pb-12" style={{ height: "calc(100vh - 11.5rem)" }}>
          <p className="mb-4 text-gray-700">Update basic information to increase Page Discovery</p>
          <div className="text-sm text-gray-500 mb-2">Profile image</div>
          <button className="flex flex-col w-36 h-36 border rounded bg-white mb-4 border-gray-300 flex items-center justify-center text-xs text-gray-400 text-center hover:bg-gray-200">
            <p>Recommended</p>
            <p>320px x 320px</p>
          </button>
          <div className="text-sm text-gray-500 mb-2">Full name*</div>
          <input className="w-1/2 h-9 rounded border border-gray-300 mb-4 p-2" />
          <div className="text-sm text-gray-500 mb-2">Title*</div>
          <input placeholder="e.g. Frontend Developer" className="w-1/2 h-9 rounded border border-gray-300 mb-4 p-2" />

          <div className="text-sm text-gray-500 mb-2 flex justify-between items-center">
            <p>One line introduction</p>
            <p className="text-xs">0 / 100</p>
          </div>
          <textarea style={{ resize: "none" }} className="w-full h-16 rounded border border-gray-300 mb-4 p-2" />
        </div>
        <div
          style={{ backdropFilter: "blur(100px)" }}
          className="flex items-center justify-end absolute bottom-0 w-full shadow p-6 py-3"
        >
          <SaveComponent />
        </div>{" "}
      </div>
    );

    const RightPanel2 = () => (
      <div className="relative w-full">
        <div className="p-4 px-6 w-full overflow-y-auto pb-12" style={{ height: "calc(100vh - 11.5rem)" }}>
          <p className="mb-4 text-gray-700">Tell us your skills to appeal to companies</p>
          <div className="text-sm text-gray-500 mb-2">Tech stack</div>
          <input
            placeholder="e.g. React Native, PostreSQL"
            className="w-full h-9 rounded border border-gray-300 mb-4 p-2"
          />
          <div className="text-sm text-gray-500 mb-2">Spoken language</div>
          <input placeholder="e.g. English, Arabic" className="w-1/2 h-9 rounded border border-gray-300 mb-4 p-2" />

          <div className="text-sm text-gray-500 mb-2">Year of Service (Need verification)</div>
          <div className="flex item-center space-x-2 mb-4">
            <input placeholder="e.g. 2" className="w-24 h-9 rounded border border-gray-300 p-2" />
            <p className="text-sm text-gray-500 flex items-end">years</p>
          </div>

          <div className="text-sm text-gray-500 mb-2">Monthly wage</div>
          <div className="flex item-center space-x-2 mb-2">
            <input
              disabled={true}
              value={(190 * 10000).toLocaleString("en-US", {
                style: "currency",
                currency: "KRW",
              })}
              className="h-9 rounded border border-gray-300 p-2 text-gray-500 text-sm bg-gray-100"
            />
            <p className="text-sm text-gray-500 flex items-end">KRW</p>
          </div>
          <div className="text-sm text-green-700 mb-2 italic">
            Your monthly wage rises as you gain experience with Korean SMEs
          </div>
        </div>
        <div
          style={{ backdropFilter: "blur(100px)" }}
          className="flex items-center justify-end absolute bottom-0 w-full shadow p-6 py-3"
        >
          <SaveComponent />
        </div>{" "}
      </div>
    );

    const RightPanel3 = () => (
      <div className="relative w-full">
        <div className="p-4 px-6 w-full overflow-y-auto pb-12" style={{ height: "calc(100vh - 11.5rem)" }}>
          <p className="mb-4 text-gray-700">Provide a detailed introduction about yourself</p>
          <div className="text-sm text-gray-500 mb-2 flex justify-between items-center">
            <p>Introduction</p>
            <p className="text-xs">0 / 1000</p>
          </div>
          <textarea style={{ resize: "none" }} className="w-full h-32 rounded border border-gray-300 mb-4 p-2" />
        </div>
        <div
          style={{ backdropFilter: "blur(100px)" }}
          className="flex items-center justify-end absolute bottom-0 w-full shadow p-6 py-3"
        >
          <SaveComponent />
        </div>{" "}
      </div>
    );

    const RightPanel4 = () => {
      const [experienceArray, setExperienceArray] = useState([]);
      const addPressed = () => {
        setExperienceArray([...experienceArray, { title: "", position: "", description: "" }]);
      };
      const NewCell = ({ order }) => (
        <div className="w-full py-6 border-t mb-6">
          <div className="text-sm text-gray-500 mb-2">Company name {order}</div>
          <input className="w-1/2 h-9 rounded border border-gray-300 mb-4 p-2" />
          <div className="text-sm text-gray-500 mb-2">Position / Title</div>
          <input className="w-1/2 h-9 rounded border border-gray-300 mb-4 p-2" />
          <div className="text-sm text-gray-500 mb-2 flex justify-between items-center">
            <p>Description</p>
            <p className="text-xs">0 / 1000</p>
          </div>
          <textarea style={{ resize: "none" }} className="w-full h-32 rounded border border-gray-300 mb-4 p-2" />
        </div>
      );
      const AddNewButton = () => (
        <button
          onClick={() => addPressed()}
          className="py-4 my-6 w-full border-t border-b flex items-center justify-center font-bold text-sm text-green-600 hover:bg-green-100"
        >
          Add new experience
        </button>
      );
      return (
        <div className="relative w-full">
          <div className="p-4 px-6 w-full overflow-y-auto pb-12" style={{ height: "calc(100vh - 11.5rem)" }}>
            <p className="mb-4 text-gray-700">Tell us your work experience outside of Kookje.in</p>

            {experienceArray.map((data, index) => (
              <NewCell key={index} order={index} />
            ))}
            <AddNewButton />
          </div>
          <div
            style={{ backdropFilter: "blur(100px)" }}
            className="flex items-center justify-end absolute bottom-0 w-full shadow p-6 py-3"
          >
            <SaveComponent />
          </div>
        </div>
      );
    };

    const RightPanel5 = () => {
      const [experienceArray, setExperienceArray] = useState([]);
      const addPressed = () => {
        setExperienceArray([...experienceArray, { title: "", position: "", description: "" }]);
      };
      const NewCell = ({ order }) => (
        <div className="w-full py-6 border-t mb-6">
          <div className="text-sm text-gray-500 mb-2">Project name {order}</div>
          <input className="w-1/2 h-9 rounded border border-gray-300 mb-4 p-2" />
          <div className="text-sm text-gray-500 mb-2">Link to project</div>
          <input className="w-1/2 h-9 rounded border border-gray-300 mb-4 p-2" />
          <div className="text-sm text-gray-500 mb-2 flex justify-between items-center">
            <p>Description</p>
            <p className="text-xs">0 / 1000</p>
          </div>
          <textarea style={{ resize: "none" }} className="w-full h-32 rounded border border-gray-300 mb-4 p-2" />
        </div>
      );
      const AddNewButton = () => (
        <button
          onClick={() => addPressed()}
          className="py-4 my-6 w-full border-t border-b flex items-center justify-center font-bold text-sm text-green-600 hover:bg-green-100"
        >
          Add a project
        </button>
      );
      return (
        <div className="relative w-full">
          <div className="p-4 px-6 w-full overflow-y-auto pb-12" style={{ height: "calc(100vh - 11.5rem)" }}>
            <p className="mb-4 text-gray-700">Tell us your work experience outside of Kookje.in</p>

            {experienceArray.map((data, index) => (
              <NewCell key={index} order={index} />
            ))}
            <AddNewButton />
          </div>
          <div
            style={{ backdropFilter: "blur(100px)" }}
            className="flex items-center justify-end absolute bottom-0 w-full shadow p-6 py-3"
          >
            <SaveComponent />
          </div>
        </div>
      );
    };

    const RightPanel6 = () => {
      const [experienceArray, setExperienceArray] = useState([]);
      const addPressed = () => {
        setExperienceArray([...experienceArray, { title: "", position: "", description: "" }]);
      };
      const NewCell = ({ order }) => (
        <div className="w-full py-6 border-t mb-6">
          <div className="text-sm text-gray-500 mb-2">Institution name {order}</div>
          <input className="w-1/2 h-9 rounded border border-gray-300 mb-4 p-2" />
          <div className="text-sm text-gray-500 mb-2">Degree</div>
          <input className="w-1/2 h-9 rounded border border-gray-300 mb-4 p-2" />
          <div className="text-sm text-gray-500 mb-2 flex justify-between items-center">
            <p>Description</p>
            <p className="text-xs">0 / 1000</p>
          </div>
          <textarea style={{ resize: "none" }} className="w-full h-32 rounded border border-gray-300 mb-4 p-2" />
        </div>
      );
      const AddNewButton = () => (
        <button
          onClick={() => addPressed()}
          className="py-4 my-6 w-full border-t border-b flex items-center justify-center font-bold text-sm text-green-600 hover:bg-green-100"
        >
          Add education
        </button>
      );
      return (
        <div className="relative w-full">
          <div className="p-4 px-6 w-full overflow-y-auto pb-12" style={{ height: "calc(100vh - 11.5rem)" }}>
            <p className="mb-4 text-gray-700">Tell us your work experience outside of Kookje.in</p>

            {experienceArray.map((data, index) => (
              <NewCell key={index} order={index} />
            ))}
            <AddNewButton />
          </div>
          <div
            style={{ backdropFilter: "blur(100px)" }}
            className="flex items-center justify-end absolute bottom-0 w-full shadow p-6 py-3"
          >
            <SaveComponent />
          </div>
        </div>
      );
    };

    const RightPanel7 = () => {
      const [experienceArray, setExperienceArray] = useState([]);
      const addPressed = () => {
        setExperienceArray([...experienceArray, { title: "", position: "", description: "" }]);
      };
      const NewCell = ({ order }) => (
        <div className="w-full py-6 border-t mb-6">
          <div className="text-sm text-gray-500 mb-2">Title {order}</div>
          <input className="w-1/2 h-9 rounded border border-gray-300 mb-4 p-2" />
          <div className="text-sm text-gray-500 mb-2">Degree</div>
          <input className="w-1/2 h-9 rounded border border-gray-300 mb-4 p-2" />
        </div>
      );
      const AddNewButton = () => (
        <button
          onClick={() => addPressed()}
          className="py-4 my-6 w-full border-t border-b flex items-center justify-center font-bold text-sm text-green-600 hover:bg-green-100"
        >
          Add a award / certificate
        </button>
      );
      return (
        <div className="relative w-full">
          <div className="p-4 px-6 w-full overflow-y-auto pb-12" style={{ height: "calc(100vh - 11.5rem)" }}>
            <p className="mb-4 text-gray-700">Tell us your work experience outside of Kookje.in</p>

            {experienceArray.map((data, index) => (
              <NewCell key={index} order={index} />
            ))}
            <AddNewButton />
          </div>
          <div
            style={{ backdropFilter: "blur(100px)" }}
            className="flex items-center justify-end absolute bottom-0 w-full shadow p-6 py-3"
          >
            <SaveComponent />
          </div>
        </div>
      );
    };
    return (
      <div style={{ width: "900px", height: "calc(100vh - 8rem)" }} className="">
        <div className="h-14 w-full border-b flex-shrink-0 flex items-center justify-between text-lg px-6">
          <p>프로필 변경</p>
          <div className="flex items-center space-x-6">
            <button onClick={closeModal} className="py-2">
              <RxCross2 className="w-7 h-7" />
            </button>
          </div>
        </div>
        <div style={{ height: "calc(100vh - 11.5rem)" }} className="flex overflow-y-auto">
          <LeftPanel />
          {selectedTab === "Basic" ? (
            <RightPanel1 />
          ) : selectedTab === "Skill sets" ? (
            <RightPanel2 />
          ) : selectedTab === "Introduction" ? (
            <RightPanel3 />
          ) : selectedTab === "Experience" ? (
            <RightPanel4 />
          ) : selectedTab === "Portfolio" ? (
            <RightPanel5 />
          ) : selectedTab === "Education" ? (
            <RightPanel6 />
          ) : (
            <RightPanel7 />
          )}
        </div>
      </div>
    );
  };

  if (!isLoading)
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
          <EditProfileModal />
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

export default DeveloperProfile;
