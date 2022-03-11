import { useEffect, useState } from "react";
import { useAppContext } from "../../contexts/AppContext";
import { getUserPlayListDeezer } from "../../services/Deezer";
import { getUserPlayListsSpotify } from "../../services/Spotify";
import { Playlist } from "../../types/Playlist";
import { ServicesList } from "../../types/ServicesList";
import { PlaylistButton } from "../playlist_button/PlaylistButton";

export const ChoosePlaylist = () => {
  const { service, setPlaylist } = useAppContext().fetchService;
  const { spotifyToken, deezerToken } = useAppContext();
  const [loading, setLoading] = useState(true);
  const [playlists, setPlaylists] = useState<Playlist[]>([]);

  const fetchUserPlaylists = async (): Promise<void> => {
    let result: Playlist[] | null = null;
    switch (service) {
      case ServicesList.Spotify:
        result = await getUserPlayListsSpotify(spotifyToken);
        break;
      case ServicesList.Deezer:
        result = await getUserPlayListDeezer(deezerToken);
        break;
    }
    if (!result) return;
    setPlaylists(result);
    setLoading(false);
  };

  const selectAPlaylist = (playlist: Playlist): void => {
    setPlaylist(playlist);
  };

  useEffect(() => {
    fetchUserPlaylists();
  }, []);

  return loading ? (
    <p>Cargando tus playlist</p>
  ) : (
    <ul className="p-0 flex flex-col mt-24 overflow-y-auto">
      {playlists.map((playlist) => {
        return (
          <PlaylistButton
            key={playlist.id}
            playlist={playlist}
            onClick={() => {
              selectAPlaylist(playlist);
            }}
          />
        );
      })}
    </ul>
  );
};
