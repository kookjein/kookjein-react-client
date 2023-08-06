import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/authContext";
import axios from "../utils/authAxios";
// import { languageArray } from "../utils/arrays";
import CompanyLogo from "../components/CompanyLogo";
import { AiFillCheckCircle } from "react-icons/ai";
import { useTranslation } from "react-i18next";
import { uploadImage } from "../utils/uploadImage";
import { Link } from "react-router-dom";

const CreateCompany = () => {
  const { userState } = useContext(AuthContext);
  const { t } = useTranslation("createCompany");
  const myUserId = userState.user.userId;

  const [image, setImage] = useState(null);
  const [name, setName] = useState("");
  const [website, setWebsite] = useState("");
  const [industry, setIndustry] = useState("");
  const [intro, setIntro] = useState("");

  const [isReady, setReady] = useState(false);
  const [isSaved, setSaved] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const maxLength = 2000;

  const SaveComponent = ({ isReady, isSaved, onPress, isLoading }) => (
    <div className="flex items-center justify-between absolute bottom-0 w-full p-6 py-3 bg-opacity-80">
      <p className="text-green-700 text-sm">
        {isSaved ? t("saved") : isLoading ? t("saving") : isReady ? t("saveDesc") : ""}
      </p>
      <button
        onClick={onPress}
        disabled={!isReady || isSaved || isLoading}
        className={`px-12 py-2 rounded hover:opacity-90 transition font-semibold text-sm ${
          !isReady || isLoading || isSaved ? "bg-gray-300 text-white" : "bg-green-700 text-white"
        }`}
      >
        {isLoading ? <div className="animate-ping h-5 w-5 rounded-full bg-white" /> : t("save")}
      </button>
    </div>
  );

  const createCompany = async () => {
    setLoading(true);
    let imageURL = await uploadImage(image, myUserId);
    axios
      .post(`/v1/company/`, {
        company: {
          company_info: [
            {
              ...{ img: imageURL },
              ...{ name: name },
              ...{ website: website },
              ...{ industry: { [userState.user.userLanguage]: industry } },
              ...{ intro: { [userState.user.userLanguage]: intro } },
            },
          ],
        },
      })
      .then((response) => {
        setSaved(true);
        setLoading(false);
      })
      .catch((error) => {
        console.log("CREATE COMPANY ERROR: ", error);
        setLoading(false);
      });
  };

  useEffect(() => {
    if (name) {
      if (intro.length <= maxLength) {
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
  }, [name, website, industry, intro, image]);

  if (isSaved)
    return (
      <div className="flex flex-col w-full h-full items-center justify-center space-y-8 py-12">
        <AiFillCheckCircle className="w-24 h-24 text-sky-500" />
        <p>{t("success")}</p>
        <Link to={`/user/${myUserId}`}>
          <button className="px-12 flex items-center justify-center h-10 bg-green-600 text-white rounded hover:bg-green-500 transition shadow border flex-shrink-0">
            {t("close")}
          </button>
        </Link>
      </div>
    );
  else
    return (
      <div className="w-full h-full flex flex-col items-center overflow-x-hidden">
        <div style={{ maxWidth: "1280px" }} className="w-full h-full">
          <div className="w-full flex-shrink-0 p-6">
            <p className="font-bold text-xl">{t("create")}</p>
            <p className="mt-3 text-gray-700 text-sm">{t("title2")}</p>
            <p className="text-gray-700 text-sm mt-3">{t("title1")}</p>
          </div>

          <div className="relative w-full">
            <div className="p-6 w-full overflow-y-auto pb-16 flex space-x-16">
              <div className="flex-shrink-0">
                <div className="text-sm text-gray-500 mb-5">
                  {t("image")} <div className="text-xs text-green-700 inline"> {t("imageSubtitle")}</div>
                </div>
                <div className="flex items-end mb-6 relative space-x-2">
                  <CompanyLogo
                    width={"10rem"}
                    height={"10rem"}
                    borderRadius={"0.2rem"}
                    setImage={setImage}
                    image={image}
                  />
                </div>
              </div>
              <div className="w-full">
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
            </div>
            <SaveComponent isReady={isReady} isSaved={isSaved} onPress={createCompany} isLoading={isLoading} />
          </div>
        </div>
      </div>
    );
};

export default CreateCompany;
