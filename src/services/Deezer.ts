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
