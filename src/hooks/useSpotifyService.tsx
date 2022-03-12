import { useQuery } from "react-query";
import { getUserPlayListsSpotify } from "../services/Spotify";
import { Playlist } from "../types/Playlist";

export const useSpotifyService = (token: string) => {
  const getPlaylistsSpotify = useQuery<Playlist[], Error>("PlaylistsSpotify", () =>
    getUserPlayListsSpotify(token)
  );

  return {
    getPlaylistsSpotify,
  }
};
