import {
  UseMutationResult,
  UseQueryResult,
  useMutation,
  useQuery,
} from "react-query";
import { Playlist, Song } from "../../types/types";
import {
  fetchPlaylistSongs,
  fetchSongs,
  playSongBySourceName,
} from "./queries";

export const useListSongs = (): UseQueryResult<Song[], Error> =>
  useQuery("songs", fetchSongs);

export const usePlaySong = (): UseMutationResult<
  string | undefined,
  Error,
  string,
  unknown
> => useMutation(playSongBySourceName);

export const usePlaylistSongs = (
  playlistId: string
): UseQueryResult<Playlist, Error> =>
  useQuery(["playlist", playlistId], () => fetchPlaylistSongs(playlistId), {
    enabled: !!playlistId, // Ensure the query is enabled only when playlistId is truthy
  });
