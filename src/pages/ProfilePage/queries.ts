import { AxiosResponse } from "axios";
import { Playlist } from "../../types/types";
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
