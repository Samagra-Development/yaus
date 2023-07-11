import { useState } from "react";
import { InfoCircleOutlined } from "@ant-design/icons";
import { Form, Input, Space } from "antd";
import { nanoid } from "nanoid";

function FormHomePage() {
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
  return (
    <div className="steps-content">
      <h3>Name Your Link </h3>
      <h5>
        Let's start by naming your link and creating an alias. Make the link
        title easy to remember for you , as it will be displayed in the Quick
        Links table.
      </h5>
      <div style={{ marginLeft: "30%" }}>
        <Form.Item
          label="Link Title"
          name="linkTitle"
          required
          tooltip="This is a required field"
          value="vertical"
          rules={[
            {
              required: true,
              message: "Title is required",
            },
          ]}
        >
          <Input
            style={{
              width: 500,
            }}
            placeholder="Please Enter Title of Link"
          />
        </Form.Item>
        <Form.Item
          label="Link Domain"
          required
          tooltip="This is a required field"
          rules={[
            {
              required: true,
              message: "Province is required",
            },
          ]}
        >
          <Input.Group compact>
            <Input
              addonBefore="yaus.xyz/"
              initialValues="TT141kANAe"
              style={{
                width: 500,
              }}
              id="customHashId"
              name="customHashId"
              value={state.customHashId}
              onChange={handleChange}
            />
          </Input.Group>
        </Form.Item>
        <Form.Item
          label="Original Web URL"
          tooltip={{
            title: "Tooltip with customize icon",
            icon: <InfoCircleOutlined />,
          }}
          rules={[
            {
              required: true,
              message: "Url is required",
            },
          ]}
          name="url"
        >
          <Space>
            <Input
              style={{
                width: 500,
              }}
              placeholder="Paste a Web URL "
              id="url"
              name="url"
              value={state.url}
              onChange={handleChange}
            />
          </Space>
        </Form.Item>
      </div>
    </div>
  );
}

export default FormHomePage;
