import mongoose from "mongoose";


const connectDB =async()=>{ //async is for this fumction do slow work bcz data base is on internet may take some time thats why fumction name is connect db 
try{
    await mongoose.connect(process.env.MONGO_URI);
    console.log('mongodb connected')
}catch(error){
    console.error("mongodb connection failed",error);
    process.exit(1);//close the application after an error or failure it means program ended with error and if you use 0 it ended successfully and () prog immediately

}
}

export default connectDB;