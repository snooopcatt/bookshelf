import { createSlice } from "@reduxjs/toolkit";

export const selectionSlice = createSlice({
    name: 'selection',
    initialState: {
        index: -1
    },
    reducers: {
        next: (state, action) => {
            state.index = action.payload;
        },
        previous: (state, action) => {
            state.index = action.payload;
        },
        select: (state, action) => {
            state.index = action.payload;
        }
    }
});

export const { next, previous, select } = selectionSlice.actions;

export default selectionSlice.reducer;
