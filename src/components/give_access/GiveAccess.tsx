import { useEffect, useState } from "react";
import { useAppContext } from "../../contexts/AppContext";
import { generateDeezerUrl } from "../../services/Deezer";
import { generateSpotifyUrl } from "../../services/Spotify";
import { generateYoutubeUrl } from "../../services/Youtube";
import { ServicesList } from "../../types/ServicesList";
import {
  TokenMessage,
  TOKEN_DEEZER_TYPE,
  TOKEN_SPOTIFY_TYPE,
  TOKEN_YOUTUBE_TYPE,
} from "../../types/TokenTypes";
import openAuthenticationPopup from "../../utils/openAuthenticationPopup";

enum GivedAccessStates {
  empty,
  loading,
  granted,
  denied,
  choosing,
}

export const GiveAccess = () => {
  const { fetchService, setYoutubeToken, setSpotifyToken, setDeezerToken } =
    useAppContext();
  const { service } = fetchService;
  const [givedPermission, setGivedPermission] = useState<GivedAccessStates>(
    GivedAccessStates.empty
  );

  const openPopup = (): void => {
    switch (service) {
      case ServicesList.Spotify:
        openAuthenticationPopup(generateSpotifyUrl(), "Spotify");
        break;
      case ServicesList.YTMusic:
        openAuthenticationPopup(generateYoutubeUrl(), "Youtube Music");
        break;
      case ServicesList.Deezer:
        openAuthenticationPopup(generateDeezerUrl(), "Deezer");
        break;
    }
  };

  useEffect(() => {
    window.addEventListener("message", (event) => {
      // For security reasons, if we recieved a message from other origin, we cancel our handle
      if (event.origin !== (import.meta.env.VITE_APP_URL as string)) return;

      const message: TokenMessage = event.data;
      // We check the type of the message
      switch (message?.type) {
        case TOKEN_SPOTIFY_TYPE:
          setSpotifyToken(message.token);
          setGivedPermission(GivedAccessStates.granted);
          break;
        case TOKEN_YOUTUBE_TYPE:
          setYoutubeToken(message.token);
          setGivedPermission(GivedAccessStates.granted);
          break;
        case TOKEN_DEEZER_TYPE:
          setDeezerToken(message.token);
          setGivedPermission(GivedAccessStates.granted);
          break;
      }
    });
  }, []);

  useEffect(() => {
    if (!fetchService.service) return;
    openPopup();
    setGivedPermission(GivedAccessStates.loading);
  }, [fetchService.service]);

  const renderComponent = (): JSX.Element | null => {
    switch (givedPermission) {
      case GivedAccessStates.empty:
      case GivedAccessStates.granted:
        return null;
      case GivedAccessStates.loading:
        return (
          <button disabled className="btn-primary w-full mt-2">
            Obteniendo los accesos de tu cuenta...
          </button>
        );
      case GivedAccessStates.denied:
      default:
        return (
          <>
            <p className="text-red-500">
              No se pudo obtener acceso a tu cuenta.
            </p>
            <button onClick={openPopup} className="btn-primary w-full mt-5">
              Volver a intentar
            </button>
          </>
        );
    }
  };

  return renderComponent();
};
