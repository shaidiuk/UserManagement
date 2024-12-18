import { createSlice } from '@reduxjs/toolkit';

export const spinnerSlice = createSlice({
    name: 'spinner',
    initialState: {
        isLoading: false
    },
    reducers: {
        startLoading(state) {
            state.isLoading = true;
        },
        endLoading(state) {
            state.isLoading = false;
        }
    }
})

// Action creators are generated for each case reducer function
export const { startLoading, endLoading } = spinnerSlice.actions

export default spinnerSlice.reducer;