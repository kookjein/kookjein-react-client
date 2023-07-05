import "../utils/datePicker.css";
import "react-calendar/dist/Calendar.css";
import "../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import React from "react";
import { Editor } from "react-draft-wysiwyg";
import moment from "moment";
import { convertFromRaw, EditorState } from "draft-js";
import { RxCross2 } from "react-icons/rx";
import { useTranslation } from "react-i18next";

const DailyReportModal = ({ closeModal, currentReport }) => {
  const { t } = useTranslation("manageWork");
  const editorState = EditorState.createWithContent(convertFromRaw(currentReport.daily_report_content.content.text));
  const author = currentReport.daily_report_content.content.author;

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
      <div style={{ height: "calc(100vh - 15.5rem)" }} className="p-6 space-y-4">
        <span className="bg-gray-100 rounded-lg p-2 text-sm border">
          {moment().format("YYYY-MM-DD")} - {author}
        </span>
        <div style={{ height: "calc(100vh - 22rem)" }} className="px-6 border rounded h-full bg-gray-100 cursor-default overflow-y-auto">
          <Editor editorState={editorState} readOnly={true} toolbarHidden />
        </div>
      </div>
    </div>
  );
};

export default DailyReportModal;
