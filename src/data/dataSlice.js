import { createSlice } from "@reduxjs/toolkit";

export const dataSlice = createSlice({
    name: 'records',
    initialState: {
        value: []
    },
    reducers: {
        setData(state, action) {
            state.value = action.payload;
        }
    }
});

export const { setData } = dataSlice.actions;

export default dataSlice.reducer;
