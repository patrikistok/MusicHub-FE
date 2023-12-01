import { useEffect, useState } from "react";
import { AudioPlayer } from "../../components/AudioPlayer";
import { SongCard } from "../../components/SongCard";
import { useListSongs, usePlaySong } from "./hooks";
import "./homePage.css";
import { Song } from "../../types/Song";
import { Flex, Input, Row } from "antd";
import _debounce from "lodash/debounce";
import { SearchOutlined } from "@ant-design/icons";

export const HomePage = () => {
  const { data: songURL, mutate, isLoading, isError } = usePlaySong();

  const {
    data: fetchedSongs,
    isError: isSongsError,
    isLoading: isSongsLoading,
  } = useListSongs();

  const [currentSong, setCurrentSong] = useState<Song | undefined>(undefined);
  const [searchInput, setSearchInput] = useState("");
  const [filteredSongs, setFilteredSongs] = useState<Song[]>([]);

  useEffect(() => {
    if (currentSong) {
      mutate(currentSong.sourceName);
    }
  }, [currentSong, mutate]);

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
    <div>
      <div>
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
                <SongCard
                  key={id}
                  song={song}
                  setCurrentSong={setCurrentSong}
                />
              ))}
              {displaySongs?.length === 0 && <div>No songs found</div>}
            </Flex>
          </>
        )}
      </div>

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
