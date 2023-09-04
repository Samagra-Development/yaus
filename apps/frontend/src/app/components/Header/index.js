import { useEffect } from "react";
import { LogoutOutlined } from "@ant-design/icons";
import { Space } from "antd";
import { useNavigate } from "react-router-dom";
import "app/styles/header.css";
import { Row, Col, Breadcrumb, Button } from "antd";
import Event from "app/constants/PosthogEvent";
import { NavLink, Link } from "react-router-dom";
import { usePostHog } from "posthog-js/react";

// TO DO: Shift these to constants file
const profile = [
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    key={0}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M18 10C18 14.4183 14.4183 18 10 18C5.58172 18 2 14.4183 2 10C2 5.58172 5.58172 2 10 2C14.4183 2 18 5.58172 18 10ZM12 7C12 8.10457 11.1046 9 10 9C8.89543 9 8 8.10457 8 7C8 5.89543 8.89543 5 10 5C11.1046 5 12 5.89543 12 7ZM9.99993 11C7.98239 11 6.24394 12.195 5.45374 13.9157C6.55403 15.192 8.18265 16 9.99998 16C11.8173 16 13.4459 15.1921 14.5462 13.9158C13.756 12.195 12.0175 11 9.99993 11Z"
      fill="#111827"
    ></path>
  </svg>,
];

const toggler = [
  <svg
    width="20"
    height="20"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 448 512"
    key={0}
  >
    <path d="M16 132h416c8.837 0 16-7.163 16-16V76c0-8.837-7.163-16-16-16H16C7.163 60 0 67.163 0 76v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16z"></path>
  </svg>,
];

function Header({ name, subName, onPress }) {
  const posthog = usePostHog();
  const local_info = JSON.parse(localStorage.getItem("user-info"));
  const navigate = useNavigate();

  useEffect(() => window.scrollTo(0, 0));

  function logout() {
    posthog.capture(Event.SIGNED_OUT,{user:local_info});  // capture the signed out events
    localStorage.clear();
    navigate("/signup");
  }

  return (
    <Row gutter={[24, 0]}>
      <Col span={24} md={6}>
        <Breadcrumb>
          <Breadcrumb.Item>
            <NavLink to="/">Pages</NavLink>
          </Breadcrumb.Item>
          <Breadcrumb.Item style={{ textTransform: "capitalize" }}>
            {name.replace("/", "")}
          </Breadcrumb.Item>
        </Breadcrumb>
        <div className="ant-page-header-heading">
          <span
            className="ant-page-header-heading-title"
            style={{ textTransform: "capitalize" }}
          >
            {subName.replace("/", "")}
          </span>
        </div>
      </Col>
      <Col span={24} md={18} className="header-control">
        <Button
          type="link"
          className="sidebar-toggler"
          onClick={() => onPress()}
        >
          {toggler}
        </Button>

        {localStorage.getItem("user-info") ? (
          <>
            {" "}
            <Link to="/sign-up" className="logout-span ">
              <span onClick={logout}>
                <LogoutOutlined />
                Sign Out
              </span>
            </Link>
          </>
        ) : (
          <Link to="/sign-in" className="logout-span">
            {profile}
            <span>Sign in</span>
          </Link>
        )}

        {localStorage.getItem("user-info") ? (
          // eslint-disable-next-line jsx-a11y/anchor-is-valid
          <a onClick={(e) => e.preventDefault()}>
            <Space>
              {profile}
              {local_info.user.email}
            </Space>
          </a>
        ) : (
          // eslint-disable-next-line react/jsx-no-useless-fragment
          <></>
        )}
      </Col>
    </Row>
  );
}

export default Header;
