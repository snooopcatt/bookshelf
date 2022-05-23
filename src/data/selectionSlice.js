import { createSlice } from "@reduxjs/toolkit";

export const selectionSlice = createSlice({
    name: 'selection',
    initialState: {
        index: -1
    },
    reducers: {
        select: (state, action) => {
            state.index = action.payload;
        }
    }
});

export const { next, previous, select } = selectionSlice.actions;

export default selectionSlice.reducer;
