import { createSlice } from "@reduxjs/toolkit";

export const adminSlice=createSlice({
    name:'admin',
    initialState:{
        admin_id:"",
        admin_name:"",
        admin_username:"",
        admin_email:""
    },
    reducers:{
        updateAdmin:(state,action)=>{
            state.admin_id = action.payload.admin_id
            state.admin_name=action.payload.admin_name
            state.admin_username=action.payload.admin_username
            state.admin_email=action.payload.admin_email
        }
    }
})

export const {updateAdmin} = adminSlice.actions
export default adminSlice.reducer