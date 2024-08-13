import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import axios from "axios";
import { Toaster } from "react-hot-toast";

axios.defaults.baseURL = import.meta.env.VITE_BACKEND_BASE_URL;

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Toaster />
    <App />
  </React.StrictMode>
);
