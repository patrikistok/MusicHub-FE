import { useEffect, useState } from "react";
import { SongCard } from "../../components/SongCard";
import { useListSongs, usePlaylistSongs } from "./hooks";
import "./homePage.css";
import { Song } from "../../types/types";
import { Flex, Input, Row } from "antd";
import _debounce from "lodash/debounce";
import { PlaySongContainer } from "../../components/PlaySongContainer";
import { SearchOutlined } from "@ant-design/icons";
import { useLocation } from "react-router-dom";
import Title from "antd/es/typography/Title";

export const HomePage = () => {
  const [songHistory, setSongHistory] = useState<Song[]>([]);
  const [historyPosition, setHistoryPosition] = useState<number>(0);
  const [searchInput, setSearchInput] = useState("");
  const [filteredSongs, setFilteredSongs] = useState<Song[]>([]);
  const [fetchedSongs, setFetchedSongs] = useState<Song[] | undefined>(
    undefined
  );
  const {
    data: fetchedSongsAll,
    isError: isSongsError,
    isLoading: isSongsLoading,
  } = useListSongs();

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const playlistParam = queryParams.get("playlist") ?? "0";

  const {
    data: fetchedPlaylistSongs,
    isError: isPlaylistSongsError,
    isLoading: isPlaylistSongsLoading,
  } = usePlaylistSongs(playlistParam);

  useEffect(() => {
    if (playlistParam === "0") {
      setFetchedSongs(fetchedSongsAll);
    } else {
      setFetchedSongs(
        fetchedSongsAll?.filter((song) =>
          fetchedPlaylistSongs?.songs.includes(Number(song.id))
        )
      );
    }
  }, [playlistParam, fetchedSongsAll, fetchedPlaylistSongs]);

  const isError = playlistParam === "0" ? isSongsError : isPlaylistSongsError;
  const isLoading =
    playlistParam === "0" ? isSongsLoading : isPlaylistSongsLoading;

  const setFirstSong = (song: Song) => {
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
      {isError && <div>Error fetching all songs data</div>}
      {isLoading && <div>Loading all songs data</div>}
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

          {Number(playlistParam) > 0 && fetchedSongs?.length > 0 && (
            <Flex style={{ padding: "20px", justifyContent: "center" }}>
              <Title level={1}>{fetchedPlaylistSongs?.name}</Title>
            </Flex>
          )}
          <Flex
            wrap="wrap"
            justify="center"
            align="center"
            gap="middle"
            style={{ display: songHistory.length > 0 ? "none" : "flex" }}
          >
            {displaySongs?.map((song, id) => (
              <SongCard key={id} song={song} setCurrentSong={setFirstSong} />
            ))}
            {displaySongs?.length === 0 && (
              <div>
                {" "}
                <Title level={3}>No songs found</Title>
              </div>
            )}
          </Flex>
        </>
      )}
      {Number(playlistParam) > 0 && fetchedSongs?.length === 0 && (
        <Flex style={{ padding: "70px" }}>
          <Title level={3}>No songs in playlist</Title>
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
