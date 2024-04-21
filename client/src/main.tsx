import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "animate.css";
import AOS from "aos";
import "aos/dist/aos.css";
import "../app/globals.css";
AOS.init();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
