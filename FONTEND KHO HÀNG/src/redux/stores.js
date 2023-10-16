import { configureStore } from "@reduxjs/toolkit"
import reducerauthSlice from "./auth/authSlice"


export const store = configureStore({
    reducer: {
        login: reducerauthSlice,
    },
})

