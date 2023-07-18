import { Form, Space, Input, Checkbox, Select } from "antd";
const { Option } = Select;

function FormRedirectPage() {
  const onChange = (value) => {
    console.log(`selected ${value}`);
  };
  const selectBefore = (
    <Select defaultValue="Default" className="select-before">
      <Option value="WebUrl">Web Url</Option>
      <Option value="DeepView">Deep View</Option>
      <Option value="Defaultt">Default</Option>
    </Select>
  );
  return (
    <div className="steps-content">
      <h3>Redirects </h3>
      <h5>
        Tell us what to do if the app is not installed when the user clicks on
        the link. We can take the user to the app store, open a web page, or
        open adeepview.
      </h5>
      <div style={{ marginLeft: "30%" }}>
        <Form.Item
          label="iOS"
          rules={[
            {
              required: false,
              message: "(ios)",
            },
          ]}
          name="ios"
        >
          <Space>
            <Input
              addonBefore={selectBefore}
              defaultValue="Enter Url"
              style={{
                width: 500,
              }}
            />
          </Space>
        </Form.Item>
        <Form.Item
          label="Android"
          rules={[
            {
              required: false,
              message: "(ios)",
            },
          ]}
          name="android"
        >
          <Space>
            <Input
              addonBefore={selectBefore}
              defaultValue="Enter Url"
              style={{
                width: 500,
              }}
            />
          </Space>
        </Form.Item>
        <Form.Item
          label="Desktop"
          name="desktop"
          rules={[
            {
              required: false,
              message: "(ios)",
            },
          ]}
        >
          <Space>
            <Input
              addonBefore={selectBefore}
              defaultValue="Enter Url"
              style={{
                width: 500,
              }}
            />
          </Space>
        </Form.Item>
        <Form.Item label=" " colon={false}>
          <Checkbox onChange={onChange} style={{ width: 500 }}>
            Web Only Link
          </Checkbox>
          <h5 style={{ marginRight: "10%", width: 500 }}>
            Always redirect to web, even if the app is installed. Please note
            that the toggle only affects iOS links by default
          </h5>
        </Form.Item>
      </div>
    </div>
  );
}

export default FormRedirectPage;
