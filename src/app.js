
const dbConnect= require("./config/database.js");
const express = require("express");
const User=require("./models/users.js")
const app = express();
dbConnect().then(()=>
    {
        console.log("Database Server Connection established successfully");
        app.listen(7777, function(){
    console.log("Server is listening on port 7777 successfully");
});
    }).
    catch(e=>{

        console.error("Error in establishing connection with DB");
    });
    app.post("/signup", async function(req,res){
        //console.log("This is a sign up API handler");
        //res.send("Response from Sign uP API handler");
        const userObj={
            firstName: "Serena",
            lastName: "Williams",
            gender: "Female",
            age: 50
        };
        const user = new User(userObj);
        try {
            await user.save();
            res.send("User Created successfully");
        }
        catch (error){

            console.log ("Error in creating the user");
            res.status(400).send("User creation failed, bad data");
        }
        
    })













/*
const {auth}=require("./authmiddleware/auth.js");
const express=require("express");
const app=express();

app.use("/home",function(req,res){
res.send("This is a response from home page, conected wow, yahoo!!!");

});

app.use("/",function(req,res){
res.send("This is a response from default page, conected wow, yahoo!!!");

});
app.use("/test",function(req,res){
res.send("This is a response from test page, conected wow, yahoo!!!");

});


app.get("/abcd",function(req,res){
    res.send({firstName:"ABC", lastName:"DEF"});
    console.log(req.query);

});

app.get("/user",function(req,res){
    res.send({firstName:"Naren", lastName:"S"});

});
app.post("/user",function(req,res){
    res.send("Data sent successfully");

});
app.delete("/user",function(req,res){
    res.send("Data deleted successfully");

});
app.get("/data",[function(req,res,next){
    console.log("Route Handler 1");
    //res.send("Route 1 response");
    next();

},
function(req,res,next){
console.log("Route Handler 2");
    //res.send("Route 2 response");
      next();
},
function(req,res,next){
console.log("Route Handler 3");
    //res.send("Route 3 response");
      next();
}],
function(req,res,next){
    console.log("Route Handler 4");
    res.send("Route 4 response");
    //next();

});

app.use("/admin",auth);

app.get("/admin/getAllUsers",function(req,res){

    res.send("All user data is sent");
    //random data
});

app.get("/admin/deleteUser",function(req,res){
    res.send("User is deleted");
});




app.listen(7777, function(){
    console.log("Server is listening on port 7777 successfully");
});


console.log("I am the first line");

setTimeout(()=>{console.log("I am the set TimeOut")},0);
setImmediate(()=>{console.log("I am the set Immediate")});
console.log("I am the second line");
setTimeout(()=>{console.log("I am the second set TimeOut")},0);
setImmediate(()=>{console.log("I am the second set Immediate")});
console.log("I am the third line");
*/

