import React, { useEffect, useState } from "react";
import {Button, Table, Spin} from 'antd'
const columns = [
  {
    title: "S.No.",
    dataIndex: "sno",
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
    title: "In time",
    dataIndex: "inTime",
    width: "10%",
  },
  {
    title: "Out time",
    dataIndex: "outTime",
    width: "10%",
  },
  {
    title: "Total hours attended",
    dataIndex: "totalHours",
    width: "10%",
  },
];
const Attendance = () => {
  const [attData, setAttData] = useState([]);
  const [spin, setSpin] = useState(false);

  const getData = async () => {
    setSpin(true);
    const response = await fetch('http://192.168.1.20:7882/apicrudphp/api/read.php');
    const data = await response.json();
    setSpin(false);
    const loadAttData = []
    for (const key in data) {
      loadAttData.push({
        sno: Number(key) + 1,
        name: data[key].name,
        designation: data[key].designation,
        inTime: <Button type="primary" danger ghost>IN</Button>,
        outTime: <Button type="primary" danger ghost>OUT</Button>,
        totalHours: data[key].hrDiff
      })
    }
    setAttData(loadAttData);
  }

  useEffect(() => {
    getData()
  }, [])

  return <>
    <Table
      dataSource={attData}
      columns={columns}
      pagination={{ pageSize: 8 }}
      loading={{ indicator: <Spin size="large"/>, spinning: spin }}
    ></Table>
  </>
}

export default Attendance;
