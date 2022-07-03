import { useEffect } from "react";
import { useQuery } from "react-query";
import { useAppContext } from "../../contexts/AppContext";
import { useSpotifyService } from "../../hooks/useSpotifyService";
import { getPlaylistSongsFromSpotify } from "../../services/Spotify";
import { Playlist } from "../../types/Playlist";
import { Song } from "../../types/Song";

export const RequestSongsSpotify = (props: {
  setSongs: any;
}): void => {
  const { fetchService, spotifyToken } = useAppContext();
  const { data, error, isLoading } = useQuery<Song[], Error>(
    "songsSpotify",
    () =>
      getPlaylistSongsFromSpotify(
        spotifyToken,
        fetchService.playlist?.id!
      )
  );

  if (isLoading || error) return undefined;

  props.setSongs(data);
};
