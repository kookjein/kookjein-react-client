import "./App.css";
import "./gradientAnimation.css";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useContext, useState } from "react";
import { Navigate, Route, Routes, useSearchParams } from "react-router-dom";
import { AxiosInterceptor } from "./utils/authAxios";
import { AuthContext } from "./utils/authContext";
import { WebsocketContext } from "./utils/websocketContext";
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
import ManageWork from "./pages/ManageWork";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import WorkPost from "./pages/WorkPost";
import Error404 from "./pages/Error404";
import Company from "./pages/Company";
import Developers from "./pages/Developers";
import Notification from "./components/Notification";
import NotificationSound from "./assets/notification.mp3";

function App() {
  const { userState } = useContext(AuthContext);
  const { wsRef } = useContext(WebsocketContext);
  const isTabActive = useTabActive();
  const [searchParams] = useSearchParams();
  const roomIdQuery = searchParams.get("room_id");
  const pathandQuery = window.location.pathname + window.location.search;
  const [newMessage, setNewMessage] = useState(null);

  useEffect(() => {
    if (wsRef.current && userState.isAuthenticated) {
      wsRef.current.onmessage = (e) => {
        const response = JSON.parse(JSON.parse(e.data));
        const audio = new Audio(NotificationSound);
        setNewMessage(response);
        if (!isTabActive && response.user.user_id !== userState.user.userId) {
          toast(<Notification item={response} />);
          audio.play();
        } else if (
          response.user.user_id !== userState.user.userId &&
          pathandQuery !== `/manage/chat?room_id=${response.chat_room_id}&u=${response.user.user_id}`
        ) {
          toast(<Notification item={response} />);
          audio.play();
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
  }, [wsRef, userState, pathandQuery, roomIdQuery, isTabActive]);

  return (
    <AxiosInterceptor>
      <ScrollToTop />
      <ToastContainer />
      <Routes>
        <Route path="/*" element={userState.isAuthenticated ? <Browse /> : <MainPage />} />
        <Route path="/browse" element={userState.isAuthenticated ? <Navigate to="/" replace /> : <Browse />} />
        <Route path="/developers" element={<Developers />} />
        <Route path="/user/:userId" element={<Profile />} />
        <Route path="/company/:companyId" element={<Company />} />
        <Route path="/work-post/*" element={userState.isAuthenticated ? <WorkPost /> : <Navigate to="/" replace />} />
        <Route
          path="/manage/*"
          element={userState.isAuthenticated ? <ManageWork newMessage={newMessage} /> : <Navigate to="/" replace />}
        />
        <Route path="/service/company" element={<ServiceCompany />} />
        <Route path="/service/developer" element={<ServiceDeveloper />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="legal/" element={<Legal />} />
        <Route path="legal/terms-of-use" element={<TermsPage />} />
        <Route path="legal/privacy-policy" element={<Privacy />} />
        <Route path="legal/payment-terms" element={<PaymentTerms />} />
        <Route path="/login" element={userState.isAuthenticated ? <Navigate to="/" replace /> : <Login />} />
        <Route path="/signup" element={userState.isAuthenticated ? <Navigate to="/" replace /> : <Signup />} />
        <Route path="/error404" element={<Error404 />} />
      </Routes>
    </AxiosInterceptor>
  );
}

export default App;
