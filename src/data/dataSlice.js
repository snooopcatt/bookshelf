import { createSlice } from "@reduxjs/toolkit";

export const dataSlice = createSlice({
    name: 'records',
    initialState: {
        value: [],
        atHome: 0,
        away: 0,
        total: 0
    },
    reducers: {
        setData(state, action) {
            const books = action.payload;

            state.total = books.length;
            
            state.away = books.reduce((counter, item) => {
                if (item.given) {
                    counter++;
                }
                return counter;
            }, 0);

            state.atHome = state.total - state.away;

            state.value = books;
        }
    }
});

export const { setData } = dataSlice.actions;

export default dataSlice.reducer;
