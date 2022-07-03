import { useQuery } from "react-query";
import {
  getPlaylistSongsFromSpotify,
  getUserPlayListsSpotify,
} from "../services/Spotify";
import { Playlist } from "../types/Playlist";
import { Song } from "../types/Song";

export const useSpotifyService = (token: string, playlist?: string) => {
  const getPlaylistsSpotify = useQuery<Playlist[], Error>(
    "PlaylistsSpotify",
    () => getUserPlayListsSpotify(token)
  );

  // TODO: If the user change the playlist, does this query return a new request or the cached one?
  const getPlaylistSongsSpotify = useQuery<Song[], Error>(
    "PlaylistSongs",
    () => getPlaylistSongsFromSpotify(token, playlist!),
    { enabled: !!playlist }
  );

  return {
    getPlaylistsSpotify,
    getPlaylistSongsSpotify,
  };
};
