import React, { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, Route, Routes, useParams, useSearchParams } from "react-router-dom";
import ChatPanel from "../components/ChatPanel";
import DailyReport from "../components/DailyReport";
import Contracts from "../components/Contracts";
import { AiOutlineSearch } from "react-icons/ai";
import { IoMdOpen } from "react-icons/io";
import DefaultImage from "../assets/default-profile.png";
import axios from "../utils/authAxios";
import { AuthContext } from "../utils/authContext";
import moment from "moment";
import Modal from "react-modal";
import Drawer from "react-modern-drawer";
import { RxCross2 } from "react-icons/rx";

const ManageWork = ({ newMessage, rooms, setRooms }) => {
  const { t, i18n } = useTranslation("manageWork");
  const lang = i18n.language.includes("en") ? "en" : "ko";
  moment.locale(i18n.language);
  const { userState } = useContext(AuthContext);
  const { chatId } = useParams();
  const [searchParams] = useSearchParams();
  const roomIdQuery = searchParams.get("room_id");
  const receiverIdQuery = searchParams.get("u");
  const [currentRoomData, setCurrentRoomData] = useState({});
  const [coworkers, setCoworkers] = useState([]);
  const [dailyReports, setDailyReports] = useState([]);
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const isMobile = screenWidth <= 768;

  function handleWindowSizeChange() {
    setScreenWidth(window.innerWidth);
  }

  const toggleDrawer = () => {
    setDrawerOpen((prevState) => !prevState);
  };

  useEffect(() => {
    window.addEventListener("resize", handleWindowSizeChange);
    return () => {
      window.removeEventListener("resize", handleWindowSizeChange);
    };
  }, []);

  useEffect(() => {
    Modal.setAppElement("body");
    return () => {};
  }, []);

  useEffect(() => {
    if (userState.user.userType === "employee") {
      axios
        .get(`/v1/work/belong/employers`)
        .then((response) => {
          setCoworkers(response.data);
        })
        .catch((e) => {
          console.log("V1/WORK/BELONG/EMPLOYERS ERROR : ", e);
        });
    } else {
      axios
        .get(`/v1/work/belong/employees`)
        .then((response) => {
          setCoworkers(response.data);
        })
        .catch((e) => {
          console.log("V1/WORK/BELONG/EMPLOYEES ERROR : ", e);
        });
    }
    return () => {};
  }, [userState]);

  useEffect(() => {
    if (rooms) {
      for (let i = 0; i < rooms.length; i++) {
        if (`${rooms[i].chat_room_id}` === roomIdQuery) {
          setCurrentRoomData(rooms[i]);
        }
      }
    }
    return () => {};
  }, [rooms, roomIdQuery]);

  useEffect(() => {
    var roomsDuplicate = [...rooms];
    if (roomsDuplicate.length > 0) {
      for (let i = 0; i < roomsDuplicate.length; i++) {
        if (roomsDuplicate?.[i]?.chat_room_id === newMessage?.chat_room_id) {
          roomsDuplicate[i].chat_message_created_at = newMessage.chat_message_created_at;
          roomsDuplicate[i].chat_message_text = newMessage.chat_message_text;
          roomsDuplicate.sort((a, b) => (a.chat_message_created_at < b.chat_message_created_at ? 1 : -1));
        } else {
          roomsDuplicate.sort((a, b) => (a.chat_message_created_at < b.chat_message_created_at ? 1 : -1));
        }
      }
    }
    setRooms(roomsDuplicate);
    return () => {};
    /* eslint-disable */
  }, [newMessage]);
  /* eslint-enable */

  useEffect(() => {
    currentRoomData &&
      coworkers &&
      currentRoomData.participants?.map((v) => {
        return (
          v.user_id !== userState.user.userId &&
          coworkers.map((item2) => {
            return (
              v.user_id === item2.user_id &&
              axios
                .get(`/v1/work/daily-report/all`, {
                  params: {
                    employee_id: userState.user.userType === "employee" ? userState.user.userId : receiverIdQuery,
                    employer_id: userState.user.userType === "employee" ? receiverIdQuery : userState.user.userId,
                  },
                })
                .then((response) => {
                  setDailyReports(response.data);
                })
                .catch((e) => {
                  console.log("V1/WORK/DAILY_REPORT/ALL ERROR : ", e);
                })
            );
          })
        );
      });

    return () => {};
  }, [receiverIdQuery, userState, coworkers, currentRoomData]);

  const LeftPanel = () => {
    const [filterString, setFilterString] = useState("");

    const Cell = ({ item }) => {
      const [hasNewMessage, setHasNewMessage] = useState(false);
      const [receiverId, setReceiverId] = useState(receiverIdQuery);

      useEffect(() => {
        for (let i = 0; i < item.participants.length; i++) {
          if (item.participants[i].user_id === userState.user.userId) {
            if (item.participants[i].last_read_at < item.chat_message_created_at) {
              setHasNewMessage(true);
            }
          } else if (item.participants[i].user_id !== userState.user.userId) {
            setReceiverId(item.participants[i].user_id);
          }
        }
        return () => {};
      }, [item]);

      return (
        <Link to={`/chat?room_id=${item.chat_room_id}&u=${receiverId}`} className="w-full relative">
          <span className="text-xs flex-shrink-0 absolute top-3 right-2 text-gray-500"></span>
          <button
            className={`${
              roomIdQuery === `${item.chat_room_id}` ? "bg-gray-200" : "bg-white hover:bg-gray-100"
            } w-full h-16 flex items-center px-4 space-x-3 transition`}
          >
            <div className="w-10 h-10 object-cover flex-shrink-0 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden space-x-px">
              {item.participants.map(
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

            <div style={{ width: "75%" }} className="flex flex-col items-start space-y-px flex-shrink-0">
              <div className="flex items-center space-x-2">
                <p
                  style={{
                    width: "100%",
                    overflow: "hidden",
                    whiteSpace: "nowrap",
                    textOverflow: "ellipsis",
                  }}
                  className={`${hasNewMessage ? "font-bold" : "text-gray-600"} text-sm w-full text-left`}
                >
                  {item.participants.map(
                    (v, index) =>
                      v.user_id !== userState.user.userId && (
                        <span key={v.user_id}>
                          {v?.user_name}
                          {index < item.participants.length - 1 && item.participants.length > 2 ? ", " : ""}
                        </span>
                      )
                  )}
                </p>
                {hasNewMessage && <div className="w-2.5 h-2.5 bg-blue-400 flex-shrink-0 rounded-full"></div>}
              </div>
              <div style={{ width: "100%" }} className="flex space-x-1">
                <p
                  style={{
                    // width: "100%",
                    overflow: "hidden",
                    whiteSpace: "nowrap",
                    textOverflow: "ellipsis",
                  }}
                  className={`${hasNewMessage ? "text-black" : "text-gray-400"} text-xs text-start`}
                >
                  {item.chat_message_text[lang]}
                </p>
                <p className={`${hasNewMessage ? "text-black" : "text-gray-400"} text-xs text-start flex-shrink-0`}>
                  · {moment(item.chat_message_created_at).fromNow()}
                </p>
              </div>
            </div>
          </button>
        </Link>
      );
    };

    return (
      <div
        style={{ height: "calc(100svh - 4rem)", color: "#272D37" }}
        className="w-screen sm:w-80 flex border-r flex-col items-center flex-shrink-0 overflow-y-auto bg-white border-l"
      >
        <div className="border-b w-full h-12 px-4 py-2 flex items-center space-x-2">
          <AiOutlineSearch className="text-gray-500" />
          <input
            className="w-full h-full outline-none bg-transparent"
            placeholder={t("searchPlaceholder")}
            value={filterString}
            onChange={(e) => setFilterString(e.target.value)}
          />
        </div>
        <div className="py-2 w-full px-3 text-sm font-bold text-gray-500">
          <p>{userState.user.userType === "employer" ? t("employee") : t("employer")}</p>
        </div>
        {rooms
          .filter((item) => {
            return coworkers.map((item2) => {
              return item.participants[0]?.user_id === userState.user.userId
                ? item.participants[1]?.user_id === item2.user_id
                : item.participants[0]?.user_id === item2.user_id;
            })[0];
          })
          .filter((item) => {
            return item.participants[0]?.user_id === userState.user.userId
              ? item.participants[1]?.user_name.includes(filterString)
              : item.participants[0]?.user_name.includes(filterString);
          })
          .map((item) => (
            <Cell key={item.chat_room_id} item={item} />
          ))}
        <div className="py-2 w-full px-3 text-sm font-bold text-gray-500 border-t">
          <p>{t("all")}</p>
        </div>
        {rooms
          .filter((item) => {
            return !coworkers.map((item2) => {
              return item.participants[0]?.user_id === userState.user.userId
                ? item.participants[1]?.user_id === item2.user_id
                : item.participants[0]?.user_id === item2.user_id;
            })[0];
          })
          .filter((item) => {
            return item.participants[0]?.user_id === userState.user.userId
              ? item.participants[1]?.user_name.includes(filterString)
              : item.participants[0]?.user_name.includes(filterString);
          })
          .map((item) => (
            <Cell key={item.chat_room_id} item={item} />
          ))}
      </div>
    );
  };

  const RightPanel = ({ currentRoomData }) => {
    const ProfileSection = () => {
      return (
        <div className="flex flex-col items-center space-y-3 group mb-4">
          <Link to={`/user/${receiverIdQuery}`} className="flex flex-col items-center space-y-3">
            <button className="w-28 h-28 bg-gray-100 rounded-full overflow-hidden flex-shrink-0 relative">
              <div className="w-full h-full bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 text-white flex items-center justify-center absolute">
                <IoMdOpen className="w-8 h-8" />
              </div>
              <div className="w-full h-full object-cover flex-shrink-0 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden space-x-px">
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
            </button>
            <button>
              <p className="text-xl group-hover:underline transition mt-2">
                {currentRoomData.participants?.map(
                  (v, index) =>
                    v.user_id !== userState.user.userId && (
                      <span key={v.user_id}>
                        {v.user_name}
                        {index < currentRoomData.participants.length - 1 && currentRoomData.participants.length > 2
                          ? ", "
                          : ""}
                      </span>
                    )
                )}
              </p>
              <div className="flex justify-center px-4 mt-2">
                <p className="text-center text-xs line-clamp-2">안녕하세요 남산컴퍼니 / 국제인 대표 장동해입니다.</p>
              </div>
            </button>
          </Link>
        </div>
      );
    };
    return (
      <div
        style={{ height: "calc(100svh - 4rem)", color: "#272D37" }}
        className="w-80 flex border-r border-l flex-col items-center flex-shrink-0 overflow-y-auto bg-white"
      >
        <div className="w-full flex flex-col items-center pt-8 h-full">
          <div className="w-full flex flex-col items-center h-full">
            <ProfileSection />
            <div className="px-6 w-full mt-6">
              {userState.user.userType === "employer" && (
                <button
                  onClick={toggleDrawer}
                  className="bg-green-700 text-white filter hover:brightness-125 py-2 rounded-full transition font-semibold text-sm w-full"
                >
                  채용 제안서 보내기
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const StartPanel = () => {
    return (
      <div className="w-full border-r flex items-center justify-center bg-gray-200">
        <div className="select-none rounded-full bg-black bg-opacity-50 px-4 py-1 text-sm text-white">
          {t("startText")}
        </div>
      </div>
    );
  };

  if (isMobile)
    return (
      <div
        style={{ height: "100svh" }}
        className="w-full h-full flex flex-col items-center overflow-x-hidden bg-gray-100"
      >
        <div style={{ maxWidth: "1480px" }} className="w-full h-full flex">
          <Routes>
            <Route path="/" element={<LeftPanel />} />
          </Routes>

          <Routes>
            <Route
              path="/chat"
              element={
                <ChatPanel
                  roomId={roomIdQuery}
                  currentRoomData={currentRoomData}
                  rooms={rooms}
                  setRooms={setRooms}
                  newMessage={newMessage}
                />
              }
            />
            <Route
              path="/report"
              element={
                <DailyReport
                  currentRoomData={currentRoomData}
                  setDailyReports={setDailyReports}
                  dailyReports={dailyReports}
                />
              }
            />
            <Route path="/documents" element={<Contracts chatId={chatId} currentRoomData={currentRoomData} />} />
            <Route path="/" element={<StartPanel />} />
          </Routes>
        </div>
      </div>
    );
  else
    return (
      <div
        style={{ height: "calc(100svh - 4rem)" }}
        className="w-full h-full flex flex-col items-center overflow-x-hidden bg-gray-100"
      >
        <Drawer open={isDrawerOpen} onClose={toggleDrawer} direction="right" size={450}>
          <div className="w-full h-16 border-b flex items-center justify-between px-6">
            <p className="text-gray-700">채용 신청</p>
            <button onClick={toggleDrawer}>
              <RxCross2 className="w-7 h-7" />
            </button>
          </div>
          <div className="p-6">
            <p className="text-xl">인사말/간단한 소개</p>
            <input className="w-full h-32 border rounded mt-4" />

            <p className="text-xl mt-4">내 프로젝트</p>
            <div className="w-full h-24 rounded bg-gray-100 mt-4 flex items-center justify-center text-blue-500">
              선택하기
            </div>

            <p className="text-xl mt-4">어시스턴트 옵션</p>
            <div className="w-full py-4 border mt-4 p-4">
              <div className="flex justify-between w-full">
                <div>
                  <p className="text-xl">무료플랜</p>
                  <p className="text-sm text-gray-500 mt-2">₩0원/월</p>
                </div>
                <div className="text-sm text-gray-600">
                  <p>고객 지원 및 분쟁 해결</p>
                  <p>개발자 매칭 시 마일스톤 검증</p>
                </div>
              </div>
            </div>
            <div className="w-full py-4 border mt-4 p-4">
              <div className="flex justify-between w-full">
                <div>
                  <p className="text-xl">스탠다드 플랜</p>
                  <p className="text-sm text-gray-500 mt-2">₩40만원/월</p>
                </div>
                <div className="text-sm text-gray-600">
                  <p>고객 지원 및 분쟁 해결</p>
                  <p>개발자 매칭 시 마일스톤 검증</p>
                </div>
              </div>
            </div>
            <div className="w-full py-4 border mt-4 p-4">
              <div className="flex justify-between w-full">
                <div>
                  <p className="text-xl">엔터프라이즈 플랜</p>
                  <p className="text-sm text-gray-500 mt-2">₩160만F원/월</p>
                </div>
                <div className="text-sm text-gray-600">
                  <p>고객 지원 및 분쟁 해결</p>
                  <p>개발자 매칭 시 마일스톤 검증</p>
                </div>
              </div>
            </div>
            <div className="absolute bottom-0 h-24 border-t w-full bg-gray-100 -ml-6 p-4 flex items-center justify-end">
              <button className="h-9 px-6 bg-green-600 text-white rounded hover:brightness-125">채용 제안서 보내기</button>
            </div>
          </div>
        </Drawer>
        <div style={{ maxWidth: "1480px", height: "calc(100svh - 4rem)" }} className="w-full flex">
          <LeftPanel />
          {roomIdQuery && currentRoomData ? (
            <>
              <ChatPanel
                roomId={roomIdQuery}
                currentRoomData={currentRoomData}
                rooms={rooms}
                setRooms={setRooms}
                newMessage={newMessage}
              />
              <RightPanel currentRoomData={currentRoomData} dailyReports={dailyReports} />
            </>
          ) : (
            <StartPanel />
          )}
        </div>
      </div>
    );
};

export default ManageWork;
