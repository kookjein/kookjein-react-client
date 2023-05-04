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
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { en, ko } from "./locales";
import XHR from "i18next-xhr-backend";
import Browse from "./pages/Browse";
import ManageWork from "./pages/ManageWork";
import DeveloperProfile from "./pages/DeveloperProfile";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { AxiosInterceptor } from "./utils/authAxios";
import ManageWorkDetail from "./pages/ManageWorkDetail";
import {useRef} from "react";

function App() {
  const accessToken = useRef(null)
  const options = {
    order: ["querystring", "navigator"],
    lookupQuerystring: "lng",
  };
  i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .use(XHR)
    .init({
      resources: { en, ko },
      defaultNS: "common",
      supportedLngs: ["en", "ko"],
      ns: ["common"],
      fallbackLng: "en",
      interpolation: { escapeValue: false },
      detection: options,
    });
  return (
    <AxiosInterceptor accessToken={accessToken}>
      <Routes>
        <Route path="/*" element={<MainPage />} />
        <Route path="/browse" element={<Browse accessToken={accessToken}/>} />
        <Route path="/user/:userId" element={<DeveloperProfile />} />
        <Route path="/manage" element={<ManageWork />} />
        <Route path="/manage/:chatId/*" element={<ManageWorkDetail />} />
        <Route path="/service/company" element={<ServiceCompany />} />
        <Route path="/service/developer" element={<ServiceDeveloper />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="legal/" element={<Legal />} />
        <Route path="legal/terms-of-use" element={<TermsPage />} />
        <Route path="legal/privacy-policy" element={<Privacy />} />
        <Route path="legal/payment-terms" element={<PaymentTerms />} />
        <Route path="/login" element={<Login accessToken={accessToken} />} />
        <Route path="/signup" element={<Signup accessToken={accessToken} />} />
      </Routes>
    </AxiosInterceptor>
  );
}

export default App;
