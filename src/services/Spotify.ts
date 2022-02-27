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

export default {};
