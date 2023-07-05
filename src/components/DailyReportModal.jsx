import "../utils/datePicker.css";
import "react-calendar/dist/Calendar.css";
import "../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import React, { useContext, useState } from "react";
import { Editor } from "react-draft-wysiwyg";
import moment from "moment";
import { useSearchParams } from "react-router-dom";
import { convertFromRaw, EditorState } from "draft-js";
import { RxCross2 } from "react-icons/rx";
import { useTranslation } from "react-i18next";

const DailyReportModal = ({ closeModal, currentReport }) => {
  const { t } = useTranslation("manageWork");
  const [searchParams] = useSearchParams();
  console.log(currentReport);
  const editorState = EditorState.createWithContent(currentReport?.daily_report_content.content.text);

  return (
    <div style={{ width: "900px", height: "calc(100vh - 12rem)" }} className="relative">
      <div className="h-14 w-full border-b flex-shrink-0 flex items-center justify-between text-lg px-6">
        <p>
          {t("dailyReport")} : {moment().format("YYYY-MM-DD")}
        </p>
        <div className="flex items-center space-x-6">
          <button onClick={closeModal} className="py-2">
            <RxCross2 className="w-7 h-7" />
          </button>
        </div>
      </div>
      <div className="p-6 space-y-4">
        <span className="bg-gray-100 rounded-lg p-2 text-sm border">{moment().format("YYYY-MM-DD")}</span>
        {/* <Editor editorState={currentReport?.daily_report_content.content.text} readOnly={true} toolbarHidden /> */}
      </div>
    </div>
  );
};

export default DailyReportModal;
