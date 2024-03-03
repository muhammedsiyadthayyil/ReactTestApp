
import React, { useState, useEffect, useCallback, useMemo } from "react";
import axios from "axios";
import ReactSwitch from 'react-switch';
import ReactDOM from "react-dom";
import DataTable from "react-data-table-component";
import enqueueApiCall from "../Util/axios";
import {ApiEndpoints,ApiMethod }from "../Constants/api"
import  "./index.css";

function HomePage()
{
const [checked, setChecked] = useState(false);
const [data, setData] = useState([]);
const [loading, setLoading] = useState(false);
const [totalRows, setTotalRows] = useState(0);
const [perPage, setPerPage] = useState(10);
const [currentPage, setCurrentPage] = useState(1);
const [abv,setAbv]= useState(0);
  
function getData(page, size = perPage)
{
  enqueueApiCall(ApiMethod.Get,ApiEndpoints.punk.getAllData(page,size,abv))
.then((data) => {
      setData(data.data);
      setTotalRows(25);
      setLoading(false);
    })
  .catch((error) => {
    if (axios.isCancel(error)) {
      console.log("Error: ", error.message); // => prints: Api is being canceled
    } else {
      console.error(error);
    }
  });
}
useEffect(() => { 
  getData(1);
}, [abv]);

const handleChange = val => {
    setChecked(val);
    if(checked)
    {
      setAbv(0);
    }else{
      setAbv(8);
    }
  }
  const handlePageChange = page => {
    getData(page);
    setCurrentPage(page);
  };

  const handlePerRowsChange = async (newPerPage, page) => {
    getData(page, newPerPage);
    setPerPage(newPerPage);
  };
  const columns = [
    { name: "Name", selector: row => row.name },
    { name: "Tagline", selector: row => row.tagline },
    { name: "FirstBrewed", selector: row => row.first_brewed },   
    { name: "ContributedBy", selector: row => row.contributed_by},   
   
 ]

return(
 <>
    <div style={{ padding: "20px"}}>
    <h4>Filter Data</h4>
    <ReactSwitch
        checked={checked}
        onChange={handleChange}
      />
    </div>   

    <DataTable
      title="Users"
      columns={columns}
      data={data}
      progressPending={loading}
      pagination
      paginationServer
      paginationTotalRows={totalRows}
      paginationDefaultPage={currentPage}
      onChangeRowsPerPage={handlePerRowsChange}
      onChangePage={handlePageChange}       
      onSelectedRowsChange={({ selectedRows }) => console.log(selectedRows)}
    />
  </>
);
}
export default HomePage