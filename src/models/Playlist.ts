export type PlaylistQuery = {
  href: string;
  items: Playlist[];
  limit: number;
}

export interface Playlist {
  id: string;
  name: string;
  href: string;
}