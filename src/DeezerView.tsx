import React, { useEffect, useState } from "react";

import logo from "./assets/logo.png";
import "./styles/App.css";
import { Playlist } from "./types/Playlist";
import { TokenMessage, TOKEN_DEEZER_TYPE } from "./types/TokenTypes";
import OpenAuthenticationPopup from "./utils/openAuthenticationPopup";
import { generateDeezerUrl } from "./services/Deezer";
import { useAppContext } from "./contexts/AppContext";
import { User } from "./types/User";
import { PlaylistsDeezerQuery } from "./types/PlaylistsDeezerQuery";
import { DeezerPlaylist } from "./types/DeezerPlaylist";

export const DeezerView = (): JSX.Element => {
  const { deezerToken, setDeezerToken, fetchDeezer } = useAppContext();
  const [playlists, setPlaylists] = useState<DeezerPlaylist[]>([]);

  useEffect(() => {
    window.addEventListener("message", (event) => {
      // For security reasons, if we recieved a message from other origin, we cancel our handle
      if (event.origin !== (import.meta.env.VITE_APP_URL as string)) return;

      const message: TokenMessage = event.data;
      // We check if the type we'll recieve is the type Spotify
      if (message?.type === TOKEN_DEEZER_TYPE) {
        setDeezerToken(message.token);
      }
    });
    const url = generateDeezerUrl();
    OpenAuthenticationPopup(url, "Deezer");
  }, []);

  const requestUserPlaylist = async () => {
    // we need the user id first
    const user: User = await fetchDeezer("https://api.deezer.com/user/me");
    if (user) {
      const playlistsRequest: PlaylistsDeezerQuery = await fetchDeezer(
        `https://api.deezer.com/user/${user.id}/playlists`
      );

      if(playlistsRequest){
        setPlaylists(playlistsRequest.data);
      }
    }
  };

  useEffect(() => {
    // We haven't recieved the authentication token
    if (!deezerToken.length) return;
    requestUserPlaylist();
  }, [deezerToken]);
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
            <button
              type="button"
              key={playlist.id}
              className="btn-primary mb-4"
            >
              {playlist.title}
            </button>
          ))}
        </section>
      </main>
    </>
  );
};
