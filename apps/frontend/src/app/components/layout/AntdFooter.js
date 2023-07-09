import { Layout, Row, Col } from "antd";

// @Depreceated
function AntdFooter() {
  const { Footer: AntFooter } = Layout;

  return (
    <AntFooter style={{ background: "#fafafa" }}>
      <Row className="just">
        <Col xs={24} md={12} lg={12}></Col>
        <Col xs={24} md={12} lg={12}></Col>
      </Row>
    </AntFooter>
  );
}

export default AntdFooter;
