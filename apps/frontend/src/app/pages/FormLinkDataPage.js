import { Form, Space, Input, Select } from "antd";
const { Option } = Select;
function FormLinkDataPage() {
  const selectBeforeLink = (
    <Select defaultValue="Deeplink_path" className="select-before">
      <Option value="Deeplink_path">$deeplink_path</Option>
      <Option value="ios">$ios_deeplink_path</Option>
      <Option value="amndroid">$android_deeplink_path</Option>
      <Option value="desktop">$desktop_deeplink_path</Option>
    </Select>
  );
  return (
    <div className="steps-content">
      <h3>Link Data </h3>
      <h5>
        Add the data that you want to be passed to your app via this link. This
        data is also used to configure link functions like routing, attribution
        windows, etc. All keys and values are case-sensitive
      </h5>
      <div style={{ marginLeft: "30%" }}>
        <Form.Item
          label="Key-Value"
          name="ios"
          rules={[
            {
              required: false,
              message: "(ios)",
            },
          ]}
        >
          <Space>
            <Input
              addonBefore={selectBeforeLink}
              style={{
                width: 500,
              }}
            />
          </Space>
        </Form.Item>
        <Form.Item
          label="Key-Value"
          name="ios2"
          rules={[
            {
              required: false,
              message: "(ios2)",
            },
          ]}
        >
          <Space>
            <Input
              addonBefore={selectBeforeLink}
              style={{
                width: 500,
              }}
            />
          </Space>
        </Form.Item>
      </div>
    </div>
  );
}
export default FormLinkDataPage;
