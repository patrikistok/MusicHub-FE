import { Button, Flex } from "antd";
import { Playlist } from "../types/types";
import { useNavigate } from "react-router-dom";
import Title from "antd/es/typography/Title";
import { DeleteFilled } from "@ant-design/icons";
import { useDeletePlaylist } from "../pages/ProfilePage/hooks";

type Props = {
  playlist: Playlist;
  refetch: any;
};

export const PlaylistDiv = ({ playlist, refetch }: Props) => {
  const navigate = useNavigate();

  const {
    data,
    error: deleteError,
    isLoading: isLoadingError,
    isError: isDeleteError,
    mutateAsync,
  } = useDeletePlaylist();

  return (
    <Flex
      key={playlist.id}
      style={{
        width: "100%",
        border: "1px solid #ebebeb",
        borderRadius: "5px",
        padding: "10px",
        transition: "background-color 0.3s",
        backgroundColor: "#f0f0f0",
      }}
    >
      <div
        style={{
          width: "100%",
          cursor: "pointer",
        }}
        onClick={() => navigate(`/homepage/?playlist=${playlist.id}`)}
      >
        <Title level={5}> {playlist.name}</Title>
        <p style={{ marginLeft: "10px" }}>{playlist.songs.length} songs</p>
      </div>
      {
        <Button
          icon={<DeleteFilled style={{ color: "red" }} />}
          danger
          onClick={() => {
            mutateAsync(String(playlist.id)).then(() => refetch());
          }}
        ></Button>
      }
    </Flex>
  );
};
