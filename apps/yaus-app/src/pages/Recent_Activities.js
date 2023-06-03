import { Table, Button } from 'antd';
import React, { useState } from 'react'
import { AudioOutlined } from '@ant-design/icons';
import { Input, Space } from 'antd';
import { NavLink, useLocation } from "react-router-dom";
import { Excel } from "antd-table-saveas-excel";
const { Search } = Input;
const suffix = (
  <AudioOutlined
    style={{
      fontSize: 16,
      color: 'white',
    }}
  />
);
const onSearch = (value) => console.log(value);


const App = () =>
(
  <>
    <NavLink to="/LinkCreate"><Button type="primary">
      Create Your Link
    </Button>
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
    <Table columns={columns} dataSource={data} onChange={onChange} />;

  </>
)

const columns = [
  {
    title: 'Created',
    dataIndex: 'date',
    sorter: (a, b) => a.age - b.age,
  },
  {
    title: 'Marketing Title',
    dataIndex: 'org',
    filters: [
      {
        text: 'Samagra Website',
        value: 'Samagra Website',
      },
      {
        text: 'My First Link',
        value: 'My First Link',

      },
      {
        text: 'Competency Passbook',
        value: 'Competency Passbook',

      },
      {
        text: 'Hackerank',
        value: 'Hackerank',

      },
    ],
    filterMode: 'tree',
    filterSearch: true,
    onFilter: (value, record) => record.name.includes(value),
    width: '30%',
  },

  {
    title: 'Activities',
    dataIndex: 'url',
    filters: [
      {
        text: 'samagra',
        value: 'https://yaus.xyz/samagra',

      },
      {
        text: 'first',
        value: 'https://yaus.xyz/first',
      },
      {
        text: 'pass',
        value: 'https://yaus.xyz/pass',
      },
      {
        text: 'hack',
        value: 'https://yaus.xyz/hack',
      },
    ],
    onFilter: (value, record) => record.url.startsWith(value),
    filterSearch: true,
    width: '40%',
  },

  {
    title: 'Name',
    dataIndex: 'name',
    filters: [
      {
        text: 'Kanika',
        value: 'kanika',
      },
      {
        text: 'Akshay',
        value: 'akshay',

      },
      {
        text: 'Chakshu',
        value: 'chakshu',

      },
      {
        text: 'Manav',
        value: 'manav',

      },
    ],
    filterMode: 'tree',
    filterSearch: true,
    onFilter: (value, record) => record.name.includes(value),
    width: '30%',
  },

  {
    title: 'Email',
    dataIndex: 'email',
    filters: [
      {
        text: 'kanikagola26@gmail.com',
        value: 'kanikagola26@gmail.com',
      },
      {
        text: 'akshay@gmail.com',
        value: 'akshay@gmail.com',

      },
      {
        text: 'chakshu@gmail.com',
        value: 'chakshu@gmail.com',

      },
      {
        text: 'manav@gmail.com',
        value: 'manav@gmail.com',

      },
    ],
    filterMode: 'tree',
    filterSearch: true,
    onFilter: (value, record) => record.name.includes(value),
    width: '30%',
  },


];

async function recent() {
  const url = 'http://localhost:3233/recent_activity_data'
  const response = await fetch(url);

  const recent_data = await response.json();
  console.log(recent_data);
  return recent_data;
}

recent();

recent().then(recent_data => {
  const activity = recent_data.map(
    function (index) {
      return index.activity;
    }
  )

  const name = recent_data.map(
    function (index) {
      return index.name;
    }
  )

  const email = recent_data.map(
    function (index) {
      return index.email;
    }
  )

  const title = recent_data.map(
    function (index) {
      return index.title;
    }
  )

  const date_created = recent_data.map(
    function (index) {
      return index.date_created;
    }
  )
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

}).catch((error) => {
  console.log('fetch data failed', error);
})
const data = [
  {
    date: "",
    org: "",
    url: <a href=""></a>,
    name: "",
    email: ""
  },
  {
    date: "",
    org: "",
    url: <a href=""></a>,
    name: "",
    email: ""
  },
  {
    date: "",
    org: "",
    url: <a href=""></a>,
    name: "",
    email: ""
  },
  {
    date: "",
    org: "",
    url: <a href=""></a>,
    name: "",
    email: ""
  },
];

const onChange = (pagination, filters, sorter, extra) => {
  console.log('params', pagination, filters, sorter, extra);
};








export default App;
