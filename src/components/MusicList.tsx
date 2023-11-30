import { Song } from "../types/Song";
import * as C from "./styles";

type Props = {
  song: Song;
  setCurrentSong: React.Dispatch<React.SetStateAction<Song | undefined>>;
};

export const MusicList = ({ song, setCurrentSong }: Props) => {
  return (
    <C.Container>
      <div className="divAll" onClick={() => setCurrentSong(song)}>
        <img src={song.coverPhoto} />
        <h1>{song.name}</h1>
        <h3>{song.artist}</h3>
        <audio src={song.sourceName} />
      </div>
    </C.Container>
  );
};
