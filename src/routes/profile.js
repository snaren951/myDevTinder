const {userAuth}=require("../authmiddleware/auth.js");

const express=require("express");

const profileRouter= express.Router();
const bcrypt=require("bcrypt");
const validator = require ("validator");


profileRouter.get("/profile/view",userAuth,async function(req,res){
        try {
        
       const user = req.user;


        res.send(user);

        }
        catch(error){
            console.log("Error: "+error.message);
        }
      

    });

profileRouter.post("/profile/edit",userAuth,async function(req,res){

    try{
 const editableFields=["firstName","lastName","skills" ,"about"];

    const isUpdateAllowed= Object.keys(req.body).every(key => editableFields.includes(key));


    if(!isUpdateAllowed){
        res.status(401).send("Update not allowed for the fields included, modify the payload and send it again");
    }
    const loggedInUser = req.user;
    //console.log("Before update user is :\n "+loggedInUser)
    const keys = Object.keys(req.body);
    for (i=0;i<keys.length;i++){
        loggedInUser[keys[i]]=req.body[keys[i]];

    }
    loggedInUser.save();
    //console.log("Updated User is:\n"+loggedInUser);
    res.send("profile  updated successfully");
   
    

    }
    catch(error){
        res.send("ERROR:"+error.message);
    }

    }

);

profileRouter.post("/profile/changePassword", userAuth, async function(req,res){

    try{

        const currentPassword = req.body.currentPassword;
       
        const newPassword=req.body.newPassword;
       
        if (!currentPassword ||!newPassword){
            res.status(401).send("Please enter the current password & the new password to proceed with password change");
        }
        else {

        const loggedInUser=req.user;
      
       const isCurrentPasswordCorrect = await bcrypt.compare(currentPassword,loggedInUser.password);
     
       if (!isCurrentPasswordCorrect){
        res.status(401).send("Current password is incorrect");
       }
       else {
    
      
       const isNewPasswordStrong = validator.isStrongPassword(newPassword);

       if (!isNewPasswordStrong){

        res.status(400).send("New Password didn't meet the requirements, enter a strong password");
      
       }
       else {

       const newPasswordHash= await bcrypt.hash(newPassword,10);

       loggedInUser.password=newPasswordHash;


       loggedInUser.save();


       res.send("Password updated successfully");

       }

       }
        }


    }
    catch(error){

        res.send("Error is : "+error.message);
    }
       

});





  
module.exports=profileRouter;
