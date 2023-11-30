import { useQuery } from "react-query";

export function useGetAllSongs() {
  const fetchAllSongs = async () => {
    const url = `http://localhost:8080/api/v1/song/all`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Error fetching all songs");
    }

    return response.json();
  };

  const { data, status } = useQuery([], () => fetchAllSongs());

  return {
    data,
    isError: status === "error",
    isLoading: status === "loading",
  };
}
