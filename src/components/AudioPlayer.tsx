import ReactPlayer from "react-player";
import { useRef, useState } from "react";
import { AudioDetails } from "./AudioDetails";
import { PlayerControls } from "./PlayerControls";
import { Song } from "../types/types";
import { Lyrics } from "../pages/HomePage/components/Lyrics";

type Props = {
  currentSong: Song;
  songURL: string | undefined;
  onPrevious: () => void;
  onNext: () => void;
};

export const AudioPlayer = ({
  currentSong,
  songURL,
  onPrevious,
  onNext,
}: Props) => {
  const playerRef = useRef<ReactPlayer | null>(null);
  const [playing, setPlaying] = useState<boolean>(true);
  const [muted, setMuted] = useState<boolean>(false);
  const [volume, setVolume] = useState<number>(0.5);
  const [progress, setProgress] = useState<number>(0);
  const [loop, setLoop] = useState<boolean>(false);
  const [duration, setDuration] = useState<number>(0);

  const handlePlay = () => {
    setPlaying(true);
  };

  const handlePause = () => {
    setPlaying(false);
  };

  const handleVolumeChange = (newVolume: number) => {
    setVolume(newVolume);
  };

  const toggleMute = () => {
    setMuted((prevMuted) => !prevMuted);
  };

  const handleProgress = (state: any) => {
    setProgress(state.played);
  };

  const handleDuration = (duration: number) => {
    setDuration(duration);
  };

  const toggleLoop = () => {
    setLoop((prevLoop) => !prevLoop);
  };

  return (
    <div className="h-full">
      <ReactPlayer
        style={{ position: "absolute", zIndex: "-100" }}
        ref={playerRef}
        url={songURL}
        playing={playing}
        volume={volume}
        muted={muted}
        loop={loop}
        onPlay={handlePlay}
        onPause={handlePause}
        onProgress={handleProgress}
        onDuration={handleDuration}
      />
      <div className="shadow h-full rounded-xl">
        <div style={{ maxHeight: "33.3333%", minHeight: "320px" }}>
          <AudioDetails
            title={currentSong.name}
            author={currentSong.artist}
            thumbnail={currentSong.coverPhoto}
          />
        </div>
        <div
          style={{
            maxHeight: "41.6667%",
            minHeight: "320px",
            overflowY: "scroll",
          }}
        >
          <Lyrics lyrics={currentSong.lyrics} />
        </div>
        <div className="h-1/4 bg-white">
          <PlayerControls
            playerRef={playerRef}
            playing={playing}
            volume={volume}
            muted={muted}
            progress={progress}
            duration={duration}
            loop={loop}
            toggleMute={toggleMute}
            handlePlay={handlePlay}
            toggleLoop={toggleLoop}
            handlePause={handlePause}
            handlePrevious={onPrevious}
            handleNext={onNext}
            handleVolumeChange={handleVolumeChange}
          />
        </div>
      </div>
    </div>
  );
};
