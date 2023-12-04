export type Song = {
  id: string;
  name: string;
  lyrics: string;
  artist: string;
  coverPhoto: string;
  sourceName: string;
  genre: string;
  playlists: Array<string>;
};

export type Playlist = {
  id: number;
  name: string;
  user: number;
  songs: number[];
};

export type RemoveSongFromPlaylistRequest = {
  playlistId: string;
  songId: string;
};
