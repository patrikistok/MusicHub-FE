import { UseQueryResult, useQuery } from "react-query";
import { Playlist } from "../../types/types";
import { fetchUserPlaylists } from "./queries";

export const useUserPlaylists = (
  userId: string
): UseQueryResult<Playlist[], Error> =>
  useQuery("playlists", () => fetchUserPlaylists(userId));
