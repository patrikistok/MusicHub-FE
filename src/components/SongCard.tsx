import { Song } from "../types/types";
import { Card } from "antd";
import { useRemoveSongFromPlaylist } from "../pages/HomePage/hooks";
import { CloseCircleOutlined, LoadingOutlined } from "@ant-design/icons";
const { Meta } = Card;

type Props = {
  song: Song;
  playlistId: string;
  setCurrentSong: (song: Song) => void;
};

export const SongCard = ({ song, playlistId, setCurrentSong }: Props) => {
  const { mutateAsync, isLoading } = useRemoveSongFromPlaylist();

  const handleRemove = () => {
    if (playlistId !== "0") {
      mutateAsync({ playlistId: playlistId, songId: song.id }).then(() => {
        window.location.reload();
      });
    }
  };

  return (
    <div style={{ position: "relative" }}>
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
      {playlistId !== "0" && (
        <div
          style={{
            position: "absolute",
            right: 5,
            top: 5,
            display: "flex",
            padding: "5px",
            backgroundColor: "black",
            borderRadius: "100%",
          }}
        >
          {isLoading ? (
            <LoadingOutlined style={{ fontSize: "20px" }} />
          ) : (
            <CloseCircleOutlined
              style={{ color: "red", fontSize: "20px" }}
              onClick={handleRemove}
            />
          )}
        </div>
      )}
    </div>
  );
};
