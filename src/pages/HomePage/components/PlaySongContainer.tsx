import { CloseOutlined } from "@ant-design/icons";
import { Song } from "../../../types/Song";
import { usePlaySong } from "../hooks";
import { useEffect } from "react";
import { AudioPlayer } from "../../../components/AudioPlayer";

type Props = {
  currentSong: Song;
  onCloseModal: () => void;
  onPrevious: () => void;
  onNext: () => void;
};

export const PlaySongContainer = ({
  currentSong,
  onCloseModal,
  onPrevious,
  onNext,
}: Props) => {
  const { data: songURL, mutate, isLoading, isError } = usePlaySong();

  console.log(songURL);

  useEffect(() => {
    mutate(currentSong.sourceName);
  }, [currentSong]);

  return (
    <div
      style={{
        backgroundColor: "gray",
        height: "100%",
        width: "100%",
        position: "absolute",
        top: 0,
      }}
    >
      <CloseOutlined
        style={{
          position: "absolute",
          top: 15,
          right: 15,
          fontSize: "25px",
          cursor: "pointer",
          color: "white",
        }}
        onClick={onCloseModal}
      />
      {songURL && !isError && !isLoading && (
        <AudioPlayer
          onNext={onNext}
          onPrevious={onPrevious}
          currentSong={currentSong}
          songURL={songURL}
        />
      )}
    </div>
  );
};
