//managing bookings
//store all bookings
//store individiual booking details
//track the api loading status
//add new booking whrn a booking is created
//updating the booking data when we recieve it from the backends

import {createSlice} from "@reduxjs/toolkit";

const initialState ={
    bookings:[],
    bookingDetails:{},
    loading:false
}

const bookingSlice = createSlice({
    name:"booking",
    initialState,
    reducers:{
        setBookingRequest(state){
            state.loading=true;
        },
        //stores all the booking recieved from api
        setBookings(state, action){
            state.bookings = action.payload;
            state.loading=false            
        },
        addBooking:(state,action)=>{
            state.bookings.push(action.payload);
        },
        setBookingDetails:(state, action)=>{
            state.bookingDetails = action.payload.bookings;
        }
    }
})

export const {setBookings, addBooking, setBookingDetails} = bookingSlice.actions;
export default bookingSlice;

