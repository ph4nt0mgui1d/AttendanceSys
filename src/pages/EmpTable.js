import React, { useState, useEffect } from "react";
import { Layout } from 'antd';
import '../Components/Navigation.css';
import { Table } from 'antd';

import Navigation from "../Components/Navigation";


const { Content } = Layout;

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    // sorter: true,
    // render: (name) => `${name.first} ${name.last}`,
    width: '20%',
  },
  {
    title: 'Designation',
    dataIndex: 'designation',
    key: 'designation',
    filters: [
      {
        text: 'Developer',
        value: 'developer',
      },
      {
        text: 'Analyst',
        value: 'analyst',
      },
      {
        text: 'Tester',
        value: 'tester',
      },
    ],
    width: '20%',
  },
  {
    title: 'Email',
    dataIndex: 'email',
  },
];

const EmpTable = () => {
  const [loadData, setLoadData] = useState([]);
  async function getData() {
    // firebase api
    const response = await fetch(
      "https://attendancesys-40864-default-rtdb.firebaseio.com/empData.json"
    );
    const data = await response.json();
    const loadEmpdata = [];
    for (const key in data) {
      loadEmpdata.push({
        name: data[key].empName,
        designation: data[key].empDesignation,
      });
    }
    setLoadData(loadEmpdata);
  }
  useEffect(() => {
    getData();
  }, [])



  return <>
  <Navigation>  
    <Table dataSource={loadData} columns={columns} />
  </Navigation>
  </>
}

export default EmpTable;



