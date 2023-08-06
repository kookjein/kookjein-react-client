import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useContext, useState } from "react";
import { Route, Routes, useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";
import axios, { AxiosInterceptor } from "./utils/authAxios";
import { AuthContext } from "./context/authContext";
import { WebsocketContext } from "./context/websocketContext";
import useTabActive from "./utils/useTabActive";
import ScrollToTop from "./utils/scrollToTop";
import { ToastContainer, toast } from "react-toastify";
import moment from "moment";
import MainPage from "./pages/MainPage";
import TermsPage from "./pages/TermsPage";
import Privacy from "./pages/Privacy";
import Legal from "./pages/Legal";
import PaymentTerms from "./pages/PaymentTerms";
import ServiceCompany from "./pages/ServiceCompany";
import ServiceDeveloper from "./pages/ServiceDeveloper";
import Pricing from "./pages/Pricing";
import Browse from "./pages/Browse";
import ChatPage from "./pages/ChatPage";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Error404 from "./pages/Error404";
import Company from "./pages/Company";
import Developers from "./pages/Developers";
import Notification from "./components/Notification";
import NotificationSound from "./assets/notification.mp3";
import Navbar from "./components/Navbar";
import StartPost from "./pages/StartPost";
import CreateCompany from "./pages/CreateCompany";
import BrowseJobs from "./pages/BrowseJobs";
import JobPost from "./pages/JobPost";
import ClientMain from "./pages/ClientMain";
import ManagePage from "./pages/ManagePage";

function App() {
  const { userState } = useContext(AuthContext);
  const { wsRef } = useContext(WebsocketContext);
  const [searchParams] = useSearchParams();
  const isTabFocused = useSelector((state) => state.session.isTabFocused);
  const roomIdQuery = searchParams.get("room_id");
  const pathandQuery = window.location.pathname + window.location.search;
  const [newMessage, setNewMessage] = useState(null);
  const [rooms, setRooms] = useState([]);
  const [hasNewMessageBubble, setHasNewMessageBubble] = useState(false);

  useTabActive();

  useEffect(() => {
    if (wsRef.current && userState.isAuthenticated) {
      wsRef.current.onmessage = (e) => {
        const response = JSON.parse(JSON.parse(e.data));
        const audio = new Audio(NotificationSound);
        setNewMessage(response);
        if (!isTabFocused && response.user.user_id !== userState.user.userId) {
          toast(<Notification item={response} />);
          audio.play();
        } else if (
          response.user.user_id !== userState.user.userId &&
          pathandQuery !== `/manage/chat?room_id=${response.chat_room_id}&u=${response.user.user_id}`
        ) {
          toast(<Notification item={response} />);
          audio.play();
          setHasNewMessageBubble(true);
        }

        if (response.user.user_id === userState.user.userId) {
          wsRef.current.send(
            JSON.stringify({
              read: {
                user_id: userState.user.userId,
                chat_room_id: response.chat_room_id,
                chat_last_read_at: moment().valueOf(), // LAST CHAT MESSAGE TIMESTAMP
              },
            })
          );
        }
      };
    }
    return () => {};
  }, [wsRef, userState, pathandQuery, roomIdQuery, isTabFocused]);

  useEffect(() => {
    if (userState.isAuthenticated) {
      axios
        .get(`/v1/chat/rooms`)
        .then((response) => {
          var temp = response.data;
          if (temp.length > 0) {
            for (let i = 0; i < temp.length; i++) {
              temp.sort((a, b) => (a.chat_message_created_at < b.chat_message_created_at ? 1 : -1));
            }
          }
          setRooms(temp);
          temp.map((item) => {
            return item.participants.map((v) => {
              return (
                v.user_id === userState.user.userId &&
                v.last_read_at < item.chat_message_created_at &&
                setHasNewMessageBubble(true)
              );
            });
          });
        })
        .catch((e) => {
          console.log("V1/CHAT/ROOMS ERROR : ", e);
        });
    }
    return () => {
      setHasNewMessageBubble(false);
    };
  }, [userState]);

  if (userState.isAuthenticated)
    return (
      <AxiosInterceptor>
        <ScrollToTop />
        <ToastContainer />
        <Navbar hasNewMessageBubble={hasNewMessageBubble} />
        <Routes>
          <Route path="/*" element={userState.user.userType === "employee" ? <BrowseJobs /> : <ClientMain />} />
          <Route path="/create-company" element={<CreateCompany />} />
          <Route path="/post-job/flow-1" element={<StartPost />} />
          <Route path="/browse-jobs" element={<BrowseJobs />} />
          <Route path="/browse" element={<Browse />} />
          <Route path="/manage" element={<ManagePage />} />
          <Route path="/developers" element={<Developers />} />
          <Route path="/jobs/:jobId" element={<JobPost />} />
          <Route path="/user/:userId" element={<Profile />} />
          <Route path="/company/:companyId" element={<Company />} />
          <Route path="/chat/*" element={<ChatPage newMessage={newMessage} rooms={rooms} setRooms={setRooms} />} />
          <Route path="/service/company" element={<ServiceCompany />} />
          <Route path="/service/developer" element={<ServiceDeveloper />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/legal/" element={<Legal />} />
          <Route path="/legal/terms-of-use" element={<TermsPage />} />
          <Route path="/legal/privacy-policy" element={<Privacy />} />
          <Route path="/legal/payment-terms" element={<PaymentTerms />} />
          <Route path="/error404" element={<Error404 />} />
        </Routes>
      </AxiosInterceptor>
    );
  else
    return (
      <AxiosInterceptor>
        <ScrollToTop />
        <Navbar hasNewMessageBubble={hasNewMessageBubble} />
        <Routes>
          <Route path="/*" element={<MainPage />} />
          <Route path="/browse" element={<Browse />} />
          <Route path="/browse-jobs" element={<BrowseJobs />} />
          <Route path="/developers" element={<Developers />} />
          <Route path="/jobs/:jobId" element={<JobPost />} />
          <Route path="/user/:userId" element={<Profile />} />
          <Route path="/company/:companyId" element={<Company />} />
          <Route path="/service/company" element={<ServiceCompany />} />
          <Route path="/service/developer" element={<ServiceDeveloper />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/legal/" element={<Legal />} />
          <Route path="/legal/terms-of-use" element={<TermsPage />} />
          <Route path="/legal/privacy-policy" element={<Privacy />} />
          <Route path="/legal/payment-terms" element={<PaymentTerms />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/error404" element={<Error404 />} />
        </Routes>
      </AxiosInterceptor>
    );
}

export default App;
