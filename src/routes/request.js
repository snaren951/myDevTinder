const express = require("express");
const requestRouter= express.Router();
const {userAuth}=require("../authmiddleware/auth.js");
const ConnectionRequest = require ("../models/connectionRequests.js");
const User=require("../models/users.js");
const { default: mongoose } = require("mongoose");



 requestRouter.post("/sendConnectionRequest/:status/:toId",userAuth,async function(req,res){

    try {

        const toId = req.params.toId;
        if (!mongoose.Types.ObjectId.isValid(toId)){

            throw new Error ("Invalid To User");


        }
       const fromId = req.user._id;
       const status = req.params.status;
       const allowedActions = ['liked','ignored'];
       const actionAllowed = allowedActions.includes(status);
       if (!actionAllowed){
        return res.status(401).send("This action is not permitted");
       }

       const toIdExists = await User.findOne({_id:toId});
       if (!toIdExists){
       return  res.status(400).send("To User is not valid ");
       }

    const connectionExists = await ConnectionRequest.findOne(
        {$or: [{fromId:fromId, toId:toId}, {fromId:toId, toId: fromId}]}
    );
       //console.log("Connection Status:\n "+ connectionExists);

    if(connectionExists){

     return res.status(401).json("connection already Exists");
    }



       const request = new ConnectionRequest({
        fromId,
        toId,
        status

       });
       const data = await request.save();
       res.send(`Message: ${req.user.firstName} has ${status} ${toIdExists.firstName}`);

    }


    catch (error){
        res.status(400).send("ERROR is : "+error.message);
    }

      


    });





module.exports = requestRouter;