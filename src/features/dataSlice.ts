import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Root, Root2 } from "./dataTypes";

const initialState: Root = {
    data: []
}

export const dataSlice = createSlice({
    name: "data",
    initialState,
    reducers: {
        setData: (state, action: PayloadAction<Root2[]>) => {
            state.data = action.payload;
        },
    }
})

export const { setData } = dataSlice.actions;
export const dataReducer = dataSlice.reducer;