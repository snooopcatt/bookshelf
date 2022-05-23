import { createSlice } from "@reduxjs/toolkit";

export const dataSlice = createSlice({
    name: 'records',
    initialState: {
        value: [
            {
                "author": "George Orwell",
                "title": "1984"
            },
            {
                "author": "Jules Verne",
                "title": "20,000 Leagues Under the Sea"
            },
            {
                "author": "Charles Dickens",
                "title": "A Christmas Carol"
            },
            {
                "author": "Philip Reeve",
                "title": "A Darkling Plain"
            }
        ]
    }
});

export default dataSlice.reducer;
