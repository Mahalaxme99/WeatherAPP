import { configureStore } from '@reduxjs/toolkit'
import authSlice from './ReduxSlice/authSlice'
const store = configureStore(
    {
        reducer: {
            authSlice: authSlice,
        }
    }
)

export default store;
