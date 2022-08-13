

import {
  GET_REPORT_LIST, GET_REPORT_LIST_FALID,
  CREATE_REPORT, CREATE_REPORT_FALID,
  REMOVE_REPORT, REMOVE_REPORT_FALID,
  REMOVE_EXPENSE_REPORT, REMOVE_EXPENSE_REPORT_FALID,
  UPDATE_REPORT, UPDATE_REPORT_FALID
} from '../actions/reportAction';

const INITIAL_STATE = {
  reports: [],
  isFetching: false,
  error: null,
  status: 400,
  message: null,
}

const succesful = (state, action) => {
  return {
    ...state,
    reports: action.data.reports,
    isFetching: true,
    error: null,
    status: 0,
    message: null,
  }
}

const falid = (state, action) => {
  return { ...state }
}

export const reports = (state = INITIAL_STATE, action) => {

  switch (action.type) {
    case CREATE_REPORT:
      return succesful(state, action);
    case GET_REPORT_LIST:
      return succesful(state, action);
    case REMOVE_REPORT:
      return succesful(state, action);
    case REMOVE_EXPENSE_REPORT:
      return succesful(state, action);
    case UPDATE_REPORT:
      return succesful(state, action);
    case GET_REPORT_LIST_FALID:
      return falid(state, action)
    case CREATE_REPORT_FALID:
      return falid(state, action)
    case REMOVE_REPORT_FALID:
      return falid(state, action)
    case REMOVE_EXPENSE_REPORT_FALID:
      return falid(state, action)
    case UPDATE_REPORT_FALID:
      return falid(state, action)
    default:
      return state;

  }
}