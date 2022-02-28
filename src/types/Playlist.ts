import { Snippet } from './Snippet';

export type Playlist = {
  id: string;
  name: string | undefined;
  href: string | undefined;
  snippet: Snippet | undefined;
};
