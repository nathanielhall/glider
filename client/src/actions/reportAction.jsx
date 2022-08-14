
const apiUrl = "/api/";

export const GET_REPORT_LIST = "GET_REPORT_LIST";
export const GET_REPORT_LIST_FALID = "GET_REPORT_LIST_FALID";
export const CREATE_REPORT = "CREATE_REPORT";
export const CREATE_REPORT_FALID = "CREATE_REPORT_FALID";
export const REMOVE_REPORT = "REMOVE_REPORT";
export const REMOVE_REPORT_FALID = "REMOVE_REPORT_FALID";
export const REMOVE_EXPENSE_REPORT = "REMOVE_EXPENSE_REPORT";
export const REMOVE_EXPENSE_REPORT_FALID = "REMOVE_EXPENSE_REPORT_FALID";
export const UPDATE_REPORT = "UPDATE_REPORT";
export const UPDATE_REPORT_FALID = "UPDATE_REPORT_FALID";

export function creatReport(data) {
  return (dispatch, getState, retry = true) => {
    return fetch(apiUrl + "createreport", {
      method: 'post',
      body: data,
      credentials: 'same-origin'
    }).then(response => {
      if (response.ok) {
        response.json().then(data => {
          dispatch({ type: CREATE_REPORT, data });
        })
      } else {
        dispatch({ type: CREATE_REPORT_FALID, data });
      }
    })
  }
}

export function getReportList() {
  return (dispatch, getState, retry = true) => {
    return fetch(apiUrl + "getreports", {
      method: 'post',
      credentials: 'same-origin'
    }).then(response => {
      if (response.ok) {
        response.json().then(data => {
          dispatch({ type: GET_REPORT_LIST, data });
        })
      } else {
        dispatch({ type: GET_REPORT_LIST_FALID });
      }
    })
  }
}

export const deleteReport = (data,callback) => {
  return (dispatch, getState, retry = true) => {
    return fetch(apiUrl + "delreport", {
      method: 'post',
      body: data,
      credentials: 'same-origin'
    }).then(response => {
      if (response.ok) {
        callback();
        response.json().then(data => {
          dispatch({ type: REMOVE_REPORT, data });
        })
      } else {
        dispatch({ type: REMOVE_REPORT_FALID });
      }
    })
  }
}

export const deleteExpenseOfReport = (data) => {
  return (dispatch, getState, retry = true) => {
    return fetch(apiUrl + "delexpenseofreport", {
      method: 'post',
      body: data,
      credentials: 'same-origin'
    }).then(response => {
      if (response.ok) {
        response.json().then(data => {
          dispatch({ type: REMOVE_EXPENSE_REPORT, data });
        })
      } else {
        dispatch({ type: REMOVE_EXPENSE_REPORT_FALID });
      }
    })
  }
}

export const updateReport = (data) => {
  return (dispatch, getState, retry = true) => {
    return fetch(apiUrl + "updatereport", {
      method: 'post',
      body: data,
      credentials: 'same-origin'
    }).then(response => {
      if (response.ok) {
        response.json().then(data => {
          dispatch({ type: UPDATE_REPORT, data });
        })
      } else {
        dispatch({ type: UPDATE_REPORT_FALID });
      }
    })
  }
}

export function setStat(data) {
  return (dispatch, getState, retry = true) => {
    return fetch(apiUrl + "setstats", {
      method: 'post',
      body: data,
      credentials: 'same-origin'
    }).then(response => {
      if (response.ok) {
        console.log('sss')
        console.log(response)
        response.json().then(data => { console.log(data)
          dispatch({ type: GET_REPORT_LIST, data });
        })
      } else {
        dispatch({ type: GET_REPORT_LIST_FALID });
      }
    })
  }
}



