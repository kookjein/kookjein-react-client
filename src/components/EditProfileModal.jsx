import React, { useEffect, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import UploadProfile from "./UploadProfile";

const EditProfileModal = ({ initialTab = "Basic", closeModal }) => {
  const [selectedTab, setSelectedTab] = useState(initialTab);

  useEffect(() => {
    console.log("MODAL OPEN");
    return () => {
      console.log("MODAL CLOSED");
    };
  }, []);

  const SaveComponent = () => (
    <div className="flex items-center justify-between absolute bottom-0 w-full shadow p-6 py-3 bg-gray-200 bg-opacity-80">
      <p className="text-green-700 text-sm">Make sure to save your changes.</p>
      <button className="text-white text px-6 py-2 rounded hover:opacity-90 transition font-semibold text-sm shadow-lg bg-green-700">
        Save
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

  const BasicPanel = () => (
    <div className="relative w-full">
      <div className="p-4 px-6 w-full overflow-y-auto pb-12" style={{ height: "calc(100vh - 11.5rem)" }}>
        <p className="mb-4 text-gray-700">Update basic information to increase Page Discovery</p>
        <div className="text-sm text-gray-500 mb-2 ">
          Profile image <div className="text-xs text-green-700 inline"> - 320px * 320px Recommended</div>
        </div>

        <div className="flex items-end mb-6 relative space-x-2">
          <UploadProfile width={"9rem"} height={"9rem"} initialImage={null} borderRadius={"0.2rem"} />
        </div>

        <div className="text-sm text-gray-500 mb-2">Full name*</div>
        <input className="w-1/2 h-9 rounded border border-gray-300 mb-4 p-2 outline-green-700" />
        <div className="text-sm text-gray-500 mb-2">Title*</div>
        <input
          placeholder="e.g. Frontend Developer"
          className="w-1/2 h-9 rounded border border-gray-300 mb-4 p-2 outline-green-700"
        />

        <div className="text-sm text-gray-500 mb-2 flex justify-between items-center">
          <p>One line introduction</p>
          <p className="text-xs">0 / 100</p>
        </div>
        <textarea
          style={{ resize: "none" }}
          className="w-full h-20 rounded border border-gray-300 mb-4 p-2 outline-green-700"
        />
      </div>
      <SaveComponent />
    </div>
  );

  const SkillsetPanel = () => (
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
          Your monthly wage rises as you gain experience on Kookjein.
        </div>
      </div>
      <SaveComponent />
    </div>
  );

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
