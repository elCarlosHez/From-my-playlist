import React from "react";
import ReactDOM from "react-dom";
import "./styles/index.css";
import App from "./App";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SpotifyView from "./SpotifyView";
import { SpotifyProvider } from "./contexts/SpotifyContext";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}></Route>
        <Route
          path="/spotify"
          element={
            <SpotifyProvider>
              <SpotifyView />
            </SpotifyProvider>
          }
        ></Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
