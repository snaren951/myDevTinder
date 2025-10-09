const {userAuth}=require("../authmiddleware/auth.js");

const express=require("express");

const profileRouter= express.Router();


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
    



  
module.exports=profileRouter;
