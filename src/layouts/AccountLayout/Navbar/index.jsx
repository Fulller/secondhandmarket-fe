import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Layout, Menu } from "antd";
import useNavItems from "./navItems";

const { Sider } = Layout;

export default function Navbar() {
  const navItems = useNavItems();
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const selectedKey = location.pathname;

  const toggleCollapse = () => {
    setCollapsed(!collapsed);
  };

  const menuData = navItems.map((menuItem) => ({
    key: menuItem.key,
    icon: menuItem.icon,
    label: menuItem.label,
    children: menuItem.items.map((item) => ({
      key: item.path,
      label: <Link to={item.path}>{item.label}</Link>,
    })),
  }));

  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={toggleCollapse}
      width={250}
      className="navbar"
    >
      <Menu mode="inline" selectedKeys={[selectedKey]} items={menuData} />
    </Sider>
  );
}
