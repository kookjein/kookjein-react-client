import React, { useContext, useEffect, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { AuthContext } from "../utils/authContext";
import axios from "../utils/authAxios";
// import { languageArray } from "../utils/arrays";
import "../utils/datePicker.css";
import "react-calendar/dist/Calendar.css";
import UploadCompanyIcon from "./UploadCompanyIcon";

const CompanyEditProfileModal = ({ initialTab = "Basic", closeModal, companyInfo }) => {
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
    const [initialImage, setInitialImage] = useState(companyInfo?.current?.company.company_info[0]?.img || "");
    const [initialName, setInitialName] = useState(companyInfo?.current?.company.company_info[0]?.name || "");
    const [initialWebsite, setInitialWebsite] = useState(companyInfo?.current?.company.company_info[0]?.website || "");
    const [initialIndustry, setInitialIndustry] = useState(
      companyInfo?.current?.company.company_info[0]?.industry?.[userState.user.userLanguage] || ""
    );
    const [initialIntro, setInitialIntro] = useState(
      companyInfo?.current?.company.company_info[0]?.intro?.[userState.user.userLanguage] || ""
    );
    const [image, setImage] = useState(initialImage);
    const [name, setName] = useState(initialName);
    const [website, setWebsite] = useState(initialWebsite);
    const [industry, setIndustry] = useState(initialIndustry);
    const [intro, setIntro] = useState(initialIntro);
    const [isReady, setReady] = useState(false);
    const [isSaved, setSaved] = useState(false);
    const [isLoading, setLoading] = useState(false);
    const maxLength = 2000;

    const editCompany = () => {
      setLoading(true);
      axios
        .post(
          `/v1/company/update`,
          {
            company: {
              company_info: [
                {
                  ...(initialImage !== image && { img: image }),
                  ...(initialName !== name && { name: name }),
                  ...(initialWebsite !== website && { website: website }),
                  ...(initialIndustry !== industry && { industry: { [userState.user.userLanguage]: industry } }),
                  ...(initialIntro !== intro && { intro: { [userState.user.userLanguage]: intro } }),
                },
              ],
            },
          },
          { params: { company_id: companyInfo.current?.company?.company_id } }
        )
        .then((response) => {
          companyInfo.current = {
            ...companyInfo.current,
            ...{
              company: {
                company_info: [
                  {
                    ...(initialImage !== image && { img: image }),
                    ...(initialName !== name && { name: name }),
                    ...(initialWebsite !== website && { website: website }),
                    ...(initialIndustry !== industry && { industry: { [userState.user.userLanguage]: industry } }),
                    ...(initialIntro !== intro && { intro: { [userState.user.userLanguage]: intro } }),
                  },
                ],
              },
            },
          };
          setInitialName(name);
          setInitialWebsite(website);
          setInitialIndustry(industry);
          setInitialIntro(intro);
          setInitialImage(image);
          setSaved(true);
          setLoading(false);
        })
        .catch((error) => {
          console.log("EDIT COMPANY ERROR: ", error);
          setLoading(false);
        });
    };

    useEffect(() => {
      if (name) {
        if (
          (initialName !== name ||
            initialWebsite !== website ||
            initialIndustry !== industry ||
            initialIntro !== intro ||
            initialImage !== image) &&
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
    }, [
      name,
      website,
      industry,
      intro,
      image,
      initialName,
      initialWebsite,
      initialIndustry,
      initialIntro,
      initialImage,
    ]);

    return (
      <div className="relative w-full">
        <div className="p-4 px-6 w-full overflow-y-auto pb-16" style={{ height: "calc(100vh - 11.5rem)" }}>
          <p className="mb-4 text-gray-700">Update basic information about your company</p>
          <div className="text-sm text-gray-500 mb-2 ">
            Compnay Logo <div className="text-xs text-green-700 inline"> - 320px * 320px Recommended</div>
          </div>

          <div className="flex items-end mb-6 relative space-x-2">
            <UploadCompanyIcon
              width={"9rem"}
              height={"9rem"}
              companyInfo={companyInfo}
              borderRadius={"0.2rem"}
              setImage={setImage}
              image={image}
            />
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
            value={industry}
            onChange={(e) => setIndustry(e.target.value)}
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
        <SaveComponent isReady={isReady} isSaved={isSaved} onPress={editCompany} isLoading={isLoading} />
      </div>
    );
  };

  const SkillsetPanel = () => {
    const [initialType, setInitialType] = useState(companyInfo?.current?.company.company_info[0]?.type || "");
    const [initialCEO, setInitialCEO] = useState(companyInfo?.current?.company.company_info[0]?.ceo || "");
    const [initialFunding, setInitialFunding] = useState(companyInfo?.current?.company.company_info[0]?.funding || "");
    const [initialEmployees, setInitialEmployees] = useState(
      companyInfo?.current?.company.company_info[0]?.employees || ""
    );
    const [initialFoundingDate, setInitialFoundingDate] = useState(
      companyInfo?.current?.company.company_info[0]?.founding_date || ""
    );
    const [initialRevenue, setInitialRevenue] = useState(companyInfo?.current?.company.company_info[0]?.revenue || "");
    const [initialService, setInitialService] = useState(companyInfo?.current?.company.company_info[0]?.service || "");
    const [initialAddress, setInitialAddress] = useState(companyInfo?.current?.company.company_info[0]?.address || "");
    const [type, setType] = useState(initialType);
    const [ceo, setCeo] = useState(initialCEO);
    const [funding, setFunding] = useState(initialFunding);
    const [employees, setEmployees] = useState(initialEmployees);
    const [foundingDate, setFoundingDate] = useState(initialFoundingDate);
    const [revenue, setRevenue] = useState(initialRevenue);
    const [service, setService] = useState(initialService);
    const [address, setAddress] = useState(initialAddress);

    const [isReady, setReady] = useState(false);
    const [isSaved, setSaved] = useState(false);
    const [isLoading, setLoading] = useState(false);

    const saveDetails = () => {
      setLoading(true);
      axios
        .post(
          `/v1/company/update`,
          {
            company: {
              company_info: [
                {
                  ...(initialType !== type && { type: { [userState.user.userLanguage]: type } }),
                  ...(initialCEO !== ceo && { ceo: { [userState.user.userLanguage]: ceo } }),
                  ...(initialFunding !== funding && { funding: funding }),
                  ...(initialEmployees !== employees && { employees: employees }),
                  ...(initialFoundingDate !== foundingDate && { foundingDate: foundingDate }),
                  ...(initialRevenue !== revenue && { revenue: revenue }),
                  ...(initialService !== service && { service: { [userState.user.userLanguage]: service } }),
                  ...(initialAddress !== address && { address: { [userState.user.userLanguage]: address } }),
                },
              ],
            },
          },
          { params: { company_id: companyInfo.current?.company?.company_id } }
        )
        .then((response) => {
          companyInfo.current = {
            ...companyInfo.current,
            ...{
              company: {
                company_info: [
                  {
                    ...(initialType !== type && { type: type }),
                    ...(initialCEO !== ceo && { ceo: ceo }),
                    ...(initialFunding !== funding && { funding: funding }),
                    ...(initialEmployees !== employees && { employees: employees }),
                    ...(initialFoundingDate !== foundingDate && { foundingDate: foundingDate }),
                    ...(initialRevenue !== revenue && { revenue: revenue }),
                    ...(initialService !== service && { service: service }),
                    ...(initialAddress !== address && { address: address }),
                  },
                ],
              },
            },
          };
          setInitialType(type);
          setInitialCEO(ceo);
          setInitialFunding(funding);
          setInitialEmployees(employees);
          setInitialFoundingDate(foundingDate);
          setInitialRevenue(revenue);
          setInitialService(service);
          setInitialAddress(address);
          setSaved(true);
          setLoading(false);
        })
        .catch((error) => {
          console.log("EDIT COMPANY ERROR: ", error);
          setLoading(false);
        });
    };

    useEffect(() => {
      if (
        initialType !== type ||
        initialCEO !== ceo ||
        initialFunding !== funding ||
        initialEmployees !== employees ||
        initialFoundingDate !== foundingDate ||
        initialRevenue !== revenue ||
        initialService !== service ||
        initialAddress !== address
      ) {
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
    }, [
      type,
      ceo,
      funding,
      employees,
      foundingDate,
      revenue,
      service,
      address,
      initialType,
      initialCEO,
      initialFunding,
      initialEmployees,
      initialFoundingDate,
      initialRevenue,
      initialService,
      initialAddress,
    ]);

    return (
      <div className="relative w-full">
        <div className="p-4 px-6 w-full overflow-y-auto pb-24" style={{ height: "calc(100vh - 11.5rem)" }}>
          <p className="mb-4 text-gray-700">Detailed information about your company</p>
          <div className="text-sm text-gray-500 mb-2">Company type</div>
          <input
            placeholder="e.g. Start-up, SME"
            className="w-3/4 h-9 rounded border border-gray-300 mb-4 p-2 outline-green-700"
            value={type}
            onChange={(e) => setType(e.target.value)}
          />
          <div className="text-sm text-gray-500 mb-2">CEO</div>
          <input
            className="w-3/4 h-9 rounded border border-gray-300 mb-4 p-2 outline-green-700"
            value={ceo}
            onChange={(e) => setCeo(e.target.value)}
          />
          <div className="text-sm text-gray-500 mb-2">Initial Funding</div>
          <input
            className="w-3/4 h-9 rounded border border-gray-300 mb-4 p-2 outline-green-700"
            value={funding}
            onChange={(e) => setFunding(e.target.value)}
          />
          <div className="text-sm text-gray-500 mb-2">Number of employees</div>
          <input
            className="w-3/4 h-9 rounded border border-gray-300 mb-4 p-2 outline-green-700"
            value={employees}
            onChange={(e) => setEmployees(e.target.value)}
          />
          <div className="text-sm text-gray-500 mb-2">Founding date</div>
          <input
            className="w-3/4 h-9 rounded border border-gray-300 mb-4 p-2 outline-green-700"
            value={foundingDate}
            onChange={(e) => setFoundingDate(e.target.value)}
          />
          <div className="text-sm text-gray-500 mb-2">Revenue</div>
          <input
            className="w-3/4 h-9 rounded border border-gray-300 mb-4 p-2 outline-green-700"
            value={revenue}
            onChange={(e) => setRevenue(e.target.value)}
          />
          <div className="text-sm text-gray-500 mb-2">Main service</div>
          <input
            className="w-3/4 h-9 rounded border border-gray-300 mb-4 p-2 outline-green-700"
            value={service}
            onChange={(e) => setService(e.target.value)}
          />
          <div className="text-sm text-gray-500 mb-2">Address</div>
          <input
            className="w-3/4 h-9 rounded border border-gray-300 mb-4 p-2 outline-green-700"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
        <SaveComponent isReady={isReady} isSaved={isSaved} onPress={saveDetails} isLoading={isLoading} />
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
