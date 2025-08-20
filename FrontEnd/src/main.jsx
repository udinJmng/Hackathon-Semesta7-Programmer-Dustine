// main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import Navbar from "./Navbar.jsx";
import Kandidat from "./Kandidat.jsx";
import Profile from "./Profile.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* Tinggal ganti komponen mana yang mau ditampilin */}
    <App />
    {/* <Navbar /> */}
    {/* <Kandidat /> */}
    {/* <Profile /> */}
  </React.StrictMode>
);
