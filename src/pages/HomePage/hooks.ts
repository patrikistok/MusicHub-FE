import { UseQueryResult, useQuery } from "react-query";
import { Song } from "../../types/Song";
import { fetchSongs } from "./queries";

export const useListSongs = (): UseQueryResult<Song[], Error> =>
  useQuery("songs", fetchSongs);
