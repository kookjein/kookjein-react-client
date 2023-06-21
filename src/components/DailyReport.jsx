import React, { useState } from "react";
import { BsFileEarmarkRuledFill, BsUpload } from "react-icons/bs";
import Modal from "react-modal";
import DailyReportModal from "../components/DailyReportModal";
import DailyReportUploadModal from "./DailyReportUploadModal";
import DefaultImage from "../assets/default-profile.png";
import { Link } from "react-router-dom";

const DailyReport = ({ chatId }) => {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [uploadModalIsOpen, setUploadModalOpen] = useState(false);

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

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
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

  const Cell = () => (
    <button
      onClick={openModal}
      className="w-full h-14 bg-white border-b flex items-center pr-4 space-x-4 text-gray-500 group hover:text-sky-500 justify-between hover:bg-gray-100"
    >
      <div className="flex items-center space-x-4">
        <div className="w-14 text-gray-500 flex flex-col items-center justify-center border-r">
          <p style={{ fontSize: "10px" }} className="text-xs">
            JUN
          </p>
          <p className="text-xs">15</p>
        </div>
        <BsFileEarmarkRuledFill className="w-4 h-4" />
        <p className="text-sm group-hover:underline">20230613-1607-mohammad-algazali</p>
      </div>
      <div className="flex flex-col items-end">
        <p className="text-xs text-gray-400">last edited: 2023.06.13 4:16pm</p>
        <p className="text-xs text-gray-400">by USERNAME</p>
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
        // ariaHideApp={false}
      >
        <DailyReportUploadModal closeModal={closeUploadModal} />
      </Modal>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        shouldCloseOnOverlayClick={false}
        // ariaHideApp={false}
      >
        <DailyReportModal closeModal={closeModal} />
      </Modal>
      <div style={{ height: "calc(100vh - 5rem)" }} className="w-full h-screen bg-gray-100">
        <Header />

        <div style={{ height: "calc(100vh - 8rem)" }} className="w-full h-full overflow-y-auto flex flex-col px-6 pb-4">
          <div className="w-full flex-shrink-0 flex justify-between items-center py-6">
            <p className="text-2xl font-bold">일일 업무일지</p>
            <button
              onClick={openUploadModal}
              className="flex h-8 px-4 bg-green-700 text-white items-center rounded space-x-2 filter hover:brightness-125"
            >
              <BsUpload />
              <p className="text-sm">일지 업로드</p>
            </button>
          </div>
          <div className="w-full h-full bg-white pr-1 rounded-lg overflow-y-auto shadow-inner border">
            {Array(4)
              .fill(0)
              .map((item) => (
                <Cell />
              ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default DailyReport;
