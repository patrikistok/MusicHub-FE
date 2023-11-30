import { Layout } from "antd";
import { SideMenu } from "./SideMenu";
import Sider from "antd/es/layout/Sider";
import { Content } from "antd/es/layout/layout";
import "./layout.css";

type Props = {
  children: JSX.Element;
};

export const PageLayout = ({ children }: Props) => {
  return (
    <Layout
      style={{ height: "100vh", overflow: "hidden", overflowY: "hidden" }}
    >
      <Sider>
        <SideMenu />
      </Sider>
      <Layout style={{ overflow: "auto" }}>
        <Content>{children}</Content>
      </Layout>
    </Layout>
  );
};
