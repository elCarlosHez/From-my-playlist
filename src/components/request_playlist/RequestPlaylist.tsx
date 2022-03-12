import { useEffect, useState } from "react";
import { useAppContext } from "../../contexts/AppContext";
import { Playlist } from "../../types/Playlist";
import { ServicesList } from "../../types/ServicesList";
import { FetchDezeerPlaylists } from "../fetch_deezer_playlists";
import { FetchSpotifyPlaylists } from "../fetch_spotify_playlists";
import { Modal } from "../modal";
import { PlaylistButton } from "../playlist_button";

enum RequestPlaylistStates {
  close,
  init,
  browsing,
  selected,
}

export const RequestPlaylist = (): JSX.Element | null => {
  const { spotifyToken, youtubeToken, deezerToken, fetchService } =
    useAppContext();
  const { playlist, service } = fetchService;
  const [state, setState] = useState<RequestPlaylistStates>(
    RequestPlaylistStates.close
  );

  useEffect(() => {
    if (spotifyToken.length || youtubeToken.length || deezerToken.length) {
      setState(RequestPlaylistStates.init);
      return;
    }

    setState(RequestPlaylistStates.close);
  }, [spotifyToken, youtubeToken, deezerToken]);

  useEffect(() => {
    if (!playlist) {
      setState(RequestPlaylistStates.close);
      return;
    }

    setState(RequestPlaylistStates.selected);
  }, [playlist]);

  const renderComponent = (): JSX.Element | null => {
    switch (state) {
      case RequestPlaylistStates.init:
        return (
          <button
            className="btn-big-primary mt-2"
            onClick={() => {
              setState(RequestPlaylistStates.browsing);
            }}
          >
            Elegir tu playlist
          </button>
        );
      case RequestPlaylistStates.browsing:
        if (service === ServicesList.Spotify)
          return (
            <Modal
              onClose={() => {
                setState(RequestPlaylistStates.init);
              }}
            >
              <FetchSpotifyPlaylists />
            </Modal>
          );
        if (service === ServicesList.Deezer)
          return (
            <Modal
              onClose={() => {
                setState(RequestPlaylistStates.init);
              }}
            >
              <FetchDezeerPlaylists />
            </Modal>
          );
      case RequestPlaylistStates.selected:
        return (
          <PlaylistButton
            onClick={() => {
              setState(RequestPlaylistStates.browsing);
            }}
            playlist={playlist as Playlist}
          />
        );
      case RequestPlaylistStates.close:
      default:
        return null;
    }
  };

  return renderComponent();
};
