import React from 'react';
import { browserHistory } from 'react-router';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import {
    Navbar,
    Nav,
    NavDropdown,
    MenuItem,
    NavItem,
    Modal,
    Button,
    Row,
    Col
} from 'react-bootstrap';

const category = {
    0: 'Airfare',
    1: 'Gas',
    2: 'Supplies'
};

export default class ReportDetail extends React.Component {

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
            expenses: this.props.expenseArray.expenses,
            reportID: this.props.params.id
        }
    }

    componentWillMount() {
        const currentUser = this.props.user;
        try {
            if (currentUser.status === 200) {
                const user = currentUser.user;
                this.setState({ username: user.username });
                localStorage.setItem('user', JSON.stringify(user));
            }

            if (localStorage.getItem('user') || this.state.reportID) {
                this.setState({ username: JSON.parse(localStorage.getItem('user')).username });
                this.props.mappedReportGetList();
                this.props.mappedexpenseGetList();
            } else {
                browserHistory.push('/login');
            }
        } catch (err) {
            browserHistory.push('/login');
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ reports: nextProps.reports, expenses: nextProps.expenseArray.expenses })
    }

    deleteData = (e) => {
        e.preventDefault();
        let { reports, reportID, editData } = this.state;
        let report = reports.filter((el) => el._id === reportID)[0];

        let items = JSON.parse(report.items);
        let index;
        items.map((item, key) => {
            if (item._id === editData._id) {
                return index = key;
            }
            return index;
        })
        items.splice(index, 1);
        report.items = JSON.stringify(items);
        report.amount = this.calTotalAmount(items);

        const data = new FormData();
        data.append('report', JSON.stringify(report));
        data.append('expenseid', editData._id);
        this.props.mappedExpenseOfReportDelete(data);
        this.handleClose("delete");
    }

    onUpdateReportName = (formData) => {
        let { reports, reportID } = this.state;
        let report = reports.filter((el) => el._id === reportID)[0];
        report.name = formData.reportname
        const data = new FormData();
        data.append('report', JSON.stringify(report));
        this.props.mappedUpdateReport(data)
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

    calTotalAmount(rows) {
        let totalAmount = 0;
        if (!rows.length) return totalAmount;
        rows.map(row => {
            return totalAmount += parseFloat(row.amount);
        });
        return totalAmount;
    }

    handleClose = (flag) => {
        if (flag === "add") {

        } else
            this.setState({ showDeleteModal: false, showCreateModal: false });
    }

    handleShow = (flag) => {
        if (flag === "edit")
            this.setState({ showCreateModal: true });
        else
            this.setState({ showDeleteModal: true });
    }

    handleMainTableRowSelect = (row, isSelected, e) => {
        if (e.target.getAttribute("name") === "edit") {
            this.setState({ editData: row })
            this.handleShow("edit")
        } else if (e.target.getAttribute("name") === "delete") {
            this.setState({ editData: row })
            this.handleShow("delete");
        }
    }

    getTableByCategory(data, key) {

        if (!data.length) return null;

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
            sizePerPage: 5,
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

        function dateFormatter(cell, row) {
            const date = new Date(cell);
            return `${('0' + date.getHours()).slice(-2)}/${('0' + date.getMinutes()).slice(-2)}/${('0' + date.getSeconds()).slice(-2)} - ${('0' + date.getDate()).slice(-2)}/${('0' + (date.getMonth() + 1)).slice(-2)}/${date.getFullYear()}`;
        }

        function deleteFormatter(cell, row) {
            return "<a><i  name='delete' class='fa fa-trash'></i></a>";
        }

        let subTotal = this.calTotalAmount(data);

        return (
            <div key={key}>
                <Row>
                    <Col xs={6}>
                        <h4>{category[key]} - ${subTotal}</h4>
                    </Col>
                </Row>
                <Row>
                    <div style={{ minHeight: "340px" }}>
                        <BootstrapTable
                            data={data}
                            options={options}
                            pagination={true}
                            selectRow={
                                {
                                    mode: 'radio',
                                    hideSelectColumn: true,
                                    onSelect: this.handleMainTableRowSelect,
                                    clickToSelect: true,
                                    bgColor: 'pink',
                                }
                            }>
                            <TableHeaderColumn
                                hidden
                                dataField="_id"
                                dataAlign='center'
                                isKey={true}
                                width='5%'></TableHeaderColumn>
                            <TableHeaderColumn
                                dataField='createdAt'
                                dataSort={true}
                                dataFormat={dateFormatter}
                                dataAlign='center'
                                headerAlign='center'>DATE</TableHeaderColumn>
                            <TableHeaderColumn
                                dataField='title'
                                dataSort={true}
                                headerAlign='center'
                                dataAlign='center'>MERCHANT</TableHeaderColumn>
                            <TableHeaderColumn
                                dataField='description'
                                dataSort={true}
                                headerAlign='center'
                                dataAlign='center'>COMMENT</TableHeaderColumn>
                            <TableHeaderColumn
                                dataField='amount'
                                dataSort={true}
                                headerAlign='center'
                                dataFormat={priceFormatter}
                                dataAlign='center'>TOTAL</TableHeaderColumn>
                            <TableHeaderColumn
                                dataField='active'
                                dataFormat={deleteFormatter}
                                headerAlign='center'
                                dataAlign='center'
                                width='7%'></TableHeaderColumn>
                        </BootstrapTable>
                    </div>
                </Row>
            </div>
        )
    }

    getHeaderTemplate(report) {
        function dateFormatter(createdAt) {
            const date = new Date(createdAt);
            return `${('0' + date.getHours()).slice(-2)}/${('0' + date.getMinutes()).slice(-2)}/${('0' + date.getSeconds()).slice(-2)} - ${('0' + date.getDate()).slice(-2)}/${('0' + (date.getMonth() + 1)).slice(-2)}/${date.getFullYear()}`;
        }
        return (<div>
            <Row>
                <Col xs={3}><h5><strong>ID: </strong>{report ? report._id : null}</h5></Col>
                <Col xs={6}><h5><strong>Type:</strong>  Expense Report</h5></Col>
                <Col xs={3}><h5 style={{ textAlign: "right" }}><strong>Policy:</strong>  ({report ? report.policy : null})</h5></Col>
            </Row>
            <hr style={{ borderColor: "#ddd", margin: "10px 0px" }} />
            <Row>
                <Col xs={6}>
                    <h5><strong>Report Name: </strong>
                    <label>{report ? report.name : ''}</label>
                    </h5>
                </Col>
                <Col xs={6}>
                    <h5 style={{ textAlign: "right" }}><strong>Total: </strong>{report ? "$ " + report.amount : null}</h5>
                </Col>
            </Row>
            <hr style={{ borderColor: "#ddd", margin: "10px 0px" }} />
            <Row>
                <Col xs={6}>
                    <h5><strong>From: </strong>{report ? report.from : null}</h5>
                </Col>
                <Col xs={6}>
                    <h5 style={{ textAlign: "right" }}><strong>Date: </strong>{report ? dateFormatter(report.createdAt) : null}</h5>
                </Col>
            </Row>
            <hr style={{ borderColor: "#ddd", margin: "10px 0px" }} />
        </div>)
    }

    getItemsByCategory(data) {
        if (!data) return [];
        let items = JSON.parse(data.items);
        let itemsListByCategory = { 0: [], 1: [], 2: [] };
        items.map(item => itemsListByCategory[item.category].push(item));
        return itemsListByCategory;
    }

    render() {

        let { reports, reportID } = this.state;

        var tabledata = reports.filter((el) => el._id === reportID);
        let report = tabledata[0];
        let items = this.getItemsByCategory(report);

        return (
            <div className="expenseList">
                <Navbar style={{ backgroundColor: "#2b2b2be6" }}>
                    <Navbar.Header>
                        <Navbar.Brand>
                            <a href="/">Home</a>
                        </Navbar.Brand>
                    </Navbar.Header>
                    <Nav pullRight>
                        <NavItem eventKey={1} href="/expenses">
                            Expenses
                        </NavItem>
                        <NavDropdown title="Reports" id="basic-nav-dropdown">
                            <MenuItem href="/report_c/all">Reports by category</MenuItem>
                            <MenuItem href="/report_s">Expenses Reports</MenuItem>
                        </NavDropdown>
                        <NavItem eventKey={4} href="/">
                            Log out
                        </NavItem>
                    </Nav>
                </Navbar>
                <div className="Home">
                    <p>&nbsp;</p><br />
                    <h1 >Extense Report Detail</h1>
                    <div className="table-content">
                        <h3 id="main">User : {this.state.username}</h3>
                        <div className="expenses-table-content">
                            {this.getHeaderTemplate(report)}

                            {
                                Object.keys(items).map(key => {
                                    return this.getTableByCategory(items[key], key)
                                })
                            }
                        </div>
                    </div>
                </div>

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
