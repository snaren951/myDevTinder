const { timeStamp, error } = require("console");
const validator=require("validator");
const mongoose = require("mongoose");
const jwt=require("jsonwebtoken");
const bcrypt=require("bcrypt");

//Comments
const userSchema = mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        minLength:4,
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

userSchema.methods.getJWT = async function (){
    const user = this;
    const  token = await jwt.sign({_id: user._id},"Test@12345",{expiresIn: "1d"});
    return token;


};

userSchema.methods.validatePassword=async function(passwordInputByUser){
    const user = this;
    const passwordHashStoredInDB=this.password;

    const passwordMatched = await bcrypt.compare(passwordInputByUser,passwordHashStoredInDB);

    return passwordMatched;


}

const User = mongoose.model("User",userSchema);
module.exports=User;
