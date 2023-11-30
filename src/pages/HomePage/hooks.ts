import {
  UseMutationResult,
  UseQueryResult,
  useMutation,
  useQuery,
} from "react-query";
import { Song } from "../../types/Song";
import { fetchSongs, playSongBySourceName } from "./queries";

export const useListSongs = (): UseQueryResult<Song[], Error> =>
  useQuery("songs", fetchSongs);

export const usePlaySong = (): UseMutationResult<
  string | undefined,
  Error,
  string,
  unknown
> => useMutation(playSongBySourceName);
