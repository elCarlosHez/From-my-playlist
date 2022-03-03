import React, { createContext, useContext, useState } from "react";
import { useDeezerContext } from "./DeezerContext";
import { useSpotifyContext } from "./SpotifyContext";
import { useYoutubeContext } from "./YoutubeContext";

interface IAppContext {
  // Spotify Context
  spotifyToken: string;
  setSpotifyToken: React.Dispatch<React.SetStateAction<string>>;
  fetchSpotify: (url: string) => Promise<any>;
  // Youtube Music Context
  youtubeToken: string;
  setYoutubeToken: React.Dispatch<React.SetStateAction<string>>;
  fetchYoutube: (url: string) => Promise<any>;
}

const AppContext = createContext<IAppContext | undefined>(undefined);

interface IAppProvider {
  children: JSX.Element;
}

export const AppProvider = (props: IAppProvider): JSX.Element => {
  const { children } = props;
  const {
    token: spotifyToken,
    setToken: setSpotifyToken,
    fetchSpotify,
  } = useSpotifyContext();

  const {
    token: youtubeToken,
    setToken: setYoutubeToken,
    fetchYoutube,
  } = useYoutubeContext();

  return (
    <AppContext.Provider
      value={{
        spotifyToken,
        setSpotifyToken,
        fetchSpotify,

        youtubeToken,
        setYoutubeToken,
        fetchYoutube,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useAppContext must be used within a AppProvider");
  }

  return context;
};
