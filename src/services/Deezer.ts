import { Playlist } from "../types/Playlist";
import { User } from "../types/User";

interface IGenerateUrl {
  appId: string;
  redirectUri: string;
}

const generateUrl = ({
  appId,
  redirectUri
}: IGenerateUrl): string => `https://connect.deezer.com/oauth/auth.php?app_id=${appId}&redirect_uri=${redirectUri}&perms=manage_library&response_type=token`;

export const generateDeezerUrl = (): string => {
  const appId = import.meta.env.VITE_APP_ID_DEEZER as string;
  const redirectUri = import.meta.env.VITE_CALLBACK_URL_DEEZER as string;
  const url = generateUrl({
    appId,
    redirectUri
  });
  return url;
};

export const getUserDeezer = async (token: string): Promise<User> => {

  // Consider Dezzer has CORS policy. This method won't work in localhost
  const userRequest = await fetch(`https://api.deezer.com/user/me?access_token=${token}`);
  if (!userRequest.ok) {
    throw new Error("Failed to request Deezer user.");
  }
  const user: User = await userRequest.json();
  return user;

}

export const getUserPlayListDeezer = async (token: string, userId: string): Promise<Playlist[]> => {
  const playlistsRequest = await fetch(`https://api.deezer.com/user/${userId}/playlists?access_token=${token}`);
  if (!playlistsRequest.ok) {
    throw new Error("Failed to request Deezer playlists.");
  }
  const response = await playlistsRequest.json();
  // We normilize our data to our Playlist generic type
  const playlists: Playlist[] = response.data?.map((playlist: any) => {
    return {
      id: playlist?.id,
      name: playlist?.title,
      author: playlist.creator,
      image: playlist?.picture_medium,
      href: playlist?.link,
    } as Playlist;
  });

  return playlists;

}
