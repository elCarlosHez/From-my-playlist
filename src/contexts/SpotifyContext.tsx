import React, { useCallback, useState } from "react";

interface ISpotifyContext {
  token: string;
  setToken: React.Dispatch<React.SetStateAction<string>>;
  fetchSpotify: (url: string) => Promise<any>;
}

export const useSpotifyContext = ():ISpotifyContext => {
  const [token, setToken] = useState('');

  const fetchSpotify = useCallback(
    async (url: string): Promise<any> => {
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
        // eslint-disable-next-line no-console
        console.error(error);
        return null;
      }
    },
    [token]
  );

  return { token, setToken, fetchSpotify };
};
