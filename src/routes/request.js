const express = require("express");
const requestRouter= express.Router();
const {userAuth}=require("../authmiddleware/auth.js");


 requestRouter.post("/sendConnectionRequest",userAuth,function(req,res){

        res.send(req.user.firstName+" has sent the Connection Request");

    });

module.exports = requestRouter;