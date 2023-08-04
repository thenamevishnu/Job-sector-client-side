import { createSlice } from "@reduxjs/toolkit";

export const UserSlice=createSlice({
    name:'user',
    initialState:{
        id:"",
        name:"",
        email:"",
        image:"",
        audio:"",
        type:"",
        chat_manage:false,
        pdf:"",
        country:""
    },
    reducers:{
        updateUser:(state,action)=>{
            state.name = action.payload.name
            state.email = action.payload.email
            state.id=action.payload.id
            state.image=action.payload.image
            state.audio=action.payload.audio
            state.type=action.payload.type
            state.chat_manage=action.payload.chat_manage
            state.pdf = action.payload.pdf
            state.country = action.payload.country
        }
    }
})

export const {updateUser} =UserSlice.actions
export default UserSlice.reducer