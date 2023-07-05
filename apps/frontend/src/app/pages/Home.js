import React, { useState } from "react";
import { AudioOutlined } from "@ant-design/icons";
import { Line, Pie } from "@ant-design/charts";
import { NavLink } from "react-router-dom";
import {
  Modal,
  DatePicker,
  Space,
  Card,
  Col,
  Row,
  Typography,
  Table,
  Input,
  Button,
} from "antd";
import ReactApexChart from "react-apexcharts";
import { OnBoarding } from "antd-onboarding";
import "antd-onboarding/assets/index.css";
import "antd/dist/antd.css";
import lineChart from "app/components/chart/configs/lineChart";
import {
  columns,
  myData,
  count,
  dashboardTable,
} from "app/assets/constants/mockData";
import { config } from "app/assets/constants/DashboardConfig";
const { Search } = Input;

function Home() {
  const [visible, setVisible] = useState(false);
  const { Title, Paragraph } = Typography;
  const { RangePicker } = DatePicker;

  const onChange = (e) => console.log(`radio checked:${e.target.value}`);

  const [reverse, setReverse] = useState(false);
  const [enabled, setEnabled] = useState(true);
  const [initialStep, setInitialStep] = useState(0);

  const onExit = () => {
    setEnabled(false);
  };

  async function tab() {
    return dashboardTable;
  }

  tab();

  tab()
    .then((objectData) => {
      const url = objectData.map(function (index) {
        return index.url;
      });
      const no_of_views = objectData.map(function (index) {
        return index.no_of_views;
      });

      const no_of_opens = objectData.map(function (index) {
        return index.no_of_opens;
      });

      const no_of_installs = objectData.map(function (index) {
        return index.no_of_installs;
      });

      const no_of_clicks = objectData.map(function (index) {
        return index.no_of_clicks;
      });

      const date_created = objectData.map(function (index) {
        return index.date_created;
      });
      for (let i = 0; i < data.length; i++) {
        data[i].date = date_created[i];
      }

      for (let i = 0; i < data.length; i++) {
        data[i].clicks = no_of_clicks[i];
      }

      for (let i = 0; i < data.length; i++) {
        data[i].install = no_of_installs[i];
      }

      for (let i = 0; i < data.length; i++) {
        data[i].views = no_of_views[i];
      }

      for (let i = 0; i < data.length; i++) {
        data[i].open = no_of_opens[i];
      }
      for (let i = 0; i < data.length; i++) {
        const url_data = url[i];
        data[i].url = <a href="{url_data}">{url_data}</a>;
      }
    })
    .catch((error) => {
      console.log("fetch data failed", error);
    });

  const data = [
    {
      date: "2022-08-17",
      name: "Smart India Hackathon",
      url: <a href="https://yaus.xyz/SIH">https://yaus.xyz/SIH</a>,
      views: "82",
      install: "-",
      clicks: "335",
      open: "144",

      action: (
        <Button onClick={() => setVisible(true)} type="primary">
          Show Statistics
        </Button>
      ),
    },
    {
      date: "2022-07-19",
      name: "Sunbird",
      url: (
        <a href=" https://yaus.xyz/sunbird842"> https://yaus.xyz/sunbird842</a>
      ),
      views: "56",
      install: "-",
      clicks: "121",
      open: "140",
      action: (
        <Button onClick={() => setVisible(true)} type="primary">
          Show Statistics
        </Button>
      ),
    },
    {
      date: "2022-07-19",
      name: "Sunbird",
      url: (
        <a href=" https://yaus.xyz/sunbird371"> https://yaus.xyz/sunbird371</a>
      ),
      views: "68",
      install: "-",
      clicks: "125",
      open: "110",
      action: (
        <Button onClick={() => setVisible(true)} type="primary">
          Show Statistics
        </Button>
      ),
    },
    {
      date: "2022-07-19",
      name: "Sunbird",
      url: (
        <a href="https://yaus.xyz/sunbird437">https://yaus.xyz/sunbird437</a>
      ),
      views: "56",
      install: "-",
      clicks: "124",
      open: "149",
      action: (
        <Button onClick={() => setVisible(true)} type="primary">
          Show Statistics
        </Button>
      ),
    },
    {
      date: "2022-07-19",
      name: "Sunbird",
      url: (
        <a href="https://yaus.xyz/sunbird752">https://yaus.xyz/sunbird752</a>
      ),
      views: "96",
      install: "-",
      clicks: "134",
      open: "131",
      action: (
        <Button onClick={() => setVisible(true)} type="primary">
          Show Statistics
        </Button>
      ),
    },
    {
      date: "2022-07-03",
      name: "Competency Passbook",
      url: <a href="https://yaus.xyz/passbook">https://yaus.xyz/create</a>,
      views: "68",
      install: "-",
      clicks: "168",
      open: "128",
      action: (
        <Button onClick={() => setVisible(true)} type="primary">
          Show Statistics
        </Button>
      ),
    },
  ];

  const suffix = (
    <AudioOutlined
      style={{
        fontSize: 16,
        color: "white",
      }}
    />
  );
  const onSearch = (value) => console.log(value);

  const onChange1 = (pagination, filters, sorter, extra, data) => {
    console.log("params", pagination, filters, sorter, extra, data);
  };

  return (
    <div class="MyApp">
      <Space direction="vertical" size={12}>
        <RangePicker />
      </Space>
      <Modal
        title="Statistics"
        centered
        visible={visible}
        onOk={() => setVisible(false)}
        onCancel={() => setVisible(false)}
        width={1200}
      >
        <>
          <div>
            {" "}
            <Card bordered={true}>
              <h3> https://yaus.xyz/education </h3>
            </Card>
          </div>
          <Row className="rowgap-vbox" gutter={[24, 0]}>
            {count.map((c, index) => (
              <Col
                key={index}
                xs={24}
                sm={24}
                md={12}
                lg={6}
                xl={6}
                className="mb-24"
              >
                <Card bordered={false} className="criclebox ">
                  <div className="number">
                    <Row align="middle" gutter={[24, 0]}>
                      <Col xs={18}>
                        <span>{c?.today}</span>
                        <Title level={3}>
                          {c?.title}{" "}
                          <small className={c?.bnb}>{c?.persent}</small>
                        </Title>
                      </Col>
                      <Col xs={6}>
                        <div className="icon-box">{c?.icon}</div>
                      </Col>
                    </Row>
                  </div>
                </Card>
              </Col>
            ))}
          </Row>
          <br></br>

          {/* line graph */}
          <Row gutter={[24, 0]}>
            <Col xs={24} sm={24} md={12} lg={12} xl={12} className="mb-24">
              <Card title="Line Graph">
                <Line
                  data={myData}
                  height={500}
                  xField="x"
                  yField="y"
                  point={{ size: 5, shape: "diamon" }}
                  color="blue"
                />
              </Card>
            </Col>

            {/* pie graph */}
            <Col xs={24} sm={24} md={12} lg={12} xl={12} className="mb-24">
              <Card title="Pie">
                <Pie {...config} />
              </Card>
            </Col>
          </Row>
        </>
      </Modal>
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      &nbsp;
      <NavLink to="/LinkCreate" className="linkcreate">
        <Button type="primary">Create Link</Button>
      </NavLink>
      <div id="linechart">
        <div>
          <Title level={5}> Links Generated Till Now </Title>
        </div>
        <div className="sales">
          <ul></ul>
        </div>
      </div>
      {console.log(
        "-------------------------Home page display------------------------------"
      )}
      <ReactApexChart
        className="full-width"
        options={lineChart.options}
        series={lineChart.series}
        type="area"
        height={350}
        width={"100%"}
      />
      <br></br>
      <br></br>
      <Table
        className="linkshow"
        columns={columns}
        dataSource={data}
        onChange={onChange1}
      />
      ;
      <OnBoarding
        isShowMask={true}
        steps={[
          {
            selector: () => {
              return document.getElementById("linkcreate");
            },
            renderContent: () => {
              return <div>This is my name!</div>;
            },
          },
          {
            selector: () => {
              return document.getElementById("linechart");
            },
            renderContent: () => {
              return <div>This is my age!</div>;
            },
          },
        ]}
      />
    </div>
  );
}

export default Home;
