import { useState } from "react";
import { Form, Steps, Input, Tooltip, Button, Layout } from "antd";
import { Card, Modal, Avatar, Alert, Row, Col } from "antd";
import axios from "axios";
import { CopyOutlined } from "@ant-design/icons";
import { LinkPreview } from "@dhaiwat10/react-link-preview";
import Interaction from "app/components/Interaction";
import { nanoid } from "nanoid";
import { LOVE_ICON, COMMENT_ICON, SHARE_ICON } from "app/components/Icons";
import FormHomePage from "app/pages/Form/LinkNameForm";
import FormAnalyticsPage from "app/pages/Form/LinkAnalyticsForm";
import FormRedirectPage from "app/pages/Form/LinkRedirectsForm";
import FormLinkDataPage from "app/pages/Form/LinkDataForm";
import FormTagsPage from "app/pages/Form/LinkTagsForm";
import { usePostHog } from "posthog-js/react";
import Event from "app/constants/PosthogEvent";
const { Footer } = Layout;
const { Step } = Steps;
const { Meta } = Card;

const FormDemo = () => {
  const baseUrl = " https://yaus.xyz";
  const [formLayout, setFormLayout] = useState("vertical");
  const [modal1Visible, setModal1Visible] = useState(false);
  const posthog = usePostHog();
  const [state, setState] = useState({
    userID: "0fe6ff38-fc46-11ec-b939-0242ac120001",
    url: "",
    project: "0fe6ff38-fc46-11ec-b939-0242ac120002",
    customHashId: nanoid(6),
    titleImage: "",
    urlImg: "",
    description: "",
  });
  const handleSubmit = (e) => {
    const userData = {
      customHashId: state.customHashId,
      project: state.project,
      url: state.url,
      userID: state.userID,
    };
    const headers = {
      "Content-Type": "application/json",
      Authorization: "JWT fefege...",
      "Access-Control-Allow-Origin": "*",
    };
    posthog.capture(Event.LINK_CREATION,{userData:userData}); // capture the link creation events
    console.log(userData);
    axios
      .post(`${baseUrl}/register`, userData, { headers: headers })
      .then((response) => {
        console.log("response"+response.status);
        console.log(response.data.token);
        console.log(`${baseUrl}/${state.customHashId}`);
      });
  };
  const [current, setCurrent] = useState(0);
  const [form] = Form.useForm();
  const handleClickNext = () => {
    form
      .validateFields()
      .then(() => {
        // Here make api call of something else
        setCurrent(current + 1);
      })
      .catch((err) => console.log(err));
  };
  const handleClickPrev = () => {
    setCurrent(current - 1);
  };

  const formItemLayout =
    formLayout === "vertical"
      ? {
          labelCol: {
            span: 80,
          },
          wrapperCol: {
            span: 1,
          },
        }
      : null;
  return (
    <div classname="layout-content">
      <Steps current={current}>
        <Step key={0} title="Step 1" />
        <Step key={1} title="Step 2" />
        <Step key={2} title="Step3 " />
        <Step key={3} title="Step 4" />
        <Step key={4} title="Step 5" />
      </Steps>
      <div style={{ margin: "50px 10px" }}>
        <Form
          form={form}
          justify="center"
          align="middle"
          margin="auto"
          id="myForm"
          style={{ minHeight: "20vh" }}
          {...formItemLayout}
          layout={formLayout}
          onSubmit={(e) => e.preventDefault()}
          onFinish={handleSubmit}
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 2,
          }}
        >
          {current === 0 && <FormHomePage />}
          {current === 1 && <FormAnalyticsPage />}
          {current === 2 && <FormRedirectPage />}
          {current === 3 && <FormLinkDataPage />}
          {current === 4 && <FormTagsPage />}
        </Form>
      </div>
      <div
        className="steps-action"
        align="right"
        style={{ marginRight: "50px" }}
      >
        {current > 0 && (
          <Button
            onClick={handleClickPrev}
            style={{
              margin: "0 8px",
            }}
          >
            Previous
          </Button>
        )}
        {current < 4 && (
          <Button type="primary" onClick={handleClickNext}>
            Next
          </Button>
        )}
        {current === 4 && (
          <>
            <Button
              form="myForm"
              type="submit"
              htmlType="submit"
              align="right"
              onClick={() => setModal1Visible(true)}
            >
              Done
            </Button>
            <Modal
              title="Summary"
              width={1000}
              style={{
                top: 20,
              }}
              visible={modal1Visible}
              onOk={() => setModal1Visible(false)}
              onCancel={() => setModal1Visible(false)}
            >
              <Row gutter={[24, 0]}>
                <Col xs={24} sm={24} md={12} lg={12} xl={12} className="mb-24">
                  <Alert message="Naming Link" type="success" showIcon />
                  <br></br>
                  <Alert message="Analytics Tags" type="success" showIcon />
                  <br></br>
                  <Alert message="Redirect" type="warning" showIcon />
                  <br></br>
                  <Alert message="Social Media tags" type="success" showIcon />
                </Col>
                <Col xs={24} sm={24} md={12} lg={12} xl={12} className="mb-24">
                  <h2>Preview...</h2>
                  <Card
                    hoverable
                    style={{
                      width: 440,
                    }}
                  >
                    <Meta
                      avatar={
                        <Avatar src="https://joeschmoe.io/api/v1/random" />
                      }
                      title="Akshay"
                      description={"10 hours ago • Algeria"}
                    />
                    <br></br>
                    <LinkPreview
                      url={state.url}
                      title="Akshay"
                      width="400px"
                      fallbackImageSrc="https://thumbs.dreamstime.com/b/rainbow-love-heart-background-red-wood-60045149.jpg"
                      explicitImageSrc={state.urlImg}
                    />
                    <br></br>
                    <Footer>
                      <br></br>
                      <div
                        class="flexbox-container"
                        justify-content="space-between"
                      >
                        &nbsp;&nbsp;
                        <Interaction
                          icon={LOVE_ICON}
                          count={12}
                          style={{ paddingTop: "10px" }}
                        />
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <Interaction icon={COMMENT_ICON} count={2} />
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <Interaction icon={SHARE_ICON} count={1} />
                      </div>
                    </Footer>
                  </Card>
                  <br></br>
                  <Input.Group compact>
                    <Input
                      style={{
                        width: "calc(100% - 200px)",
                      }}
                      value={`${baseUrl}/${state.customHashId}`}
                    />
                    <Tooltip title="copy git url">
                      <Button
                        size="small"
                        icon={
                          <CopyOutlined
                            size="large"
                            style={{ fontSize: "150%" }}
                          />
                        }
                        onClick={() =>
                          navigator.clipboard.writeText(
                            `${baseUrl}/${state.customHashId}`
                          )
                        }
                      />
                    </Tooltip>
                  </Input.Group>
                </Col>
              </Row>
            </Modal>
          </>
        )}
      </div>
    </div>
  );
};

export default FormDemo;
