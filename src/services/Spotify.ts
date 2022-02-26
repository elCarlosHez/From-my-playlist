interface IBuildUrl {
  clientId: string;
  scope: string;
  redirectUri: string;
  state: string;
}

// TODO: Find a better approach to generate a random string
const generateRandomString = (): string => {
  return (Math.random() + 1).toString(36).substring(2);
}

const buildUrl = ({
  clientId,
  scope,
  redirectUri,
  state,
}: IBuildUrl): string =>
  `https://accounts.spotify.com/authorize?response_type=token&client_id=${encodeURIComponent(clientId)}&scope=${encodeURIComponent(scope)}&redirect_uri=${encodeURIComponent(redirectUri)}&state=${encodeURIComponent(state)}`;

export const generateSpotifyUrl = (): string => {
  const clientId = import.meta.env.VITE_CLIENT_ID as string;
  const redirectUri = import.meta.env.VITE_CALLBACK_URL as string;
  const state = generateRandomString();
  // We saved the state of our token
  localStorage.setItem('spotify-state', state);
  const scope = 'playlist-read-collaborative playlist-read-collaborative';

  return buildUrl({
    clientId,
    scope,
    redirectUri,
    state
  });
}
