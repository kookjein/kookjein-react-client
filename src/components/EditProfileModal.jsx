import React, { useContext, useEffect, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import UploadProfile from "./UploadProfile";
import { AuthContext } from "../utils/authContext";
import axios from "../utils/authAxios";
import { WithContext as ReactTags } from "react-tag-input";

const EditProfileModal = ({ initialTab = "Basic", closeModal, developerInfo }) => {
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
        {isSaved ? "Saved!" : isLoading ? "Saving..." : isReady ? "Make sure to save your changes." : ""}
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

  const BasicPanel = () => {
    const [initialName, setInitialName] = useState(developerInfo?.current.name?.[userState.user.userLanguage] || "");
    const [initialTitle, setInitialTitle] = useState(developerInfo?.current.title?.[userState.user.userLanguage] || "");
    const [initialIntro, setInitialIntro] = useState(
      developerInfo?.current.oneLiner?.[userState.user.userLanguage] || ""
    );
    const [name, setName] = useState(initialName);
    const [title, setTitle] = useState(initialTitle);
    const [intro, setIntro] = useState(initialIntro);
    const [isReady, setReady] = useState(false);
    const [isSaved, setSaved] = useState(false);
    const [isLoading, setLoading] = useState(false);

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
          setInitialName(name);
          setInitialTitle(title);
          setInitialIntro(intro);
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
        if (initialName !== name || initialTitle !== title || initialIntro !== intro) {
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
        <div className="p-4 px-6 w-full overflow-y-auto pb-12" style={{ height: "calc(100vh - 11.5rem)" }}>
          <p className="mb-4 text-gray-700">Update basic information to increase Page Discovery</p>
          <div className="text-sm text-gray-500 mb-2 ">
            Profile image <div className="text-xs text-green-700 inline"> - 320px * 320px Recommended</div>
          </div>

          <div className="flex items-end mb-6 relative space-x-2">
            <UploadProfile width={"9rem"} height={"9rem"} developerInfo={developerInfo} borderRadius={"0.2rem"} />
          </div>

          <div className="text-sm text-gray-500 mb-2">Full name*</div>
          <input
            className="w-1/2 h-9 rounded border border-gray-300 mb-4 p-2 outline-green-700"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <div className="text-sm text-gray-500 mb-2">Title*</div>
          <input
            placeholder="e.g. Frontend Developer"
            className="w-1/2 h-9 rounded border border-gray-300 mb-4 p-2 outline-green-700"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <div className="text-sm text-gray-500 mb-2 flex justify-between items-center">
            <p>One-liner introduction</p>
            <p className="text-xs">0 / 100</p>
          </div>
          <textarea
            style={{ resize: "none" }}
            className="w-full h-20 rounded border border-gray-300 mb-4 p-2 outline-green-700"
            value={intro}
            onChange={(e) => setIntro(e.target.value)}
          />
        </div>
        <SaveComponent isReady={isReady} isSaved={isSaved} onPress={saveBasic} isLoading={isLoading} />
      </div>
    );
  };

  const SkillsetPanel = () => {
    const [initialTech, setInitialTech] = useState(developerInfo?.current.tech || []);
    const [initialLang, setInitialLang] = useState(developerInfo?.current.lang || []);
    const [initialYOS, setInitialYOS] = useState(developerInfo?.current.yos || 0);
    const [tech, setTech] = useState(initialTech);
    const [lang, setLang] = useState(initialLang);
    const [YOS, setYOS] = useState(initialYOS);
    const [isReady, setReady] = useState(false);
    const [isSaved, setSaved] = useState(false);
    const [isLoading, setLoading] = useState(false);

    const KeyCodes = {
      comma: 188,
      enter: 13,
    };

    const delimiters = [KeyCodes.comma, KeyCodes.enter];

    const saveSkills = () => {
      setLoading(true);

      for (let i = 0; i < lang.length; i++) {
        if (userState.user.userLanguage === "ko") {
          if (lang[i]["en"] !== undefined) {
            delete lang[i].en;
          }
        } else {
          if (lang[i]["ko"] !== undefined) {
            delete lang[i].ko;
          }
        }
      }
      console.log(lang);
      axios
        .post(`/v1/user/me`, {
          user: {
            user_profile: [
              {
                ...(initialTech !== tech && { tech: tech }),
                ...(initialLang !== lang && { lang: lang }),
                ...(initialYOS !== YOS && { yos: YOS }),
              },
            ],
          },
        })
        .then((response) => {
          setInitialTech(tech);
          setInitialLang(lang);
          setInitialYOS(YOS);
          setSaved(true);
          setLoading(false);
        })
        .catch((error) => {
          console.log("CHANGE IMAGE ERROR: ", error);
          setLoading(false);
        });
    };

    useEffect(() => {
      if (initialTech !== tech || initialLang !== lang || initialYOS !== YOS) {
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
    }, [tech, lang, YOS, initialTech, initialLang, initialYOS]);

    const handleDeleteTECH = (i) => {
      setTech(tech.filter((tag, index) => index !== i));
    };

    const handleAdditionTECH = (tag) => {
      tag[userState.user.userLanguage] = tag.text;
      setTech([...tech, tag]);
    };

    const handleDragTECH = (tag, currPos, newPos) => {
      const newTags = tech.slice();

      newTags.splice(currPos, 1);
      newTags.splice(newPos, 0, tag);

      // re-render
      setTech(newTags);
    };

    const handleTagClickTECH = (index) => {
      console.log("The tag at index " + index + " was clicked");
    };

    const handleDeleteLANG = (i) => {
      setLang(lang.filter((tag, index) => index !== i));
    };

    const handleAdditionLANG = (tag) => {
      tag[userState.user.userLanguage] = tag.text;
      setLang([...lang, tag]);
      console.log(lang);
    };

    const handleDragLANG = (tag, currPos, newPos) => {
      const newTags = lang.slice();

      newTags.splice(currPos, 1);
      newTags.splice(newPos, 0, tag);

      // re-render
      setLang(newTags);
    };

    const handleTagClickLANG = (index) => {
      console.log("The tag at index " + index + " was clicked");
    };

    return (
      <div className="relative w-full">
        <div className="p-4 px-6 w-full overflow-y-auto pb-12" style={{ height: "calc(100vh - 11.5rem)" }}>
          <p className="mb-4 text-gray-700">Tell us your skills to appeal to companies</p>
          <div className="text-sm text-gray-500 mb-2">Tech stack</div>
          <ReactTags
            tags={tech}
            delimiters={delimiters}
            handleDelete={handleDeleteTECH}
            handleAddition={handleAdditionTECH}
            handleDrag={handleDragTECH}
            handleTagClick={handleTagClickTECH}
            inputFieldPosition="top"
            autocomplete
            placeholder="e.g. React Native, PostreSQL"
            classNames={{
              tags: "mb-5",
              tagInput: "",
              tagInputField: "w-full h-9 rounded border border-gray-300 mb-4 p-2 outline-green-700",
              selected: "selectedClass",
              tag: "px-3 py-2 bg-gray-200 rounded border mr-1 mb-3 text-sm",
              remove: "ml-2",
              suggestions: "suggestionsClass",
              activeSuggestion: "activeSuggestionClass",
              editTagInput: "editTagInputClass",
              editTagInputField: "editTagInputField",
              clearAll: "clearAllClass",
            }}
          />
          <div className="text-sm text-gray-500 mb-2">
            Spoken language <div className="text-xs text-green-700 inline"> - Press Enter to add the tag</div>
          </div>
          <ReactTags
            tags={lang}
            delimiters={delimiters}
            handleDelete={handleDeleteLANG}
            handleAddition={handleAdditionLANG}
            handleDrag={handleDragLANG}
            handleTagClick={handleTagClickLANG}
            inputFieldPosition="top"
            autocomplete
            placeholder="e.g. English, Arabic"
            classNames={{
              tags: "mb-5",
              tagInput: "",
              tagInputField: "w-full h-9 rounded border border-gray-300 mb-4 p-2 outline-green-700",
              selected: "selectedClass",
              tag: "px-3 py-2 bg-gray-200 rounded border mr-1 mb-3 text-sm",
              remove: "ml-2",
              suggestions: "suggestionsClass",
              activeSuggestion: "activeSuggestionClass",
              editTagInput: "editTagInputClass",
              editTagInputField: "editTagInputField",
              clearAll: "clearAllClass",
            }}
          />
          <div className="text-sm text-gray-500 mb-2">Year of Service (Need verification)</div>
          <div className="flex item-center space-x-2 mb-4">
            <input
              placeholder="e.g. 2"
              className="w-24 h-9 rounded border border-gray-300 p-2"
              value={YOS}
              onChange={(e) => setYOS(e.target.value)}
              type={"number"}
            />
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
            Your monthly wage rises as you gain experience on Kookjein.
          </div>
        </div>
        <SaveComponent isReady={isReady} isSaved={isSaved} onPress={saveSkills} isLoading={isLoading} />
      </div>
    );
  };

  const IntoductionPanel = () => (
    <div className="relative w-full">
      <div className="p-4 px-6 w-full overflow-y-auto pb-12" style={{ height: "calc(100vh - 11.5rem)" }}>
        <p className="mb-4 text-gray-700">Provide a detailed introduction about yourself</p>
        <div className="text-sm text-gray-500 mb-2 flex justify-between items-center">
          <p>Introduction</p>
          <p className="text-xs">0 / 1000</p>
        </div>
        <textarea style={{ resize: "none" }} className="w-full h-32 rounded border border-gray-300 mb-4 p-2" />
      </div>
      <SaveComponent />
    </div>
  );

  const ExperiencePanel = () => {
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
          <p className="mb-4 text-gray-700">Tell us your work experience outside of Kookjein</p>

          {experienceArray?.map((data, index) => (
            <NewCell key={index} order={index} />
          ))}
          <AddNewButton />
        </div>
        <SaveComponent />
      </div>
    );
  };

  const PortfolioPanel = () => {
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
          <p className="mb-4 text-gray-700">Tell us your work experience outside of Kookjein</p>

          {experienceArray?.map((data, index) => (
            <NewCell key={index} order={index} />
          ))}
          <AddNewButton />
        </div>
        <SaveComponent />
      </div>
    );
  };

  const EducationPanel = () => {
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
          <p className="mb-4 text-gray-700">Tell us your work experience outside of Kookjein</p>

          {experienceArray?.map((data, index) => (
            <NewCell key={index} order={index} />
          ))}
          <AddNewButton />
        </div>
        <SaveComponent />
      </div>
    );
  };

  const CertificationsPanel = () => {
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
          <p className="mb-4 text-gray-700">Tell us your work experience outside of Kookjein</p>

          {experienceArray?.map((data, index) => (
            <NewCell key={index} order={index} />
          ))}
          <AddNewButton />
        </div>
        <SaveComponent />
      </div>
    );
  };
  return (
    <div style={{ width: "900px", height: "calc(100vh - 8rem)" }} className="">
      <div className="h-14 w-full border-b flex-shrink-0 flex items-center justify-between text-lg px-6">
        <p>Edit Profile</p>
        <div className="flex items-center space-x-6">
          <button onClick={closeModal} className="py-2">
            <RxCross2 className="w-7 h-7" />
          </button>
        </div>
      </div>
      <div style={{ height: "calc(100vh - 11.5rem)" }} className="flex overflow-y-auto">
        <LeftPanel />
        {selectedTab === "Basic" ? (
          <BasicPanel />
        ) : selectedTab === "Skill sets" ? (
          <SkillsetPanel />
        ) : selectedTab === "Introduction" ? (
          <IntoductionPanel />
        ) : selectedTab === "Experience" ? (
          <ExperiencePanel />
        ) : selectedTab === "Portfolio" ? (
          <PortfolioPanel />
        ) : selectedTab === "Education" ? (
          <EducationPanel />
        ) : (
          <CertificationsPanel />
        )}
      </div>
    </div>
  );
};

export default EditProfileModal;
