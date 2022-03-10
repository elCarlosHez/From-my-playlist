import { useEffect, useState } from "react";
import { useAppContext } from "../../contexts/AppContext";
import { Playlist } from "../../types/Playlist";
import { ChoosePlaylist } from "../choose_playlist/ChoosePlaylist";
import { Modal } from "../modal/Modal";
import { PlaylistButton } from "../playlist_button/PlaylistButton";

enum RequestPlaylistStates {
  close,
  init,
  browsing,
  selected,
}

export const RequestPlaylist = (): JSX.Element | null => {
  const { spotifyToken, youtubeToken, deezerToken, fetchService } =
    useAppContext();
  const { playlist } = fetchService;
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
      console.log(playlist);
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
        return (
          <Modal
            onClose={() => {
              setState(RequestPlaylistStates.init);
            }}
          >
            <ChoosePlaylist />
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
