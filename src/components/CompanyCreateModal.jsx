import React, { useContext, useEffect, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { AuthContext } from "../utils/authContext";
import axios from "../utils/authAxios";
// import { languageArray } from "../utils/arrays";
import "../utils/datePicker.css";
import "react-calendar/dist/Calendar.css";
import UploadCompanyIcon from "./UploadCompanyIcon";
import { AiFillCheckCircle } from "react-icons/ai";
import { useTranslation } from "react-i18next";

const CompanyCreateModal = ({ closeModal, companyInfo }) => {
  const { userState } = useContext(AuthContext);
  const { t } = useTranslation("companyCreateModal");

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

    const createCompany = () => {
      setLoading(true);
      axios
        .post(`/v1/company/`, {
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
        })
        .then((response) => {
          companyInfo.current = {
            ...companyInfo.current,
            ...{
              company: {
                company_info: [
                  {
                    ...companyInfo.current?.company.company_info[0],
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
          console.log("CREATE COMPANY ERROR: ", error);
          companyInfo.current = null;
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
    if (isSaved)
      return (
        <div className="flex flex-col w-full h-full items-center justify-center space-y-8">
          <AiFillCheckCircle className="w-24 h-24 text-sky-500" />
          <p>{t("success")}</p>
          <button
            onClick={() => closeModal()}
            className="px-4 flex items-center justify-center h-10 bg-green-600 text-white rounded hover:bg-green-500 transition shadow border flex-shrink-0"
          >
            {t("close")}
          </button>
        </div>
      );
    else
      return (
        <div className="relative w-full">
          <div className="p-4 px-8 w-full overflow-y-auto pb-16" style={{ height: "calc(100vh - 11.5rem)" }}>
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
          <SaveComponent isReady={isReady} isSaved={isSaved} onPress={createCompany} isLoading={isLoading} />
        </div>
      );
  };

  return (
    <div style={{ width: "900px", height: "calc(100vh - 8rem)" }} className="">
      <div className="h-14 w-full border-b flex-shrink-0 flex items-center justify-between text-lg px-6">
        <p>{t("create")}</p>
        <div className="flex items-center space-x-6">
          <button onClick={closeModal} className="py-2">
            <RxCross2 className="w-7 h-7" />
          </button>
        </div>
      </div>
      <div style={{ height: "calc(100vh - 11.5rem)" }} className="flex overflow-y-auto">
        <BasicPanel />
      </div>
    </div>
  );
};

export default CompanyCreateModal;
