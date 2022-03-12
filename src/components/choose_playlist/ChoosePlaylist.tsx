import { useAppContext } from "../../contexts/AppContext";
import { Playlist } from "../../types/Playlist";
import { PlaylistButton } from "../playlist_button";

interface IChoosePlaylist {
  playlists: Playlist[];
}

export const ChoosePlaylist = (props: IChoosePlaylist) => {
  const { setPlaylist } = useAppContext().fetchService;
  const { playlists } = props;

  return (
    <ul className="p-0 flex flex-col mt-24 overflow-y-auto">
      {playlists.map((playlist) => (
        <PlaylistButton
          key={playlist.id}
          playlist={playlist}
          onClick={() => setPlaylist(playlist)}
        />
      ))}
    </ul>
  );
};
