// prettier-ignore
import { Layout, Menu, Button, Row, Col, Typography, Form, Input, Switch } from "antd";
// prettier-ignore
import { TwitterOutlined, InstagramOutlined, GithubOutlined } from "@ant-design/icons";

import signinbg from "app/assets/images/img-signin.jpg";
import { useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import * as apiUtil from "app/apis/index.js";
import { onFinish, onFinishFailed } from "app/utils/outputResponse.js";
import Navbar from "app/components/layout/NavBar";
import Footer from "app/components/layout/Footer.js";
import { mockUser } from "app/assets/constants/mockData"; // TODO: Remove this line
function onChange(checked) {
  console.log(`switch to ${checked}`);
}
const { Title } = Typography;
const { Content } = Layout;

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("user-info")) {
      navigate("/dashboard");
    }
  }, []);

  async function login() {
    // comment this out after testing the api call
    localStorage.setItem("user-info", JSON.stringify(mockUser));
    // Get Request Body
    const reqBody = apiUtil.getSignInReqBody(email, password);
    try {
      // Uncomment this block to make API call
      /**
      // Get Response
      const result = await apiUtil.getResponse(
        apiUtil.baseUrl + "/login",
        reqBody
        );
        // Set Local Storage
        localStorage.setItem("user-info", JSON.stringify(result));
      */
      navigate("/dashboard");
    } catch (e) {
      console.log(e);
    }
  }
  return (
    <Layout className="layout-default layout-signin">
      <Navbar />
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
      <Footer />
    </Layout>
  );
}
export default SignIn;
