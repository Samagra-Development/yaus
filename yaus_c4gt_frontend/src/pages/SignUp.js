import React, { Component, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { ReactComponent as DashboardIcon } from "../assets/icons/dashboardIcon.svg";
import { ReactComponent as ProfileIcon } from "../assets/icons/profileIcon.svg";
import { ReactComponent as SigninIcon } from "../assets/icons/signinIcon.svg";
import { ReactComponent as SignupIcon } from "../assets/icons/signupIcon.svg";

import {
  Layout,
  Menu,
  Button,
  Typography,
  Card,
  Form,
  Input,
  Checkbox,
} from "antd";

import { Link } from "react-router-dom";
import {
  TwitterOutlined,
  InstagramOutlined,
  GithubOutlined,
} from "@ant-design/icons";

const { Title } = Typography;
const { Header, Footer, Content } = Layout;

function SignUp() {
  useEffect(() => {
    if (localStorage.getItem("user-info")) {
      history.push("/dashboard");
    }
  }, []);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const history = useHistory();

  async function action() {
    let item = {
      registration: {
        applicationId: "650c50b5-eae9-442e-88de-fc36be10a21b",
      },
      user: {
        name: name,
        email: email,
        password: password,
      },
    };

    let result = await fetch(
      "https://fa.chakshu-rd.samagra.io/api/user/registration",
      {
        method: "POST",
        credentials: "omit",
        headers: {
          Authorization: `${process.env.REACT_APP_AUTH_TOKEN}`,
          "Content-Type": "application/json",
        },

        body: JSON.stringify(item),
      }
    );
    result = await result.json();
    // console.warn("Result", result)
    localStorage.setItem("user-info", JSON.stringify(result));
    history.push("/dashboard");
  }

  const onFinish = (values) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <>
      <div className="layout-default ant-layout layout-sign-up">
        <Header>
          {/* <div className="header-col header-brand">
              <h5>Muse Dashboard</h5>
            </div> */}
          <div className="header-col header-nav">
            <Menu mode="horizontal" defaultSelectedKeys={["1"]}>
              <Menu.Item key="1">
                <Link to="/dashboard">
                  <DashboardIcon />
                  <span> Dashboard</span>
                </Link>
              </Menu.Item>
              <Menu.Item key="2">
                <Link to="/profile">
                  <ProfileIcon />
                  <span>Profile</span>
                </Link>
              </Menu.Item>
              <Menu.Item key="3">
                <Link to="/sign-up">
                  <SignupIcon />
                  <span> Sign Up</span>
                </Link>
              </Menu.Item>
              <Menu.Item key="4">
                <Link to="/sign-in">
                  <SigninIcon />
                  <span> Sign In</span>
                </Link>
              </Menu.Item>
            </Menu>
          </div>
          {/* <div className="header-col header-btn">
              <Button type="false">FREE DOWNLOAD</Button>
            </div> */}
        </Header>

        <Content className="p-0">
          <div className="sign-up-header">
            <div className="content">
              <Title>Sign Up</Title>
              {/* <p className="text-lg">
                  Use these awesome forms to login or create new account in your
                  project for free.
                </p> */}
            </div>
          </div>

          <Card
            className="card-signup header-solid h-full ant-card pt-0"
            // title={<h5>Create Your Account With</h5>}
            bordered="false"
          >
            <div className="sign-up-gateways">
              {/* <Button type="false">
                  <img src={logo1} alt="logo 1" />
                </Button> */}
              {/* <Button type="false">
                  <img src={logo2} alt="logo 2" />
                </Button> */}
              {/* <Button type="false">
                  <img src={logo3} alt="logo 3" />
                </Button> */}
            </div>
            <p className="text-center my-25 font-semibold text-muted"></p>
            <Form
              name="basic"
              initialValues={{ remember: true }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              className="row-col"
            >
              <Form.Item
                name="Name"
                rules={[
                  { required: true, message: "Please input your username!" },
                ]}
              >
                <Input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Username"
                />
              </Form.Item>
              <Form.Item
                name="email"
                rules={[
                  { required: true, message: "Please input your email!" },
                ]}
              >
                <Input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                />
              </Form.Item>
              <Form.Item
                name="password"
                rules={[
                  { required: true, message: "Please input your password!" },
                ]}
              >
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                />
              </Form.Item>

              <Form.Item name="remember" valuePropName="checked">
                <Checkbox>
                  I agree the{" "}
                  <a href="#pablo" className="font-bold text-dark">
                    Terms and Conditions
                  </a>
                </Checkbox>
              </Form.Item>

              <Form.Item>
                <Button
                  style={{ width: "100%" }}
                  type="primary"
                  htmlType="submit"
                  onClick={action}
                >
                  SIGN UP
                </Button>
              </Form.Item>
            </Form>
            <p className="font-semibold text-muted text-center">
              Already have an account?{" "}
              <Link to="/sign-in" className="font-bold text-dark">
                Sign In
              </Link>
            </p>
          </Card>
        </Content>
        <Footer>
          <Menu mode="horizontal">
            <Menu.Item>Company</Menu.Item>
            <Menu.Item>About Us</Menu.Item>
            <Menu.Item>Teams</Menu.Item>
            <Menu.Item>Products</Menu.Item>
            {/* <Menu.Item>Blogs</Menu.Item>
              <Menu.Item>Pricing</Menu.Item> */}
          </Menu>
          <Menu mode="horizontal" className="menu-nav-social">
            {/* <Menu.Item>
                <Link to="#">{<DribbbleOutlined />}</Link>
              </Menu.Item> */}
            <Menu.Item>
              <Link to="#">{<TwitterOutlined />}</Link>
            </Menu.Item>
            <Menu.Item>
              <Link to="#">{<InstagramOutlined />}</Link>
            </Menu.Item>
            {/* <Menu.Item>
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
              </Menu.Item> */}
            <Menu.Item>
              <Link to="#">{<GithubOutlined />}</Link>
            </Menu.Item>
          </Menu>
          <p className="copyright">
            {" "}
            Copyright © 2021 Muse by <a href="#pablo">Creative Tim</a>.{" "}
          </p>
        </Footer>
      </div>
    </>
  );
}

export default SignUp;
