import { useEffect, useState } from "react";
import { Navigate, useNavigate, Link } from "react-router-dom";
// import posthog from 'posthog-js';

// prettier-ignore
import { Layout, Menu, Button, Typography, Form, Input,Checkbox,Card } from "antd";
// prettier-ignore
import { TwitterOutlined, InstagramOutlined, GithubOutlined } from "@ant-design/icons";

import { onFinishFailed, onFinish } from "app/utils/outputResponse.js";
import * as apiUtil from "app/apis/index.js";
import Navbar from "app/components/Navbar";
import routes from "app/constants/Routes";
const { Title } = Typography;
const { Content } = Layout;
import Footer from "app/components/Footer";
import { usePostHog } from "posthog-js/react";

function SignUp() {
  const history = useNavigate();
  const posthog = usePostHog(); // posthog instance
  useEffect(() => {
    // console.log(posthog);
    // posthog.capture('$pageview');  // sent the pageview to posthog
    if (localStorage.getItem("user-info")) {
      history.push("/dashboard");
    }
  }, []);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function signUp() {
    // Get Request Body
    const reqBody = apiUtil.getSignUpReqBody({
      name: name,
      email: email,
      password: password,
    });
    
    // sent the signup event to posthog
    posthog.capture('User signed Up', {   
         name:name,
         email:email
    }); 

    try {
      // Get Response
      const result = await apiUtil.getResponse(
        routes.AUTH_BASE_URL + "/user/registration", // TO DO: shift to constants
        reqBody
      );

      // posthog.capture('User signed Up', { userInfo: result }); // sent the signup event to posthog

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
      <Footer />
    </div>
  );
}

export default SignUp;
