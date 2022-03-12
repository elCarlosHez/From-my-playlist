import { Playlist } from "../../types/Playlist";

interface IPlaylistButton {
  playlist: Playlist | null;
  onClick: () => void;
} 

export const PlaylistButton = (props: IPlaylistButton): JSX.Element | null => {
  const { playlist, onClick } = props;
  if(!playlist) return null;
  
  return (
    <button className="grid grid-cols-12 mb-5 border-2 border-gray-300 rounded" onClick={onClick}>
      <img className="col-span-4" src={playlist.image} />
      <div className="col-start-6 col-span-7 text-left w-full h-full flex flex-col items-start justify-center">
        <p className="font-bold">{playlist.name}</p>
        <p className="text-sm">{`By ${playlist.author.name}`}</p>
      </div>
    </button>
  );
}
