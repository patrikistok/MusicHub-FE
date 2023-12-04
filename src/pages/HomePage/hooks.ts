import {
  UseMutationResult,
  UseQueryResult,
  useMutation,
  useQuery,
} from "react-query";
import {
  Playlist,
  RemoveSongFromPlaylistRequest,
  Song,
} from "../../types/types";
import {
  fetchPlaylistSongs,
  fetchSongs,
  playSongBySourceName,
  removeSongFromPlaylist,
} from "./queries";

export const useListSongs = (): UseQueryResult<Song[], Error> =>
  useQuery("songs", fetchSongs);

export const usePlaySong = (): UseMutationResult<
  string | undefined,
  Error,
  string,
  unknown
> => useMutation(playSongBySourceName);

export const usePlaylistSongs = (): UseMutationResult<
  Playlist | undefined,
  Error,
  string,
  unknown
> => useMutation(fetchPlaylistSongs);

export const useRemoveSongFromPlaylist = (): UseMutationResult<
  Playlist | undefined,
  Error,
  RemoveSongFromPlaylistRequest,
  unknown
> => useMutation(removeSongFromPlaylist);
