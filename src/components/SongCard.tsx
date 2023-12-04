import { Song } from "../types/types";
import { Card } from "antd";
import { CloseCircleOutlined, LoadingOutlined } from "@ant-design/icons";
const { Meta } = Card;

type Props = {
  song: Song;
  playlistId: string;
  isLoading: boolean;
  handleRemove: (songId: string) => void;
  setCurrentSong: (song: Song) => void;
};

export const SongCard = ({
  song,
  playlistId,
  isLoading,
  handleRemove,
  setCurrentSong,
}: Props) => {
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
            <LoadingOutlined style={{ color: "white", fontSize: "20px" }} />
          ) : (
            <CloseCircleOutlined
              style={{ color: "red", fontSize: "20px" }}
              onClick={() => handleRemove(song.id)}
            />
          )}
        </div>
      )}
    </div>
  );
};
