import { Playlist } from './Playlist';

export type PlaylistQuery = {
  href: string;
  items: Playlist[];
  limit: number;
};
