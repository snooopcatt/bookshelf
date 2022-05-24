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

    state.index = -1;

    state.value = array;
}

export const dataSlice = createSlice({
    name: 'records',
    initialState: {
        data: [],
        value: [],
        atHome: 0,
        away: 0,
        total: 0,
        index: -1,
        query: ''
    },
    reducers: {
        setData(state, action) {
            const books = action.payload;

            books.forEach((book, index) => book.id = index + 1);

            state.data = books;

            updateCounters(state, books);
        },
        filter(state, action) {
            const query = action.payload;

            state.query = query;
            
            if (query === '') {
                updateCounters(state, state.data);
            }
            else {
                const bits = query.trim().split(' ').filter(r => r !== '');
                const res = bits.map(b => new RegExp(b, 'i'));
                updateCounters(state, state.data.filter(item => {
                    return res.every(re => re.test(item.title) || re.test(item.author));
                }));
            }
        },
        filterAway(state) {
            state.query = '';
            updateCounters(state, state.data.filter(item => item.given));
        },
        filterAtHome(state) {
            state.query = '';
            updateCounters(state, state.data.filter(item => !item.given));
        },
        take(state, action) {
            const index = action.payload;

            if (index >= 0) {
                const book = state.value[index];
                const originalBook = state.data.find(b => b.id === book.id);
    
                if (book.given) {
                    delete originalBook.given;
                    delete book.given;
        
                    state.away--;
                    state.atHome++;
                }
            }
        },
        give(state, action) {
            const { selectedIndex, to } = action.payload;

            if (selectedIndex >= 0) {
                const book = state.value[selectedIndex];
                const originalBook = state.data.find(b => b.id === book.id);
    
                if (!book.given) {
                    state.away++;
                    state.atHome--;
                }
                
                book.given = originalBook.given = {
                    to,
                    on: new Date().toISOString().slice(0, 10)
                }
            }
        },
        select(state, action) {
            state.index = action.payload;
        },
        reset(state) {
            state.index = -1;
        }
    }
});

export const {
    setData,
    filter,
    filterAway,
    filterAtHome,
    give,
    take,
    select,
    reset
} = dataSlice.actions;

export default dataSlice.reducer;
