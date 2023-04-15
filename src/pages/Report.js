import React, {useState, useRef} from "react";
import { SearchOutlined } from '@ant-design/icons';
import { DownOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Input, Space, Dropdown, Tooltip, message, Table } from 'antd';
import Highlighter from 'react-highlight-words';

const Report = () => {
  const [showTable, setShowTable] = useState(false)
  const [tableColumns, setTableColumns] = useState()
  const [loadReport, setLoadReport] = useState([])
  // FILTER BEGIN
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef(null);

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText('');
  };

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: 'block',
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? '#1890ff' : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: '#ffc069',
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  });
  // FILTER END

  
  async function getData(month) {
    let loadR = []
    const response = await fetch(`http://192.168.1.21/apicrudphp/api/report.php?month=${month}`);
    const data = await response.json();
    console.log(data)
    for(const key in data){
      loadR.push({name: data[key].name})
      // for(let c = 1; c <= data.length; c++){
        // for(let k=1; k<=31; k++){
        // loadR.push({a: k})
        // }
      // }
    }
    setLoadReport(loadR);
  }

  
  const days = [31,28,31,30,31,30,31,31,30,31,30,31]

  const handleMenuClick = (e) => {
    setShowTable(true)
    const monthVal = e.key
    const tabC = [{
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: "30%",
      ...getColumnSearchProps('name')
    },]

    for(let i = 1; i<=days[monthVal-1]; i++){
      tabC.push(
        {
          title: i,
          dataIndex: 'a',
          key: 'k' + i,
          width: "1%",
        },
      );
      setTableColumns(tabC)
    }
    getData(monthVal);
    
  };

  //DropDown items
  const items = [
    {
      label: 'January',
      key: '1',
      
    },
    {
      label: 'February',
      key: '2',
      
    },
    {
      label: 'March',
      key: '3',
    },
    {
      label: 'April',
      key: '4',
    },
    {
      label: 'May',
      key: '5',
    },
    {
      label: 'June',
      key: '6',
    },
    {
      label: 'July',
      key: '7',
    },
    {
      label: 'August',
      key: '8',
    },
    {
      label: 'September',
      key: '9',
    },
    {
      label: 'October',
      key: '10',
    },
    {
      label: 'November',
      key: '11',
    },
    {
      label: 'December',
      key: '12',
    },
  ];
  
  return <>
    <Dropdown menu={{items, onClick: handleMenuClick}} style={{width:"20%", marginBottom: '10px'}}>
      <Button>
        <Space>
          Month
          <DownOutlined />
        </Space>
      </Button>
    </Dropdown>
    <br /><br />
    {showTable && <Table columns={tableColumns} dataSource={loadReport}></Table>}
  </>
}

export default Report;