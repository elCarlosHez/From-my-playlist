import { Playlist } from '../types/Playlist';
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
