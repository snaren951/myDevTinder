
const mongoose = require("mongoose");

  const dbConnect=async()=>{
     await mongoose.connect("mongodb+srv://mymongouser1:9snF5c2T8QKDDKPf@cluster1.futcqqq.mongodb.net/devTinder");

 }
 module.exports=dbConnect;
 