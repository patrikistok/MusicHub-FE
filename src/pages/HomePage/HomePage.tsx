import { useEffect, useState } from "react";
import { AudioPlayer } from "../../components/AudioPlayer";
import { SongCard } from "../../components/SongCard";
import { useListSongs, usePlaySong } from "./hooks";
import "./homePage.css";
import { Song } from "../../types/Song";
import { Flex } from "antd";

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
    <div>
      {isSongsError && <div>Error fetching all songs data</div>}
      {isSongsLoading && <div>Loading all songs data</div>}
      {fetchedSongs && !isSongsLoading && !isSongsError && (
        <Flex wrap="wrap" justify="center" align="center" gap="middle">
          {fetchedSongs?.map((song) => (
            <SongCard song={song} setCurrentSong={setCurrentSong} />
          ))}
        </Flex>
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
