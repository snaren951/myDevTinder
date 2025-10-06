const { timeStamp, error } = require("console");
const validator=require("validator");
const mongoose = require("mongoose");
//Comments
const userSchema = mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        minLength:5,
        maxLength:20
    },
    lastName:{
        type:String,
        required:true,
        minLength:1,
        maxLength:20
    },
    email:{
        type:String,
        required:true,
        unique:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Invalid email address");
            }
        }
    },
    gender:{
        type:String,
        validate(value){
            if(!["Male","Female"].includes(value))
                {
                throw new Error ("Gender is not valid ");
            }
        }

        },
    password:{
        type:String,
        validate(value){
            if(!validator.isStrongPassword(value)){
                throw new Error ("Enter a strong password");
            }
        }
    },
    age:{
        type: Number,
        min:18,
        max:55
        
    },
    skills:{
        type:[String],
        default:["nodejs","javascript","react"]
        
    },
    about:{
        type:String,
        default:"This is the default section added by the Dev automatically"
    }

},{timestamps:true});

const User = mongoose.model("User",userSchema);
module.exports=User;
