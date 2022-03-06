import React, { useCallback, useState } from "react";

interface ISpotifyProvider {
  token: string;
  setToken: React.Dispatch<React.SetStateAction<string>>;
  fetchYoutube: (url: string) => Promise<any>;
}

export const useYoutubeContext = (): ISpotifyProvider => {
  const [token, setToken] = useState('');

  const fetchYoutube = useCallback(
    async (url: string): Promise<any> => {
      try {
        const promise = await fetch(`${url}?part=snippet&mine=true`, {
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

  return { token, setToken, fetchYoutube };
};
