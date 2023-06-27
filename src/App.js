import "./App.css";
import "./gradientAnimation.css";
import { Link, Navigate, Route, Routes, useSearchParams } from "react-router-dom";
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
import { AxiosInterceptor } from "./utils/authAxios";
import { useContext } from "react";
import { AuthContext } from "./utils/authContext";
import WorkPost from "./pages/WorkPost";
import Error404 from "./pages/Error404";
import Company from "./pages/Company";
import Developers from "./pages/Developers";
import { useEffect } from "react";
import { WebsocketContext } from "./utils/websocketContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DefaultImage from "./assets/default-profile.png";

function App() {
  const { userState } = useContext(AuthContext);
  const { wsRef } = useContext(WebsocketContext);
  const [searchParams] = useSearchParams();
  const roomIdQuery = searchParams.get("room_id");
  const pathandQuery = window.location.pathname + window.location.search;

  useEffect(() => {
    if (wsRef.current && userState.isAuthenticated) {
      wsRef.current.onmessage = (e) => {
        const response = JSON.parse(JSON.parse(e.data));
        console.log(response);
        if (
          response.user.user_id !== userState.user.userId &&
          pathandQuery !== `/manage/chat?room_id=${response.chat_room_id}&u=${response.user.user_id}`
        ) {
          toast(<Notification item={response} />);
        }
      };
    }
    return () => {};
  }, [wsRef, userState, pathandQuery, roomIdQuery]);

  const Notification = ({ item }) => {
    return (
      <Link to={`/manage/chat?room_id=${item.chat_room_id}&u=${item.user.user_id}`} className="w-full">
        <button className="w-full h-14 flex items-center space-x-3 transition bg-white">
          <div className="w-10 h-10 object-cover flex-shrink-0 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden space-x-px">
            <img
              onError={({ currentTarget }) => {
                currentTarget.onerror = null; // prevents looping
                currentTarget.src = DefaultImage;
              }}
              src={item.user.user_img || DefaultImage}
              alt=""
              draggable={false}
              className={`h-full w-full flex object-cover`}
            />
          </div>

          <div style={{ width: "75%" }} className="flex flex-col items-start space-y-px">
            <p
              style={{
                width: "100%",
                overflow: "hidden",
                whiteSpace: "nowrap",
                textOverflow: "ellipsis",
              }}
              className={`text-gray-600 text-sm w-full text-left`}
            >
              {item.user.user_name}
            </p>
            <p
              style={{
                width: "100%",
                overflow: "hidden",
                whiteSpace: "nowrap",
                textOverflow: "ellipsis",
              }}
              className={`text-gray-400 text-xs text-start`}
            >
              {item.chat_message_text}
            </p>
          </div>
        </button>
      </Link>
    );
  };

  return (
    <AxiosInterceptor>
      <ToastContainer />

      <Routes>
        <Route path="/*" element={userState.isAuthenticated ? <Browse /> : <MainPage />} />
        <Route path="/browse" element={userState.isAuthenticated ? <Navigate to="/" replace /> : <Browse />} />
        <Route path="/developers" element={<Developers />} />
        <Route path="/user/:userId" element={<Profile />} />
        <Route path="/company/:companyId" element={<Company />} />
        <Route path="/work-post/*" element={userState.isAuthenticated ? <WorkPost /> : <Navigate to="/" replace />} />
        <Route path="/manage/*" element={userState.isAuthenticated ? <ManageWork /> : <Navigate to="/" replace />} />
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
