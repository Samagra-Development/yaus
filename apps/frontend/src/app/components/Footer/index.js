import { Menu, Row, Col, Layout } from "antd";
import { Link } from "react-router-dom";
import {
  TwitterOutlined,
  InstagramOutlined,
  GithubOutlined,
} from "@ant-design/icons";

function Footer() {
  const { Footer: AntFooter } = Layout;

  return (
    <AntFooter style={{ background: "#fafafa" }}>
      <Row justify="center">
        <Col xs={24} md={12} lg={12} className="menu-col">
          <Menu mode="horizontal">
            <Menu.Item>Company</Menu.Item>
            <Menu.Item>About Us</Menu.Item>
            <Menu.Item>Teams</Menu.Item>
            <Menu.Item>Products</Menu.Item>
          </Menu>
        </Col>
      </Row>
      <Row justify="center">
        <Col xs={24} md={12} lg={12} className="menu-col">
          <Menu mode="horizontal" className="menu-nav-social">
            <Menu.Item>
              <Link to="#">{<TwitterOutlined />}</Link>
            </Menu.Item>
            <Menu.Item>
              <Link to="#">{<InstagramOutlined />}</Link>
            </Menu.Item>
            <Menu.Item>
              <Link to="#">{<GithubOutlined />}</Link>
            </Menu.Item>
          </Menu>
        </Col>
      </Row>
    </AntFooter>
  );
}

export default Footer;
