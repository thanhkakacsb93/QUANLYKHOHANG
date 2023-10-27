import { createSlice } from "@reduxjs/toolkit"


const initialState = {
    loginStatus: false,
    Roleadmin: false,
    current: {},
    clickSignup: false,
    idUser: "",
    statusAddShelves: true,
    namerepo: ""
}

const authSlice = createSlice({
    name: "login", //name dùng để lấy các giá trị của state thông qua userSelecttor
    initialState,
    reducers: {
        saveUser: (state, { payload }) => {
            state.idUser = payload.id
            console.log(payload)
        },
        rolemember: (state) => {
            state.loginStatus = true
        },
        roleadmin: (state) => {
            state.loginStatus = true
            state.Roleadmin = true
        },
        signup: (state) => {
            state.clickSignup = true
        },
        outSignup: (state) => {
            state.clickSignup = false
        },
        selectRepo: (state, { payload }) => {
            state.namerepo = payload.namerepo
        }
    }
});

export const { rolemember, roleadmin, signup, outSignup, saveUser, selectRepo } = authSlice.actions

export default authSlice.reducer;


