import { Avatar, Col } from "antd";

export const LeftColumn = () => {
  return (
    <Col
      span={24}
      xl={12}
      style={{
        alignItems: "center",
        justifyContent: "center",
        display: "flex",
      }}
    >
      <Avatar
        alt="Dancing Kellie Pickler"
        src={process.env.PUBLIC_URL + "/imgs/LoginGiph.gif"}
        size={500}
      />
    </Col>
  );
};
