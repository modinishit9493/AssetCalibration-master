import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt, faEdit } from "@fortawesome/free-solid-svg-icons";
import '@fortawesome/fontawesome-free/css/all.min.css'; 
import 'mdbreact/dist/css/mdb.css'; 
import { DataTable } from 'mdbreact';


const TableBody = (props) => {
  if (props.data.data !== undefined && props.data.data.length > 0) {
    // DataTable row 
    const row = props.data.data.map((item) => ({
      'Name': item.name,
      'LastName': item.lastname,
      'Email': item.email,
      'Role': item.role,
      'buttons': <>
           <button
            className="btn btn-sm btn-primary me-1"
            onClick={() => props.onEditClick(item._id)}
          >
            <FontAwesomeIcon icon={faEdit} />
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
        label: 'Name',
        field: 'Name',
        sort: 'asc',
        width: 200
      },
      {
        label: 'Last Name',
        field: 'LastName',
        sort: 'asc',
        width: 200
      },
      {
        label: 'E-Mail',
        field: 'Email',
        sort: 'asc',
        width: 250
      },
      {
        label: 'Role',
        field: 'Role',
        sort: 'asc',
        width: 200
      },
      {
        label: ' ',
        field: 'buttons',
        sort: 'asc',
        width: 80
      }
    ],
    rows: row  
  };

  return (
    <DataTable
      striped
      bordered
      searching={true}
      order={['role', 'asc' ]} 
      small 
      data={data}  
    />
  );
} 
  return <></>; 
};

export default TableBody;