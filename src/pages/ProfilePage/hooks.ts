import {
  UseMutationResult,
  UseQueryResult,
  useMutation,
  useQuery,
} from "react-query";
import { Playlist, PlaylistCreateRequest } from "../../types/types";
import {
  deleteUserPlaylist,
  fetchUserPlaylists,
  saveUserPlaylist,
} from "./queries";

export const useUserPlaylists = (
  userId: string
): UseQueryResult<Playlist[], Error> =>
  useQuery("playlists", () => fetchUserPlaylists(userId));

export const useCreatePlaylist = (): UseMutationResult<
  Playlist | undefined,
  Error,
  PlaylistCreateRequest,
  unknown
> => useMutation(saveUserPlaylist);

export const useDeletePlaylist = (): UseMutationResult<
  string | undefined,
  Error,
  string,
  unknown
> => useMutation(deleteUserPlaylist);
