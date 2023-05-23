import "./App.css";
import "./gradientAnimation.css";
import { Navigate, Route, Routes } from "react-router-dom";
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

function App() {
  const { userState } = useContext(AuthContext);
  return (
    <AxiosInterceptor>
      <Routes>
        <Route path="/*" element={userState.isAuthenticated ? <Browse /> : <MainPage />} />
        <Route path="/browse" element={userState.isAuthenticated ? <Navigate to="/" replace /> : <Browse />} />
        <Route path="/user/:userId" element={<Profile />} />
        <Route path="/work-post/*" element={userState.isAuthenticated ? <WorkPost /> : <Navigate to="/" replace />} />
        <Route path="/manage" element={userState.isAuthenticated ? <ManageWork /> : <Navigate to="/" replace />} />
        <Route path="/manage/:chatId/*" element={userState.isAuthenticated ? <ManageWork /> : <Navigate to="/" replace />} />
        <Route path="/service/company" element={<ServiceCompany />} />
        <Route path="/service/developer" element={<ServiceDeveloper />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="legal/" element={<Legal />} />
        <Route path="legal/terms-of-use" element={<TermsPage />} />
        <Route path="legal/privacy-policy" element={<Privacy />} />
        <Route path="legal/payment-terms" element={<PaymentTerms />} />
        <Route path="/login" element={userState.isAuthenticated ? <Navigate to="/" replace /> : <Login />} />
        <Route path="/signup" element={userState.isAuthenticated ? <Navigate to="/" replace /> : <Signup />} />
      </Routes>
    </AxiosInterceptor>
  );
}

export default App;
