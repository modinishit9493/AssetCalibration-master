import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt, faEdit, faEye } from "@fortawesome/free-solid-svg-icons";
import CircleDiv from "./CircleDiv";
import '@fortawesome/fontawesome-free/css/all.min.css'; 
import 'mdbreact/dist/css/mdb.css'; 
import { DataTable } from 'mdbreact';


const TableBody = (props) => {
  const differenceDate = (date1, date2) => {
    date1 = new Date(date1);
    date2 = new Date(date2);
    const date1utc = Date.UTC(
      date1.getFullYear(),
      date1.getMonth(),
      date1.getDate()
    );
    const date2utc = Date.UTC(
      date2.getFullYear(),
      date2.getMonth(),
      date2.getDate()
    );
    let day = 1000 * 60 * 60 * 24;
    return (date2utc - date1utc) / day;
  };
  if (props.data.data !== undefined && props.data.data.length > 0) {
    let currentDate = new Date().toLocaleDateString("en", {
      year: "numeric",
      day: "2-digit",
      month: "2-digit",
    }); 
   
    // DataTable row 
    const row = props.data.data.map((item) => ({
      'Status': <CircleDiv diff={differenceDate(currentDate, item.clibrationDate)} />,
      'CalibrationDate': item.clibrationDate,
      'SKU': item.sku,
      'Equipment': item.name,
      'Maintenance-Tech': item.maintenaceTech,
      'buttons': <>
           <button
            className="btn btn-sm btn-primary me-1"
            onClick={() => props.onEditClick(item._id)}
          >
            <FontAwesomeIcon icon={faEdit} />
          </button>
          <button
            className="btn btn-sm btn-dark me-1"
            onClick={() => props.onViewClick(item._id)}
          >
            <FontAwesomeIcon icon={faEye} />
           </button>

          <button
            className="btn btn-sm btn-danger me-1"
            onClick={() => props.onDeleteClick(item._id)}
          >
            <FontAwesomeIcon icon={faTrashAlt} />
          </button>
        </>,
    }));
  
  //include all data into Datatable
  const data = {
    columns: [ 
      {
        label: 'Status',
        field: 'Status',
        sort: 'asc',
        width: 100
      },
      {
        label: 'Calibration Date',
        field: 'CalibrationDate',
        sort: 'asc',
        width: 150
      },
      {
        label: 'SKU',
        field: 'SKU',
        sort: 'asc',
        width: 270
      },
      {
        label: 'Equipment',
        field: 'Equipment',
        sort: 'asc',
        width: 200
      },
      {
        label: 'Maintenance-Tech',
        field: 'Maintenance-Tech',
        sort: 'asc',
        width: 100
      },
      {
        label: ' ',
        field: 'buttons',
        sort: 'asc',
        width: 150
      }
    ],
    rows: row  
  };
  console.log(data);

  return (
    <DataTable
      striped
      bordered
      searching={true}
      order={['CalibrationDate', 'asc' ]} 
      small 
      data={data}  
    />
  );
} 
  return <></>; 
};

export default TableBody;