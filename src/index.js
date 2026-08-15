import React from "react";
import ReactDOM from "react-dom/client";
import CssBaseline from "@mui/material/CssBaseline";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import App from "./App";
//iutrjigtybejwohfgyirewohigfyiehuwqo iqgoufi
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    {/* Required by the DatePicker inside the modal */}
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <CssBaseline />
      <App />
    </LocalizationProvider>
  </React.StrictMode>
);