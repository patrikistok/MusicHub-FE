import { Song } from "../types/types";
import { Card, Modal, Select, SelectProps } from "antd";
import {
  CloseCircleOutlined,
  LoadingOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";
import { AuthContext } from "../contexts/useAuthContext";
import { useContext, useState } from "react";
import {
  useAddSongToPlaylist,
  useUserPlaylists,
} from "../pages/ProfilePage/hooks";
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
  const { user } = useContext(AuthContext);
  const [selectedPlaylistId, setSelectedPlaylistId] = useState<string>("");
  const { mutate, error } = useAddSongToPlaylist();

  const {
    data: fetchedPlaylists,
    isError: isSongsError,
    isLoading: isSongsLoading,
    refetch,
  } = useUserPlaylists(String(user!.id));

  const options: SelectProps["options"] = fetchedPlaylists?.map((playlist) => ({
    label: playlist.name,
    value: playlist.id.toString(),
  }));
  const handleChange = (value: string) => {
    setSelectedPlaylistId(value);
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
    mutate({ playlistId: selectedPlaylistId, songId: song.id });
    setSelectedPlaylistId("");
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setSelectedPlaylistId("");
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
            <LoadingOutlined style={{ color: "white", fontSize: "20px" }} />
          ) : (
            <CloseCircleOutlined
              style={{ color: "red", fontSize: "20px" }}
              onClick={() => handleRemove(song.id)}
            />
          )}
        </div>
      )}
      {playlistId === "0" && (
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
            <>
              <PlusCircleOutlined
                style={{ color: "#66FF00", fontSize: "20px" }}
                onClick={() => showModal()}
              />
              <Modal
                title="Add song to playlist"
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
              >
                <Select
                  autoFocus
                  allowClear
                  style={{ width: "100%" }}
                  placeholder="Select playlist"
                  value={selectedPlaylistId}
                  onChange={handleChange}
                  options={options}
                />
              </Modal>
            </>
          )}
        </div>
      )}
    </div>
  );
};
