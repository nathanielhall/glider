import { withBasename } from "../utils/params";
  
const apiUrl = withBasename('/api/');


export const getList = () => {
  return (dispatch) => {
    dispatch(expenseGetRequest());
    return fetch(apiUrl+"getList", {
      method:'post',
      credentials: 'same-origin'
    }).then(response => {
      if(response.ok){
        response.json().then(data => {
          dispatch(expenseGetRequestSuccess(data.expenses, data.message, data.status))          
        })
      }
      else{
        response.json().then(error => {
          dispatch(expenseGetRequestFaild(error))
        })
      }
    })
  }
}

export const expenseGetRequest = (expenses) => {
  return {
    type: 'EXPENSE_GET_REQUEST',
    expenses
  }
}

export const expenseGetRequestSuccess = (expenses,message,status) => {
  return {
    type:'EXPENSE_GET_REQUEST_SUCCESS',
    expenses:expenses,
    message:message,
    status:status
  }
}

export const expenseGetRequestFaild = (error) => {
  return {
    type: 'EXPENSE_GET_REQUEST_FAILD',
    error
  }
}





export const createExpense = (param) => {
  return (dispatch) => {
    dispatch(expenseCreateRequest());
    return fetch(apiUrl+"createExpense", {
      method:'post',
      body: param,
      credentials: 'same-origin'
    }).then(response => {
      if(response.ok){
        response.json().then(data => {
          dispatch(expenseCreateRequestSuccess(data.expenses, data.message, data.status))          
        })
      }
      else{
        response.json().then(error => {
          dispatch(expenseCreateRequestFaild(error))
        })
      }
    })
  }
}

export const expenseCreateRequest = (expenses) => {
  return {
    type: 'EXPENSE_GET_REQUEST',
    expenses
  }
}

export const expenseCreateRequestSuccess = (expenses,message,status) => {
  return {
    type:'EXPENSE_GET_REQUEST_SUCCESS',
    expenses:expenses,
    message:message,
    status:status
  }
}

export const expenseCreateRequestFaild = (error) => {
  return {
    type: 'EXPENSE_GET_REQUEST_FAILD',
    error
  }
}





export const deleteExpense = (param) => {
  return (dispatch) => {
    dispatch(expenseDeleteRequest());
    return fetch(apiUrl+"deleteExpense", {
      method:'post',
      body: param,
      credentials: 'same-origin'
    }).then(response => {
      if(response.ok){
        response.json().then(data => {
          dispatch(expenseDeleteRequestSuccess(data.expenses, data.message, data.status))          
        })
      }
      else{
        response.json().then(error => {
          dispatch(expenseDeleteRequestFaild(error))
        })
      }
    })
  }
}

export const expenseDeleteRequest = (expenses) => {
  return {
    type: 'EXPENSE_GET_REQUEST',
    expenses
  }
}

export const expenseDeleteRequestSuccess = (expenses,message,status) => {
  return {
    type:'EXPENSE_GET_REQUEST_SUCCESS',
    expenses:expenses,
    message:message,
    status:status
  }
}

export const expenseDeleteRequestFaild = (error) => {
  return {
    type: 'EXPENSE_GET_REQUEST_FAILD',
    error
  }
}

  
export const getFilterList = (params) => { 
  return (dispatch) => {
    dispatch(expenseGetRequest());
    return fetch(apiUrl+"getFilerList", {
      method: 'POST',
      body:params,
      credentials: 'same-origin'
    }).then(response => {
      if(response.ok){
        response.json().then(data => {
          dispatch(expenseGetRequestSuccess(data.expenses, data.message, data.status))          
        })
      }
      else{
        response.json().then(error => {
          dispatch(expenseGetRequestFaild(error))
        })
      }
    })
  }
}
