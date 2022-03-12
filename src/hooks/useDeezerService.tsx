import { useQuery } from "react-query";
import {
  getUserPlayListDeezer,
  getUserDeezer as getUserDeezerService,
} from "../services/Deezer";
import { Playlist } from "../types/Playlist";
import { User } from "../types/User";

export const useDeezerService = (token: string) => {
  const getUserDeezer = useQuery<User>("UserDeezer", () =>
    getUserDeezerService(token)
  );

  const userId = getUserDeezer.data?.id;

  const getPlaylists = useQuery<Playlist[], Error>(
    ["PlaylistsDeezer", userId],
    () => getUserPlayListDeezer(token, userId!),
    { enabled: !!userId }
  );

  return {
    getUserDeezer,
    getPlaylists,
  };
};
