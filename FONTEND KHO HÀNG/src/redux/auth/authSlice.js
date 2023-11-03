import { createSlice } from "@reduxjs/toolkit"


const initialState = {
    loginStatus: false,
    Roleadmin: false,
    current: {},
    clickSignup: false,
    idUser: "",
    // statusAddShelves: true,
    namerepo: "",
    StatusSearchRepo: false,
    StatusSearchSupplies: false,
    dataListSuppliesCommand: []
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
        },
        searchRepo: (state) => {
            state.StatusSearchRepo = true
        },
        resetsearchRepo: (state) => {
            state.StatusSearchRepo = false
        },
        searchSupplies: (state) => {
            state.StatusSearchSupplies = true
        },
        resetsearchSupplies: (state) => {
            state.StatusSearchSupplies = false
        },
        exportSupplies: (state, { payload }) => {
            state.dataListSuppliesCommand = [...state.dataListSuppliesCommand, payload]
        },
        resetState: (state) => {
            state.loginStatus = false
            state.Roleadmin = false
            state.current = {}
            state.clickSignup = false
            state.idUser = ""
            // state.statusAddShelves = true
            state.namerepo = ""
            state.StatusSearchRepo = false
            state.StatusSearchSupplies = false
        }
    }
});

export const {
    rolemember,
    roleadmin,
    signup,
    outSignup,
    saveUser,
    selectRepo,
    resetState,
    searchRepo,
    resetsearchRepo,
    searchSupplies,
    resetsearchSupplies,
    exportSupplies
} = authSlice.actions

export default authSlice.reducer;


