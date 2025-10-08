const jwt=require("jsonwebtoken");
const User = require("../models/users");
const userAuth=async (req,res,next)=>{

    const {token}=req.cookies;
    if(!token){
        res.send("Invalid token, please login again!!");
    }
    const decodedMessage=jwt.verify(token,"Test@12345");
    const {_id}=decodedMessage;
    //console.log(_id);
    const user=await User.findById(_id);
    if(!user){
        res.send("user Not found");

    }
    req.user=user;
    next();


}

module.exports={userAuth};