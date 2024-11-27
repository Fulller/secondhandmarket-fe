import React from "react";
import { Layout } from "antd";
import ".scss";

const { Footer: AntFooter } = Layout;

function Footer() {
  return (
    <AntFooter className="footer">
      <p>&copy; 2024 Secondhand Market. All rights reserved.</p>
      <p>
        Designed with 💖 by <a href="#">Your Company</a>
      </p>
    </AntFooter>
  );
}

export default Footer;
