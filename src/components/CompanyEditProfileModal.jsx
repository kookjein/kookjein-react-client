import React, { useContext, useEffect, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import UploadProfile from "./UploadProfile";
import { AuthContext } from "../utils/authContext";
import axios from "../utils/authAxios";
// import { languageArray } from "../utils/arrays";
import "../utils/datePicker.css";
import "react-calendar/dist/Calendar.css";

const CompanyEditProfileModal = ({ initialTab = "Basic", closeModal, developerInfo }) => {
  const { userState } = useContext(AuthContext);
  const [selectedTab, setSelectedTab] = useState(initialTab);

  useEffect(() => {
    console.log("MODAL OPEN");
    return () => {
      console.log("MODAL CLOSED");
    };
  }, []);

  const SaveComponent = ({ isReady, isSaved, onPress, isLoading }) => (
    <div className="flex items-center justify-between absolute bottom-0 w-full shadow p-6 py-3 bg-gray-100 bg-opacity-80">
      <p className="text-green-700 text-sm">
        {isSaved
          ? "Saved!"
          : isLoading
          ? "Saving..."
          : isReady
          ? "Make sure to save your changes before changing tabs."
          : ""}
      </p>
      <button
        onClick={onPress}
        disabled={!isReady || isSaved || isLoading}
        className={`px-6 py-2 rounded hover:opacity-90 transition font-semibold text-sm ${
          !isReady || isLoading || isSaved ? "bg-gray-300 text-white" : "bg-green-700 text-white shadow-lg"
        }`}
      >
        {isLoading ? <div className="animate-ping h-5 w-5 rounded-full bg-white" /> : "Save"}
      </button>
    </div>
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
        <TabButton title={"Detail"} />
      </div>
    );
  };

  const BasicPanel = () => {
    const [initialName, setInitialName] = useState(developerInfo?.current.name?.[userState.user.userLanguage] || "");
    const [initialTitle, setInitialTitle] = useState(developerInfo?.current.title?.[userState.user.userLanguage] || "");
    const [initialWebsite, setInitialWebsite] = useState(
      developerInfo?.current.website?.[userState.user.userLanguage] || ""
    );
    const [initialIntro, setInitialIntro] = useState(
      developerInfo?.current.oneLiner?.[userState.user.userLanguage] || ""
    );
    const [name, setName] = useState(initialName);
    const [title, setTitle] = useState(initialTitle);
    const [website, setWebsite] = useState(initialWebsite);
    const [intro, setIntro] = useState(initialIntro);
    const [isReady, setReady] = useState(false);
    const [isSaved, setSaved] = useState(false);
    const [isLoading, setLoading] = useState(false);
    const maxLength = 2000;

    const saveBasic = () => {
      setLoading(true);
      axios
        .post(`/v1/user/me`, {
          user: {
            user_profile: [
              {
                ...(initialTitle !== title && { title: { [userState.user.userLanguage]: title } }),
                ...(initialName !== name && { name: { [userState.user.userLanguage]: name } }),
                ...(initialIntro !== intro && { oneLiner: { [userState.user.userLanguage]: intro } }),
              },
            ],
          },
        })
        .then((response) => {
          developerInfo.current = {
            ...developerInfo.current,
            ...(initialTitle !== title && { title: { [userState.user.userLanguage]: title } }),
            ...(initialName !== name && { name: { [userState.user.userLanguage]: name } }),
            ...(initialIntro !== intro && { oneLiner: { [userState.user.userLanguage]: intro } }),
          };
          setInitialName(name);
          setInitialTitle(title);
          setInitialIntro(intro);
          setInitialWebsite(website);
          setSaved(true);
          setLoading(false);
        })
        .catch((error) => {
          console.log("CHANGE IMAGE ERROR: ", error);
          setLoading(false);
        });
    };

    useEffect(() => {
      if (name) {
        if ((initialName !== name || initialTitle !== title || initialIntro !== intro) && intro.length <= maxLength) {
          setSaved(false);
          setLoading(false);
          setReady(true);
        } else {
          setReady(false);
        }
      }
      return () => {
        setReady(false);
        setLoading(false);
      };
    }, [name, title, intro, initialName, initialTitle, initialIntro]);

    return (
      <div className="relative w-full">
        <div className="p-4 px-6 w-full overflow-y-auto pb-16" style={{ height: "calc(100vh - 11.5rem)" }}>
          <p className="mb-4 text-gray-700">Update basic information about your company</p>
          <div className="text-sm text-gray-500 mb-2 ">
            Compnay Logo <div className="text-xs text-green-700 inline"> - 320px * 320px Recommended</div>
          </div>

          <div className="flex items-end mb-6 relative space-x-2">
            <UploadProfile width={"9rem"} height={"9rem"} developerInfo={developerInfo} borderRadius={"0.2rem"} />
          </div>

          <div className="text-sm text-gray-500 mb-2">Company name*</div>
          <input
            className="w-1/2 h-9 rounded border border-gray-300 mb-4 p-2 outline-green-700"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <div className="text-sm text-gray-500 mb-2">Website</div>
          <input
            placeholder="e.g. https://www.kookjein.com"
            className="w-1/2 h-9 rounded border border-gray-300 mb-4 p-2 outline-green-700"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
          />

          <div className="text-sm text-gray-500 mb-2">Industry</div>
          <input
            placeholder="e.g. Internet Software & Services"
            className="w-1/2 h-9 rounded border border-gray-300 mb-4 p-2 outline-green-700"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <div className="text-sm text-gray-500 mb-2 flex justify-between items-center">
            <p>Introduction</p>
            <p className={`${intro.length > maxLength && " text-red-500"} text-xs`}>
              {intro.length} / {maxLength}
            </p>
          </div>
          <textarea
            style={{ resize: "none" }}
            className={`${
              intro.length > maxLength ? "outline-red-500" : "outline-green-700"
            } w-full h-56 rounded border border-gray-300 mb-4 p-2 outline-green-700`}
            value={intro}
            onChange={(e) => setIntro(e.target.value)}
          />
        </div>
        <SaveComponent isReady={isReady} isSaved={isSaved} onPress={saveBasic} isLoading={isLoading} />
      </div>
    );
  };

  const SkillsetPanel = () => {
    const [initialLang, setInitialLang] = useState(developerInfo?.current.lang || []);
    const [lang] = useState(initialLang);
    const [isReady, setReady] = useState(false);
    const [isSaved, setSaved] = useState(false);
    const [isLoading, setLoading] = useState(false);

    const saveSkills = () => {
      setLoading(true);
      axios
        .post(`/v1/user/me`, {
          user: {
            user_profile: [{ ...(initialLang !== lang && { lang: lang }) }],
          },
        })
        .then((response) => {
          developerInfo.current = {
            ...developerInfo.current,
            ...(initialLang !== lang && { lang: lang }),
          };
          setInitialLang(lang);
          setSaved(true);
          setLoading(false);
        })
        .catch((error) => {
          console.log("CHANGE IMAGE ERROR: ", error);
          setLoading(false);
        });
    };

    useEffect(() => {
      if (initialLang !== lang) {
        setSaved(false);
        setLoading(false);
        setReady(true);
      } else {
        setReady(false);
      }
      return () => {
        setReady(false);
        setLoading(false);
      };
    }, [lang, initialLang]);

    return (
      <div className="relative w-full">
        <div className="p-4 px-6 w-full overflow-y-auto pb-24" style={{ height: "calc(100vh - 11.5rem)" }}>
          <p className="mb-4 text-gray-700">Detailed information about your company</p>
          <div className="text-sm text-gray-500 mb-2">Company type</div>
          <input
            placeholder="e.g. Start-up, SME"
            className="w-3/4 h-9 rounded border border-gray-300 mb-4 p-2 outline-green-700"
          />
          <div className="text-sm text-gray-500 mb-2">CEO</div>
          <input className="w-3/4 h-9 rounded border border-gray-300 mb-4 p-2 outline-green-700" />
          <div className="text-sm text-gray-500 mb-2">Initial Funding</div>
          <input className="w-3/4 h-9 rounded border border-gray-300 mb-4 p-2 outline-green-700" />
          <div className="text-sm text-gray-500 mb-2">Number of employees</div>
          <input className="w-3/4 h-9 rounded border border-gray-300 mb-4 p-2 outline-green-700" />
          <div className="text-sm text-gray-500 mb-2">Founding date</div>
          <input className="w-3/4 h-9 rounded border border-gray-300 mb-4 p-2 outline-green-700" />
          <div className="text-sm text-gray-500 mb-2">Revenue</div>
          <input className="w-3/4 h-9 rounded border border-gray-300 mb-4 p-2 outline-green-700" />
          <div className="text-sm text-gray-500 mb-2">Main service</div>
          <input className="w-3/4 h-9 rounded border border-gray-300 mb-4 p-2 outline-green-700" />
          <div className="text-sm text-gray-500 mb-2">Address</div>
          <input className="w-3/4 h-9 rounded border border-gray-300 mb-4 p-2 outline-green-700" />
        </div>
        <SaveComponent isReady={isReady} isSaved={isSaved} onPress={saveSkills} isLoading={isLoading} />
      </div>
    );
  };

  return (
    <div style={{ width: "900px", height: "calc(100vh - 8rem)" }} className="">
      <div className="h-14 w-full border-b flex-shrink-0 flex items-center justify-between text-lg px-6">
        <p>Edit Company Information</p>
        <div className="flex items-center space-x-6">
          <button onClick={closeModal} className="py-2">
            <RxCross2 className="w-7 h-7" />
          </button>
        </div>
      </div>
      <div style={{ height: "calc(100vh - 11.5rem)" }} className="flex overflow-y-auto">
        <LeftPanel />
        {selectedTab === "Basic" ? <BasicPanel /> : selectedTab === "Detail" && <SkillsetPanel />}
      </div>
    </div>
  );
};

export default CompanyEditProfileModal;
