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
app.get("/user",function(req,res){
    res.send({firstName:"Naren", lastName:"Siriki"});

});
app.post("/user",function(req,res){
    res.send("Data sent successfully");

});
app.delete("/user",function(req,res){
    res.send("Data deleted successfully");

});




app.listen(7777, function(){
    console.log("Server is listening on port 7777 successfully");
});
