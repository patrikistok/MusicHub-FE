import { useState } from "react";
import { SongCard } from "../../components/SongCard";
import { useListSongs } from "./hooks";
import "./homePage.css";
import { Song } from "../../types/Song";
import { Flex, Input, Row } from "antd";
import _debounce from "lodash/debounce";
import { PlaySongContainer } from "./components/PlaySongContainer";
import { SearchOutlined } from "@ant-design/icons";

export const HomePage = () => {
  const [songHistory, setSongHistory] = useState<Song[]>([]);
  const [historyPosition, setHistoryPosition] = useState<number>(0);
  const [searchInput, setSearchInput] = useState("");
  const [filteredSongs, setFilteredSongs] = useState<Song[]>([]);
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

  const handleSearch = () => {
    setSearchInput((prevSearchInput) => {
      const searchTerm = prevSearchInput.toLowerCase();

      const filtered = fetchedSongs?.filter(
        (song) =>
          song.artist.toLowerCase().includes(searchTerm) ||
          song.genre.toLowerCase().includes(searchTerm) ||
          song.name.toLowerCase().includes(searchTerm)
      );

      setFilteredSongs(filtered ?? []);
      return prevSearchInput;
    });
  };
  const debouncedSearch = _debounce(handleSearch, 200);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setSearchInput(inputValue);
    debouncedSearch();
  };

  const displaySongs = searchInput.trim() === "" ? fetchedSongs : filteredSongs;

  return (
    <div style={{ height: "100vh", width: "100%", position: "relative" }}>
      {isSongsError && <div>Error fetching all songs data</div>}
      {isSongsLoading && <div>Loading all songs data</div>}
      {fetchedSongs && fetchedSongs?.length > 0 && (
        <>
          <Row justify="center" align="middle" style={{ margin: 20 }}>
            <Input
              style={{ width: "100%", maxWidth: 600 }}
              placeholder="Search for songs"
              onChange={handleInputChange}
              addonAfter={<SearchOutlined />}
            />
          </Row>

          <Flex wrap="wrap" justify="center" align="center" gap="middle">
            {displaySongs?.map((song, id) => (
              <SongCard key={id} song={song} setCurrentSong={setFirstSong} />
            ))}
            {displaySongs?.length === 0 && <div>No songs found</div>}
          </Flex>
        </>
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
