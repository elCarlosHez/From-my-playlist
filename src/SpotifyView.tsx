import { useEffect, useState } from "react";
import logo from "./assets/logo.png";
import { useSearchParams } from "react-router-dom";
import "./styles/App.css";
import { useSpotifyAuth } from "./contexts/SpotifyContext";
import { Playlist, PlaylistQuery } from "./models/Playlist";

const SpotifyView = (): JSX.Element => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { token, setToken, fetchSpotify } = useSpotifyAuth();
  const [playlists, setPlaylists] = useState<Playlist[]>([]);

  useEffect(() => {
    // Fix url query
    const url: URL = new URL(window.location.href.replace("#", "?"));
    const params: URLSearchParams = url.searchParams;
    setSearchParams(params);
  }, []);

  useEffect(() => {
    // The url hasn't been fixed yet
    if (!searchParams.get("access_token")) return;
    setToken(searchParams.get("access_token") as string);
  }, [searchParams]);

  useEffect(() => {
    // We haven't recieved the authentication token
    if (!token.length) return;
    fetchSpotify<PlaylistQuery>("https://api.spotify.com/v1/me/playlists").then(
      (data) => {
        if (data) {
          setPlaylists(data.items);
        }
      }
    );
  }, [token]);

  return (
    <>
      <header className="flex justify-center items-center flex-col">
        <img className="max-w-full mb-5" src={logo} />
      </header>
      <main className="grid grid-cols-12">
        <section className="col-start-6 col-span-2 flex flex-col">
          <h2 className="text-center mb-4 text-xl font-medium">
            Select your playlist
          </h2>
          {playlists.map((playlist) => {
            return (
              <button key={playlist.id} className="btn-primary mb-4">
                {playlist.name}
              </button>
            );
          })}
        </section>
      </main>
    </>
  );
};

export default SpotifyView;
