import { AxiosResponse } from "axios";
import { Song } from "../../types/Song";
import api from "../../api";

export const fetchSongs = async (): Promise<Song[]> => {
  try {
    const response: AxiosResponse<Song[]> = await api.get("/song/all");
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "An error occurred");
  }
};
