import { useState } from "react";
import { Playlist } from "../types/Playlist";
import { ServicesList } from "../types/ServicesList";
import { Song } from "../types/Song";

export interface ReturnServiceContext {
  service: ServicesList | null;
  setService: React.Dispatch<React.SetStateAction<ServicesList | null>>
  playlist: Playlist | null;  
  setPlaylist: React.Dispatch<React.SetStateAction<Playlist | null>>;
  songs: Song[];
  setSongs: React.Dispatch<React.SetStateAction<Song[]>>;
}

export const serviceContext = (): ReturnServiceContext => {
  const [service, setService] = useState<ServicesList | null>(null);
  const [playlist, setPlaylist] = useState<Playlist | null>(null);
  const [songs, setSongs] = useState<Song[]>([]);

  return {
    service,
    setService,
    playlist,
    setPlaylist,
    songs,
    setSongs,
  }
};
