import React, { useContext, useState } from "react";
import { BsFileEarmarkRuledFill, BsUpload } from "react-icons/bs";
import DefaultImage from "../assets/default-profile.png";
import { useTranslation } from "react-i18next";
import moment from "moment";
import { AuthContext } from "../utils/authContext";
import FeedbackTable from "./FeedbackTable";

const Feedback = ({ currentRoomData, dailyReports, setDailyReports }) => {
  const { userState } = useContext(AuthContext);
  const { t, i18n } = useTranslation("manageWork");
  moment.locale(i18n.language);
  const [currentFeedback, setCurrentFeedback] = useState(null);
  const [isFeedbackOpen, setFeedbackOpen] = useState(false);
  const uploadedToday =
    dailyReports
      .slice(0)
      .reverse()
      .filter((item, idx) => moment(item.daily_report_created_at).isSame(new Date(), "day")).length > 0;

  const uploadButtonPressed = () => {
    setCurrentFeedback(null);
    setFeedbackOpen(true);
  };

  const specificFeedbackPressed = (item) => {
    setCurrentFeedback(item);
    setFeedbackOpen(true);
  };

  const Header = () => (
    <div className="h-12 w-full bg-white border-b flex items-center px-4 text-sm space-x-2 cursor-default">
      <div className="w-7 h-7 object-cover flex-shrink-0 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden space-x-px">
        {currentRoomData.participants?.map(
          (v, index) =>
            v.user_id !== userState.user.userId && (
              <img
                key={v.user_id}
                onError={({ currentTarget }) => {
                  currentTarget.onerror = null; // prevents looping
                  currentTarget.src = DefaultImage;
                }}
                src={v.user_img || DefaultImage}
                alt=""
                draggable={false}
                className={`${index > 1 ? "h-full w-1/2" : "h-full w-full"} flex object-cover`}
              />
            )
        )}
      </div>
      <p>
        {currentRoomData.participants?.map(
          (v, index) =>
            v.user_id !== userState.user.userId && (
              <span key={v.user_id}>
                {v.user_name}
                {index < currentRoomData.participants.length - 1 && currentRoomData.participants.length > 2 ? ", " : ""}
              </span>
            )
        )}
      </p>
    </div>
  );

  const Cell = ({ item }) => (
    <button
      onClick={() => specificFeedbackPressed(item)}
      className="w-full h-14 bg-white border-b border-l border-r flex items-center pr-4 space-x-4 text-gray-500 group hover:text-blue-500 justify-between hover:bg-gray-50"
    >
      <div className="flex items-center space-x-4">
        <div className="w-14 text-gray-500 flex flex-col items-center justify-center border-r">
          <p style={{ fontSize: "11px" }} className="text-xs">
            {/* {moment(item.daily_report_created_at).format("MMM")} */}
            {moment().format("MMM")}
          </p>
          <p style={{ marginTop: "-2px" }} className="text-sm">
            {/* {moment(item.daily_report_created_at).format("DD")} */}
            {moment().format("DD")}
          </p>
        </div>
        <BsFileEarmarkRuledFill className="w-4 h-4 text-gray-400 group-hover:text-blue-400" />
        <p className="text-sm group-hover:underline">
          {/* {moment(item.daily_report_created_at).format("YYYY.MM.DD_HH:mm")}_{item.daily_report_content.content.author} */}
          {moment().format("YYYY.MM.DD_HH:mm")}_FEEDBACK
        </p>
      </div>
      <div className="flex flex-col items-end">
        <p className="text-xs text-gray-400">
          {/* last edited: {moment(item.daily_report_created_at).format("YYYY.MM.DD a hh:mm")} */}
          last edited: {moment().format("YYYY.MM.DD a hh:mm")}
        </p>
        {/* <p className="text-xs text-gray-400">by {item.daily_report_content.content.author}</p> */}
      </div>
    </button>
  );

  if (isFeedbackOpen) return <FeedbackTable setFeedbackOpen={setFeedbackOpen} currentFeedback={currentFeedback} />;
  else
    return (
      <>
        <div style={{ height: "calc(100vh - 5rem)" }} className="w-full h-screen bg-gray-100">
          <Header />
          <div
            style={{ height: "calc(100vh - 8rem)" }}
            className="w-full h-full overflow-y-auto flex flex-col px-6 pb-4"
          >
            <div className="w-full flex-shrink-0 flex justify-between items-center py-6">
              <p className="text-2xl font-bold">체크사항</p>
              {userState.user.userType === "employee" && (
                <button
                  onClick={uploadButtonPressed}
                  className="flex h-8 px-4 bg-green-700 text-white items-center rounded space-x-2 filter hover:brightness-125"
                >
                  <BsUpload />
                  <p className="text-sm">{t("uploadDailyReport")}</p>
                </button>
              )}
            </div>
            <div className="w-full h-full bg-gray-100 rounded-lg overflow-y-auto">
              <div className="px-3 py-2 text font-bold border-b text-green-700 bg-gray-100 flex items-center space-x-1">
                <p>RECENT</p>
                {!uploadedToday && (
                  <div style={{ fontSize: "10px" }} className="bg-red-500 text-white rounded text-xs px-1">
                    N
                  </div>
                )}
              </div>
              {/* {uploadedToday ? (
                dailyReports
                  .slice(0)
                  .reverse()
                  .map((item, index) => <Cell key={index} item={item} />)
              ) : (
                <div className="w-full h-16 flex items-center justify-center text-gray-400 text-sm">
                  {t("missingReport")}
                </div>
              )} */}
              <Cell />
              <div className="px-3 py-2 text font-bold border-b text-green-700 bg-gray-100">ALL</div>
              {/* {dailyReports.length > 0 ? (
                dailyReports
                  .slice(0)
                  .reverse()
                  .filter((item, idx) => !moment(item.daily_report_created_at).isSame(new Date(), "day"))
                  .map((item, index) => <Cell key={index} item={item} />)
              ) : (
                <div className="w-full py-6 flex items-center justify-center text-gray-400 text-sm">{t("empty")}</div>
              )} */}
              <Cell />
            </div>
          </div>
        </div>
      </>
    );
};

export default Feedback;
