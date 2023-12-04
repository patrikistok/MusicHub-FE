import { Col, Typography } from "antd";
import { MenuItem } from "./MenuItem";
import { BookOutlined, HomeOutlined, LogoutOutlined } from "@ant-design/icons";
import { useLocation, useNavigate } from "react-router";
import { useContext } from "react";
import { AuthContext } from "../../contexts/useAuthContext";

const { Title } = Typography;

export const SideMenu = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { setUser } = useContext(AuthContext);

  const navigateHome = () => {
    navigate("/");
  };

  const navigateToMyLibrary = () => {
    navigate("/profile");
  };

  const navigateToCreate = () => {
    navigate("/add_song");
  };

  const logout = () => {
    setUser(null);
    navigate("/login");
  };

  return (
    <Col
      style={{
        backgroundColor: "#F0F0F0",
        height: "100vh",
        paddingTop: "50px",
        paddingBottom: "50px",
        display: "flex",
        flexDirection: "column",
        position: "relative",
      }}
    >
      <Title style={{ paddingLeft: "20px" }}>Discover</Title>
      <MenuItem
        label="Home"
        icon={<HomeOutlined style={{ fontSize: "20px" }} />}
        onClick={navigateHome}
        isActive={pathname === "/homepage"}
      />
      <MenuItem
        label="My Library"
        icon={<BookOutlined style={{ fontSize: "20px" }} />}
        onClick={navigateToMyLibrary}
        isActive={pathname === "/profile"}
      />
      {/* <MenuItem
        label="Create song"
        icon={<PlusCircleOutlined style={{ fontSize: "20px" }} />}
        isActive={pathname==="/add_song"}
      /> */}
      <MenuItem
        label="Log Out"
        icon={<LogoutOutlined />}
        style={{ position: "absolute", bottom: "50px" }}
        onClick={logout}
      />
    </Col>
  );
};
