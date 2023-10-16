import { createSlice } from "@reduxjs/toolkit"


const initialState = {
    loginStatus: false,
    Roleadmin: false,
    current: {}
}

const authSlice = createSlice({
    name: "login", //name dùng để lấy các giá trị của state thông qua userSelecttor
    initialState,
    reducers: {
        login: (state) => {
            state.Roleadmin = true
            state.loginStatus = true
        }
    }
});

export const { login } = authSlice.actions

export default authSlice.reducer;


