import { useState } from "react";
import Header from "@layouts/components/Header";
import NavBar from "./Navbar";
import { Layout } from "antd";
const { Content } = Layout;
import ".scss";

function AccountLayout({ children }) {
  const [headerHieght, setHeaderHeight] = useState(0);
  return (
    <div>
      <Header onHeightChange={setHeaderHeight}></Header>
      <Layout className="account-layout" style={{ paddingTop: headerHieght }}>
        <NavBar></NavBar>
        <Content className="account-content">{children}</Content>
      </Layout>
    </div>
  );
}
export default AccountLayout;
