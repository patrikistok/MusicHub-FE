import { Avatar, Col } from "antd";

type Props = {
  span?: number;
};

export const LeftColumn = ({ span }: Props) => {
  return (
    <Col
      span={span ?? 12}
      style={{
        alignItems: "center",
        justifyContent: "center",
        display: "flex",
      }}
    >
      <Avatar
        alt="Dancing Kellie Pickler"
        src={process.env.PUBLIC_URL + "/imgs/LoginGiph.gif"}
        size={400}
      />
    </Col>
  );
};
