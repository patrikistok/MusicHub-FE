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
  saveSongToPlaylist,
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

// export const useAddSongToPlaylist = (
//   playlistId: string,
//   songId: string
// ): UseQueryResult<Playlist, Error> => useQuery("addSong", () => saveSongToPlaylist(playlistId, songId));

export const useAddSongToPlaylist = (): UseMutationResult<
  Playlist | undefined,
  Error,
  { playlistId: string; songId: string },
  unknown
> => {
  return useMutation((variables: { playlistId: string; songId: string }) =>
    saveSongToPlaylist(variables.playlistId, variables.songId)
  );
};
