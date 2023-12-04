import { AxiosResponse } from "axios";
import { Playlist, PlaylistCreateRequest } from "../../types/types";
import api from "../../api";

export const fetchUserPlaylists = async (
  userId: string
): Promise<Playlist[]> => {
  try {
    const response: AxiosResponse<Playlist[]> = await api.get(
      `/playlist/user/${userId}`
    );
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "An error occurred");
  }
};

export const saveUserPlaylist = async (
  params: PlaylistCreateRequest
): Promise<Playlist | undefined> => {
  try {
    const response = await api.post(`/playlist`, params);
    return response.data;
  } catch (error: any) {
    console.log(error.message);
  }
};

export const deleteUserPlaylist = async (
  playlistId: string
): Promise<string | undefined> => {
  try {
    const response = await api.delete(`/playlist/${playlistId}`);
    return response.data;
  } catch (error: any) {
    console.log(error.message);
  }
};
