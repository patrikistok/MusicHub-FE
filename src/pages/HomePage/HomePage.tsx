import { useState } from "react";
import { SongCard } from "../../components/SongCard";
import { useListSongs } from "./hooks";
import "./homePage.css";
import { Song } from "../../types/Song";
import { Flex } from "antd";
import { PlaySongContainer } from "./components/PlaySongContainer";

export const HomePage = () => {
  const [songHistory, setSongHistory] = useState<Song[]>([]);
  const [historyPosition, setHistoryPosition] = useState<number>(0);

  const {
    data: fetchedSongs,
    isError: isSongsError,
    isLoading: isSongsLoading,
  } = useListSongs();

  const setFirstSong = (song: Song) => {
    console.log(song);
    console.log(songHistory);
    setSongHistory([...songHistory, song]);
  };

  const onPrevious = () => {
    if (historyPosition !== 0) {
      setHistoryPosition(historyPosition - 1);
    }
  };

  const onNext = () => {
    if (fetchedSongs) {
      const nextSong =
        fetchedSongs[Math.floor(Math.random() * fetchedSongs.length)];
      setSongHistory([...songHistory, nextSong]);
      setHistoryPosition(historyPosition + 1);
    }
  };

  const onCloseModal = () => {
    setSongHistory([]);
    setHistoryPosition(0);
  };

  return (
    <div
      style={{
        height: "100vh",
        width: "100%",
        position: "relative",
      }}
    >
      {isSongsError && <div>Error fetching all songs data</div>}
      {isSongsLoading && <div>Loading all songs data</div>}
      {fetchedSongs && !isSongsLoading && !isSongsError && (
        <Flex
          wrap="wrap"
          justify="center"
          align="center"
          gap="middle"
          style={{ display: songHistory.length > 0 ? "none" : "flex" }}
        >
          {fetchedSongs?.map((song) => (
            <SongCard song={song} setCurrentSong={setFirstSong} />
          ))}
        </Flex>
      )}
      {songHistory.length > 0 && (
        <PlaySongContainer
          currentSong={songHistory[historyPosition]}
          onCloseModal={onCloseModal}
          onNext={onNext}
          onPrevious={onPrevious}
        />
      )}
    </div>
  );
};
