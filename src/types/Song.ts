// href: "https://api.spotify.com/v1/tracks/3cfOd4CMv2snFaKAnMdnvK"
// id: "3cfOd4CMv2snFaKAnMdnvK"
// is_local: false
export type Song = {
  id: string;
  href: string;
  is_local: boolean;
  name: string;
  artists: Artist[];
  album: Album;
}

export type Artist = {
  id: string;
  name: string;
}

export type Album = {
  id: string;
  images: [];
  name: string;
}
