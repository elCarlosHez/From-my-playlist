import { Song } from './Song';
import { User } from './User';

export type Playlist = {
  id: string;
  name: string;
  href: string | undefined;
  image: string | undefined;
  author: User;
  songs: Song[] | undefined;
};
