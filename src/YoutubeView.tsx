import React, { useEffect, useState } from 'react';

import logo from './assets/logo.png';
import './styles/App.css';
import { useYoutubeAuth } from './contexts/YoutubeContext';
import { generateYoutubeUrl } from './services/Youtube';
import { Playlist } from './types/Playlist';
import { PlaylistQuery } from './types/PlaylistQuery';
import { TOKEN_YOUTUBE_TYPE, TokenMessage } from './types/TokenTypes';
import OpenAuthenticationPopup from './utils/openAuthenticationPopup';

export const YoutubeView = (): JSX.Element => {
  const { token, setToken, fetchYoutube } = useYoutubeAuth();
  const [playlists, setPlaylists] = useState<Playlist[]>([]);

  useEffect(() => {
    window.addEventListener('message', (event) => {
      // For security reasons, if we recieved a message from other origin, we cancel our handle
      if (event.origin !== import.meta.env.VITE_APP_URL as string) return;

      const message:TokenMessage = event.data;
      // We check if the type we'll recieve is the type Spotify
      if (message?.type === TOKEN_YOUTUBE_TYPE) {
        setToken(message.token);
      }
    });
    const url = generateYoutubeUrl();
    OpenAuthenticationPopup(url, 'Youtube');
  }, []);

  useEffect(() => {
    // We haven't recieved the authentication token
    if (!token.length) return;
    fetchYoutube<PlaylistQuery>('https://www.googleapis.com/youtube/v3/playlists').then(
      (data) => {
        if (data) {
          setPlaylists(data.items);
        }
      },
    );
  }, [token]);
  return (
    <>
      <header className="flex justify-center items-center flex-col">
        <img alt="From My Playlist" className="max-w-full mb-5" src={logo} />
      </header>
      <main className="grid grid-cols-12">
        <section className="col-start-6 col-span-2 flex flex-col">
          <h2 className="text-center mb-4 text-xl font-medium">
            Select your playlist
          </h2>
          {playlists.map((playlist) => (
            <button type="button" key={playlist.id} className="btn-primary mb-4">
              {playlist?.snippet?.title}
            </button>
          ))}
        </section>
      </main>
    </>
  );
}

export default YoutubeView;
