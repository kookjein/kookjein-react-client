import React, { useEffect } from "react";
import { RxCross2 } from "react-icons/rx";
// import { AuthContext } from "../utils/authContext";
// import axios from "../utils/authAxios";
// import { languageArray } from "../utils/arrays";
import "../utils/datePicker.css";
import "react-calendar/dist/Calendar.css";
// import { useTranslation } from "react-i18next";

const DailyReportModal = ({ closeModal }) => {
  // const { userState } = useContext(AuthContext);
  // const { t } = useTranslation("companyCreateModal");

  useEffect(() => {
    console.log("MODAL OPEN");
    return () => {
      console.log("MODAL CLOSED");
    };
  }, []);

  return (
    <div style={{ width: "900px", height: "calc(100vh - 8rem)" }} className="">
      <div className="h-14 w-full border-b flex-shrink-0 flex items-center justify-between text-lg px-6">
        <p>일일 업무일지</p>
        <div className="flex items-center space-x-6">
          <button onClick={closeModal} className="py-2">
            <RxCross2 className="w-7 h-7" />
          </button>
        </div>
      </div>
      <div style={{ height: "calc(100vh - 11.5rem)" }} className="flex overflow-y-auto"></div>
    </div>
  );
};

export default DailyReportModal;
