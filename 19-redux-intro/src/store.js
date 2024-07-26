import { createStore } from 'redux'

const initialState = {
  balance: 0,
  loan: 0,
  loanPurpose: '',
}

function reducer(state = initialState, action) {
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

const store = createStore(reducer)

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
  return store.dispatch({ type: 'account/deposit', payload: amount })
}

function withdraw(amount) {
  return store.dispatch({ type: 'account/withdraw', payload: amount })
}

function requestLoan(amount, purpose) {
  return store.dispatch({
    type: 'account/requestLoan',
    payload: { loan: amount, purpose: purpose },
  })
}

function payLoan() {
  return store.dispatch({ type: 'account/payLoan' })
}

deposit(500)
console.log(store.getState())
withdraw(200)
console.log(store.getState())
requestLoan(1000, 'Buy a car')
console.log(store.getState())
payLoan()
console.log(store.getState())
