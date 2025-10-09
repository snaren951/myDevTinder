const express = require("express");
const authRouter = express.Router();
const User=require("../models/users.js")
const validator=require("validator");
const {validateFields}=require("../utils/validations.js");
const bcrypt=require("bcrypt");
const { now } = require("mongoose");

authRouter.post("/login",async function(req,res){

        try{

        const {email,password}=req.body;
        if(!validator.isEmail(email)){

            throw new Error("Invalid email address");
        }
        else{

            const loginUser=await User.findOne({email:email});
            //console.log("Login User is \n");
            //console.log(loginUser);
            if(!loginUser){
               
                throw new Error("Invalid Credentials");
            }
            else {
                

                const passwordMatched = await loginUser.validatePassword(password);
               
                if (!passwordMatched){
                    throw new Error("Invalid Credentials");


                }
                else {
                    const token = await loginUser.getJWT();
                    res.cookie("token",token);
                    res.send("User Login Successfull");
                }
            }
        }


        }
        catch (error){
            res.status(400).send("ERROR Message: "+error.message);
        }
        


    });

authRouter.post("/signup", async function(req,res){
       
       

        try {
            //validation of request body elements
          
            validateFields(req);
            
            const {firstName,lastName,email,password}=req.body;

            //Hash the password
            const passwordHash= await bcrypt.hash(password,10)
            console.log(passwordHash);

            const user = new User({
                firstName,
                lastName,
                email,
                password: passwordHash
            });
            await user.save();
            
            res.send("User Created successfully");

        }
            
        
        catch (error){

            //console.log ("ERROR: " +error.message);
            res.status(400).send("ERROR:  " +error.message);
        }
        
    });

authRouter.post("/logout",function(req,res){
    res.cookie("token",null,
        {expires:new Date(Date.now())});
    res.send("Logout Successful");
});

module.exports = authRouter;