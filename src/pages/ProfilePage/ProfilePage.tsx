import { Avatar, Button, Divider, Flex, Typography } from "antd";
import { CaretRightOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useUserPlaylists } from "./hooks";

const { Title } = Typography;

export const Profile = () => {
  const loggedUser = JSON.parse(localStorage.getItem("user") ?? "");
  const {
    data: fetchedPlaylists,
    isError: isSongsError,
    isLoading: isSongsLoading,
  } = useUserPlaylists(loggedUser.id);
  const navigate = useNavigate();

  return (
    <div>
      <Flex align="center" gap="large" wrap="wrap" style={{ margin: "50px" }}>
        <Avatar
          size={150}
          src={"./imgs/profile.jpg"}
          style={{
            display: "inline-block",
            border: "3px solid #000",
            borderRadius: "50%",
            overflow: "hidden",
          }}
        />
        <Title level={3} style={{ margin: 0 }}>
          {loggedUser.name}{" "}
        </Title>
        {/* <Button ghost style={{ paddingRight: "30px", paddingLeft: "30px" }}>
          Edit
        </Button> */}
      </Flex>
      <div style={{ padding: "50px" }}>
        <Title level={3}>My playlists</Title>
        <Divider></Divider>
        {isSongsError && <div>Error fetching user playlists</div>}
        {isSongsLoading && <div>Loading user playlists</div>}
        {fetchedPlaylists && fetchedPlaylists?.length === 0 && (
          <div>No playlists for current user</div>
        )}
        {fetchedPlaylists && fetchedPlaylists?.length > 0 && (
          <>
            <Flex wrap="wrap" gap="middle">
              {fetchedPlaylists?.map((playlist) => (
                <Flex
                  key={playlist.id}
                  style={{
                    width: "100%",
                    cursor: "pointer",
                    border: "1px solid #ebebeb",
                    borderRadius: "5px",
                    padding: "10px",
                    transition: "background-color 0.3s",
                    backgroundColor: "#f0f0f0",
                  }}
                  onClick={() => navigate(`/homepage/?playlist=${playlist.id}`)}
                >
                  <div
                    style={{
                      width: "100%",
                    }}
                  >
                    {" "}
                    <Title level={5}> {playlist.name}</Title>
                    <p style={{ marginLeft: "10px" }}>
                      {playlist.songs.length} songs
                    </p>
                  </div>
                  {<CaretRightOutlined />}
                </Flex>
              ))}
            </Flex>
          </>
        )}
      </div>
    </div>
  );
};
