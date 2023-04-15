import React, { useEffect, useState } from "react";
import { Button, Table, Spin } from "antd";
const columns = [
  {
    title: "S.No.",
    dataIndex: "sno",
    width: "10%",
  },
  {
    title: "Emp ID",
    dataIndex: "empid",
    width: "10%",
  },
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    width: "25%",
  },
  {
    title: "Designation",
    dataIndex: "designation",
    width: "25%",
  },
  {
    title: "Status",
    dataIndex: "status",
    width: "30%",
  },
];

const Attendance = () => {
  const [attData, setAttData] = useState([]);
  const [spin, setSpin] = useState(false);
  const [loadings, setLoadings] = useState([]);

  const presentHandler = async (id) => {
    setLoadings(true);
    const formdata = new FormData();
    formdata.append("empid", id);
    formdata.append("status", 1);
    await fetch("http://192.168.1.21/apicrudphp/api/attendance_create.php ", {
      method: "POST",
      body: formdata,
    });
    await getData();
    setLoadings(false);
  };

  const absentHandler = async (id) => {
    setLoadings(true);
    const formdata = new FormData();
    formdata.append("empid", id);
    formdata.append("status", 0);
    await fetch("http://192.168.1.21/apicrudphp/api/attendance_create.php", {
      method: "POST",
      body: formdata,
    });
    await getData();
    setLoadings(false);
  };

  const halfdayHandler = async (id) => {
    setLoadings(true);
    const formdata = new FormData();
    formdata.append("empid", id);
    formdata.append("status", 2);
    await fetch("http://192.168.1.21/apicrudphp/api/attendance_create.php", {
      method: "POST",
      body: formdata,
    });
    await getData();
    setLoadings(false);
  };
  const getButtons = (empuid, statusid) => {
    if (statusid == 0) {
      return (
        <>
          <Button onClick={() => presentHandler(empuid)} loading={loadings}>
            Present
          </Button>
          &nbsp;&nbsp;
          <Button onClick={() => halfdayHandler(empuid)} loading={loadings}>Half-Day</Button>
          &nbsp;&nbsp;
          <Button type="primary" danger>
            Absent
          </Button>
        </>
      );
    } else if (statusid == 1) {
      return (
        <>
          <Button type="primary">Present</Button>
          &nbsp;&nbsp;
          <Button onClick={() => halfdayHandler(empuid)} loading={loadings}>Half-Day</Button>
          &nbsp;&nbsp;
          <Button onClick={() => absentHandler(empuid)} loading={loadings}>Absent</Button>
        </>
      );
    } else if (statusid == 2) {
      return (
        <>
          <Button onClick={() => presentHandler(empuid)} loading={loadings}>Present</Button>
          &nbsp;&nbsp;
          <Button type="primary">Half-Day</Button>
          &nbsp;&nbsp;
          <Button onClick={() => absentHandler(empuid)} loading={loadings}>Absent</Button>
        </>
      );
    } else if (statusid == 3) {
      return (
        <>
          <Button onClick={() => presentHandler(empuid)} loading={loadings}>
            Present
          </Button>
          &nbsp;&nbsp;
          <Button onClick={() => halfdayHandler(empuid)} loading={loadings}>
            Half-Day
          </Button>
          &nbsp;&nbsp;
          <Button onClick={() => absentHandler(empuid)} loading={loadings}>Absent</Button>
        </>
      );
    }
    // return statusid;
  };
  const getData = async () => {
    setSpin(true);
    const response = await fetch(
      "http://192.168.1.21/apicrudphp/api/attendance.php"
    );
    const data = await response.json();
    setSpin(false);
    const loadAttData = [];
    for (const key in data) {
      const emuid = data[key].id;
      loadAttData.push({
        sno: Number(key) + 1,
        empid: data[key].id,
        name: data[key].name,
        designation: data[key].designation,
        status: getButtons(emuid, data[key].status),
      });
    }
    setAttData(loadAttData);
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    <>
      <Table
        dataSource={attData}
        columns={columns}
        pagination={{ pageSize: 8 }}
        loading={{ indicator: <Spin size="large" />, spinning: spin }}
      ></Table>
    </>
  );
};
export default Attendance;
