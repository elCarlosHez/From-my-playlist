import { createContext, useContext, useState } from "react";

interface ISpotifyContext {
  token: string;
  setToken: (value: string) => void;
  fetchSpotify: <T>(url: string) => Promise<T | null>;
}

const SpotifyContext = createContext<ISpotifyContext | undefined>(undefined);

interface ISpotifyProvider {
  children: JSX.Element;
}

export const SpotifyProvider = (props: ISpotifyProvider) => {
  const { children } = props;
  const [token, setToken] = useState("");

  async function fetchSpotify<T>(url: string): Promise<T | null> {
    try {
      const promise = await fetch(url, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      return await promise.json();
    } catch (error) {
      console.log('Spotify fetch Error: ', error);
      return null;
    }
  };

  return (
    <SpotifyContext.Provider
      value={{
        token,
        setToken,
        fetchSpotify,
      }}
    >
      {children}
    </SpotifyContext.Provider>
  );
};

export const useSpotifyAuth = () => {
  const context = useContext(SpotifyContext);
  if (context === undefined) {
    throw new Error("useSpotifyAuth must be used within a SpotifyProvider");
  }

  return context;
};
