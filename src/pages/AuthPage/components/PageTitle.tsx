import { Typography } from "antd";

const { Text, Title } = Typography;

type Props = {
  title: string;
};

export const PageTitle = ({ title }: Props) => {
  return (
    <>
      <Title style={{ marginBottom: "10px", textAlign: "center" }}>
        {title}
      </Title>
      <Text
        style={{ marginBottom: "50px", display: "block", textAlign: "center" }}
      >
        Join MusicHub to get started
      </Text>
    </>
  );
};
