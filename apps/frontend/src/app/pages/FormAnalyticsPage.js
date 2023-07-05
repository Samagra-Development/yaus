import { InfoCircleOutlined } from "@ant-design/icons";
import { Form, Input, Space, Select } from "antd";
const children = [];

function FormAnalyticsPage() {
  return (
    <div className="steps-content">
      <h3>Analytics Tags </h3>
      <h5>
        We recommend adding analytics tags that can be used to filter and
        compare performance of various links
      </h5>
      <div style={{ marginLeft: "30%" }}>
        <Form.Item
          label="Feature (utm_medium)"
          tooltip={{
            title:
              "Feature should describe the action or product where this link is placed. In the UTM world, this is typically utm_medium.",
            icon: <InfoCircleOutlined />,
          }}
          rules={[
            {
              required: false,
              message: "(utm_medium)",
            },
          ]}
          name="feature"
        >
          <Space>
            <Input
              style={{
                width: 500,
              }}
              placeholder="marketing"
              /* onChange={handleChange} */
            />
          </Space>
        </Form.Item>
        <Form.Item
          label="Channel (utm_source)"
          tooltip={{
            title:
              "Tags are a free-form list of meaningful labels that can be used as filters in the Quick Links table. Use them to keep your analytics organized.",
            icon: <InfoCircleOutlined />,
          }}
          rules={[
            {
              required: false,
              message: "(utm_source)",
            },
          ]}
          name="channel"
        >
          <Space>
            <Input
              style={{
                width: 500,
              }}
              placeholder="e.g.Facebook,Twitter"
              /* onChange={handleChange} */
            />
          </Space>
        </Form.Item>
        <Form.Item
          label="Campaign (utm_campaign)"
          tooltip={{
            title:
              "Campaign varies from company to company, but it should describe the theme of the link. In the UTM world, this is typically utm_campaign..",
            icon: <InfoCircleOutlined />,
          }}
          rules={[
            {
              required: false,
              message: "campain",
            },
          ]}
          name="campaign"
        >
          <Space>
            <Input
              style={{
                width: 500,
              }}
              placeholder="Black Friday"
              /*  onChange={handleChange} */
            />
          </Space>
        </Form.Item>
        <Form.Item
          label="Tags"
          tooltip={{
            title:
              "Tags are a free-form list of meaningful labels that can be used as filters in the Quick Links table. Use them to keep your analytics organized.",
            icon: <InfoCircleOutlined />,
          }}
          rules={[
            {
              required: false,
              message: "Tags",
            },
          ]}
          name="tags"
        >
          <Space>
            <Select
              mode="tags"
              style={{
                width: 500,
              }}
              placeholder="e.g. June Offer, Summer"
              /* onChange={handleChange} */
            >
              {children}
            </Select>
          </Space>
        </Form.Item>
      </div>
    </div>
  );
}
export default FormAnalyticsPage;
