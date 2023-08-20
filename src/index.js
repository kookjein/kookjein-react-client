import React from "react";
import { hydrate, render } from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { en, ko } from "./locales";
import XHR from "i18next-xhr-backend";
import { AuthProvider } from "./context/authContext";
import { WebsocketProvider } from "./context/websocketContext";
import { Provider } from "react-redux";
import store from "./redux/store";
import { HelmetProvider } from "react-helmet-async";

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

const root = document.getElementById("root");
const rootApp = (
  <React.StrictMode>
    <HelmetProvider>
      <AuthProvider>
        <WebsocketProvider>
          <BrowserRouter>
            <Provider store={store}>
              <App />
            </Provider>
          </BrowserRouter>
        </WebsocketProvider>
      </AuthProvider>
    </HelmetProvider>
  </React.StrictMode>
);

if (root.hasChildNodes()) {
  hydrate(rootApp, root);
} else {
  render(rootApp, root);
}

// root.render(
//   <React.StrictMode>
//     <HelmetProvider>
//       <AuthProvider>
//         <WebsocketProvider>
//           <BrowserRouter>
//             <Provider store={store}>
//               <App />
//             </Provider>
//           </BrowserRouter>
//         </WebsocketProvider>
//       </AuthProvider>
//     </HelmetProvider>
//   </React.StrictMode>
// );

const firebaseConfig = {
  apiKey: "AIzaSyCU2_ix_ZsKk2F7cQKoXijZOm6Epexvcag",
  authDomain: "kookjein-170b8.firebaseapp.com",
  projectId: "kookjein-170b8",
  storageBucket: "kookjein-170b8.appspot.com",
  messagingSenderId: "1019282983021",
  appId: "1:1019282983021:web:c8c49a49dd7d7ae74f5764",
  measurementId: "G-DPWT35D25E",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(analytics);
