import React, { useContext, useEffect, useState } from "react";
import { BsFileEarmarkRuledFill, BsUpload } from "react-icons/bs";
import Modal from "react-modal";
import DailyReportModal from "../components/DailyReportModal";
import DailyReportUploadModal from "./DailyReportUploadModal";
import DefaultImage from "../assets/default-profile.png";
import { Link, useSearchParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import moment from "moment";
import { AuthContext } from "../utils/authContext";
import axios from "../utils/authAxios";

const DailyReport = () => {
  const { userState } = useContext(AuthContext);
  const { t, i18n } = useTranslation("manageWork");
  const [searchParams] = useSearchParams();
  const receiverIdQuery = searchParams.get("u");
  moment.locale(i18n.language);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [uploadModalIsOpen, setUploadModalOpen] = useState(false);
  const [dailyReports, setDailyReports] = useState([]);
  const [currentReport, setCurrentReport] = useState({});

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
    Modal.setAppElement("body");
    return () => {};
  }, []);

  useEffect(() => {
    axios
      .get(`/v1/work/daily-report/all`, {
        params: {
          employee_id: userState.user.userType === "employee" ? userState.user.userId : receiverIdQuery,
          employer_id: userState.user.userType === "employee" ? receiverIdQuery : userState.user.userId,
        },
      })
      .then((response) => {
        setDailyReports(response.data);
        console.log(response.data);
      })
      .catch((e) => {
        console.log("V1/WORK/DAILY_REPORT/ALL ERROR : ", e);
      });
    return () => {};
  }, [receiverIdQuery, userState]);

  function openModal(item) {
    setCurrentReport(item);
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  function openUploadModal() {
    setUploadModalOpen(true);
  }

  function closeUploadModal() {
    setUploadModalOpen(false);
  }

  const Header = () => (
    <div className="h-12 w-full bg-white border-b flex items-center px-4 text-sm space-x-2">
      <Link to="/user/1">
        <button className="flex items-center space-x-2">
          <img alt="" src={DefaultImage} className="w-7 h-7 object-cover flex-shrink-0 rounded-full bg-gray-200" />
          <p>모하메드 알가잘리</p>
        </button>
      </Link>
    </div>
  );

  const Cell = ({ item }) => (
    <button
      onClick={() => openModal(item)}
      className="w-full h-14 bg-white border-b border-l border-r flex items-center pr-4 space-x-4 text-gray-500 group hover:text-sky-500 justify-between hover:bg-gray-50"
    >
      <div className="flex items-center space-x-4">
        <div className="w-14 text-green-700 flex flex-col items-center justify-center border-r">
          <p style={{ fontSize: "11px" }} className="text-xs">
            {moment(item.daily_report_created_at).format("MMM")}
          </p>
          <p style={{ marginTop: "-2px" }} className="text-sm font-bold">
            {moment(item.daily_report_created_at).format("DD")}
          </p>
        </div>
        <BsFileEarmarkRuledFill className="w-4 h-4" />
        <p className="text-sm group-hover:underline font-bold">
          {moment(item.daily_report_created_at).format("YYYY.MM.DD_HH:mm")}_{item.daily_report_content.content.author}
        </p>
      </div>
      <div className="flex flex-col items-end">
        <p className="text-xs text-gray-400">
          last edited: {moment(item.daily_report_created_at).format("YYYY.MM.DD a hh:mm")}
        </p>
        <p className="text-xs text-gray-400">by {item.daily_report_content.content.author}</p>
      </div>
    </button>
  );

  return (
    <>
      <Modal
        isOpen={uploadModalIsOpen}
        onRequestClose={closeUploadModal}
        style={customStyles}
        shouldCloseOnOverlayClick={false}
      >
        <DailyReportUploadModal
          closeModal={closeUploadModal}
          dailyReports={dailyReports}
          setDailyReports={setDailyReports}
        />
      </Modal>
      <Modal isOpen={modalIsOpen} onRequestClose={closeModal} style={customStyles} shouldCloseOnOverlayClick={false}>
        <DailyReportModal closeModal={closeModal} currentReport={currentReport} />
      </Modal>
      <div style={{ height: "calc(100vh - 5rem)" }} className="w-full h-screen bg-gray-100">
        <Header />

        <div style={{ height: "calc(100vh - 8rem)" }} className="w-full h-full overflow-y-auto flex flex-col px-6 pb-4">
          <div className="w-full flex-shrink-0 flex justify-between items-center py-6">
            <p className="text-2xl font-bold">{t("dailyReport")}</p>
            {userState.user.userType === "employee" && (
              <button
                onClick={openUploadModal}
                className="flex h-8 px-4 bg-green-700 text-white items-center rounded space-x-2 filter hover:brightness-125"
              >
                <BsUpload />
                <p className="text-sm">{t("uploadDailyReport")}</p>
              </button>
            )}
          </div>
          <div className="w-full h-full bg-gray-100 rounded-lg overflow-y-auto">
            <div className="px-3 py-2 text font-bold border-b text-green-700 bg-gray-100">TODAY</div>
            {dailyReports
              .slice(0)
              .reverse()
              .filter((item, idx) => moment(item.daily_report_created_at).isSame(new Date(), "day"))
              .map((item, index) => (
                <Cell key={index} item={item} />
              ))}
            <div className="px-3 py-2 text font-bold border-b text-green-700 bg-gray-100">ALL</div>
            {dailyReports.length > 0 ? (
              dailyReports
                .slice(0)
                .reverse()
                .filter((item, idx) => !moment(item.daily_report_created_at).isSame(new Date(), "day"))
                .map((item, index) => <Cell key={index} item={item} />)
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">{t("empty")}</div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default DailyReport;
