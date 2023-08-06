import React, { useEffect, useState, useContext } from "react";
import { WebsocketContext } from "../context/websocketContext";
import { useTranslation } from "react-i18next";
import { IoClose } from "react-icons/io5";
import { BiSend } from "react-icons/bi";
import { v4 as uuidv4 } from "uuid";
import { BsCheckCircleFill } from "react-icons/bs";
import moment from "moment";
import { AuthContext } from "../context/authContext";
import { Link, useNavigate } from "react-router-dom";
import DefaultImage from "../assets/default-profile.png";

const ProfileCompose = ({ userId, openComposeModal, closeComposeModal, composeModalIsOpen, developerInfo }) => {
  const { wsRef } = useContext(WebsocketContext);
  const { t, i18n } = useTranslation("profileEmployer");
  const [inputValue, setInputValue] = useState("");
  const [isMessageSent, setMessageSent] = useState();
  const { userState } = useContext(AuthContext);
  const navigate = useNavigate();
  const lang = i18n.language.includes("en") ? "en" : "ko";
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const isMobile = screenWidth <= 768;

  function handleWindowSizeChange() {
    setScreenWidth(window.innerWidth);
  }

  useEffect(() => {
    window.addEventListener("resize", handleWindowSizeChange);
    return () => {
      window.removeEventListener("resize", handleWindowSizeChange);
    };
  }, []);

  const sendMessage = () => {
    setInputValue("");
    setMessageSent(true);

    if (wsRef.current || inputValue.replace(/\s/g, "").length !== 0) {
      wsRef.current.send(
        JSON.stringify({
          message: {
            chat_message_id: uuidv4(),
            chat_message_text: { [lang]: inputValue },
            chat_message_created_at: moment().valueOf(),
            chat_room_id: null,
            chat_participants: [userState.user.userId, userId],
            user: {
              user_id: userState.user.userId,
              user_name: userState.user.userName,
              user_img: userState.user.userImage,
            },
          },
        })
      );
    }
  };

  if (composeModalIsOpen)
    return (
      <div
        style={{ boxShadow: "0 0 4px #00000040", width: isMobile ? "100vw" : "30rem", height: "30rem" }}
        className="fixed bottom-0 right-0 sm:bottom-4 sm:right-4 bg-white rounded shadow-xl filter border z-20"
      >
        <div className="w-full h-24 border-b border-gray-300 flex items-center px-6 space-x-4 relative">
          <img
            onError={({ currentTarget }) => {
              currentTarget.onerror = null; // prevents looping
              currentTarget.src = DefaultImage;
            }}
            src={developerInfo.current?.img || DefaultImage}
            alt=""
            draggable={false}
            className="object-cover w-12 h-12 flex-shrink-0 rounded-full"
          />
          <div className="flex flex-col text-gray-700 w-full items-start">
            <span className="font-bold text-lg">{developerInfo.current.name?.[lang]}</span>
            <span className="text-sm">{t("sendMessage")}</span>
          </div>
          <button onClick={closeComposeModal} className="absolute top-4 right-4 text-gray-400 hover:text-gray-500">
            <IoClose className="w-8 h-8" />
          </button>
        </div>

        {isMessageSent ? (
          <div style={{ height: "23.5rem" }} className="w-full flex flex-col items-center justify-center">
            <BsCheckCircleFill className="w-8 h-8 text-sky-500" />
            <p className="mt-4">{t("sentMessage")}</p>

            <Link to="/chat">
              <button className="bg-green-600 text-white px-8 py-2 rounded-full mt-6">{t("toChat")}</button>
            </Link>
          </div>
        ) : (
          <>
            <textarea
              style={{ height: "18rem", resize: "none" }}
              onChange={(e) => setInputValue(e.target.value)}
              value={inputValue}
              placeholder={t("composePlaceholder")}
              className="w-full h-full flex outline-none p-4 placeholder-gray-500 break-keep"
              autoFocus
            />
            <div className="h-8 px-4 text-sm text-gray-500 flex justify-between">
              <p>{t("atleast40")}</p>
              <p className={`${inputValue.length > 2500 && "text-red-500"}`}>{inputValue.length}/2500</p>
            </div>
            <div className="flex justify-end w-full px-4">
              <button
                onClick={sendMessage}
                disabled={inputValue.length > 2500 || inputValue.length < 31}
                className={`${
                  inputValue.length > 2500 || inputValue.length < 31
                    ? "bg-green-600 bg-opacity-40"
                    : "bg-green-600 hover:bg-green-500"
                } h-10 px-4 text-white rounded text-sm font-bold flex items-center space-x-2`}
              >
                <BiSend className="w-4 h-4" />
                <p>{t("sendMessage")}</p>
              </button>
            </div>
          </>
        )}
      </div>
    );
  else
    return (
      <button
        style={{ boxShadow: "0 6px 12px #00000040" }}
        onClick={userState.isAuthenticated ? openComposeModal : () => navigate("/login")}
        className="fixed bottom-4 right-4 bg-white p-2 pr-8 rounded-full shadow-xl flex items-center space-x-4 filter hover:bg-gray-100 border z-30"
      >
        <img
          onError={({ currentTarget }) => {
            currentTarget.onerror = null; // prevents looping
            currentTarget.src = DefaultImage;
          }}
          src={developerInfo.current?.img || DefaultImage}
          alt=""
          draggable={false}
          className="object-cover w-14 h-14 rounded-full flex-shrink-0"
        />
        <div className="flex flex-col text-gray-700 w-full items-start">
          <span className="font-bold text-lg">{t("sendMessage")}</span>
          <span className="">{developerInfo.current.name?.[lang]}</span>
        </div>
      </button>
    );
};

export default ProfileCompose;
