import { Song } from "../types/Song";
import { Card } from "antd";
const { Meta } = Card;

type Props = {
  song: Song;
  setCurrentSong: React.Dispatch<React.SetStateAction<Song | undefined>>;
};

export const SongCard = ({ song, setCurrentSong }: Props) => {
  return (
    <Card
      size="small"
      hoverable
      style={{
        width: 200,
      }}
      cover={
        <img
          alt="Cover photo"
          src={song.coverPhoto}
          onClick={() => setCurrentSong(song)}
        />
      }
    >
      <Meta title={song.name} description={song.artist} />
    </Card>
  );
};
