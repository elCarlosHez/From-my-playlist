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

export const getUserDeezer = async (token: string): Promise<User | null> => {
  try {
    // Consider Dezzer has a CORS block. This method won't work in localhost
    const promise = await fetch(`https://api.deezer.com/user/me?access_token=${token}`);
    const user: User = await promise.json();
    return user;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log('Deezer fetch Error: ', error);
    return null;
  }
}

export const getUserPlayListDeezer = async (token: string): Promise<any> => {
  const user = await getUserDeezer(token);
  try {
    if (user) {
      const playlistsRequest = await fetch(`https://api.deezer.com/user/${user.id}/playlists?access_token=${token}`);
      const response = await playlistsRequest.json();
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
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log('Deezer fetch Playlists: ', error);
    return null;
  }
}
