import { useState } from "react";
import { AudioPlayer } from "../../components/AudioPlayer";
import { useGetSong } from "../../hooks/useGetSong";
import * as C from "../styles";
import { MusicList } from "../../components/MusicList";
import { useListSongs } from "./hooks";

export const HomePage = () => {
  const [id, setId] = useState<string>("");
  const [isFull, setIsFull] = useState<boolean>(false);
  const [genre, setGenre] = useState<string>("");
  const [isSearch, setIsSearch] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");
  const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);
  const songSource = "LinkinParkInTheEnd.mp3"; // mock data
  const { mp3BlobUrl, isError, isLoading } = useGetSong(songSource);
  const {
    data,
    isError: isSongsError,
    isLoading: isSongsLoading,
  } = useListSongs();

  // mock data
  const audio = {
    url: mp3BlobUrl,
    title: "In the end",
    author: "Linkin Park",
    thumbnail: "./imgs/intheend.jpeg",
  };

  return (
    <div className="container mx-auto text-center">
      <div className="divSongs">
        <C.Music>
          {data?.map((music) => (
            <MusicList
              key={music.id}
              img={music.coverPhoto}
              name={music.name}
              author={music.artist}
              audio={music.sourceName}
              genre={music.genre}
              setId={setId}
              musicId={music.id}
              id={id}
              setIsFull={setIsFull}
              isFull={isFull}
              genres={genre}
              isSearch={isSearch}
              search={search}
              windowWidth={windowWidth}
            />
          ))}
        </C.Music>
      </div>
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
