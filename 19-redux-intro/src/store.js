import { combineReducers, createStore } from 'redux'

const initialStateAccount = {
  balance: 0,
  loan: 0,
  loanPurpose: '',
}

function reducerAccount(state = initialStateAccount, action) {
  switch (action.type) {
    case 'account/deposit':
      return { ...state, balance: state.balance + action.payload }
    case 'account/withdraw':
      if (action.payload > state.balance) return state
      return { ...state, balance: state.balance - action.payload }
    case 'account/requestLoan':
      if (state.loan > 0) return state
      // LATER
      return {
        ...state,
        loan: action.payload.loan,
        loanPurpose: action.payload.purpose,
        balance: state.balance + action.payload.loan,
      }
    case 'account/payLoan':
      return {
        ...state,
        loan: 0,
        loanPurpose: '',
        balance: state.balance - state.loan,
      }
    default:
      return state
  }
}

const initialStateCustomer = {
  fullName: '',
  nationalID: '',
  createdAt: '',
}

function reducerCustomer(state = initialStateCustomer, action) {
  switch (action.type) {
    case 'customer/createCustomer':
      return {
        ...state,
        fullName: action.payload.fullName,
        nationalID: action.payload.nationalID,
        createdAt: action.payload.createdAt,
      }
    case 'customer/updateName':
      return { ...state, fullName: action.payload }
    default:
      return state
  }
}

const rootReducer = combineReducers({
  account: reducerAccount,
  customer: reducerCustomer,
})

const store = createStore(rootReducer)

// store.dispatch({ type: 'account/deposit', payload: 500 })
// console.log(store.getState())
// store.dispatch({ type: 'account/withdraw', payload: 200 })
// console.log(store.getState())
// store.dispatch({
//   type: 'account/requestLoan',
//   payload: { loan: 1000, purpose: 'Buy a car.' },
// })
// console.log(store.getState())
// store.dispatch({ type: 'account/payLoan' })
// console.log(store.getState())

function deposit(amount) {
  return { type: 'account/deposit', payload: amount }
}

function withdraw(amount) {
  return { type: 'account/withdraw', payload: amount }
}

function requestLoan(amount, purpose) {
  return {
    type: 'account/requestLoan',
    payload: { loan: amount, purpose: purpose },
  }
}

function payLoan() {
  return { type: 'account/payLoan' }
}

store.dispatch(deposit(500))
console.log(store.getState())
store.dispatch(withdraw(200))
console.log(store.getState())
store.dispatch(requestLoan(1000, 'Buy a car'))
console.log(store.getState())
store.dispatch(payLoan())
console.log(store.getState())

function createCustomer(fullName, nationalID) {
  return {
    type: 'customer/createCustomer',
    payload: { fullName, nationalID, createdAt: new Date().toISOString() },
  }
}
function updateName(fullName) {
  return { type: 'customer/updateName', payload: fullName }
}

store.dispatch(createCustomer('Joe', 123))
console.log(store.getState())
store.dispatch(updateName('Amy'))
console.log(store.getState())
