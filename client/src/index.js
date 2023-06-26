import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import GlobalStyle from "./components/GlobalStyle/GlobalStyle";
import AuthProvider from "./context/AuthProvider";
import { disableReactDevTools } from "./utils/disableReactDevtools";

if (process.env.NODE_ENV === "production") disableReactDevTools();

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <AuthProvider>
      <GlobalStyle>
        <App />
      </GlobalStyle>
    </AuthProvider>
  </React.StrictMode>
);
