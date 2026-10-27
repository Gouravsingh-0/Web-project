//user schemas
import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
import crypto from "node:crypto";
import { kMaxLength } from "node:buffer";
import { type } from "node:os";
import { time, timeStamp } from "node:console";

const userSchema = new mongoose.Schema(
    {
        name:{
            type:String,
            required: [true,"please enter your name"],
            trim: true,
            MaxLength: [50,"your name cannot be longer then 50 charcter"]


        },
        email:{
            type: String,
            required: [true, "please enter your email ID"],
            unique: true,
            lowercase:true,
            trim:true,
            validator: [validator.isEmail, "please enter a vlid  email address"] //validator.isemail check the email shape 

        },
        password:{
            type:String,
            required: [true, "please enter your password"],
            minlength: [6, "your password must be 6 charactors or longer"],
            select:false,//it means do not fetch this password field by default suppose asking to server something and it giving response buy you dont want pass word as response
        },
        passwordConfirm:{
            type:String,
            required: [true, "please confirm your password"],
            validate:{
                validator:function(el){ //this.password is the above field
                    return el === this.password //el its a parameter means what the user typed and === strictly equal to 
                },
                message:"password are not the name!"
            }
        },
        phoneNumber:{
            type: String,
            required: [true, "please enter your number"],
            unique: true,
            trim:true
        },
        role:{
            type:String,
            enum:["uder", "admin"], //enum is used bcz from given value nothing else will be added
            defalult:"user"
        },
        avatar:{
            url:{type:String},//url of image keeping link and id
            public_id:{type:String}//uploaded something has public id
        },
        passwordChangeAt:{
            type: Date
        },
        passwordResetToken:{
            type:String,
            select:false,//not go in response
            index:true
        },
        passwordResetExpiers:{
            type:String,
            select:false
        },
    },
    {timestamps:true}
)
//settings to not pass in response from server
//we are setting this bcz we are delete the secret data like password from server response
//ret is return  is the object about to send
userSchema.set("toJSON",{
    transform:function(doc,ret){
        delete ret.password;
        delete ret.passwordConfirm;
        delete ret.passwordResetToken;
        delete ret.passwordResetExpiers;
        delete ret.__v;//version number of mongoose
        return ret; 
    }
})
//password logic
//hashing
userSchema.pre("save",async function(){
    if(!this.isModified("password")) return;

    this.password = await bcrypt.hash(this.password,12)//12 round 
    this.passwordConfirm = undefined;
})

//login check
//compare password
//candidatePassword is a variable
userSchema.methods.correctPassword = async function(candidatePassword,userPassword){
    return await bcrypt.compare(candidatePassword,userPassword)
}

userSchema.methods.changedPasswordAfter = function(JWTTimestamp){
    if(this.passwordChangeAt){
        const changedTimestamp = parseInt(
            this.passwordChangeAt.getTime()/1000,//give us mili seconds bcz token stores sec and parseint make it whole number
            10
        );
        return JWTTimestamp < changedTimestamp
    }//and if password changed didnt exits then password never changed thats why we return false no problrm
    return false;
}
//forgot password
userSchema.methods.createPasswordResetToken = function(){
    const resetToken = crypto.randomBytes(32).toString("hex");//make 32 bytes random .tostring convert it into redable numbers and charcters
    this.passwordResetToken = crypto.createHash("sha256")//we hash with the sha356 this is the secret link we email to the users
    .update(resetToken)
    .digest("hex");

    this.passwordResetExpiers = Date.now() +10 *60 *1000; //links dies after 10 min and returnthe reset token
    return resetToken;
}

const User = mongoose.model("User", userSchema);
export {User};
