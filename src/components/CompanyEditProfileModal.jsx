import React, { useContext, useEffect, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { AuthContext } from "../utils/authContext";
import axios from "../utils/authAxios";
// import { languageArray } from "../utils/arrays";
import "../utils/datePicker.css";
import "react-calendar/dist/Calendar.css";
import UploadCompanyIcon from "./UploadCompanyIcon";
import DatePicker from "react-date-picker";
import { useTranslation } from "react-i18next";

const CompanyEditProfileModal = ({ initialTab = "Basic", closeModal, companyInfo }) => {
  const { userState } = useContext(AuthContext);
  const [selectedTab, setSelectedTab] = useState(initialTab);
  const { t } = useTranslation("companyEditProfileModal");

  useEffect(() => {
    console.log("MODAL OPEN");
    return () => {
      console.log("MODAL CLOSED");
    };
  }, []);

  const SaveComponent = ({ isReady, isSaved, onPress, isLoading }) => (
    <div className="flex items-center justify-between absolute bottom-0 w-full shadow p-6 py-3 bg-gray-100 bg-opacity-80">
      <p className="text-green-700 text-sm">
        {isSaved ? t("saved") : isLoading ? t("saving") : isReady ? t("saveDesc") : ""}
      </p>
      <button
        onClick={onPress}
        disabled={!isReady || isSaved || isLoading}
        className={`px-6 py-2 rounded hover:opacity-90 transition font-semibold text-sm ${
          !isReady || isLoading || isSaved ? "bg-gray-300 text-white" : "bg-green-700 text-white shadow-lg"
        }`}
      >
        {isLoading ? <div className="animate-ping h-5 w-5 rounded-full bg-white" /> : t("save")}
      </button>
    </div>
  );

  const LeftPanel = () => {
    const TabButton = ({ type, title }) => (
      <button
        onClick={() => setSelectedTab(type)}
        className={`${
          selectedTab === type ? "text-green-800 font-bold" : "text-gray-500 hover:bg-gray-200"
        } h-10 flex items-center text-sm relative w-full`}
      >
        {selectedTab === type && <div className="absoulte left-0 h-5 w-1 bg-green-700 rounded-r"></div>}
        <p className="px-6">{title}</p>
      </button>
    );
    return (
      <div style={{ height: "calc(100vh - 11.5rem)" }} className="w-48 border-r bg-gray-50 py-2 flex-shrink-0">
        <div className="h-10 flex items-center px-4 text-sm font-bold">{t("company")}</div>
        <TabButton type="Basic" title={t("basic")} />
        <TabButton type="Detail" title={t("detail")} />
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
                ...companyInfo.current.company,
                company_info: [
                  {
                    ...companyInfo.current.company.company_info[0],
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
          <p className="mb-4 text-gray-700">{t("title1")}</p>
          <div className="text-sm text-gray-500 mb-2 ">
            {t("image")} <div className="text-xs text-green-700 inline"> {t("imageSubtitle")}</div>
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

          <div className="text-sm text-gray-500 mb-2">{t("fullname")}*</div>
          <input
            className="w-1/2 h-9 rounded border border-gray-300 mb-4 p-2 outline-green-700"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <div className="text-sm text-gray-500 mb-2">{t("webiste")}</div>
          <input
            placeholder="e.g. https://www.kookjein.com"
            className="w-1/2 h-9 rounded border border-gray-300 mb-4 p-2 outline-green-700"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
          />

          <div className="text-sm text-gray-500 mb-2">{t("industry")}</div>
          <input
            placeholder="e.g. Internet Software & Services"
            className="w-1/2 h-9 rounded border border-gray-300 mb-4 p-2 outline-green-700"
            value={industry}
            onChange={(e) => setIndustry(e.target.value)}
          />

          <div className="text-sm text-gray-500 mb-2 flex justify-between items-center">
            <p>{t("intro")}</p>
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
    const [initialType, setInitialType] = useState(
      companyInfo?.current?.company.company_info[0]?.type?.[userState.user.userLanguage] || ""
    );
    const [initialCEO, setInitialCEO] = useState(
      companyInfo?.current?.company.company_info[0]?.ceo?.[userState.user.userLanguage] || ""
    );
    const [initialFunding, setInitialFunding] = useState(companyInfo?.current?.company.company_info[0]?.funding || "");
    const [initialEmployees, setInitialEmployees] = useState(
      companyInfo?.current?.company.company_info[0]?.employees || ""
    );
    const [initialFoundingDate, setInitialFoundingDate] = useState(
      companyInfo?.current?.company.company_info[0]?.foundingDate || new Date()
    );
    const [initialRevenue, setInitialRevenue] = useState(companyInfo?.current?.company.company_info[0]?.revenue || "");
    const [initialService, setInitialService] = useState(
      companyInfo?.current?.company.company_info[0]?.service?.[userState.user.userLanguage] || ""
    );
    const [initialAddress, setInitialAddress] = useState(
      companyInfo?.current?.company.company_info[0]?.address?.[userState.user.userLanguage] || ""
    );
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
                ...companyInfo.current.company,
                company_info: [
                  {
                    ...companyInfo.current.company.company_info[0],
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
          <p className="mb-4 text-gray-700">{t("title2")}</p>

          <div className="text-sm text-gray-500 mb-2">{t("type")}</div>
          <input
            placeholder="e.g. Start-up, SME"
            className="w-3/4 h-9 rounded border border-gray-300 mb-4 p-2 outline-green-700"
            value={type}
            onChange={(e) => setType(e.target.value)}
          />
          <div className="text-sm text-gray-500 mb-2">{t("ceo")}</div>
          <input
            className="w-3/4 h-9 rounded border border-gray-300 mb-4 p-2 outline-green-700"
            value={ceo}
            onChange={(e) => setCeo(e.target.value)}
          />
          <div className="text-sm text-gray-500 mb-2 ">
            {t("funding")} <div className="text-xs text-green-700 inline"> {t("fundingSub")}</div>
          </div>
          <input
            className="w-3/4 h-9 rounded border border-gray-300 mb-4 p-2 outline-green-700"
            value={funding}
            type="number"
            onChange={(e) => setFunding(e.target.value)}
          />
          <div className="text-sm text-gray-500 mb-2 ">
            {t("employees")} <div className="text-xs text-green-700 inline"> {t("employeesSub")}</div>
          </div>
          <input
            className="w-3/4 h-9 rounded border border-gray-300 mb-4 p-2 outline-green-700"
            value={employees}
            type="number"
            onChange={(e) => setEmployees(e.target.value)}
          />
          <div className="text-sm text-gray-500 mb-2">{t("founding")}</div>
          <DatePicker className={"outline-green-700 mb-4"} onChange={setFoundingDate} value={foundingDate} />
          <div className="text-sm text-gray-500 mb-2 ">
            {t("revenue")} <div className="text-xs text-green-700 inline"> {t("revenueSub")}</div>
          </div>
          <input
            className="w-3/4 h-9 rounded border border-gray-300 mb-4 p-2 outline-green-700"
            value={revenue}
            type="number"
            onChange={(e) => setRevenue(e.target.value)}
          />
          <div className="text-sm text-gray-500 mb-2">{t("main")}</div>
          <input
            className="w-3/4 h-9 rounded border border-gray-300 mb-4 p-2 outline-green-700"
            value={service}
            onChange={(e) => setService(e.target.value)}
          />
          <div className="text-sm text-gray-500 mb-2">{t("address")}</div>
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
        <p>{t("edit")}</p>
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
