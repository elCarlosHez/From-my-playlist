import React, { createContext, useContext } from "react";
import { ReturnServiceContext, serviceContext } from "./ServiceContext";
import { useSpotifyContext } from "./SpotifyContext";
import { useYoutubeContext } from "./YoutubeContext";
import { useDeezerContext } from "./DeezerContext";

interface IAppContext {
  // Spotify Context
  spotifyToken: string;
  setSpotifyToken: React.Dispatch<React.SetStateAction<string>>;
  fetchSpotify: (url: string) => Promise<any>;
  // Youtube Music Context
  youtubeToken: string;
  setYoutubeToken: React.Dispatch<React.SetStateAction<string>>;
  fetchYoutube: (url: string) => Promise<any>;
  // Deezer Context
  deezerToken: string;
  setDeezerToken: React.Dispatch<React.SetStateAction<string>>;
  fetchDeezer: (url: string) => Promise<any>;
  // Services context
  fetchService: ReturnServiceContext;
  convertService: ReturnServiceContext;
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

  const {
    token: deezerToken,
    setToken: setDeezerToken,
    fetchDeezer,
  } = useDeezerContext();
  
  const fetchService = serviceContext();
  const convertService = serviceContext();

  return (
    <AppContext.Provider
      value={{
        spotifyToken,
        setSpotifyToken,
        fetchSpotify,

        youtubeToken,
        setYoutubeToken,
        fetchYoutube,

        deezerToken,
        setDeezerToken,
        fetchDeezer,
        
        fetchService,
        convertService,
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
