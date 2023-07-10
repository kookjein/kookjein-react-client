import React, { useContext } from "react";
import { AiOutlineDownload } from "react-icons/ai";
import { IoDocumentAttachOutline } from "react-icons/io5";
import DefaultImage from "../assets/default-profile.png";
import { useTranslation } from "react-i18next";
import { AuthContext } from "../utils/authContext";

const Contracts = ({ currentRoomData }) => {
  const { t } = useTranslation("manageWork");
  const { userState } = useContext(AuthContext);

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

  const Cell = ({ title }) => (
    <button className="group flex flex-col items-start">
      <div
        style={{ aspectRatio: 1 }}
        className="w-full rounded flex items-center justify-center bg-gray-100 border group-hover:bg-gray-200"
      >
        <IoDocumentAttachOutline className="w-16 h-16 text-gray-400 group-hover:hidden" />
        <AiOutlineDownload className="w-16 h-16 text-green-600 group-hover:flex hidden" />
      </div>
      <div className="mt-3 px-1 space-y-2 text-xs flex flex-col items-start w-full">
        <p className="font-bold  group-hover:underline">{title}</p>
        <p className="">COMPANY - EMPLOYEE</p>
        <p className="text-gray-500">2023.06.23</p>
      </div>
    </button>
  );

  return (
    <div style={{ height: "calc(100vh - 5rem)" }} className="w-full h-screen bg-white">
      <Header />

      <div style={{ height: "calc(100vh - 8rem)" }} className="w-full overflow-y-auto pb-12 px-6 pb-4 bg-gray-100">
        <div className="w-full flex-shrink-0 flex justify-between items-center py-6">
          <p className="text-2xl font-bold">{t("contract")}</p>
        </div>
        <div className="grid grid-cols-4 grid-rows-2 w-full gap-4 bg-white rounded-lg border p-4">
          <Cell title="Non-disclosure agreement" />
          <Cell title="Employement contract" />
          <Cell title="Milestone agreement" />
        </div>
      </div>
    </div>
  );
};

export default Contracts;
