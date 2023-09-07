import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name : 'user',
    initialState : { User : {} },
    reducers : {
        login : (state,action) => {
            state.User  =  action.payload.new_user 
        },
        logout : (state) => {
            state.User = {}
        },
    }
})

export const {login, logout} = userSlice.actions
export {userSlice}