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
}: IBuildUrl): string => `https://accounts.google.com/o/oauth2/v2/auth?response_type=token&include_granted_scopes=true&client_id=${encodeURIComponent(clientId)}&scope=${encodeURIComponent(scope)}&redirect_uri=${encodeURIComponent(redirectUri)}&state=${encodeURIComponent(state)}
`;

export const generateYoutubeUrl = (): string => {
  const clientId = import.meta.env.VITE_GCLOUD_CLIENT_ID as string;
  const redirectUri = `${import.meta.env.VITE_APP_URL}/callback/youtube`;
  const state = generateRandomString();
  // We saved the state of our token
  localStorage.setItem('youtube-state', state);
  const scope = 'https://www.googleapis.com/auth/youtube';

  return buildUrl({
    clientId,
    scope,
    redirectUri,
    state,
  });
};

export default {};
