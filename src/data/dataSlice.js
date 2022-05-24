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
        },
        take(state, action) {
            const book = state.value[action.payload];

            if (book.given) {
                delete book.given;
    
                state.away--;
                state.atHome++;
            }
        },
        give(state, action) {
            const { selectedIndex, to } = action.payload;

            const book = state.value[selectedIndex];

            if (!book.given) {
                state.away++;
                state.atHome--;
            }
            
            book.given = {
                to,
                on: new Date().toISOString().slice(0, 10)
            }
        }
    }
});

export const { setData, give, take } = dataSlice.actions;

export default dataSlice.reducer;
