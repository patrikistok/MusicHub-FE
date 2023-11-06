import { useEffect, useState } from "react";
import { AudioPlayer } from "../components/AudioPlayer";
import { useGetSong } from "../hooks/useGetSong";

export const HomePage = () => {
  const songSource = "kancelar.mp3"; // mock data
  const { mp3BlobUrl, isError, isLoading } = useGetSong(songSource);

  // mock data
  const audio = {
    url: mp3BlobUrl,
    title: "Kancelář",
    author: "Ektor",
    thumbnail: "fantaziaCover.jpg",
  };

  return (
    <div className="container mx-auto text-center">
      <div className="md:w-1/2 lg:w-1/3 mx-auto">
        {isError && <div>Error fetching song data</div>}
        {isLoading && <div>Loading song data...</div>}
        {mp3BlobUrl && !isError && !isLoading && (
          <AudioPlayer
            url={mp3BlobUrl}
            title={audio.title}
            author={audio.author}
            thumbnail={audio.thumbnail}
          />
        )}
      </div>
    </div>
  );
};
