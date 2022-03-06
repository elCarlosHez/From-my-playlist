import React, { useCallback, useState } from 'react';

interface IDeezerContext {
  token: string;
  setToken: React.Dispatch<React.SetStateAction<string>>;
  fetchDeezer: (url: string) => Promise<any>;
}

export const useDeezerContext = (): IDeezerContext => {
  const [token, setToken] = useState('');

  const fetchDeezer = useCallback(async (url:string): Promise<any> => {
    try {
      // Consider Dezzer has a CORS block. This method won't work in localhost
      const promise = await fetch(`${url}?access_token=${token}`);
      return await promise.json();
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log('Deezer fetch Error: ', error);
      return null;
    }
  }, [token]);

  return { token, setToken, fetchDeezer };
};

///user/2516153346/playlists?output=jsonp&output=jsonp&access_token=frYCFBmH7wjW3Njl2nLRWTB5LCPpG6ZNFNy78FodkMsMgd9VO2V&version=js-v1.0.0&callback=DZ.request.callbacks.dzcb_00621c4a56106b5ed_28380550

// [
//   {
//     "id": 5289703322,
//     "title": "Chilidori",
//     "duration": 33925,
//     "public": true,
//     "is_loved_track": false,
//     "collaborative": false,
//     "nb_tracks": 147,
//     "fans": 0,
//     "link": "https://www.deezer.com/playlist/5289703322",
//     "picture": "https://api.deezer.com/playlist/5289703322/image",
//     "picture_small": "https://e-cdns-images.dzcdn.net/images/cover/fb0726d22acc5b65a46b4b1bb68aeadc-083faae7151508444364335fd1701b2c-8d8908dc7e46066241f2f1c07778b4a8-1bdedd9854cf4db7d391aba92939f412/56x56-000000-80-0-0.jpg",
//     "picture_medium": "https://e-cdns-images.dzcdn.net/images/cover/fb0726d22acc5b65a46b4b1bb68aeadc-083faae7151508444364335fd1701b2c-8d8908dc7e46066241f2f1c07778b4a8-1bdedd9854cf4db7d391aba92939f412/250x250-000000-80-0-0.jpg",
//     "picture_big": "https://e-cdns-images.dzcdn.net/images/cover/fb0726d22acc5b65a46b4b1bb68aeadc-083faae7151508444364335fd1701b2c-8d8908dc7e46066241f2f1c07778b4a8-1bdedd9854cf4db7d391aba92939f412/500x500-000000-80-0-0.jpg",
//     "picture_xl": "https://e-cdns-images.dzcdn.net/images/cover/fb0726d22acc5b65a46b4b1bb68aeadc-083faae7151508444364335fd1701b2c-8d8908dc7e46066241f2f1c07778b4a8-1bdedd9854cf4db7d391aba92939f412/1000x1000-000000-80-0-0.jpg",
//     "checksum": "b092a68e95e61658bf0ceaee95f5ec3f",
//     "tracklist": "https://api.deezer.com/playlist/5289703322/tracks",
//     "creation_date": "2019-01-01 13:45:51",
//     "md5_image": "fb0726d22acc5b65a46b4b1bb68aeadc-083faae7151508444364335fd1701b2c-8d8908dc7e46066241f2f1c07778b4a8-1bdedd9854cf4db7d391aba92939f412",
//     "picture_type": "cover",
//     "time_add": 1564096688,
//     "time_mod": 1564096688,
//     "creator": {
//       "id": 2516153346,
//       "name": "Spider302",
//       "tracklist": "https://api.deezer.com/user/2516153346/flow",
//       "type": "user"
//     },
//     "type": "playlist"
//   },
//   {
//     "id": 5289639726,
//     "title": "Loved Tracks",
//     "duration": 208,
//     "public": true,
//     "is_loved_track": true,
//     "collaborative": false,
//     "nb_tracks": 1,
//     "fans": 0,
//     "link": "https://www.deezer.com/playlist/5289639726",
//     "picture": "https://api.deezer.com/playlist/5289639726/image",
//     "picture_small": "https://e-cdns-images.dzcdn.net/images/cover/679936b577879457668697f0e6f2c755/56x56-000000-80-0-0.jpg",
//     "picture_medium": "https://e-cdns-images.dzcdn.net/images/cover/679936b577879457668697f0e6f2c755/250x250-000000-80-0-0.jpg",
//     "picture_big": "https://e-cdns-images.dzcdn.net/images/cover/679936b577879457668697f0e6f2c755/500x500-000000-80-0-0.jpg",
//     "picture_xl": "https://e-cdns-images.dzcdn.net/images/cover/679936b577879457668697f0e6f2c755/1000x1000-000000-80-0-0.jpg",
//     "checksum": "e5d0990be335053688591227af2ca428",
//     "tracklist": "https://api.deezer.com/playlist/5289639726/tracks",
//     "creation_date": "2019-01-01 13:25:49",
//     "md5_image": "679936b577879457668697f0e6f2c755",
//     "picture_type": "cover",
//     "time_add": 1564137006,
//     "time_mod": 1564137006,
//     "creator": {
//       "id": 2516153346,
//       "name": "Spider302",
//       "tracklist": "https://api.deezer.com/user/2516153346/flow",
//       "type": "user"
//     },
//     "type": "playlist"
//   }
// ]
