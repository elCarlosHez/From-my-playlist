import React, { useEffect } from 'react';

import { useSearchParams } from 'react-router-dom';

import { TokenMessage, TOKEN_DEEZER_TYPE } from '../types/TokenTypes';

export const DeezerHandleAutentication = (): JSX.Element => {
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    // Fix url query
    const url: URL = new URL(window.location.href.replace('#', '?'));
    const params: URLSearchParams = url.searchParams;
    setSearchParams(params);
  }, []);

  useEffect(() => {
    // The url hasn't been fixed yet
    if (!searchParams.get('access_token')) return;
    const tokenMessage: TokenMessage = {
      type: TOKEN_DEEZER_TYPE,
      token: searchParams.get('access_token') as string,
    };
    // We send the token back to the app
    window.opener.postMessage(tokenMessage, '*');
    window.close();
  }, [searchParams]);

  return (
    <p>loading...</p>
  );
};

export default DeezerHandleAutentication;
