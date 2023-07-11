import "../utils/datePicker.css";
import "react-calendar/dist/Calendar.css";
import "../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import React, { useEffect, useState } from "react";
import { Editor } from "react-draft-wysiwyg";
import moment from "moment";
import { convertFromRaw, EditorState } from "draft-js";
import { RxCross2 } from "react-icons/rx";
import { useTranslation } from "react-i18next";

const DailyReportModal = ({ closeModal, currentReport }) => {
  const { t, i18n } = useTranslation("manageWork");
  const lang = i18n.language.includes("en") ? "en" : "ko";

  const [editorState, setEditorState] = useState();
  const [isLoading, setLoading] = useState(true);
  const author = currentReport.daily_report_content.content.author;

  useEffect(() => {
    let reportCopy = JSON.parse(JSON.stringify(currentReport));
    reportCopy.daily_report_content.content.report.blocks.map((value) => {
      value.text = value.text?.[lang];
      return value;
    });
    setEditorState(EditorState.createWithContent(convertFromRaw(reportCopy.daily_report_content.content.report)));
    setLoading(false);
    return () => {};
  }, [lang, currentReport]);

  if (!isLoading)
    return (
      <div style={{ width: "900px", height: "calc(100vh - 12rem)" }} className="relative">
        <div className="h-14 w-full border-b flex-shrink-0 flex items-center justify-between font-bold px-6">
          <p>
            {t("dailyReport")} : {moment().format("YYYY-MM-DD")}
          </p>
          <div className="flex items-center space-x-6">
            <button onClick={closeModal} className="py-2">
              <RxCross2 className="w-7 h-7" />
            </button>
          </div>
        </div>
        <div
          style={{ height: "calc(100vh - 15.5rem)" }}
          className="rounded h-full cursor-default overflow-y-auto p-6 px-10"
        >
          <p className="text-2xl">
            {moment().format("Mo Do")} {t("report")}
          </p>
          <p className="mt-3 mb-5 text-gray-500">by {author}</p>
          <Editor editorState={editorState} readOnly={true} toolbarHidden />
        </div>
      </div>
    );
};

export default DailyReportModal;
