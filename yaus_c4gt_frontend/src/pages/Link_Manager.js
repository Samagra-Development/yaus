import { Table, Button } from "antd";
import React, { useState } from "react";
import { AudioOutlined } from "@ant-design/icons";
import { Input, Space } from "antd";
import { NavLink, useLocation } from "react-router-dom";
import { columns } from "../assets/constants/mockData";
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

const App = () => {
  async function manager() {
    const url = "http://localhost:3233/link_manager_data";
    const response = await fetch(url);

    const manager_data = await response.json();
    console.log(manager_data);
    return manager_data;
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

  const onChange = (pagination, filters, sorter, extra) => {
    console.log("params", pagination, filters, sorter, extra);
  };
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
  </>;
};

export default App;
