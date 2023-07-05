import { Table, Button } from "antd";
import React, { useState } from "react";
import { AudioOutlined } from "@ant-design/icons";
import { Input, Space } from "antd";
import { NavLink, useLocation } from "react-router-dom";
import {
  colRecentActivities,
  data,
  recentActivityData,
} from "../assets/constants/mockData";
import { Excel } from "antd-table-saveas-excel";
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
    <h2>Start editing to see some magic happen!</h2>
    <br></br>
    <br></br>
    <Table
      columns={colRecentActivities}
      dataSource={data}
      onChange={onChange}
    />
    ;
  </>
);

async function recent() {
  return recentActivityData;
}

recent();

recent()
  .then((recent_data) => {
    const activity = recent_data.map(function (index) {
      return index.activity;
    });

    const name = recent_data.map(function (index) {
      return index.name;
    });

    const email = recent_data.map(function (index) {
      return index.email;
    });

    const title = recent_data.map(function (index) {
      return index.title;
    });

    const date_created = recent_data.map(function (index) {
      return index.date_created;
    });
    for (let i = 0; i < data.length; i++) {
      data[i].date = date_created[i];
    }

    for (let i = 0; i < data.length; i++) {
      data[i].name = name[i];
    }

    for (let i = 0; i < data.length; i++) {
      data[i].email = email[i];
    }
    for (let i = 0; i < data.length; i++) {
      const url_data = activity[i];
      data[i].url = <a href="{url_data}">{url_data}</a>;
    }

    for (let i = 0; i < data.length; i++) {
      data[i].org = title[i];
    }
  })
  .catch((error) => {
    console.log("fetch data failed", error);
  });

const onChange = (pagination, filters, sorter, extra) => {
  console.log("params", pagination, filters, sorter, extra);
};

export default App;
