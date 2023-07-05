import { Table, Button } from "antd";
import React, { useState } from "react";
import { AudioOutlined } from "@ant-design/icons";
import { Input, Space } from "antd";
import { NavLink, useLocation } from "react-router-dom";
import { linkManagerData } from "app/assets/constants/mockData";
const { Search } = Input;
const suffix = (
  <AudioOutlined
    style={{
      fontSize: 16,
      color: "white",
    }}
  />
);
const onSearch = (value) => console.log(value);

const App = () => (
  <>
    <NavLink to="/LinkCreate">
      <Button type="primary">Create Your Link</Button>
    </NavLink>
    <br></br>
    <br></br>
    <br></br>
    <Search
      placeholder="Search"
      onSearch={onSearch}
      suffix={suffix}
      enterButton
      style={{
        width: 320,
      }}
    />
    <br></br>
    <br></br>
    <Table columns={columns} dataSource={data} onChange={onChange} />;
  </>
);

const columns = [
  {
    title: "Created",
    dataIndex: "date",
    sorter: (a, b) => a.age - b.age,
  },
  {
    title: "Marketing Title",
    dataIndex: "name",
    filters: [
      {
        text: "Samagra Website",
        value: "Samagra Website",
      },
      {
        text: "My First Link",
        value: "My First Link",
      },
      {
        text: "Competency Passbook",
        value: "Competency Passbook",
      },
      {
        text: "Hackerank",
        value: "Hackerank",
      },
    ],
    filterMode: "tree",
    filterSearch: true,
    onFilter: (value, record) => record.name.includes(value),
    width: "30%",
  },

  {
    title: "Short URL",
    dataIndex: "url",
    filters: [
      {
        text: "samagra",
        value: "https://yaus.xyz/samagra",
      },
      {
        text: "first",
        value: "https://yaus.xyz/first",
      },
      {
        text: "pass",
        value: "https://yaus.xyz/pass",
      },
      {
        text: "hack",
        value: "https://yaus.xyz/hack",
      },
    ],
    onFilter: (value, record) => record.url.startsWith(value),
    filterSearch: true,
    width: "40%",
  },
  {
    title: "Clicks",
    dataIndex: "clicks",
    sorter: (a, b) => a.age - b.age,
  },
  {
    title: "Opens",
    dataIndex: "open",
    sorter: (a, b) => a.age - b.age,
  },
];

async function manager() {
  return linkManagerData;
}

manager();

manager()
  .then((manager_data) => {
    const url = manager_data.map(function (index) {
      return index.url;
    });

    const no_of_clicks = manager_data.map(function (index) {
      return index.no_of_clicks;
    });

    const no_of_opens = manager_data.map(function (index) {
      return index.no_of_opens;
    });

    const title = manager_data.map(function (index) {
      return index.title;
    });

    const date_created = manager_data.map(function (index) {
      return index.date_created;
    });
    for (let i = 0; i < data.length; i++) {
      data[i].date = date_created[i];
    }

    for (let i = 0; i < data.length; i++) {
      data[i].clicks = no_of_clicks[i];
    }

    for (let i = 0; i < data.length; i++) {
      data[i].open = no_of_opens[i];
    }
    for (let i = 0; i < data.length; i++) {
      const url_data = url[i];
      data[i].url = <a href="{url_data}">{url_data}</a>;
    }

    for (let i = 0; i < data.length; i++) {
      data[i].name = title[i];
    }
  })
  .catch((error) => {
    console.log("fetch data failed", error);
  });

const data = [
  {
    date: "",
    name: "",
    url: <a href=""></a>,
    clicks: "",
    open: "",
  },
  {
    date: "",
    name: "",
    url: <a href=""></a>,
    clicks: "",
    open: "",
  },
  {
    date: "",
    name: "",
    url: <a href=""></a>,
    clicks: "",
    open: "",
  },
  {
    date: "",
    name: "",
    url: <a href=""></a>,
    clicks: "",
    open: "",
  },
];

const onChange = (pagination, filters, sorter, extra) => {
  console.log("params", pagination, filters, sorter, extra);
};

export default App;
