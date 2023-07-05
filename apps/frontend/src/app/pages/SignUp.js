import { useEffect, useState } from "react";
import { Navigate, useNavigate, Link } from "react-router-dom";

// prettier-ignore
import { Layout, Menu, Button, Typography, Form, Input,Checkbox,Card } from "antd";
// prettier-ignore
import { TwitterOutlined, InstagramOutlined, GithubOutlined } from "@ant-design/icons";

import { onFinishFailed, onFinish } from "app/utils/outputResponse.js";
import * as apiUtil from "app/apis/index.js";
import Navbar from "app/components/layout/NavBar.js";

const { Title } = Typography;
const { Footer, Content } = Layout;

function SignUp() {
  useEffect(() => {
    if (localStorage.getItem("user-info")) {
      Navigate.push("/dashboard");
    }
  }, []);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useNavigate();

  async function signUp() {
    // Get Request Body
    const reqBody = apiUtil.getSignUpReqBody({
      name: name,
      email: email,
      password: password,
    });

    try {
      // Get Response
      const result = await apiUtil.getResponse(
        apiUtil.baseUrl + "/user/registration", // TO DO: shift to constants
        reqBody
      );
      // Set Local Storage
      localStorage.setItem("user-info", JSON.stringify(result));
      // Navigate to Dashboard
      history.push("/dashboard");
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <div className="layout-default ant-layout layout-sign-up">
      <Navbar />
      <Content className="p-0">
        <div className="sign-up-header">
          <div className="content">
            <Title>Sign Up</Title>
          </div>
        </div>

        <Card
          className="card-signup header-solid h-full ant-card pt-0"
          bordered="false"
        >
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
              rules={[{ required: true, message: "Please input your email!" }]}
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
                onClick={signUp}
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
        </Menu>
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
      </Footer>
    </div>
  );
}

export default SignUp;
