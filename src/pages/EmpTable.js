import React, { useState, useEffect } from "react";
import "../Components/Navigation.css";
import { Button, Table, Space, Spin } from "antd";

const columns = [
  {
    title: "S.No.",
    dataIndex: "sno",
    width: "10%",
  },
  {
    title: "Emp Id",
    dataIndex: "id",
    width: "10%",
  },
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    width: "20%",
  },
  {
    title: "Designation",
    dataIndex: "designation",
    width: "20%",
  },
  {
    title: "Email",
    dataIndex: "email",
    width: "20%",
  },
  {
    title: "Mobile",
    dataIndex: "mobile",
    width: "10%",
  },
  {
    title: "Action",
    dataIndex: "action",
    width: "10%",
  },
];

const EmpTable = () => {
  const [loadData, setLoadData] = useState([]);
  const [spin, setSpin] = useState(false);
  async function getData() {
    setSpin(true);
    const response = await fetch("http://192.168.1.20/apicrudphp/api/read.php");
    const data = await response.json();
    setSpin(false);
    // console.log(data);
    const loadEmpdata = [];
    for (const key in data) {
      loadEmpdata.push({
        sno: Number(key) + 1,
        id: `EMP` + (Number(data[key].id) + 222),
        name: data[key].name,
        designation: data[key].designation,
        email: data[key].email,
        mobile: data[key].mobile,
        action: <Button>Edit</Button>,
      });
    }
    setLoadData(loadEmpdata);
  }
  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <Table
        dataSource={loadData}
        columns={columns}
        pagination={{ pageSize: 8 }}
        loading={{ indicator: <Spin />, spinning: spin }}
      ></Table>
    </>
  );
};

export default EmpTable;
