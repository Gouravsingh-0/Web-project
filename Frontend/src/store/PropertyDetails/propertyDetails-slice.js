//propertyDetails
//create a slice name
//request starts
//property data received
//error occurs
//export occurs
//export Actions
//export slice

import {createSlice} from "@reduxjs/toolkit";

const propertyDetailsSlice = createSlice({
    name: "propertyDetails",
    initialState:{
        propertydetails:null,
        loading:false,
        error:null
    },
    reducers:{
        getListRequest(state){
            state.loading=true
        },
        getPropertyDetails(state,action){
            state.propertydetails = action.payload;
            state.loading=false
        }
    }
})
export const propertydetailsActions = propertyDetailsSlice.actions;
export default propertyDetailsSlice;