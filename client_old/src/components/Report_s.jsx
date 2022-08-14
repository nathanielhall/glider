import React from 'react';
import { browserHistory } from 'react-router';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { Navbar, Nav, NavDropdown, MenuItem, NavItem, Modal, Button, Row, Col } from 'react-bootstrap';
import { withBasename } from "../utils/params";

export default class Report extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            showCreateModal: false,
            showDeleteModal: false,
            editData: [],
            selectedRows: [],
            reportTitle: "New Report",
            reports: this.props.reports,
            expenses: this.props.expenseArray.expenses
        }
    }

    componentWillMount() {
        const currentUser = this.props.user;
        const loginWithBasename = withBasename('/login');

        try {
            if (currentUser.status === 200) {
                const user = currentUser.user;
                this.setState({ username: user.username });
                localStorage.setItem('user', JSON.stringify(user));
            }

            if (localStorage.getItem('user')) {
                this.setState({
                    username: JSON
                        .parse(localStorage.getItem('user'))
                        .username
                });
                this
                    .props
                    .mappedReportGetList();
                this
                    .props
                    .mappedexpenseGetList();
            } else {
                browserHistory.push(loginWithBasename);
            }
        } catch (err) {
            browserHistory.push(loginWithBasename);
        }
    }

    componentWillReceiveProps(nextProps) {
        console.log(nextProps.reports)
        this.setState({ reports: nextProps.reports, expenses: nextProps.expenseArray.expenses })
    }

    submitData = (e) => {
        e.preventDefault();
        const editForm = document.getElementById('EditForm');
        if (editForm.title.value !== "") {
            const data = new FormData();
            data.append('id', editForm.id.value);
            data.append('title', editForm.title.value);
            data.append('amount', editForm.amount.value);
            data.append('category', editForm.status.value);
            data.append('description', editForm.description.value);
            this
                .props
                .mappedexpenseCreate(data);
        } else {
            return;
        }
        this.handleClose("edit");
    }

    deleteData = (e) => {
        e.preventDefault();
        const data = new FormData();
        data.append('id', this.state.editData._id);
        this.props.mappedReportDelete(data, this.props.mappedexpenseGetList);
        this.handleClose("delete");
    }

    filteronChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    filteronSubmit = (e) => {
        const { startprice, endprice, startdate, enddate } = this.state
        const data = new FormData();
        data.append('flag', e.target.name);
        data.append('startprice', startprice);
        data.append('endprice', endprice);
        data.append('startdate', startdate);
        data.append('enddate', enddate);
        this.props.mappedexpenseFilterResult(data);
    }

    approve = (e) => {
        if (this.state.selectData === '') return;
        const data = new FormData();
        data.append('id', this.state.selectData._id);
        data.append('stat', 'Approve');
        console.log(this.state.selectData)
        this.props.mappedReportSetStat(data)
    }

    archive = (e) => {
        if (this.state.selectData === '') return;
        const data = new FormData();
        data.append('id', this.state.selectData._id);
        data.append('stat', 'Archive');
        console.log(this.state.selectData)
        this.props.mappedReportSetStat(data)
    }

    reject = (e) => {
        if (this.state.selectData === '') return;
        const data = new FormData();
        data.append('id', this.state.selectData._id);
        data.append('stat', 'Reject');
        console.log(this.state.selectData)
        this.props.mappedReportSetStat(data)
    }

    createExpense = () => {
        this.setState({ editData: [] })
        this.handleShow("edit")
    }

    handleRowSelect = (row, isSelected, e) => {
        let { selectedRows } = this.state;
        let index = selectedRows.indexOf(row._id);
        if (index === -1) {
            selectedRows.push(row._id);
        } else {
            selectedRows.splice(index, 1);
        }
        this.setState({ selectedRows });
    }

    getSelectedRows = () => {
        const { selectedRows } = this.state;
        const expenses = this.state.expenses;
        let data = expenses.filter((expense) => {
            return selectedRows.indexOf(expense._id) !== -1
        });
        return data;
    }

    calTotalAmount(rows) {
        let totalAmount = 0;
        if (!rows.length)
            return totalAmount;
        rows.map(row => {
            return totalAmount += parseFloat(row.amount);
        });
        return totalAmount;

    }

    handleClose = (flag) => {
        if (flag === "add") {
            const data = new FormData();
            let rows = this.getSelectedRows();
            if (!rows.length)
                return;
            data.append('name', this.state.reportTitle);
            data.append('amount', this.calTotalAmount(rows));
            data.append('items', JSON.stringify(rows));
            data.append('from', JSON.parse(localStorage.getItem('user')).email);
            data.append('policy', "none");
            data.append('submited', 0);
            data.append('exported', 0);
            this.setState({ showCreateModal: false, selectedRows: [] });
            this
                .props
                .mappedReportCreate(data);
            this
                .props
                .mappedexpenseGetList();
        } else
            this.setState({ showDeleteModal: false, showCreateModal: false });
    }

    handleShow = (flag) => {
        if (flag === "edit")
            this.setState({ showCreateModal: true });
        else
            this.setState({ showDeleteModal: true });
    }

    _onChangeTitleHander = (e) => {
        this.setState({ reportTitle: e.target.value });
    }

    handleMainTableRowSelect = (row, isSelected, e) => {

        if (e.target.getAttribute("name") === "detail") {
            browserHistory.push(withBasename(`/report_s/${row._id}`));
        } else if (e.target.getAttribute("name") === "delete") {
            this.setState({ editData: row })
            this.handleShow("delete");
        }
    }

    render() {

        const options = {
            insertModalFooter: this.createCustomModalFooter,
            page: 1,
            sizePerPageList: [
                {
                    text: '5',
                    value: 5
                }, {
                    text: '10',
                    value: 10
                }
            ],
            sizePerPage: 10,
            pageStartIndex: 1,
            paginationSize: 3,
            prePage: 'Prev',
            nextPage: 'Next',
            firstPage: 'First',
            lastPage: 'Last',
            paginationShowsTotal: this.renderShowsTotal
        };

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
            return `${('0' + date.getHours()).slice(-2)}/${('0' + date.getMinutes()).slice(-2)}/${('0' + date.getSeconds()).slice(-2)} - ${('0' + date.getDate()).slice(-2)}/${('0' + (date.getMonth() + 1)).slice(-2)}/${date.getFullYear()}`;
        }

        function detailFormatter(cell, row) {
            return "<a><i  name='detail' class='fa fa-eye'></i></a>";
        }

        function deleteFormatter(cell, row) {
            return "<a><i  name='delete' class='fa fa-trash'></i></a>";
        }

        let style = {
            backgroundColor: "#2b2b2be6"
        }

        const selectRowProp = {
            mode: 'checkbox',
            hideSelectColumn: true,
            onSelect: this.handleRowSelect,
            clickToSelect: true,
            bgColor: 'pink'
        };
        let data = this.state.expenses;

        var tabledata = data.filter(function (el) {
            return !el.isreported;
        });

        return (
            <div className="expenseList">

                <Navbar style={style}>
                    <Navbar.Header>
                        <Navbar.Brand>
                            <a href={ withBasename('/') }>Home</a>
                        </Navbar.Brand>
                    </Navbar.Header>
                    <Nav pullRight>
                        <NavItem eventKey={1} href={ withBasename('/expenses') }>
                            Expenses
                        </NavItem>
                        <NavDropdown title="Reports" id="basic-nav-dropdown">
                            <MenuItem href={ withBasename('/report_c/all') }>Reports by category</MenuItem>
                            <MenuItem href={ withBasename('/report_s') }>Expenses Reports</MenuItem>
                        </NavDropdown>
                        <NavItem eventKey={4} href={ withBasename('/') }>
                            Log out
                        </NavItem>
                    </Nav>
                </Navbar>

                <div className="Home">
                    <p>&nbsp;</p><br />
                    <h1 >Expense Report</h1>
                    <div className="table-content">
                        <h3 id="main">User : {this.state.username}</h3>
                        <div className="table-action-bar">
                            <h4>Extense Report List</h4>
                            <button
                                type="button"
                                name="Approve"
                                id="approvebtn"
                                className="btn btn-success statebtn"
                                onClick={this.approve}>
                                <span>Approve</span>
                            </button>
                            <button
                                type="button"
                                name="Archive"
                                id="archivebtn"
                                className="btn btn-warning statebtn"
                                onClick={this.archive}>
                                <span>Archive</span>
                            </button>
                            <button
                                type="button"
                                name="Reject"
                                id="rejectbtn"
                                className="btn btn-danger statebtn"
                                onClick={this.reject}>
                                <span>Reject</span>
                            </button>
                            <button
                                type="button"
                                id='new-report'
                                className="btn btn-info react-bs-table-add-btn "
                                onClick={this.createExpense}>
                                <span>
                                    <i className="glyphicon glyphicon-plus"></i>NEW</span>
                            </button>
                        </div>
                        <div className="expenses-table-content">
                            <div>
                                <BootstrapTable
                                    data={this.state.reports}
                                    options={options}
                                    pagination={true}
                                    exportCSV
                                    csvFileName='expense-report.csv'
                                    selectRow={{
                                        mode: 'radio',
                                        hideSelectColumn: true,
                                        onSelect: this.handleMainTableRowSelect,
                                        clickToSelect: true,
                                        bgColor: 'pink',
                                    }}>
                                    <TableHeaderColumn
                                        hidden
                                        dataField="_id"
                                        dataAlign='center'
                                        isKey={true}
                                        width='5%'></TableHeaderColumn>
                                    <TableHeaderColumn
                                        dataField='name'
                                        dataSort={true}
                                        dataAlign='center'
                                        headerAlign='center'>Name</TableHeaderColumn>
                                    <TableHeaderColumn
                                        dataField='amount'
                                        dataFormat={priceFormatter}
                                        dataSort={true}
                                        headerAlign='center'
                                        dataAlign='center'>Total</TableHeaderColumn>
                                    <TableHeaderColumn
                                        dataField='policy'
                                        dataSort={true}
                                        headerAlign='center'
                                        dataAlign='center'>Policy</TableHeaderColumn>
                                    <TableHeaderColumn
                                        dataField='from'
                                        dataSort={true}
                                        headerAlign='center'
                                        dataAlign='center'>From</TableHeaderColumn>
                                    <TableHeaderColumn
                                        dataField='to'
                                        dataSort={true}
                                        headerAlign='center'
                                        dataAlign='center'>To</TableHeaderColumn>
                                    <TableHeaderColumn
                                        dataField='submited'
                                        dataFormat={(cell, row) => cell !=="0"
                                            ? null
                                            : null}
                                        dataSort={true}
                                        headerAlign='center'
                                        dataAlign='center'>Submited</TableHeaderColumn>
                                    <TableHeaderColumn
                                        dataField='exported'
                                        dataFormat={(cell, row) => cell
                                            ? "Exported"
                                            : null}
                                        dataSort={true}
                                        headerAlign='center'
                                        dataAlign='center'>Exported</TableHeaderColumn>
                                    <TableHeaderColumn
                                        dataField='active'
                                        dataFormat={detailFormatter}
                                        headerAlign='center'
                                        dataAlign='center'
                                        export={false}
                                        width='7%'></TableHeaderColumn>
                                    <TableHeaderColumn
                                        dataField='active'
                                        dataFormat={deleteFormatter}
                                        headerAlign='center'
                                        dataAlign='center'
                                        export={false}
                                        width='7%'></TableHeaderColumn>
                                </BootstrapTable>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Create Modal */}
                <Modal bsSize="lg" show={this.state.showCreateModal}>
                    <Modal.Header>
                        <Row>
                            <Col xs={5}>
                                <h3 className="create-expense-modal-titel">Add Expenses To Report</h3>
                            </Col>
                            <Col xs={6}>
                                <input
                                    type="text"
                                    name="title"
                                    className="form-control"
                                    onChange={this._onChangeTitleHander}
                                    value={this.state.reportTitle} />
                            </Col>
                        </Row>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="expenses-table-content" id='expenses-table'>
                            <div>
                                <BootstrapTable
                                    data={tabledata}
                                    options={options}
                                    pagination={true}
                                    selectRow={selectRowProp}>
                                    <TableHeaderColumn
                                        hidden
                                        dataField="_id"
                                        dataAlign='center'
                                        isKey={true}
                                        width='5%'></TableHeaderColumn>
                                    <TableHeaderColumn
                                        dataField='createdAt'
                                        dataFormat={dateFormatter}
                                        dataSort={true}
                                        dataAlign='center'
                                        headerAlign='center'>Date</TableHeaderColumn>
                                    <TableHeaderColumn
                                        dataField='category'
                                        dataFormat={enumFormatter}
                                        dataSort={true}
                                        formatExtraData={category}
                                        headerAlign='center'
                                        dataAlign='center'>Category</TableHeaderColumn>
                                    <TableHeaderColumn
                                        dataField='amount'
                                        dataFormat={priceFormatter}
                                        dataSort={true}
                                        headerAlign='center'
                                        dataAlign='center'>Total</TableHeaderColumn>
                                </BootstrapTable>
                            </div>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={(e) => this.handleClose("add", e)}>Add</Button>
                        <Button onClick={(e) => this.handleClose("cancel", e)}>CLOSE</Button>
                    </Modal.Footer>
                </Modal>

                {/* Delete confirm Modal */}
                <Modal show={this.state.showDeleteModal} id="DeleteModal">
                    <Modal.Header>
                        <h3>Delete Dialog</h3>
                    </Modal.Header>
                    <Modal.Body>
                        <h5>Would you like to delete this expense from the list?</h5>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.deleteData}>DELETE</Button>
                        <Button onClick={(e) => this.handleClose("delete", e)}>CLOSE</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}
