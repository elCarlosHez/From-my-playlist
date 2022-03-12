import { useAppContext } from "../../contexts/AppContext";
import { useDeezerService } from "../../hooks/useDeezerService";
import { ChoosePlaylist } from "../choose_playlist";

export const FetchDezeerPlaylists = (): JSX.Element => {
  const { deezerToken } = useAppContext();
  const { data, isLoading, isError, status } = useDeezerService(deezerToken).getPlaylists;
  
  if(isError) return <p>Oh no there was an error.</p>

  if(isLoading || status !== 'success') return <p>Loanding...</p>

  return <ChoosePlaylist playlists={data!} />;
}
