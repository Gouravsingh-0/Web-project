//which property i booked 
//who is the user ,price,guest,dates,paid
import mongoose from "mongoose";
const bookingSchema = new mongoose.Schema(
    {
        property:{
            type: mongoose.Schema.ObjectId,
            ref: "Property",
            required:[true, "booking must belong to a property"]
        },
        user:{
            type: mongoose.Schema.ObjectId,
            ref: "User",
            required:[true, "booking must belong to a User"]
        },
        price:{
            type:Number,
            required:[true, "Booking must have price"]
        },
        createdAt:{
            type:Date,
            default:Date.now()
        },
        paid:{
            type:Boolean,
            default:true
        },
        fromDate:{
            type:Date
        },
        toDate:{
            type:Date
        },
        guests:{
            type:Number
        },
        numberOfnights:{
            type:Number
        }
    },
    {timestamps:true}

);
//find cover all the function starts by find 
//populate booking only save id so populate fetch the user and property from the id  and show them in one place of the id
bookingSchema.pre(/^find/, function(){
    this.populate("user");

        this.populate({
        path:"property",
        select: "maximumGuest images propertyName address"
    });

})

const Booking = mongoose.model("Booking", bookingSchema);
export {Booking};