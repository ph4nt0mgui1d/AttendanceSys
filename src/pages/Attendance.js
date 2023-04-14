import React, { useEffect, useState } from "react";
import { Button, Table, Spin } from "antd";
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
    width: "30%",
  },
  {
    title: "Designation",
    dataIndex: "designation",
    width: "30%",
  },
  {
    title: "Status",
    dataIndex: "status",
    width: "30%",
  },
];

const Attendance = () => {
  const present = (
    <span>
      <Button onClick={() => presentHandler()} type="primary" danger ghost>
        Present
      </Button>
      &nbsp;&nbsp;
    </span>
  );
  const presentSelect = (
    <span>
      <Button onClick={() => presentHandler()} type="primary" ghost>
        Present
      </Button>
      &nbsp;&nbsp;
    </span>
  );

  const absent = (
    <span>
      <Button onClick={() => absentHandler()} type="primary" danger ghost>
        Absent
      </Button>
      &nbsp;&nbsp;
    </span>
  );
  const absentSelect = (
    <span>
      <Button onClick={() => absentHandler()} type="primary" ghost>
        Absent
      </Button>
      &nbsp;&nbsp;
    </span>
  );

  const halfday = (
    <span>
      &nbsp;&nbsp;
      <Button onClick={() => halfdayHandler()} type="primary" danger ghost>
        Half-day
      </Button>
    </span>
  );
  const halfdaySelect = (
    <span>
      &nbsp;&nbsp;
      <Button onClick={() => halfdayHandler()} type="primary" ghost>
        Half-day
      </Button>
    </span>
  );

  const [buttonSelector, setButtonSelector] = useState(
    <div>
      {present}
      {halfday}
      {absent}
    </div>
  );

  const [attData, setAttData] = useState([]);
  const [spin, setSpin] = useState(false);

  const presentHandler = async (id) => {
    setButtonSelector(
      <div>
        {presentSelect}
        {halfday}
        {absent}
      </div>
    );
    const formdata = new FormData();
    formdata.append("empid", id);
    formdata.append("status", 1);
    const response = await fetch(
      "http://localhost/apicrudphp/api/attendance_create.php",
      {
        method: "POST",
        body: formdata,
      }
    );
    const data = await response.json();
  };

  const absentHandler = async (id) => {
    setButtonSelector(
      <div>
        {present}
        {halfday}
        {absentSelect}
      </div>
    );

    const formdata = new FormData();
    formdata.append("empid", id);
    formdata.append("status", 0);
    const response = await fetch(
      "http://localhost/apicrudphp/api/attendance_create.php",
      {
        method: "POST",
        body: formdata,
      }
    );

    const data = await response.json();
    console.log(data);
  };

  const halfdayHandler = async (id) => {
    setButtonSelector(
      <div>
        {present}
        {halfdaySelect}
        {absent}
      </div>
    );

    const formdata = new FormData();
    formdata.append("empid", id);
    formdata.append("status", 2);
    const response = await fetch(
      "http://localhost/apicrudphp/api/attendance_create.php",
      {
        method: "POST",
        body: formdata,
      }
    );
    const data = await response.json();
  };

  const getData = async () => {
    setSpin(true);
    const response = await fetch(
      "http://localhost/apicrudphp/api/attendance.php"
    );
    const data = await response.json();
    setSpin(false);
    const loadAttData = [];
    for (const key in data) {
      loadAttData.push({
        sno: Number(key) + 1,
        empid: data[key].id,
        name: data[key].name,
        designation: data[key].designation,
        status: data[key].status,
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
