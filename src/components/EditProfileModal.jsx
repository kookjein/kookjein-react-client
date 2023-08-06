import React, { useContext, useEffect, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import UploadProfile from "./UploadProfile";
import { AuthContext } from "../context/authContext";
import axios from "../utils/authAxios";
import { WithContext as ReactTags } from "react-tag-input";
import { languageArray } from "../utils/arrays";
import { MdDelete } from "react-icons/md";
import moment from "moment";

const EditProfileModal = ({ initialTab = "Basic", closeModal, developerInfo }) => {
  const { userState } = useContext(AuthContext);
  const [selectedTab, setSelectedTab] = useState(initialTab);

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
    const [initialGithub, setInitialGithub] = useState(developerInfo?.current?.github || "");
    const [name, setName] = useState(initialName);
    const [title, setTitle] = useState(initialTitle);
    const [intro, setIntro] = useState(initialIntro);
    const [github, setGithub] = useState(initialGithub);
    const [isReady, setReady] = useState(false);
    const [isSaved, setSaved] = useState(false);
    const [isLoading, setLoading] = useState(false);
    const maxLength = 200;

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
                ...(initialGithub !== github && { github: github }),
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
            ...(initialGithub !== github && { github: github }),
          };
          setInitialName(name);
          setInitialTitle(title);
          setInitialIntro(intro);
          setInitialGithub(github);
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
        if (
          (initialName !== name || initialTitle !== title || initialIntro !== intro || initialGithub !== github) &&
          intro.length <= maxLength
        ) {
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
    }, [name, title, intro, github, initialName, initialTitle, initialIntro, initialGithub]);

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
          <div className="text-sm text-gray-500 mb-2">Title / Position</div>
          <input
            placeholder="e.g. Frontend Developer"
            className="w-1/2 h-9 rounded border border-gray-300 mb-4 p-2 outline-green-700"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <div className="text-sm text-gray-500 mb-2">Github link</div>
          <input
            placeholder="e.g. https://github.com/username"
            className="w-1/2 h-9 rounded border border-gray-300 mb-4 p-2 outline-green-700"
            value={github}
            onChange={(e) => setGithub(e.target.value)}
          />

          <div className="text-sm text-gray-500 mb-2 flex justify-between items-center">
            <p>One-liner introduction</p>
            <p className={`${intro.length > maxLength && " text-red-500"} text-xs`}>
              {intro.length} / {maxLength}
            </p>
          </div>
          <textarea
            style={{ resize: "none" }}
            className={`${
              intro.length > maxLength ? "outline-red-500" : "outline-green-700"
            } w-full h-28 rounded border border-gray-300 mb-4 p-2 outline-green-700`}
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
          developerInfo.current = {
            ...developerInfo.current,
            ...(initialTech !== tech && { tech: tech }),
            ...(initialLang !== lang && { lang: lang }),
            ...(initialYOS !== YOS && { yos: YOS }),
          };
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

    const handleAdditionLANG = (type) => {
      if (lang.includes(type)) {
        setLang(lang.filter((item) => item !== type));
      } else {
        setLang([...lang, type]);
      }
    };

    const LanguageSelection = ({ type, text }) => {
      return (
        <button
          onClick={() => handleAdditionLANG(type)}
          className={`${
            lang.includes(type) ? "bg-green-700 text-white" : "bg-gray-100 text-gray-700"
          } px-4 h-8  border border-gray-300 flex items-center justify-center rounded-full text-sm`}
        >
          {text}
        </button>
      );
    };

    return (
      <div className="relative w-full">
        <div className="p-4 px-6 w-full overflow-y-auto pb-12" style={{ height: "calc(100vh - 11.5rem)" }}>
          <p className="mb-4 text-gray-700">Tell us your skills to appeal to companies</p>
          <div className="text-sm text-gray-500 mb-2">
            Tech stack <div className="text-xs text-green-700 inline"> - Press Enter to add it to the list</div>
          </div>
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
              tags: "mb-8",
              tagInput: "h-12",
              tagInputField: "w-full h-9 rounded border border-gray-300 mb-4 p-2 outline-green-700",
              selected: "flex flex-wrap gap-1",
              tag: "px-3 py-1 bg-gray-200 rounded border text-sm flex-shrink-0",
              remove: "ml-2",
              suggestions: "",
              activeSuggestion: "",
              editTagInput: "",
              editTagInputField: "",
              clearAll: "",
            }}
          />
          <div className="text-sm text-gray-500 mb-2">
            Spoken language <div className="text-xs text-green-700 inline"> - Select all that applies</div>
          </div>
          <div className="flex flex-wrap mb-8 gap-2 pt-2">
            {languageArray.map((item) => (
              <LanguageSelection key={item.type} type={item.type} text={item[userState.user.userLanguage]} />
            ))}
          </div>

          <div className="text-sm text-gray-500 mb-2">Year of Service (Need verification)</div>
          <div className="flex item-center space-x-2 mb-8">
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
              value={(180 * 10000).toLocaleString("en-US", {
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

  const IntoductionPanel = () => {
    const [initialIntroduction, setInitialIntroduction] = useState(
      developerInfo?.current.intro?.[userState.user.userLanguage] || ""
    );
    const [intro, setIntro] = useState(initialIntroduction);
    const [isReady, setReady] = useState(false);
    const [isSaved, setSaved] = useState(false);
    const [isLoading, setLoading] = useState(false);
    const maxLength = 1000;

    const saveIntro = () => {
      setLoading(true);
      axios
        .post(`/v1/user/me`, {
          user: {
            user_profile: [
              {
                ...(initialIntroduction !== intro && { intro: { [userState.user.userLanguage]: intro } }),
              },
            ],
          },
        })
        .then((response) => {
          developerInfo.current = {
            ...developerInfo.current,
            ...(initialIntroduction !== intro && { intro: { [userState.user.userLanguage]: intro } }),
          };
          setInitialIntroduction(intro);
          setSaved(true);
          setLoading(false);
        })
        .catch((error) => {
          console.log("CHANGE IMAGE ERROR: ", error);
          setLoading(false);
        });
    };

    useEffect(() => {
      if (intro !== initialIntroduction && intro.length <= maxLength) {
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
    }, [intro, initialIntroduction]);

    return (
      <div className="relative w-full">
        <div className="p-4 px-6 w-full overflow-y-auto pb-12" style={{ height: "calc(100vh - 11.5rem)" }}>
          <p className="mb-4 text-gray-700">Provide a detailed introduction about yourself</p>
          <div className="text-sm text-gray-500 mb-2 flex justify-between items-center">
            <p>Introduction</p>
            <p className={`${intro.length > maxLength && " text-red-500"} text-xs`}>
              {intro.length} / {maxLength}
            </p>
          </div>
          <textarea
            style={{ resize: "none" }}
            value={intro}
            onChange={(e) => setIntro(e.target.value)}
            className={`${
              intro.length > maxLength ? "outline-red-500" : "outline-green-700"
            } w-full h-48 rounded border border-gray-300 mb-4 p-2`}
          />
        </div>
        <SaveComponent isReady={isReady} isSaved={isSaved} onPress={saveIntro} isLoading={isLoading} />
      </div>
    );
  };

  const ExperiencePanel = () => {
    const [initialExperience, setInitialExperience] = useState(developerInfo?.current.experience || []);
    const [experience, setExperience] = useState(initialExperience || [{ title: "", position: "", description: "" }]);
    const [isReady, setReady] = useState(false);
    const [isSaved, setSaved] = useState(false);
    const [isLoading, setLoading] = useState(false);

    const saveExperience = () => {
      setLoading(true);

      for (let i = 0; i < experience.length; i++) {
        if (userState.user.userLanguage === "ko") {
          delete experience[i].desc.en;
          delete experience[i].title.en;
        } else {
          delete experience[i].desc.ko;
          delete experience[i].title.ko;
        }
      }
      axios
        .post(`/v1/user/me`, {
          user: {
            user_profile: [
              {
                ...(initialExperience !== experience && { experience: experience }),
              },
            ],
          },
        })
        .then((response) => {
          developerInfo.current = {
            ...developerInfo.current,
            ...(initialExperience !== experience && { experience: experience }),
          };
          setInitialExperience(experience);
          setSaved(true);
          setLoading(false);
        })
        .catch((error) => {
          console.log("EXPERIENCE UPDATE ERROR: ", error);
          setLoading(false);
        });
    };

    useEffect(() => {
      if (experience !== initialExperience) {
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
    }, [experience, initialExperience]);

    const CompanyCell = ({ title, company, from, to, desc }) => {
      const yos = moment.duration(to - from).years();
      const deleteExperience = () => {
        setExperience(
          experience.filter(
            (item) => `${item.company} ${item.title[userState.user.userLanguage]}` !== `${company} ${title}`
          )
        );
      };
      return (
        <div className="border p-3 mb-4 bg-gray-100 rounded">
          <div className="flex justify-end w-full">
            <button onClick={deleteExperience}>
              <MdDelete className="right-4 top-4 w-5 h-5 text-gray-500 hover:text-red-500" />
            </button>
          </div>
          <div className="w-full py-1 flex items-center space-x-2">
            <div className="space-y-1">
              <p className="text-sm font-bold text-gray-600">{`${company} | ${title}`}</p>
              <p className="text-xs text-gray-500">
                {yos < 1 ? "< 1" : yos + 1} year{yos > 1 && "s"} · {moment(from).format("YYYY.MM")} ~{" "}
                {moment(to).format("YYYY.MM")}
              </p>
            </div>
          </div>
          <div className="my-4">
            <p className="text-sm break-keep">{desc}</p>
          </div>
        </div>
      );
    };

    const NewCell = () => {
      const [startValue, setStartValue] = useState(new Date().toISOString().split("T")[0]);
      const [endValue, setEndValue] = useState(new Date().toISOString().split("T")[0]);
      const [companyName, setCompanyName] = useState("");
      const [position, setPosition] = useState("");
      const [description, setDescription] = useState("");
      const [isReady, setReady] = useState(false);
      const maxLength = 1000;

      const addPressed = () => {
        setExperience([
          ...experience,
          {
            company: companyName,
            title: { [userState.user.userLanguage]: position },
            from: new Date(startValue).getTime(),
            to: new Date(endValue).getTime(),
            desc: { [userState.user.userLanguage]: description },
          },
        ]);
      };

      useEffect(() => {
        if (!companyName || !position || !description || description.length > maxLength) {
          setReady(false);
        } else {
          setReady(true);
        }

        return () => {};
      }, [companyName, position, description]);

      return (
        <div className="w-full py-6 border-t mb-6 px-3">
          <div className="flex w-full space-x-4 pr-12">
            <div className="w-full">
              <div className="text-sm text-gray-500 mb-2">Company name</div>
              <input
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                className="w-full h-9 rounded border border-gray-300 mb-4 p-2 outline-green-700"
              />
            </div>
            <div className="w-full">
              <div className="text-sm text-gray-500 mb-2">Position / Title</div>
              <input
                value={position}
                onChange={(e) => setPosition(e.target.value)}
                className="w-full h-9 rounded border border-gray-300 mb-4 p-2 outline-green-700"
              />
            </div>
          </div>

          <div className="flex space-x-4">
            <div>
              <div className="text-sm text-gray-500 mb-2">From</div>
              <div className="mb-6">
                <input
                  className="w-48 h-9 rounded border border-gray-300 outline-green-600 p-3"
                  type="date"
                  value={startValue}
                  max={new Date().toISOString().split("T")[0]}
                  onChange={(e) => setStartValue(e.target.value)}
                />
              </div>
            </div>
            <div>
              <div className="text-sm text-gray-500 mb-2">To</div>
              <div className="mb-6">
                <input
                  className="w-48 h-9 rounded border border-gray-300 outline-green-600 p-3"
                  type="date"
                  value={endValue}
                  min={startValue}
                  max={new Date().toISOString().split("T")[0]}
                  onChange={(e) => setEndValue(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div
            className={`${
              description.length > maxLength ? "text-red-500" : "text-gray-500"
            } text-sm mb-2 flex justify-between items-center`}
          >
            <p>Description</p>
            <p className="text-xs">
              {description.length} / {maxLength}
            </p>
          </div>
          <textarea
            style={{ resize: "none" }}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className={`${
              description.length > maxLength ? "outline-red-500" : "outline-green-700"
            } w-full h-32 rounded border border-gray-300 mb-4 p-2 `}
          />

          <button
            onClick={() => addPressed()}
            disabled={!isReady}
            className={`${
              isReady ? "bg-green-700 text-white filter hover:brightness-125" : "bg-gray-300 text-white"
            } py-3 my-6 w-full border-t border-b flex items-center justify-center rounded-lg text-sm`}
          >
            Add a new experience
          </button>
        </div>
      );
    };

    return (
      <div className="relative w-full">
        <div className="p-4 px-6 w-full overflow-y-auto pb-12" style={{ height: "calc(100vh - 11.5rem)" }}>
          <p className="mb-4 text-gray-700">Tell us your work experience outside of Kookjein</p>

          {experience?.map((item, index) => (
            <CompanyCell
              key={index}
              from={item.from}
              to={item.to}
              company={item.company}
              title={item.title?.[userState.user.userLanguage]}
              desc={item.desc?.[userState.user.userLanguage]}
            />
          ))}
          <NewCell />
        </div>
        <SaveComponent isReady={isReady} isSaved={isSaved} onPress={saveExperience} isLoading={isLoading} />
      </div>
    );
  };

  const PortfolioPanel = () => {
    const [initialPortfolio, setInitialPortfolio] = useState(developerInfo?.current.projects || []);
    const [portfolio, setPortfolio] = useState(initialPortfolio || [{ name: "", link: "", desc: "" }]);
    const [isReady, setReady] = useState(false);
    const [isSaved, setSaved] = useState(false);
    const [isLoading, setLoading] = useState(false);
    const maxLength = 1000;

    const savePortfolio = () => {
      setLoading(true);
      for (let i = 0; i < portfolio.length; i++) {
        if (userState.user.userLanguage === "ko") {
          delete portfolio[i].desc.en;
        } else {
          delete portfolio[i].desc.ko;
        }
      }
      axios
        .post(`/v1/user/me`, {
          user: {
            user_profile: [
              {
                ...(initialPortfolio !== portfolio && { projects: portfolio }),
              },
            ],
          },
        })
        .then((response) => {
          developerInfo.current = {
            ...developerInfo.current,
            ...(initialPortfolio !== portfolio && { projects: portfolio }),
          };
          setInitialPortfolio(portfolio);
          setSaved(true);
          setLoading(false);
        })
        .catch((error) => {
          console.log("PORTFOLIO UPDATE ERROR: ", error);
          setLoading(false);
        });
    };

    useEffect(() => {
      if (portfolio !== initialPortfolio) {
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
    }, [portfolio, initialPortfolio]);

    const PortfolioCell = ({ name, link, desc }) => {
      const deleteExperience = () => {
        setPortfolio(
          portfolio.filter(
            (item) =>
              `${item.name} ${item.link} ${item.desc[userState.user.userLanguage]}` !== `${name} ${link} ${desc}`
          )
        );
      };
      return (
        <div className="border p-3 mb-4 bg-gray-100 rounded">
          <div className="flex justify-end w-full">
            <button onClick={deleteExperience}>
              <MdDelete className="right-4 top-4 w-5 h-5 text-gray-500 hover:text-red-500" />
            </button>
          </div>
          <div className="w-full py-1 flex items-center space-x-2">
            <div className="space-y-1">
              <p className="text-sm font-bold text-gray-600">{name}</p>
              <p className="text-xs text-blue-600">{link}</p>
            </div>
          </div>
          <div className="my-4">
            <p className="text-sm break-keep">{desc}</p>
          </div>
        </div>
      );
    };

    const NewCell = ({ order }) => {
      const [name, setName] = useState("");
      const [link, setLink] = useState("");
      const [description, setDescription] = useState("");
      const [isReady, setReady] = useState(false);

      const addPressed = () => {
        setPortfolio([
          ...portfolio,
          {
            name: name,
            link: link,
            desc: { [userState.user.userLanguage]: description },
          },
        ]);
      };

      useEffect(() => {
        if (!name || !link || !description || description.length > maxLength) {
          setReady(false);
        } else {
          setReady(true);
        }

        return () => {};
      }, [name, link, description]);

      return (
        <div className="w-full py-6 border-t mb-6 p-3">
          <div className="text-sm text-gray-500 mb-2">Project name</div>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-1/2 h-9 rounded border border-gray-300 mb-4 p-2 outline-green-700"
          />
          <div className="text-sm text-gray-500 mb-2">Link to project</div>
          <input
            value={link}
            onChange={(e) => setLink(e.target.value)}
            className="w-1/2 h-9 rounded border border-gray-300 mb-4 p-2 outline-green-700"
          />
          <div
            className={`${
              description.length > maxLength ? "text-red-500" : "text-gray-500"
            } text-sm mb-2 flex justify-between items-center`}
          >
            <p>Description</p>
            <p className="text-xs">
              {description.length} / {maxLength}
            </p>
          </div>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            style={{ resize: "none" }}
            className={`${
              description.length > maxLength ? "outline-red-500" : "outline-green-700"
            } w-full h-32 rounded border border-gray-300 mb-4 p-2`}
          />

          <button
            onClick={() => addPressed()}
            disabled={!isReady}
            className={`${
              isReady ? "bg-green-700 text-white filter hover:brightness-125" : "bg-gray-300 text-white"
            } py-3 my-6 w-full border-t border-b flex items-center justify-center rounded-lg text-sm`}
          >
            Add a new project
          </button>
        </div>
      );
    };

    return (
      <div className="relative w-full">
        <div className="p-4 px-6 w-full overflow-y-auto pb-12" style={{ height: "calc(100vh - 11.5rem)" }}>
          <p className="mb-4 text-gray-700">Showcase your past projects to prove your skills</p>
          {portfolio?.map((item, index) => (
            <PortfolioCell
              key={index}
              name={item.name}
              link={item.link}
              desc={item.desc?.[userState.user.userLanguage]}
            />
          ))}
          <NewCell />
        </div>
        <SaveComponent isReady={isReady} isSaved={isSaved} onPress={savePortfolio} isLoading={isLoading} />
      </div>
    );
  };

  const EducationPanel = () => {
    const [initialEducation, setInitialEducation] = useState(developerInfo?.current.education || []);
    const [education, setEducation] = useState(
      initialEducation || [{ name: "", title: "", from: "", to: "", desc: "" }]
    );
    const [isReady, setReady] = useState(false);
    const [isSaved, setSaved] = useState(false);
    const [isLoading, setLoading] = useState(false);

    const saveEducation = () => {
      setLoading(true);

      for (let i = 0; i < education.length; i++) {
        if (userState.user.userLanguage === "ko") {
          delete education[i].desc.en;
          delete education[i].title.en;
        } else {
          delete education[i].desc.ko;
          delete education[i].title.ko;
        }
      }
      axios
        .post(`/v1/user/me`, {
          user: {
            user_profile: [
              {
                ...(initialEducation !== education && { education: education }),
              },
            ],
          },
        })
        .then((response) => {
          developerInfo.current = {
            ...developerInfo.current,
            ...(initialEducation !== education && { education: education }),
          };
          setInitialEducation(education);
          setSaved(true);
          setLoading(false);
        })
        .catch((error) => {
          console.log("EXPERIENCE UPDATE ERROR: ", error);
          setLoading(false);
        });
    };

    useEffect(() => {
      if (education !== initialEducation) {
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
    }, [education, initialEducation]);

    const EducationCell = ({ name, title, from, to, desc }) => {
      const yos = moment.duration(to - from).years();
      const deleteEducation = () => {
        setEducation(
          education.filter((item) => `${item.name} ${item.title[userState.user.userLanguage]}` !== `${name} ${title}`)
        );
      };
      return (
        <div className="border p-3 mb-4 bg-gray-100 rounded">
          <div className="flex justify-end w-full">
            <button onClick={deleteEducation}>
              <MdDelete className="right-4 top-4 w-5 h-5 text-gray-500 hover:text-red-500" />
            </button>
          </div>
          <div className="w-full py-1 flex items-center space-x-2">
            <div className="space-y-1">
              <p className="text-sm font-bold text-gray-600">{`${name} | ${title}`}</p>
              <p className="text-xs text-gray-500">
                {yos < 1 ? "< 1" : yos + 1} year{yos > 1 && "s"} · {moment(from).format("YYYY.MM")} ~{" "}
                {moment(to).format("YYYY.MM")}
              </p>
            </div>
          </div>
          <div className="my-4">
            <p className="text-sm break-keep">{desc}</p>
          </div>
        </div>
      );
    };

    const NewCell = () => {
      const [name, setName] = useState("");
      const [title, setTitle] = useState("");
      const [startValue, setStartValue] = useState(new Date().toISOString().split("T")[0]);
      const [endValue, setEndValue] = useState(new Date().toISOString().split("T")[0]);
      const [description, setDescription] = useState("");
      const [isReady, setReady] = useState(false);
      const maxLength = 1000;

      const addPressed = () => {
        setEducation([
          ...education,
          {
            name: name,
            title: { [userState.user.userLanguage]: title },
            from: new Date(startValue).getTime(),
            to: new Date(endValue).getTime(),
            desc: { [userState.user.userLanguage]: description },
          },
        ]);
      };

      useEffect(() => {
        if (!name || !title || !description || description.length > maxLength) {
          setReady(false);
        } else {
          setReady(true);
        }

        return () => {};
      }, [name, title, description]);

      return (
        <div className="w-full py-6 border-t mb-6 px-3">
          <div className="flex w-full space-x-4 pr-12">
            <div className="w-full">
              <div className="text-sm text-gray-500 mb-2">Institution name</div>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full h-9 rounded border border-gray-300 mb-4 p-2 outline-green-700"
              />
            </div>
            <div className="w-full">
              <div className="text-sm text-gray-500 mb-2">Degree</div>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full h-9 rounded border border-gray-300 mb-4 p-2 outline-green-700"
              />
            </div>
          </div>

          <div className="flex space-x-4">
            <div>
              <div className="text-sm text-gray-500 mb-2">From</div>
              <div className="mb-6">
                <input
                  className="w-48 h-9 rounded border border-gray-300 outline-green-600 p-3"
                  type="date"
                  value={startValue}
                  max={new Date().toISOString().split("T")[0]}
                  onChange={(e) => setStartValue(e.target.value)}
                />
              </div>
            </div>
            <div>
              <div className="text-sm text-gray-500 mb-2">To</div>
              <div className="mb-6">
                <input
                  className="w-48 h-9 rounded border border-gray-300 outline-green-600 p-3"
                  type="date"
                  value={endValue}
                  min={startValue}
                  max={new Date().toISOString().split("T")[0]}
                  onChange={(e) => setEndValue(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div
            className={`${
              description.length > maxLength ? "text-red-500" : "text-gray-500"
            } text-sm mb-2 flex justify-between items-center`}
          >
            <p>Description</p>
            <p className="text-xs">
              {description.length} / {maxLength}
            </p>
          </div>
          <textarea
            style={{ resize: "none" }}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className={`${
              description.length > maxLength ? "outline-red-500" : "outline-green-700"
            } w-full h-32 rounded border border-gray-300 mb-4 p-2 `}
          />

          <button
            onClick={() => addPressed()}
            disabled={!isReady}
            className={`${
              isReady ? "bg-green-700 text-white filter hover:brightness-125" : "bg-gray-300 text-white"
            } py-3 my-6 w-full border-t border-b flex items-center justify-center rounded-lg text-sm`}
          >
            Add a new degree
          </button>
        </div>
      );
    };

    return (
      <div className="relative w-full">
        <div className="p-4 px-6 w-full overflow-y-auto pb-12" style={{ height: "calc(100vh - 11.5rem)" }}>
          <p className="mb-4 text-gray-700">Tell us about your education and academic degree</p>

          {education?.map((item, index) => (
            <EducationCell
              key={index}
              name={item.name}
              title={item.title?.[userState.user.userLanguage]}
              from={item.from}
              to={item.to}
              desc={item.desc?.[userState.user.userLanguage]}
            />
          ))}
          <NewCell />
        </div>
        <SaveComponent isReady={isReady} isSaved={isSaved} onPress={saveEducation} isLoading={isLoading} />
      </div>
    );
  };

  const CertificationsPanel = () => {
    const [initialCertification, setInitialCertification] = useState(developerInfo?.current.certification || []);
    const [certification, setCertification] = useState(initialCertification || [{ name: "", date: "" }]);
    const [isReady, setReady] = useState(false);
    const [isSaved, setSaved] = useState(false);
    const [isLoading, setLoading] = useState(false);

    const saveCertification = () => {
      setLoading(true);
      axios
        .post(`/v1/user/me`, {
          user: {
            user_profile: [
              {
                ...(initialCertification !== certification && { certification: certification }),
              },
            ],
          },
        })
        .then((response) => {
          developerInfo.current = {
            ...developerInfo.current,
            ...(initialCertification !== certification && { certification: certification }),
          };
          setInitialCertification(certification);
          setSaved(true);
          setLoading(false);
        })
        .catch((error) => {
          console.log("CERTIFICATION UPDATE ERROR: ", error);
          setLoading(false);
        });
    };

    useEffect(() => {
      if (certification !== initialCertification) {
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
    }, [certification, initialCertification]);

    const CertificationCell = ({ name, date }) => {
      const deleteCertification = () => {
        setCertification(certification.filter((item) => `${item.name} ${item.date}` !== `${name} ${date}`));
      };
      return (
        <div className="border p-3 mb-4 bg-gray-100 rounded">
          <div className="flex justify-end w-full">
            <button onClick={deleteCertification}>
              <MdDelete className="right-4 top-4 w-5 h-5 text-gray-500 hover:text-red-500" />
            </button>
          </div>
          <div className="w-full py-1 flex items-center space-x-2">
            <div className="space-y-1">
              <p className="text-sm font-bold text-gray-600">{name}</p>
              <p className="text-xs text-gray-500">{moment(date).format("YYYY.MM.DD")}</p>
            </div>
          </div>
        </div>
      );
    };

    const NewCell = () => {
      const [name, setName] = useState("");
      const [dateValue, setDateValue] = useState(new Date().toISOString().split("T")[0]);
      const [isReady, setReady] = useState(false);

      const addPressed = () => {
        setCertification([
          ...certification,
          {
            name: name,
            date: new Date(dateValue).getTime(),
          },
        ]);
      };

      useEffect(() => {
        if (!name) {
          setReady(false);
        } else {
          setReady(true);
        }

        return () => {};
      }, [name]);

      return (
        <div className="w-full py-6 border-t mb-6 px-3">
          <div className="flex w-full space-x-4 pr-12">
            <div className="w-full">
              <div className="text-sm text-gray-500 mb-2">Certification / Award title</div>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full h-9 rounded border border-gray-300 mb-4 p-2 outline-green-700"
              />
            </div>
          </div>

          <div className="flex space-x-4">
            <div>
              <div className="text-sm text-gray-500 mb-2">Date</div>
              <div className="mb-6">
                <input
                  className="w-48 h-9 rounded border border-gray-300 outline-green-600 p-3"
                  type="date"
                  value={dateValue}
                  max={new Date().toISOString().split("T")[0]}
                  onChange={(e) => setDateValue(e.target.value)}
                />
              </div>
            </div>
          </div>

          <button
            onClick={() => addPressed()}
            disabled={!isReady}
            className={`${
              isReady ? "bg-green-700 text-white filter hover:brightness-125" : "bg-gray-300 text-white"
            } py-3 my-6 w-full border-t border-b flex items-center justify-center rounded-lg text-sm`}
          >
            Add new a certificate or award
          </button>
        </div>
      );
    };

    return (
      <div className="relative w-full">
        <div className="p-4 px-6 w-full overflow-y-auto pb-12" style={{ height: "calc(100vh - 11.5rem)" }}>
          <p className="mb-4 text-gray-700">Tell us if you have any certificates or awards to support your career</p>
          {certification?.map((item, index) => (
            <CertificationCell key={index} name={item.name} date={item.date} />
          ))}
          <NewCell />
        </div>
        <SaveComponent isReady={isReady} isSaved={isSaved} onPress={saveCertification} isLoading={isLoading} />
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
