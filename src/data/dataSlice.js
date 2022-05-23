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
            }
        ]
    }
});

export default dataSlice.reducer;
