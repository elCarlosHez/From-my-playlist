import { useEffect, useState } from "react";
import { useAppContext } from "../../contexts/AppContext";
import { ServicesList } from "../../types/ServicesList";
import { RequestSongsSpotify } from "../request_songs_spotify/RequestSongsSpotify";

export const TransferPlaylist = (): JSX.Element => {
  const { fetchService, convertService } = useAppContext();
  const [song, setSongs] = useState();

  const renderFetchService = () => {
    if(song) return null;
    switch (fetchService.service) {
      case ServicesList.Spotify:
        RequestSongsSpotify({
          setSongs
        });
    }
    return <p>Cargando...</p>
  };

  useEffect(() => {
    console.log(song);
  }, [song]);

  return (
    <>
      <p>dasdsa</p>
      {renderFetchService()}
    </>
  );
};
