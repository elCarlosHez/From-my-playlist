import React, { createContext, useContext, useState } from 'react';

interface IYoutubeContext {
  token: string;
  setToken: (value: string) => void;
  fetchYoutube: <T>(url: string) => Promise<T | null>;
}

const YoutubeContext = createContext<IYoutubeContext | undefined>(undefined);

interface ISpotifyProvider {
  children: JSX.Element;
}

export const YoutubeProvider = (props: ISpotifyProvider) => {
  const { children } = props;
  const [token, setToken] = useState('');

  async function fetchYoutube <T>(url: string): Promise<T | null> {
    try {
      const promise = await fetch(`${url}?part=snippet&mine=true`, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      return await promise.json();
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
      return null;
    }
  }

  return (
    <YoutubeContext.Provider
      // eslint-disable-next-line react/jsx-no-constructed-context-values
      value={{
        token,
        setToken,
        fetchYoutube,
      }}
    >
      {children}
    </YoutubeContext.Provider>
  );
};

export const useYoutubeAuth = () => {
  const context = useContext(YoutubeContext);
  if (context === undefined) {
    throw new Error('useYoutubeAuth must be used within a YoutubeProvider');
  }

  return context;
};
