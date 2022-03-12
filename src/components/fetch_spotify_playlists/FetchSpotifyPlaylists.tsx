import { useAppContext } from "../../contexts/AppContext";
import { useSpotifyService } from "../../hooks/useSpotifyService";
import { ChoosePlaylist } from "../choose_playlist";

export const FetchSpotifyPlaylists = (): JSX.Element => {
  const { spotifyToken } = useAppContext();
  const { data, isLoading, isError } = useSpotifyService(spotifyToken).getPlaylistsSpotify;

  if(isLoading || !data) return <p>Loanding...</p>

  if(isError) return <p>Oh no there was an error.</p>

  return <ChoosePlaylist playlists={data!} />;
}
