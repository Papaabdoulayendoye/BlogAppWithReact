import { configureStore } from "@reduxjs/toolkit";
import { userSlice } from "./configuration/reducer/userReducer";

export const store = configureStore({
    reducer : {
        user : userSlice.reducer
    }
})