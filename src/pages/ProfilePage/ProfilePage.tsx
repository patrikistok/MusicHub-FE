import { Avatar, Button, Divider, Flex, Modal, Typography } from "antd";
import { PlusCircleOutlined } from "@ant-design/icons";
import { useCreatePlaylist, useUserPlaylists } from "./hooks";
import { useContext, useState } from "react";
import { FormInput } from "../../components/forms/FormInput";
import { string, z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AuthContext } from "../../contexts/useAuthContext";
import { PlaylistDiv } from "../../components/PlaylistDiv";

const { Text } = Typography;

const schema = z.object({
  playlistName: string().min(1, { message: "Playlist name is required" }),
});

const { Title } = Typography;
type FormType = z.infer<typeof schema>;

export const Profile = () => {
  const loggedUser = JSON.parse(localStorage.getItem("user") ?? "");
  const {
    data: fetchedPlaylists,
    isError: isSongsError,
    isLoading: isSongsLoading,
    refetch,
  } = useUserPlaylists(loggedUser.id);

  const { mutateAsync, isLoading, isError, error } = useCreatePlaylist();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { user } = useContext(AuthContext);

  const { handleSubmit, formState, control } = useForm<FormType>({
    defaultValues: { playlistName: "" },
    resolver: zodResolver(schema),
  });
  const { errors } = formState;

  const handleSave = async (formValues: FormType) => {
    mutateAsync({
      userId: user!.id,
      name: formValues.playlistName,
    })
      .then((data) => {
        if (data) {
          refetch();
          setIsModalOpen(false);
        }
      })
      .catch((error) => console.log(error));
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

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
      </Flex>
      <div style={{ padding: "50px" }}>
        <Flex style={{ justifyContent: "space-between", alignItems: "center" }}>
          <Title level={3}>My playlists</Title>
          <Button onClick={showModal} icon={<PlusCircleOutlined />}>
            Add playlist
          </Button>
          <Modal
            title="Create playlist"
            open={isModalOpen}
            onCancel={handleCancel}
            footer={false}
          >
            <form
              onSubmit={handleSubmit(handleSave)}
              style={{ flex: 1, position: "relative", minHeight: "250px" }}
            >
              <FormInput
                label="Name of the new playlist"
                name="playlistName"
                control={control}
                placeholder="Enter playlist name"
                error={errors.playlistName?.message}
              />
              <div
                style={{
                  position: "absolute",
                  display: "flex",
                  flexDirection: "row-reverse",
                  bottom: 0,
                  width: "100%",
                }}
              >
                <Button key="back" onClick={handleCancel}>
                  Cancel
                </Button>
                <Button
                  disabled={isLoading}
                  htmlType="submit"
                  type="primary"
                  style={{ marginRight: "10px" }}
                >
                  Create
                </Button>
                {isError && <Text type="danger">{error.message}</Text>}
              </div>
            </form>
          </Modal>
        </Flex>
        <Divider></Divider>
        {isSongsError && <div>Error fetching user playlists</div>}
        {isSongsLoading && <div>Loading user playlists</div>}
        {fetchedPlaylists && fetchedPlaylists?.length === 0 && (
          <Title level={4}>No playlists for current user</Title>
        )}
        {fetchedPlaylists && fetchedPlaylists?.length > 0 && (
          <>
            <Flex wrap="wrap" gap="middle">
              {fetchedPlaylists?.map((playlist) => (
                <PlaylistDiv
                  playlist={playlist}
                  refetch={refetch}
                ></PlaylistDiv>
              ))}
            </Flex>
          </>
        )}
      </div>
    </div>
  );
};
