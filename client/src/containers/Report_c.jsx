import { connect } from 'react-redux';
import Report_c from '../components/Report_c';
import * as expenseAction from '../actions/expenseAction';

// map state from store to props
const mapStateToProps = (state) => {
  return {
    //you can now say this.props.mappedAppSate
    user: state.userState,
    expenseArray: state.expenseState
  }
}

// map actions to props
const mapDispatchToProps = (dispatch) => {
  return {
    //you can now say this.props.mappedAppActions
    mappedexpenseGetList: () => dispatch(expenseAction.getList()),
    mappedexpenseCreate: (data) => dispatch(expenseAction.createExpense(data)),    
    mappedexpenseDelete: (data) => dispatch(expenseAction.deleteExpense(data)),
    mappedexpenseFilterResult: (data) => dispatch(expenseAction.getFilterList(data)),            
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Report_c);
