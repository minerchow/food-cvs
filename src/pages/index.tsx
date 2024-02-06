import { useEffect, useState } from "react";
import axios from 'axios';
import { Table , Select } from 'antd';
import { uniqBy  } from 'lodash';
import styles from "@/styles/Home.module.css";
const { Column } = Table;
interface IData{
  locationid : string,
  Applicant : string,
  FacilityType : string,
  cnn : string,
  LocationDescription : string,
  Address : string,
  blocklot : string,
  block : string,
  lot : string,
  permit : string,
  Status : string,
  FoodItems : string,
  X : string,
  Y : string,
  Latitude : string,
  Longitude : string,
  Schedule : string,
  dayshours : string,
  NOISent : string,
  Approved : string,
  Received : string,
  PriorPermit : string,
  ExpirationDate : string,
  Location : string
}



export default function Home() {
   const [tableData,setTableData] = useState<IData[]>([]);
   const [options,setOptions] = useState([])
   const getData = async(options:{locationId:string}) => {
      const res =  await axios.get(`/api/csv?name=${options.locationId}`);
      let table :any= []
      if(res.status === 200 && res.data && res.data.result){
          table = uniqBy(res.data.result,'Applicant')
          setTableData(table)
          const option : any = table.map((item:any)=>{
            return {
              value:item.locationid,
              label:item.Applicant
            }
          })
          setOptions(option)
      }
  }
  const onChange = (value: string) => {
    console.log(`selected ${value}`);
    getData({locationId:value || ''})
  };
  
  const onSearch = (value: string) => {
    console.log('search:', value || '');
  };
  const filterOption = (input: string, option?: { label: string; value: string }) =>
  (option?.label ?? '').toLowerCase().includes(input.toLowerCase());

  useEffect(()=>{
    getData({locationId:''});
  },[])
  return (
    <div>
        <div className={styles.search}>search: <Select showSearch 
                placeholder="Select a Applicant" 
                onChange={onChange}
                onSearch={onSearch}
                filterOption={filterOption} 
                options={options}
                allowClear
                /></div>
        
        <Table dataSource={tableData} scroll={{ x: 1500 }}>
          <Column title="locationid" dataIndex="locationid" key="locationid"  />
          <Column title="Applicant" dataIndex="Applicant" key="Applicant" className={styles['table-column']}/>
          <Column title="FacilityType" dataIndex="FacilityType" key="FacilityType"  />
          <Column title="cnn" dataIndex="cnn" key="cnn"  />
          <Column title="LocationDescription" dataIndex="LocationDescription" key="LocationDescription" className={styles['table-column']} />
          <Column title="Address" dataIndex="Address" key="Address" className={styles['table-column']}/>
          <Column title="blocklot" dataIndex="blocklot" key="blocklot" />
          <Column title="block" dataIndex="block" key="block" />
          <Column title="lot" dataIndex="lot" key="lot" />
          <Column title="permit" dataIndex="permit" key="permit" />
          <Column title="Status" dataIndex="Status" key="Status" />
          <Column title="FoodItems" dataIndex="FoodItems" key="FoodItems" className={styles['table-column']} />
          <Column title="X" dataIndex="X" key="X" />
          <Column title="Y" dataIndex="Y" key="Y" />
          <Column title="Latitude" dataIndex="Latitude" key="Latitude" />
          <Column title="Longitude" dataIndex="Longitude" key="Longitude" />
          <Column title="Schedule" dataIndex="Schedule" key="Schedule" className={styles['table-column']}/>
          <Column title="dayshours" dataIndex="dayshours" key="dayshours" />
          <Column title="NOISent" dataIndex="NOISent" key="NOISent" />
          <Column title="Approved" dataIndex="Approved" key="Approved" className={styles['table-column']}/>
          <Column title="Received" dataIndex="Received" key="Received" />
          <Column title="PriorPermit" dataIndex="PriorPermit" key="PriorPermit" />
          <Column title="ExpirationDate" dataIndex="ExpirationDate" key="ExpirationDate" className={styles['table-column']} />
          <Column title="Location" dataIndex="Location" key="Location" className={styles['table-column']}></Column>
        </Table>
    </div>
  );
}
