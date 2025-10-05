

const {auth}=require("./authmiddleware/auth.js");
const express=require("express");
const app=express();

/*
app.use("/home",function(req,res){
res.send("This is a response from home page, conected wow, yahoo!!!");

});

app.use("/",function(req,res){
res.send("This is a response from default page, conected wow, yahoo!!!");

});
app.use("/test",function(req,res){
res.send("This is a response from test page, conected wow, yahoo!!!");

});
*/

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

/*
console.log("I am the first line");

setTimeout(()=>{console.log("I am the set TimeOut")},0);
setImmediate(()=>{console.log("I am the set Immediate")});
console.log("I am the second line");
setTimeout(()=>{console.log("I am the second set TimeOut")},0);
setImmediate(()=>{console.log("I am the second set Immediate")});
console.log("I am the third line");
*/