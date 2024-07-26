import { configureStore } from '@reduxjs/toolkit'

import reducerAccount from './features/accounts/accountSlice'
import reducerCustomer from './features/customers/customerSlice'

const store = configureStore({
  reducer: {
    account: reducerAccount,
    customer: reducerCustomer,
  },
})

export default store
