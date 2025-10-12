const express = require("express");
const requestRouter= express.Router();
const {userAuth}=require("../authmiddleware/auth.js");
const ConnectionRequest = require ("../models/connectionRequests.js");
const User=require("../models/users.js");
const { default: mongoose, ConnectionStates } = require("mongoose");



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




requestRouter.post("/requests/review/:status/:requestId",userAuth,async function(req,res){

        try {

            const loggedInUserId = req.user._id;

            const allowedStatus = ['accepted','rejected'];

            const requestStatus = req.params.status;
            const requestId = req.params.requestId;

            if (!allowedStatus.includes(requestStatus)){

                return res.status(400).send("Invaid request type");
            }

          

            const request = await ConnectionRequest.findOne({_id: requestId, toId:loggedInUserId, status:'liked' });
            if (!request){
                return res.status(401).send("No Requests exists / Request ID is invalid");  
            }

            request.status = requestStatus;
            const data = await request.save();
            res.send(data);
        }

        catch(err){

            res.status(401).send("ERROR: "+err.message);
        }


     

    });

requestRouter.get("/requests/received", userAuth, async function(req,res){

    try {

         const loggedInUserId = req.user._id

    const requestsReceived = await ConnectionRequest.find({toId: loggedInUserId, status: "liked"}).populate("fromId","firstName lastName");

    if(!requestsReceived){

        return res.send ("No Requests Found");
    }
    const data = requestsReceived.map(function(elem){
        return elem.fromId;
    })

    res.send(data);


    }

    catch (error) {
        res.status(401).send("Invalid Request");
    }
   

    });

requestRouter.get("/connections",userAuth,async function (req,res){

    try{
   const loggedInUserId = req.user._id;
   const connections= await ConnectionRequest.find({
    status:"accepted",
    $or:[{fromId:loggedInUserId},{toId:loggedInUserId}]
   }).populate("fromId", "firstName lastName").populate("toId","firstName lastName");

   const data= connections.map(function(elem) {
    if (elem.fromId._id.toString() === loggedInUserId.toString()){

        return elem.toId;
    }
    return elem.fromId;


   })

   res.send(data);

    }

    catch (err){
        res.status(401).send("ERROR: "+err.message);
    }

 


});




module.exports = requestRouter;