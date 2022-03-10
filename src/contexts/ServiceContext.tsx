import { useState } from "react";
import { Playlist } from "../types/Playlist";
import { ServicesList } from "../types/ServicesList";

export interface ReturnServiceContext {
  service: ServicesList | null;
  setService: React.Dispatch<React.SetStateAction<ServicesList | null>>
  playlist: Playlist | null;  
  setPlaylist: React.Dispatch<React.SetStateAction<Playlist | null>>;
}

export const serviceContext = (): ReturnServiceContext => {
  const [service, setService] = useState<ServicesList | null>(null);
  const [playlist, setPlaylist] = useState<Playlist | null>(null);

  return {
    service,
    setService,
    playlist,
    setPlaylist
  }
};
