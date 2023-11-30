import { useEffect, useState } from "react";
import { AudioPlayer } from "../../components/AudioPlayer";
import * as C from "../styles";
import { MusicList } from "../../components/MusicList";
import { useListSongs, usePlaySong } from "./hooks";
import "./homePage.css";
import { Song } from "../../types/Song";

export const HomePage = () => {
  const { data: songURL, mutate, isLoading, isError } = usePlaySong();

  const {
    data: fetchedSongs,
    isError: isSongsError,
    isLoading: isSongsLoading,
  } = useListSongs();

  const [currentSong, setCurrentSong] = useState<Song | undefined>(undefined);

  useEffect(() => {
    if (currentSong) {
      mutate(currentSong.sourceName);
    }
  }, [currentSong]);

  return (
    <div className="container mx-auto text-center">
      {isSongsError && <div>Error fetching all songs data</div>}
      {isSongsLoading && <div>Loading all songs data</div>}
      {fetchedSongs && !isSongsLoading && !isSongsError && (
        <div className="divSongs">
          <C.Music>
            {fetchedSongs?.map((song) => (
              <MusicList song={song} setCurrentSong={setCurrentSong} />
            ))}
          </C.Music>
        </div>
      )}
      <div className="md:w-1/2 lg:w-1/3 mx-auto">
        {isError && <div>Error fetching song data</div>}
        {isLoading && <div>Loading song data...</div>}
        {currentSong && !isError && !isLoading && (
          <AudioPlayer currentSong={currentSong} songURL={songURL} />
        )}
      </div>
    </div>
  );
};
