import React, { useContext, useEffect, useRef, useState } from "react";
import Navbar2 from "../components/Navbar2";
import Footer from "../components/Footer";
import { useTranslation } from "react-i18next";
import // Link,
"react-router-dom";
import Modal from "react-modal";
import DefaultImage from "../assets/default-profile.png";
import DefaultCompany from "../assets/default-company.png";
import { BsPatchCheckFill } from "react-icons/bs";
import moment from "moment/moment";
import CompanyEditProfileModal from "../components/CompanyEditProfileModal";
import axios from "../utils/authAxios";
import { Link, useParams } from "react-router-dom";
import { AuthContext } from "../utils/authContext";

const Company = () => {
  const { companyId } = useParams();
  const { userState } = useContext(AuthContext);
  const companyInfo = useRef();
  const userInfo = useRef();
  const { t, i18n } = useTranslation("profileEmployer");
  const lang = i18n.language.includes("en") ? "en" : "ko";
  const [companyModalIsOpen, setCompanyModalIsOpen] = useState(false);
  const [companyModalInitialTab, setCompanyModalInitialTab] = useState("Basic");
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    if (companyId) {
      axios
        .get(`/v1/company/`, { params: { company_id: companyId } })
        .then((response) => {
          companyInfo.current = response.data;
          if (response.data.users || userState.isAuthenticated) {
            for (let i = 0; i < response.data.users.length; i++) {
              if (companyInfo.current.users[i].user_id === userState.user?.userId) {
                userInfo.current = companyInfo.current.users[i];
              }
            }
          }
          setLoading(false);
        })
        .catch((e) => {
          console.log("V1/USER/ ERROR : ", e);
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
    return () => {};
  }, [companyId, userState]);

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

  function openCompanyModal() {
    setCompanyModalIsOpen(true);
  }

  function closeCompanyModal() {
    setCompanyModalIsOpen(false);
    setCompanyModalInitialTab("Basic");
  }

  const RightPanel = () => {
    const Cell = ({ title, text }) => {
      if (text)
        return (
          <div className="flex text-sm">
            <p className="w-24 text-left text-gray-500 flex-shrink-0">{title}</p>
            {title === t("info.4") ? (
              <p>{moment(text).format("YYYY.MM.DD")}</p>
            ) : title === t("info.9") ? (
              <a
                href={text.includes("//") ? text : `//${text}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500"
              >
                {text}
              </a>
            ) : (
              <p>{text}</p>
            )}
          </div>
        );
    };

    return (
      <div
        style={{ minHeight: "calc(100vh - 5rem)", color: "#272D37" }}
        className="w-full flex h-full flex-col p-8 space-y-8 px-12 relative"
      >
        {userInfo.current?.user_id && (
          <div className="flex bg-white border p-3 rounded-lg shadow text-sm">
            <p className="mr-1 font-bold flex-shrink-0">{userInfo.current.user_profile[0]?.name?.[lang]} - </p>
            {userInfo.current?.user_profile[0]?.title?.[lang] && (
              <p className="flex-shrink-0">{userInfo.current?.user_profile[0]?.title?.[lang]}</p>
            )}
            <div className="flex items-center flex-shrink-0">
              <p className="mx-1">at</p>
              <button className="text-green-700 hover:underline filter hover:brightness-125 font-bold">
                {companyInfo.current.company.company_info[0]?.name}
              </button>
              <BsPatchCheckFill className="text-sky-500 w-3 h-3 ml-1" />
            </div>
            <div className="flex items-center justify-end w-full mr-3">
              <p className="mx-1">{t("editCompany")}</p>
              <button
                onClick={() => openCompanyModal()}
                className="text-green-700 underline filter hover:brightness-125"
              >
                {t("here")}
              </button>
            </div>
          </div>
        )}

        <div className="flex items-center space-x-6">
          <div className="w-32 h-32 bg-gray-100 rounded-lg overflow-hidden">
            <img
              onError={({ currentTarget }) => {
                currentTarget.onerror = null; // prevents looping
                currentTarget.src = DefaultCompany;
              }}
              src={companyInfo.current?.company?.company_info[0]?.img || DefaultCompany}
              alt=""
              draggable={false}
              className="hover:cursor-pointer object-cover h-32 w-32 border"
            />
          </div>
          <div className="space-y-2">
            <p className="text-3xl font-bold">{companyInfo.current?.company?.company_info[0]?.name}</p>
            <p className="text-sm">{companyInfo.current?.company?.company_info[0]?.industry?.[lang]}</p>
            <a
              href={
                companyInfo.current?.company?.company_info[0]?.website.includes("//")
                  ? companyInfo.current?.company?.company_info[0]?.website
                  : `//${companyInfo.current?.company?.company_info[0]?.website}`
              }
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-sky-600 hover:text-sky-500"
            >
              {companyInfo.current?.company?.company_info[0]?.website}
            </a>
          </div>
        </div>

        <div className="flex space-x-2 items-center">
          <div className="h-7 w-1 bg-gray-600 rounded"></div>
          <p className="text-2xl text-gray-600">{t("companyIntro")}</p>
        </div>

        <p className="">{companyInfo.current?.company?.company_info[0]?.intro?.[lang]}</p>

        <div className="flex space-x-2 items-center">
          <div className="h-7 w-1 bg-gray-600 rounded"></div>
          <p className="text-2xl text-gray-600">{t("companyInfo")}</p>
        </div>

        <div className="p-8 border rounded-lg grid grid-cols-2 gap-4">
          <Cell title={t("info.1")} text={companyInfo.current?.company?.company_info[0]?.industry?.[lang]} />
          <Cell title={t("info.2")} text={companyInfo.current?.company?.company_info[0]?.employees} />
          <Cell title={t("info.3")} text={companyInfo.current?.company?.company_info[0]?.type?.[lang]} />
          <Cell title={t("info.4")} text={companyInfo.current?.company?.company_info[0]?.foundingDate} />
          <Cell title={t("info.5")} text={companyInfo.current?.company?.company_info[0]?.funding} />
          <Cell title={t("info.6")} text={companyInfo.current?.company?.company_info[0]?.revenue} />
          <Cell title={t("info.7")} text={companyInfo.current?.company?.company_info[0]?.ceo?.[lang]} />
          <Cell title={t("info.8")} text={companyInfo.current?.company?.company_info[0]?.service?.[lang]} />
          <Cell title={t("info.9")} text={companyInfo.current?.company?.company_info[0]?.website} />
          <Cell title={t("info.10")} text={companyInfo.current?.company?.company_info[0]?.address?.[lang]} />
        </div>

        {companyInfo.current.users?.length > 0 && (
          <div className="w-full">
            <div className="flex space-x-2 items-center mb-4">
              <div className="h-7 w-1 bg-gray-600 rounded"></div>
              <p className="text-2xl text-gray-600">{t("companyEmployees")}</p>
            </div>

            {companyInfo.current.users?.map((item, index) => (
              <Link key={item.user_id} to={`/user/${item.user_id}`} className="w-full">
                <button className="py-3 border-b flex items-center hover:bg-gray-100 transition px-3 w-full">
                  <img
                    onError={({ currentTarget }) => {
                      currentTarget.onerror = null; // prevents looping
                      currentTarget.src = DefaultImage;
                    }}
                    src={item.user_img || DefaultImage}
                    alt=""
                    draggable={false}
                    className="hover:cursor-pointer object-cover h-12 w-12 rounded-full border"
                  />
                  <div className="ml-4 flex flex-col">
                    <p className="font-bold text-left">{item.user_profile[0].name?.[lang]}</p>
                    <div className="flex items-center text-gray-600 text-xs">
                      {item.user_profile[0].title?.[lang] && <p>{item.user_profile[0].title?.[lang]}</p>}
                      <div className="flex items-center flex-shrink-0">
                        <p className="mx-1">at</p>
                        <div className="text-green-700">{companyInfo.current?.company?.company_info[0]?.name}</div>
                        <BsPatchCheckFill className="text-sky-500 w-3 h-3 ml-1" />
                      </div>
                    </div>
                  </div>
                </button>
              </Link>
            ))}
          </div>
        )}

        <div className="h-16" />
      </div>
    );
  };

  if (!isLoading && companyInfo.current)
    return (
      <>
        <Modal
          isOpen={companyModalIsOpen}
          onRequestClose={closeCompanyModal}
          style={customStyles}
          shouldCloseOnOverlayClick={false}
        >
          <CompanyEditProfileModal
            initialTab={companyModalInitialTab}
            closeModal={closeCompanyModal}
            companyInfo={companyInfo}
          />
        </Modal>

        <div className="w-full min-h-screen h-full flex flex-col items-center overflow-x-hidden z-10">
          <Navbar2 light />
          <div style={{ maxWidth: "1280px" }} className="w-full h-full px-4 flex">
            <RightPanel />
          </div>
          <Footer />
        </div>
      </>
    );
};

export default Company;
