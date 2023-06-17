import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import GlobalStyle from "./components/GlobalStyle/GlobalStyle";
import AuthProvider from "./context/AuthProvider";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <AuthProvider>
    <GlobalStyle>
      <App />
    </GlobalStyle>
  </AuthProvider>
);
