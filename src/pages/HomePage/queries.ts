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

export const playSongBySourceName = async (
  songSource: string
): Promise<string | undefined> => {
  try {
    const response: AxiosResponse<Blob> = await api.get(
      `song/download/${songSource}`,
      {
        responseType: "blob",
      }
    );
    const blobData: Blob = response.data;
    const blobUrl: string = URL.createObjectURL(blobData);

    return blobUrl;
  } catch (error: any) {
    console.log(error.response?.data?.message);
  }
};
