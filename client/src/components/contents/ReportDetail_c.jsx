import React from 'react';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';

function indexN(cell, row, enumObject, index) {
  return (
    <div>{index + 1}</div>
  )
}

function priceFormatter(cell, row) {
  return `<i class='glyphicon glyphicon-usd'></i> ${cell}`;
}

const category = {
  0: 'Airfare',
  1: 'Gas',
  2: 'Supplies'
};

function enumFormatter(cell, row, enumObject) {
  return enumObject[cell];
}

function dateFormatter(cell, row) {
  const date = new Date(cell);
  return `${ ('0' + date.getHours()).slice(-2)}/${ ('0' + date.getMinutes()).slice(-2)}/${ ('0' + date.getSeconds()).slice(-2)} - ${ ('0' + date.getDate()).slice(-2)}/${ ('0' + (date.getMonth() + 1)).slice(-2)}/${date.getFullYear()}`;
}

const ReportDetail = (props) => {

  return (
    <div className="app-content-wrapper">
      <h4>Total Amount  :  ${props.data.data.sum('amount')}</h4>
      <BootstrapTable
        data={props.data.data}
        pagination={true}
        className="report report-detail">
        <TableHeaderColumn
          dataField="any"
          dataFormat={indexN}
          dataAlign='center'
          width='5%'>No</TableHeaderColumn>
        <TableHeaderColumn
          dataField='title'
          isKey={true}
          headerAlign='center'
          >Title</TableHeaderColumn>
        <TableHeaderColumn
          dataField='amount'
          dataFormat={priceFormatter}
          dataSort={true}
          headerAlign='center'
          dataAlign='center'>Amount</TableHeaderColumn>
        <TableHeaderColumn
          dataField='category'
          dataFormat={enumFormatter}
          dataSort={true}
          formatExtraData={category}
          headerAlign='center'
          dataAlign='center'>Category</TableHeaderColumn>
        <TableHeaderColumn dataField='description' headerAlign='center'>Description</TableHeaderColumn>
        <TableHeaderColumn dataField='username' headerAlign='center'>Auther</TableHeaderColumn>
        <TableHeaderColumn
          dataField='createdAt'
          dataFormat={dateFormatter}
          dataSort={true}
          dataAlign='center'
          headerAlign='center'>Date</TableHeaderColumn>
      </BootstrapTable>
    </div>
  );
}

export default ReportDetail;
