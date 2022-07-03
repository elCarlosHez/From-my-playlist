import { Playlist } from '../types/Playlist';
import { Artist, Song } from '../types/Song';
import { generateRandomString } from '../utils/str';

interface IBuildUrl {
  clientId: string;
  scope: string;
  redirectUri: string;
  state: string;
}

const buildUrl = ({
  clientId,
  scope,
  redirectUri,
  state,
}: IBuildUrl): string => `https://accounts.spotify.com/authorize?response_type=token&client_id=${encodeURIComponent(clientId)}&scope=${encodeURIComponent(scope)}&redirect_uri=${encodeURIComponent(redirectUri)}&state=${encodeURIComponent(state)}`;

export const generateSpotifyUrl = (): string => {
  const clientId = import.meta.env.VITE_SPOTIFY_CLIENT_ID as string;
  const redirectUri = `${import.meta.env.VITE_APP_URL}/callback/spotify`;
  const state = generateRandomString();
  // We saved the state of our token
  localStorage.setItem('spotify-state', state);
  const scope = 'playlist-read-collaborative playlist-read-collaborative';

  return buildUrl({
    clientId,
    scope,
    redirectUri,
    state,
  });
};

interface IReturnGetSongs {
  next: string | undefined;
  songs: Song[] | undefined;
}

const getSongs = async (url: string, token: string): Promise<IReturnGetSongs> => {
  const promise = await fetch(
    url,
    {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!promise.ok) {
    throw new Error("Failed to request Spotify songs.");
  }

  const result = await promise.json();

  return {
    next: result?.next,
    songs: result.items.map((item: any) => {
      return {
        id: item.track.id,
        name: item.track.name,
        album: {
          id: item.track.album?.id,
          name: item.track.album?.name,
          images: item.track.album?.images,
        },
        artists: item.track.artists?.map((artist: any) => {
          return {
            id: artist?.id,
            name: artist?.name,
          } as Artist;
        }),
        is_local: item?.is_local,
        href: item.track?.href,
      } as Song;
    })
  };
}

export const getPlaylistSongsFromSpotify = async (token: string, playlistId: string): Promise<Song[]> => {
  let nextUrl = `https://api.spotify.com/v1/playlists/${playlistId}/tracks`;
  let allSongs: Song[] = [];
  do {
    const result = await getSongs(nextUrl, token);
    allSongs = allSongs.concat(result.songs as Song[]);
    if (!result.next) {
      break;
    }
    nextUrl = result.next as string;
  }while(nextUrl);

  return allSongs;
}


export const getUserPlayListsSpotify = async (token: string): Promise<Playlist[]> => {
  const promise = await fetch(
    `https://api.spotify.com/v1/me/playlists?part=snippet&mine=true`,
    {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!promise.ok) {
    throw new Error("Failed to request Spotify playlists.");
  }

  const result = await promise.json();
  // Normalize the spotify response to the common playlist type.
  const playlists: Playlist[] = result?.items.map((playlist: any) => {
    return {
      id: playlist?.id,
      image: playlist?.images[0].url,
      name: playlist?.name,
      href: playlist?.href,
      author: {
        id: playlist?.owner.id,
        name: playlist?.owner.display_name,
      },
    } as Playlist;
  });

  return playlists;
};
