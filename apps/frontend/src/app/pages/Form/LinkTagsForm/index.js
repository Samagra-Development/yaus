import { useState } from "react";
import {
  Form,
  Space,
  Input,
  Menu,
  Upload,
  Button,
  message,
  Modal,
  Card,
  Avatar,
  Layout,
} from "antd";
import { LOVE_ICON, COMMENT_ICON, SHARE_ICON } from "app/components/Icons";

import { InfoCircleOutlined } from "@ant-design/icons";
import Interaction from "app/components/Interaction";
import { LinkPreview } from "@dhaiwat10/react-link-preview";
import { nanoid } from "nanoid";
import { usePostHog } from "posthog-js/react";
const { Meta } = Card;
const { Footer } = Layout;
const props = {
  name: "file",
  action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
  headers: {
    authorization: "authorization-text",
  },
  onChange(info) {
    if (info.file.status !== "uploading") {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === "done") {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
};
function FormTagsPage() {
  const [selectedMenuItem, setSelectedMenuItem] = useState("useUrl");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const posthog  = usePostHog();
  const [state, setState] = useState({
    userID: "0fe6ff38-fc46-11ec-b939-0242ac120001",
    url: "",
    project: "0fe6ff38-fc46-11ec-b939-0242ac120002",
    customHashId: nanoid(6),
    titleImage: "",
    urlImg: "",
    description: "",
  });

  const handleChange = (e) => {
    const value = e.target.value;
    /* console.log(`${baseUrl}/${state.customHashId}`); */
    setState({
      ...state,
      [e.target.name]: value,
    });
  };
  const showModal = () => {
    setIsModalVisible(true);
  };
  const handleOk = () => {
    setIsModalVisible(false);
  };
  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const componentsSwtich = (key) => {
    switch (key) {
      case "useUrl":
        return (
          <>
            <h5 style={{ width: 500, marginTop: "10px" }}>
              Please provide a valid image file url from the web ending in .png,
              .jpg, or .jpeg or upload your own valid image.
            </h5>
            <Form.Item label="Image Url" style={{ marginTop: "10px" }}>
              <Space>
                <Form.Item
                  noStyle
                  rules={[
                    {
                      required: false,
                      message: "title",
                    },
                  ]}
                >
                  <Input
                    name="urlImg"
                    id="urlImg"
                    value={state.urlImg}
                    style={{
                      width: 500,
                    }}
                    placeholder="e.g https://website.com.tree.jpg"
                    onChange={handleChange}
                  />
                </Form.Item>
              </Space>
            </Form.Item>
          </>
        );
      case "upload":
        return (
          <>
            <h5 style={{ width: 500, marginTop: "10px" }}>
              Please provide a valid image file url from the web ending in .png,
              .jpg, or .jpeg or upload your own valid image.
            </h5>
            <Upload {...props}>
              <Button type="dashed">Click to Upload</Button>
            </Upload>
          </>
        );
    }
  };
  return (
    <div className="steps-content">
      <h3>Social Media Tags </h3>
      <h5>
        When a link is shared on social media platforms, it generally shows a
        preview of title, description, and image
      </h5>
      <div style={{ marginLeft: "30%" }}>
        <Form.Item
          label="Title"
          tooltip={{
            title: "Title of Shorten Url",
            icon: <InfoCircleOutlined />,
          }}
          rules={[
            {
              required: false,
              message: "title",
            },
          ]}
        >
          <Space>
            <Input
              style={{
                width: 500,
              }}
              id="titleImage"
              name="titleImage"
              value={state.titleImage}
              onChange={handleChange}
            />
          </Space>
        </Form.Item>
        <Form.Item
          label="Description"
          rules={[
            {
              required: false,
              message: "description",
            },
          ]}
        >
          <Space>
            <Input
              id="description"
              name="description"
              value={state.description}
              onChange={handleChange}
              style={{
                width: 500,
              }}
            />
          </Space>
        </Form.Item>
        <Form.Item
          label="Image URL"
          tooltip={{
            title:
              "Note that your image may be cropped and aligned differently depending on the social platform.",
            icon: <InfoCircleOutlined />,
          }}
        >
          <Menu
            style={{ width: 500 }}
            selectedKeys={selectedMenuItem}
            mode="horizontal"
            onClick={(e) => setSelectedMenuItem(e.key)}
          >
            <Menu.Item key="useUrl">Use Url</Menu.Item>
            <Menu.Item key="upload">Upload Image</Menu.Item>
          </Menu>
          <div>{componentsSwtich(selectedMenuItem)}</div>
        </Form.Item>
        <Form.Item label=" " colon={false}>
          <Button type="preview" align="right" onClick={showModal}>
            Preview
          </Button>
          <Modal
            title="Preview"
            visible={isModalVisible}
            onOk={handleOk}
            onCancel={handleCancel}
            width={550}
          >
            <Card
              hoverable
              style={{
                width: 440,
              }}
              /* cover={<img alt="example" src={state.urlImg} />} */
            >
              <Meta
                avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
                title="Akshay"
                description={"10 hours ago • Algeria"}
              />
              <br></br>
              <LinkPreview
                url={state.url}
                title="Aksjat"
                width="400px"
                fallbackImageSrc="https://thumbs.dreamstime.com/b/rainbow-love-heart-background-red-wood-60045149.jpg"
                explicitImageSrc={state.urlImg}
              />
              <br></br>
              <Footer>
                <br></br>
                <div class="flexbox-container" justify-content="space-between">
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
          </Modal>
        </Form.Item>
      </div>
    </div>
  );
}
export default FormTagsPage;
