import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import Routes from "../assets/constants/routes.js";
import {
  Layout,
  Menu,
  Button,
  Row,
  Col,
  Typography,
  Form,
  Input,
  Switch,
} from "antd";
import { ReactComponent as DashboardIcon } from "../assets/icons/dashboardIcon.svg";
import { ReactComponent as ProfileIcon } from "../assets/icons/profileIcon.svg";
import { ReactComponent as SigninIcon } from "../assets/icons/signinIcon.svg";
import { ReactComponent as SignupIcon } from "../assets/icons/signupIcon.svg";

import signinbg from "../assets/images/img-signin.jpg";
import {
  DribbbleOutlined,
  TwitterOutlined,
  InstagramOutlined,
  GithubOutlined,
} from "@ant-design/icons";

function onChange(checked) {
  console.log(`switch to ${checked}`);
}
const { Title } = Typography;
const { Header, Footer, Content } = Layout;

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const history = useHistory();

  useEffect(() => {
    if (localStorage.getItem("user-info")) {
      history.push("/dashboard");
    }
  }, []);

  const onFinish = (values) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  async function login() {
    let item = {
      loginId: email,
      password: password,
      applicationId: `${process.env.REACT_APP_APPLICATION_ID}`,
    };

    let result = await fetch("https://fa.chakshu-rd.samagra.io/api/login", {
      method: "POST",
      credentials: "omit",
      headers: {
        Authorization: `${process.env.REACT_APP_AUTH_TOKEN}`,
        "Content-Type": "application/json",
      },

      body: JSON.stringify(item),
    });
    result = await result.json();
    localStorage.setItem("user-info", JSON.stringify(result));
    history.push("/dashboard");
    console.log("Result");
  }
  return (
    <>
      <Layout className="layout-default layout-signin">
        <Header>
          <div className="header-col header-nav">
            <Menu mode="horizontal" defaultSelectedKeys={["1"]}>
              <Menu.Item key="1">
                <Link to={Routes.DASHBOARD}>
                  <DashboardIcon />
                  <span> Dashboard</span>
                </Link>
              </Menu.Item>
              <Menu.Item key="2">
                <Link to={Routes.PROFILE}>
                  <ProfileIcon />
                  <span>Profile</span>
                </Link>
              </Menu.Item>
              <Menu.Item key="3">
                <Link to={Routes.SIGN_UP}>
                  <SignupIcon />
                  <span> Sign Up</span>
                </Link>
              </Menu.Item>
              <Menu.Item key="4">
                <Link to={Routes.SIGN_IN}>
                  <SigninIcon />
                  <span> Sign In</span>
                </Link>
              </Menu.Item>
            </Menu>
          </div>
        </Header>
        <Content className="signin">
          <Row gutter={[24, 0]} justify="space-around">
            <Col
              xs={{ span: 24, offset: 0 }}
              lg={{ span: 6, offset: 2 }}
              md={{ span: 12 }}
            >
              <Title className="mb-15">Sign In</Title>
              <Title className="font-regular text-muted" level={5}>
                Enter your email and password to sign in
              </Title>
              <Form
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                layout="vertical"
                className="row-col"
              >
                <Form.Item
                  className="username"
                  label="Email"
                  name="email"
                  rules={[
                    {
                      required: true,
                      message: "Please input your email!",
                    },
                  ]}
                >
                  <Input
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                  />
                </Form.Item>

                <Form.Item
                  className="username"
                  label="Password"
                  name="password"
                  rules={[
                    {
                      required: true,
                      message: "Please input your password!",
                    },
                  ]}
                >
                  <Input
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                  />
                </Form.Item>

                <Form.Item
                  name="remember"
                  className="aligin-center"
                  valuePropName="checked"
                >
                  <Switch defaultChecked onChange={onChange} />
                  Remember me
                </Form.Item>

                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    style={{ width: "100%" }}
                    onClick={login}
                  >
                    SIGN IN
                  </Button>
                </Form.Item>
                <p className="font-semibold text-muted">
                  Don't have an account?{" "}
                  <Link to="/sign-up" className="text-dark font-bold">
                    Sign Up
                  </Link>
                </p>
              </Form>
            </Col>
            <Col
              className="sign-img"
              style={{ padding: 12 }}
              xs={{ span: 24 }}
              lg={{ span: 12 }}
              md={{ span: 12 }}
            >
              <img src={signinbg} alt="" />
            </Col>
          </Row>
        </Content>
        <Footer>
          <Menu mode="horizontal">
            <Menu.Item>Company</Menu.Item>
            <Menu.Item>About Us</Menu.Item>
            <Menu.Item>Teams</Menu.Item>
            <Menu.Item>Products</Menu.Item>
            <Menu.Item>Blogs</Menu.Item>
            <Menu.Item>Pricing</Menu.Item>
          </Menu>
          <Menu mode="horizontal" className="menu-nav-social">
            <Menu.Item>
              <Link to="#">{<DribbbleOutlined />}</Link>
            </Menu.Item>
            <Menu.Item>
              <Link to="#">{<TwitterOutlined />}</Link>
            </Menu.Item>
            <Menu.Item>
              <Link to="#">{<InstagramOutlined />}</Link>
            </Menu.Item>
            <Menu.Item>
              <Link to="#">
                <svg
                  width="18"
                  height="18"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                >
                  <path d="M496 256c0 137-111 248-248 248-25.6 0-50.2-3.9-73.4-11.1 10.1-16.5 25.2-43.5 30.8-65 3-11.6 15.4-59 15.4-59 8.1 15.4 31.7 28.5 56.8 28.5 74.8 0 128.7-68.8 128.7-154.3 0-81.9-66.9-143.2-152.9-143.2-107 0-163.9 71.8-163.9 150.1 0 36.4 19.4 81.7 50.3 96.1 4.7 2.2 7.2 1.2 8.3-3.3.8-3.4 5-20.3 6.9-28.1.6-2.5.3-4.7-1.7-7.1-10.1-12.5-18.3-35.3-18.3-56.6 0-54.7 41.4-107.6 112-107.6 60.9 0 103.6 41.5 103.6 100.9 0 67.1-33.9 113.6-78 113.6-24.3 0-42.6-20.1-36.7-44.8 7-29.5 20.5-61.3 20.5-82.6 0-19-10.2-34.9-31.4-34.9-24.9 0-44.9 25.7-44.9 60.2 0 22 7.4 36.8 7.4 36.8s-24.5 103.8-29 123.2c-5 21.4-3 51.6-.9 71.2C65.4 450.9 0 361.1 0 256 0 119 111 8 248 8s248 111 248 248z"></path>
                </svg>
              </Link>
            </Menu.Item>
            <Menu.Item>
              <Link to="#">{<GithubOutlined />}</Link>
            </Menu.Item>
          </Menu>
          <p className="copyright">
            {" "}
            Copyright © 2021 Muse by <a href="#pablo">Creative Tim</a>.{" "}
          </p>
        </Footer>
      </Layout>
    </>
  );
}
export default SignIn;
