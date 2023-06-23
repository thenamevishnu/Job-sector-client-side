import { createSlice } from "@reduxjs/toolkit";

export const UserSlice=createSlice({
    name:'user',
    initialState:{
        id:"",
        name:"",
        email:"",
        image:"",
        audio:""
    },
    reducers:{
        updateUser:(state,action)=>{
            state.name = action.payload.name
            state.email = action.payload.email
            state.id=action.payload.id
            state.image=action.payload.image
            state.audio=action.payload.audio
        }
    }
})

export const {updateUser} =UserSlice.actions
export default UserSlice.reducer