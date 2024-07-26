const initialStateAccount = {
  balance: 0,
  loan: 0,
  loanPurpose: '',
  isLoading: false,
}

export default function reducerAccount(state = initialStateAccount, action) {
  switch (action.type) {
    case 'account/deposit':
      return {
        ...state,
        balance: state.balance + action.payload,
        isLoading: false,
      }
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
    case 'account/convertingCurrency':
      return {
        ...state,
        isLoading: true,
      }
    default:
      return state
  }
}

export function deposit(amount, currency) {
  if (currency === 'USD') return { type: 'account/deposit', payload: amount }
  return async function (dispatch, getState) {
    dispatch({ type: 'account/convertingCurrency' })
    const res = await fetch(
      `https://api.frankfurter.app/latest?amount=${amount}&from=${currency}&to=USD`
    )
    const data = await res.json()
    const converted = data.rates.USD
    dispatch({ type: 'account/deposit', payload: converted })
  }
}

export function withdraw(amount) {
  return { type: 'account/withdraw', payload: amount }
}

export function requestLoan(amount, purpose) {
  return {
    type: 'account/requestLoan',
    payload: { loan: amount, purpose: purpose },
  }
}

export function payLoan() {
  return { type: 'account/payLoan' }
}
