import { createSlice } from "@reduxjs/toolkit";

export const adminSlice=createSlice({
    name:'admin',
    initialState:{
        admin_id:"",
        admin_name:"",
        admin_image:""
    },
    reducers:{
        updateAdmin:(state,action)=>{
            state.admin_id = action.payload.admin_id
            state.admin_name=action.payload.admin_name
            state.admin_image=action.payload.admin_image
        }
    }
})

export const {updateAdmin} = adminSlice.actions
export default adminSlice.reducer