import { Row, Typography } from "antd";
import { CSSProperties, ReactNode } from "react";

type Props = {
  label: string;
  icon: ReactNode;
  isActive?: boolean;
  style?: CSSProperties;
  onClick: () => void;
};

const { Text } = Typography;

export const MenuItem = ({ label, icon, isActive, style, onClick }: Props) => {
  return (
    <Row
      gutter={5}
      style={{
        padding: "5px",
        paddingLeft: "20px",
        backgroundColor: isActive ? "white" : "#F0F0F0",
        cursor: "pointer",
        ...style,
      }}
      onClick={onClick}
    >
      {icon}
      <Text strong style={{ marginLeft: "10px", fontSize: "20px" }}>
        {label}
      </Text>
    </Row>
  );
};
