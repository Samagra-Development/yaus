import React, { useState, useRef } from "react";
import { colBulkLink } from "../assets/constants/mockData.js";
import axios from "axios";
import * as XLSX from "xlsx";
import { Table } from "antd";
import { nanoid } from "nanoid";
import { Excel } from "antd-table-saveas-excel";
import {
  Form,
  Steps,
  Input,
  Select,
  Tooltip,
  Button,
  Space,
  Layout,
} from "antd";

function Bulk() {
  const [form] = Form.useForm();
  const baseUrl = " https://yaus.xyz";
  const [data, setdata] = useState([]);
  const [excelData, setExcelData] = useState(null);
  const len = 0;
  const [state, setState] = useState({
    userID: "0fe6ff38-fc46-11ec-b939-0242ac120001",
    url: "",
    project: "0fe6ff38-fc46-11ec-b939-0242ac120002",
    customHashId: "",
  });

  const handleSubmit = (e) => {
    for (let i = 0; i < data.length; i++) {
      const customId = nanoid(6);
      const userData = {
        customHashId: customId,
        project: state.project,
        url: data[i].Url,
        userID: state.userID,
      };
      const headers = {
        "Content-Type": "application/json",
        Authorization: "JWT fefege...",
        "Access-Control-Allow-Origin": "*",
      };
      console.log(userData);
      /*  console.log(baseUrl+{customHashId});   */
      axios
        .post(`${baseUrl}/register`, userData, { headers: headers })
        .then((response) => {
          console.log(response.status);
          console.log(response.data.token);
          console.log(`${baseUrl}/${customId}`);
          data[i].ShortUrl = `${baseUrl}/${customId}`;
          console.log(data);
        });
    }
  };

  const onDownload = () => {
    const excel = new Excel();
    excel
      .addSheet("test")
      .addColumns(colBulkLink)
      .addDataSource(data, {
        str2Percent: true,
      })
      .saveAs("Excel.xlsx");
  };

  const readExcel = (file) => {
    const promise = new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsArrayBuffer(file);

      fileReader.onload = (e) => {
        const bufferArray = e.target.result;

        const wb = XLSX.read(bufferArray, { type: "buffer" });

        const wsname = wb.SheetNames[0];

        const ws = wb.Sheets[wsname];

        const res = XLSX.utils.sheet_to_json(ws);
        setExcelData(res);
        resolve(res);
        console.log(res);
        //return data;
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });

    promise.then((d) => {
      setdata(d);
    });
  };

  return (
    <div>
      <div>
        <Form
          form={form}
          justify="center"
          align="middle"
          margin="auto"
          id="myForm2"
          style={{ marginTop: "10px", marginLeft: "40px" }}
          onSubmit={(e) => e.preventDefault()}
          onFinish={handleSubmit}
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 2,
          }}
        >
          <h2>Upload Excel file</h2>
          <br></br>
          <input
            type="file"
            className="form-control"
            onChange={(e) => {
              const file = e.target.files[0];
              readExcel(file);
            }}
          />
          <Button
            htmlType="submit"
            type="primary"
            className="btn btn-success"
            style={{ marginTop: 5 + "px" }}
          >
            Submit
          </Button>
        </Form>
      </div>

      <br></br>
      <hr></hr>

      <Table dataSource={[...data]} columns={colBulkLink} />
      <br></br>
      <br></br>
      <Button type="dashed" onClick={onDownload}>
        Export
      </Button>
    </div>
  );
}

export default Bulk;
