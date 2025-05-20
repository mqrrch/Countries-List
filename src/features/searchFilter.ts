import { createSlice } from "@reduxjs/toolkit";

interface InitialType{
    search: string
    filter: string
}

const initialState: InitialType = {
    search: "",
    filter: ""
}

export const searchFilterSlice = createSlice({
    name: "filter",
    initialState,
    reducers: {
        setSearch: (state, action) => {
            state.search = action.payload;
        },
        setFilter: (state, action) => {
            state.filter = action.payload;
        },
    }
})

export const { setSearch, setFilter } = searchFilterSlice.actions;
export const searchFilterReducer = searchFilterSlice.reducer;