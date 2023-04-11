import React, { useState, useEffect } from "react";
import { Table, Row, Col } from 'antd';
// import qs from 'qs';
import { Content } from 'antd/lib/layout/layout'

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

const ListUser = () => {
  const [loadData, setLoadData] = useState([]);
  async function getData() {
    // php api

    // const response = await fetch(
    //   "http://api-data.rf.gd/api/read.php"
    // );
    // const data_temp = await response.json();
    // setLoading(false)
    // const loadEmpdata = [];
    // for (const key in data_temp) {
    //   loadEmpdata.push({
    //     name: data_temp[key].name,
    //     designation: data_temp[key].designation,
    //   });
    // }
    // console.log(loadEmpdata);
    // setLoadData(loadEmpdata);
    // console.log(data_temp);

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

  const getRandomuserParams = (params) => ({
    results: params.pagination?.pageSize,
    page: params.pagination?.current,
    ...params,
  });

  return <React.Fragment>
    {/* <tbody>
      {loadData.map((list, index) => (
        <tr key={index}>
          <td className="text-center">{index + 1}</td>
          <td className="text-center">{list.id}</td>
          <td>{list.Name}</td>
          <td>{list.Designation}</td>
          <td className="text-center">{list.Mobile}</td>
          <td className="text-center"></td>
        </tr>
      ))}
    </tbody> */}
    <Content style={{ padding: 50 }}>
      <Row>
        <Col span={3} />
        <Col span={18}>
          <Table dataSource={loadData} columns={columns} />
        </Col>
        <Col span={3} />
      </Row>


    </Content>
  </React.Fragment>
}

export default ListUser;