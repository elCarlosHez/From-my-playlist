import React from "react";

import ReactDOM from "react-dom";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./styles/index.css";
import './styles/App.css';

import SpotifyHandleAuthentication from "./handlers/SpotifyHandleAuthentication";
import YoutubeHandleAuthentication from "./handlers/YoutubeHandleAuthentication";
import { AppProvider } from "./contexts/AppContext";
import DeezerHandleAutentication from "./handlers/DeezerHandleAutentication";
import { Start } from "./Start";
import { Home } from "./Home";

ReactDOM.render(
  <React.StrictMode>
    <AppProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/start" element={<Start />} />
          <Route path="/callback">
            <Route path="spotify" element={<SpotifyHandleAuthentication />} />
            <Route path="youtube" element={<YoutubeHandleAuthentication />} />
            <Route path="deezer" element={<DeezerHandleAutentication />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AppProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
