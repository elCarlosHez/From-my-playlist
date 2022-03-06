import React, { useCallback, useState } from 'react';

interface IDeezerContext {
  token: string;
  setToken: React.Dispatch<React.SetStateAction<string>>;
  fetchDeezer: (url: string) => Promise<any>;
}

export const useDeezerContext = (): IDeezerContext => {
  const [token, setToken] = useState('');

  const fetchDeezer = useCallback(async (url:string): Promise<any> => {
    try {
      // Consider Dezzer has a CORS block. This method won't work in localhost
      const promise = await fetch(`${url}?access_token=${token}`);
      return await promise.json();
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log('Deezer fetch Error: ', error);
      return null;
    }
  }, [token]);

  return { token, setToken, fetchDeezer };
};
