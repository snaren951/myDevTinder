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



app.listen(7777, function(){
    console.log("Server is listening on port 7777 successfully");
});
