import React, { useEffect, useState } from "react";
import { RxCross2 } from "react-icons/rx";
// import { AuthContext } from "../utils/authContext";
// import axios from "../utils/authAxios";
// import { languageArray } from "../utils/arrays";
import "../utils/datePicker.css";
import "react-calendar/dist/Calendar.css";
import { Editor } from "react-draft-wysiwyg";
import "../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { convertToRaw, EditorState } from "draft-js";
import moment from "moment";

// import { useTranslation } from "react-i18next";

const DailyReportUploadModal = ({ closeModal }) => {
  // const { userState } = useContext(AuthContext);
  // const { t } = useTranslation("companyCreateModal");
  const [editorState, setEditorState] = useState(() => EditorState.createEmpty());

  useEffect(() => {
    console.log("MODAL OPEN");
    return () => {
      console.log("MODAL CLOSED");
    };
  }, []);

  const onEditorStateChange = (editorState) => {
    console.log(JSON.stringify(convertToRaw(editorState.getCurrentContent())));
    setEditorState(editorState);
  };

  return (
    <div style={{ width: "900px", height: "calc(100vh - 12rem)" }} className="relative">
      <div className="h-14 w-full border-b flex-shrink-0 flex items-center justify-between text-lg px-6">
        <p>일일 업무일지 : {moment().format("YYYY-MM-DD")}</p>
        <div className="flex items-center space-x-6">
          <button onClick={closeModal} className="py-2">
            <RxCross2 className="w-7 h-7" />
          </button>
        </div>
      </div>
      <div className="p-6 space-y-4">
        <span className="bg-gray-100 rounded-lg p-2 text-sm border">{moment().format("YYYY-MM-DD")}</span>

        <Editor
          editorState={editorState}
          toolbarStyle={{
            borderColor: "#e2e2e2",
            borderRadius: "0.3rem",
            paddingLeft: 16,
            paddingRight: 16,
          }}
          wrapperStyle={{ height: "calc(100vh - 28rem)" }}
          wrapperClassName=""
          editorClassName="px-6 border rounded bg-white"
          toolbarClassName="px-6"
          onEditorStateChange={onEditorStateChange}
          handlePastedText={() => false}
          toolbar={{
            options: ["inline", "list", "textAlign", "history"],
          }}
        />
      </div>
      <div className="w-full h-16 bg-gray-100 absolute bottom-0 px-8 flex justify-end items-center">
        <button
          className={`${
            false
              ? "bg-gray-200 text-gray-400 hover:bg-gray-100"
              : "bg-green-700 text-white filter hover:brightness-125"
          } border w-24 py-2 rounded transition font-semibold text-sm`}
        >
          Upload
        </button>
      </div>
    </div>
  );
};

export default DailyReportUploadModal;
