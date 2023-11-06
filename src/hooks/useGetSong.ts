import { useQuery } from "react-query";

export function useGetSong(songSource: string) {
  const fetchSong = async (songSource: string) => {
    const url = `http://localhost:8080/api/v1/song/download/${songSource}`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Error fetching song");
    }

    return response.blob();
  };

  const { data: mp3Blob, status } = useQuery(["mp3", songSource], () =>
    fetchSong(songSource)
  );

  const mp3BlobUrl = mp3Blob ? URL.createObjectURL(mp3Blob) : null;

  return {
    mp3BlobUrl,
    isError: status === "error",
    isLoading: status === "loading",
  };
}
