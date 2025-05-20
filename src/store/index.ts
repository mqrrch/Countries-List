import { configureStore } from "@reduxjs/toolkit";
import { dataReducer } from "../features/dataSlice";
import { loadingReducer } from "../features/loadingSlice";
import { searchFilterReducer } from "../features/searchFilter";

export const store = configureStore({
    reducer: {
        data: dataReducer,
        loading: loadingReducer,
        searchFilter: searchFilterReducer,
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;