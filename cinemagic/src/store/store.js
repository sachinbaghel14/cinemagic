import { configureStore } from "@reduxjs/toolkit";
import movieReducer from "./slices/movieSlices"


export const store = configureStore({
    reducer: movieReducer
})