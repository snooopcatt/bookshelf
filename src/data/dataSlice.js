import { createSlice } from "@reduxjs/toolkit";

const updateCounters = (state, array) => {
    const total = array.length;
    const away = array.reduce((counter, item) => {
        if (item.given) {
            counter++;
        }
        return counter;
    }, 0);
    const atHome = total - away;

    state.total = total;
    state.away = away;
    state.atHome = atHome;
}

export const dataSlice = createSlice({
    name: 'records',
    initialState: {
        data: [],
        value: [],
        atHome: 0,
        away: 0,
        total: 0
    },
    reducers: {
        setData(state, action) {
            const books = action.payload;

            updateCounters(state, books);

            state.data = books;
            state.value = books;
        },
        filter(state, action) {
            const query = action.payload;

            if (query === '') {
                state.value = state.data;
            }
            else {
                const bits = query.trim().split(' ').filter(r => r !== '');
                const res = bits.map(b => new RegExp(b, 'i'));
                const filtered = state.data.filter(item => {
                    return res.every(re => re.test(item.title) || re.test(item.author));
                });
                
                updateCounters(state, filtered);
                
                state.value = filtered;
            }
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

export const { setData, filter, give, take } = dataSlice.actions;

export default dataSlice.reducer;
