import { createSlice } from '@reduxjs/toolkit'

const authSlice = createSlice({
    name: 'weather',
    initialState: {
        weather: []
    },
    reducers: {
        weather: (state, action) => {
            state.user = action.payload;
        },
    }
})

export const { weather } = authSlice.actions;
export default authSlice.reducer