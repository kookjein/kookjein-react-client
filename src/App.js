import "./App.css";
import "./gradientAnimation.css";
import { Route, Routes } from "react-router-dom";
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
import DeveloperProfile from "./pages/DeveloperProfile";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { AxiosInterceptor } from "./utils/authAxios";
import { useContext } from "react";
import { AuthContext } from "./utils/authContext";

function App() {
  const { userState } = useContext(AuthContext);
  return (
    <AxiosInterceptor>
      <Routes>
        <Route path="/*" element={userState.isAuthenticated ? <Browse /> : <MainPage />} />
        <Route path="/browse" element={<Browse />} />
        <Route path="/user/:userId" element={<DeveloperProfile />} />
        <Route path="/manage" element={<ManageWork />} />
        <Route path="/manage/:chatId/*" element={<ManageWork />} />
        <Route path="/service/company" element={<ServiceCompany />} />
        <Route path="/service/developer" element={<ServiceDeveloper />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="legal/" element={<Legal />} />
        <Route path="legal/terms-of-use" element={<TermsPage />} />
        <Route path="legal/privacy-policy" element={<Privacy />} />
        <Route path="legal/payment-terms" element={<PaymentTerms />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </AxiosInterceptor>
  );
}

export default App;
