import { connect } from 'react-redux';
import Report_s from '../components/Report_s';
import * as expenseAction from '../actions/expenseAction';
import * as reportAction from '../actions/reportAction';

// map state from store to props
const mapStateToProps = (state) => {
  return {
    //you can now say this.props.mappedAppSate
    user: state.userState,
    expenseArray: state.expenseState,
    reports: state.report.reports
  }
}

// map actions to props
const mapDispatchToProps = (dispatch) => {
  return {
    //you can now say this.props.mappedAppActions
    mappedexpenseGetList: () => dispatch(expenseAction.getList()),
    mappedexpenseCreate: (data) => dispatch(expenseAction.createExpense(data)),
    mappedexpenseFilterResult: (data) => dispatch(expenseAction.getFilterList(data)),
    mappedReportDelete: (data, callback) => dispatch(reportAction.deleteReport(data, callback)),
    mappedUpdateReport: (data) => dispatch(reportAction.updateReport(data)),
    mappedReportCreate: (data) => dispatch(reportAction.creatReport(data)),
    mappedReportGetList: () => dispatch(reportAction.getReportList()),
    mappedReportSetStat: (data) => dispatch(reportAction.setStat(data))
    
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Report_s);
