import React, { useEffect, useState } from 'react';

import logo from './assets/logo.png';
import './styles/App.css';
import { useSpotifyAuth } from './contexts/SpotifyContext';
import { generateSpotifyUrl } from './services/Spotify';
import { Playlist } from './types/Playlist';
import { PlaylistQuery } from './types/PlaylistQuery';
import { TOKEN_SPOTIFY_TYPE, TokenMessage } from './types/TokenTypes';
import OpenAuthenticationPopup from './utils/openAuthenticationPopup';

function SpotifyView(): JSX.Element {
  const { token, setToken, fetchSpotify } = useSpotifyAuth();
  const [playlists, setPlaylists] = useState<Playlist[]>([]);

  useEffect(() => {
    window.addEventListener('message', (event) => {
      // For security reasons, if we recieved a message from other origin, we cancel our handle
      if (event.origin !== import.meta.env.VITE_APP_URL as string) return;

      const message:TokenMessage = event.data;
      // We check if the type we'll recieve is the type Spotify
      if (message?.type === TOKEN_SPOTIFY_TYPE) {
        setToken(message.token);
      }
    });
    const url = generateSpotifyUrl();
    OpenAuthenticationPopup(url, 'Spotify');
  }, []);

  useEffect(() => {
    // We haven't recieved the authentication token
    if (!token.length) return;
    fetchSpotify<PlaylistQuery>('https://api.spotify.com/v1/me/playlists').then(
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
              {playlist.name}
            </button>
          ))}
        </section>
      </main>
    </>
  );
}

export default SpotifyView;
