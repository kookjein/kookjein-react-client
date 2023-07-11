import "../utils/datePicker.css";
import "react-calendar/dist/Calendar.css";
import "../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import React, { useContext, useState } from "react";
import { Editor } from "react-draft-wysiwyg";
import { convertToRaw, EditorState } from "draft-js";
import moment from "moment";
import { useSearchParams } from "react-router-dom";
import axios from "../utils/authAxios";
import { AiFillCheckCircle } from "react-icons/ai";
import { RxCross2 } from "react-icons/rx";
import { useTranslation } from "react-i18next";
import { AuthContext } from "../utils/authContext";

const DailyReportUploadModal = ({ closeModal, dailyReports, setDailyReports }) => {
  const { t } = useTranslation("manageWork");
  const { userState } = useContext(AuthContext);
  const [searchParams] = useSearchParams();
  const receiverIdQuery = searchParams.get("u");
  const [editorState, setEditorState] = useState(() => EditorState.createEmpty());
  const [currentState, setCurrentState] = useState("disabled");

  const onEditorStateChange = (editorState) => {
    if (editorState.getCurrentContent().getPlainText().trim().length > 0) {
      setCurrentState("ready");
    }
    setEditorState(editorState);
  };

  const uploadReport = () => {
    setCurrentState("loading");

    var langBasedText = convertToRaw(editorState.getCurrentContent());

    langBasedText.blocks.map((value) => {
      value.text = {
        [userState.user.userLanguage]: value.text,
      };
      return value;
    });

    axios
      .post(
        `/v1/work/daily-report`,
        {
          content: {
            author: userState.user.userName,
            report: langBasedText,
          },
        },
        {
          params: { employer_id: parseInt(receiverIdQuery) },
        }
      )
      .then((response) => {
        setCurrentState("complete");
        console.log(response.data);
        setDailyReports((prevState) => [...prevState, response.data]);
      })
      .catch((error) => {
        console.log("EDIT COMPANY ERROR: ", error);
        setCurrentState("ready");
      });
  };
  if (currentState === "complete")
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
        <div
          style={{ width: "900px", height: "calc(100vh - 16rem)" }}
          className="space-y-4 w-full flex flex-col items-center justify-center"
        >
          <AiFillCheckCircle className="text-green-500 w-8 h-8" />
          <span className="text-sm">
            {moment().format("YYYY-MM-DD")} {t("dailyWorkReportUploaded")}
          </span>

          <button onClick={closeModal} className="w-24 h-8 border rounded-lg text-sm text-gray-700 hover:bg-gray-100">
            {t("close")}
          </button>
        </div>
      </div>
    );
  else
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
          {currentState === "loading" && <p className="text-sm text-green-600 mr-3">Just a second. We're translating your report...</p>}
          <button
            onClick={uploadReport}
            disabled={currentState !== "ready"}
            className={`${
              currentState !== "ready"
                ? "bg-gray-200 text-gray-400"
                : "bg-green-700 text-white filter hover:brightness-125"
            } border px-4 py-2 rounded transition font-semibold text-sm`}
          >
            {currentState === "loading" ? (
              <div className="animate-ping h-6 w-6 rounded-full bg-white mx-4" />
            ) : (
              t("uploadDailyReport")
            )}
          </button>
        </div>
      </div>
    );
};

export default DailyReportUploadModal;
