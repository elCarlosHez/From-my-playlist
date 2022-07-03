import React from "react";

import ReactDOM from "react-dom";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from 'react-query/devtools';
import "./styles/index.css";
import "./styles/App.css";

import SpotifyHandleAuthentication from "./handlers/SpotifyHandleAuthentication";
import YoutubeHandleAuthentication from "./handlers/YoutubeHandleAuthentication";
import { AppProvider } from "./contexts/AppContext";
import DeezerHandleAutentication from "./handlers/DeezerHandleAutentication";
import { Start } from "./Start";
import { Home } from "./Home";
import { Destiny } from "./Destiny";
import { Transfer } from "./Transfer";

const queryClient = new QueryClient();

ReactDOM.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AppProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/start" element={<Start />} />
            <Route path="/select-destiny" element={<Destiny />} />
            <Route path="/transfer" element={<Transfer />} />
            <Route path="/callback">
              <Route path="spotify" element={<SpotifyHandleAuthentication />} />
              <Route path="youtube" element={<YoutubeHandleAuthentication />} />
              <Route path="deezer" element={<DeezerHandleAutentication />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AppProvider>
      <ReactQueryDevtools />
    </QueryClientProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
