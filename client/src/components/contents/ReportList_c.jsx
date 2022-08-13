import React from 'react';
import {browserHistory} from 'react-router';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';

const category = {
  0: 'Airfare',
  1: 'Gas',
  2: 'Supplies'
};

function handleRowSelect(row, isSelected, e) {
  browserHistory.push('/report_c/' + row.category);
}

function indexN(cell, row, enumObject, index) {
  return (
    <div>{index + 1}</div>
  )
}

function priceFormatter(cell, row) {
  return `<i class='glyphicon glyphicon-usd'></i> ${cell}`;
}

function dateFormatter(cell, row) {
  return `${ ('0' + cell.getHours()).slice(-2)}/${ ('0' + cell.getMinutes()).slice(-2)}/${ ('0' + cell.getSeconds()).slice(-2)} - ${ ('0' + cell.getDate()).slice(-2)}/${ ('0' + (cell.getMonth() + 1)).slice(-2)}/${cell.getFullYear()}`;
}

function enumFormatter(cell, row, enumObject) {
  return enumObject[cell];
}

const selectRowProp = {
  mode: 'radio',
  clickToSelect: true,
  hideSelectColumn: true,
  onSelect: handleRowSelect
};


const ReportList = (props) => {

  return (
    <div className="app-content-wrapper">
      <h4>Total Amount  : ${props.data.sum('amount')}</h4>
      <BootstrapTable hover={true}
        data={props.data} 
        selectRow={selectRowProp}
        className="report reports-list">
        <TableHeaderColumn
          dataField="any"
          dataFormat={indexN}
          dataAlign='center'
          width='5%'>No</TableHeaderColumn>
        <TableHeaderColumn
          dataField='title'
          isKey={true}
          headerAlign='center'
          dataAlign='center'>Title</TableHeaderColumn>
        <TableHeaderColumn
          dataField='amount'
          dataFormat={priceFormatter}
          dataSort={true}
          headerAlign='center'
          dataAlign='center'>Amount</TableHeaderColumn>
        <TableHeaderColumn
          dataField='category'
          dataSort={true}
          dataFormat={enumFormatter}
          formatExtraData={category}
          headerAlign='center'
          dataAlign='center'>Category</TableHeaderColumn>
        <TableHeaderColumn
          dataField='date'
          dataSort={true}
          dataFormat={dateFormatter}
          headerAlign='center'
          dataAlign='center'>Updated date</TableHeaderColumn>
      </BootstrapTable>

    </div>
  );
}

export default ReportList;
