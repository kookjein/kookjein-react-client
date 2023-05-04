import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

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
