
const dbConnect= require("./config/database.js");
const express = require("express");
const User=require("./models/users.js");
const {validateFields}=require("./utils/validations.js");
const { error } = require("console");
const bcrypt=require("bcrypt");
const validator=require("validator");
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
    app.use(express.json());
    app.post("/signup", async function(req,res){
       
       

        try {
            //validation of request body elements
          
            validateFields(req);
            
            const {firstName,lastName,email,password}=req.body;

            //Hash the password
            const passwordHash= await bcrypt.hash(password,10)
            console.log(passwordHash);

            const user = new User({
                firstName,
                lastName,
                email,
                password: passwordHash
            });
            await user.save();
            
            res.send("User Created successfully");

        }
            
        
        catch (error){

            //console.log ("ERROR: " +error.message);
            res.status(400).send("ERROR:  " +error.message);
        }
        
    });

    app.post("/login",async function(req,res){

        try{

        const {email,password}=req.body;
        if(!validator.isEmail(email)){

            throw new Error("Invalid email address");
        }
        else{

            const loginUser=await User.findOne({email:email});
            console.log("Login User is \n");
            console.log(loginUser);
            if(!loginUser){
               // console.log("Enterred the login user block");
                throw new Error("Invalid Credentials");
            }
            else {
                //console.log("Hashed Password is : " + loginUser.password);

                const passwordMatched = await bcrypt.compare(password,loginUser.password);
                //console.log("Password Match Result is : " +passwordMatched);
                if (!passwordMatched){
                    throw new Error("Invalid Credentials");


                }
                else {
                    res.send("User Login Successfull");
                }
            }
        }


        }
        catch (error){
            res.status(400).send("ERROR Message: "+error.message);
        }
        


    });
    
    app.get("/user",async function(req,res){

        const userId=req.body.userId;
        try{
            const user=await User.findById(userId);
        if(user.length<1){
            //throw new error;
            res.status(400).send("user not found");
        }
        else{
             res.send(user);

        }

        }
        catch(error){
            res.status(400).send("Something went wrong")
        }
        
       

    });

    app.get("/feed",async function(req,res){

        const userlastName=req.body.lastName;
        try{
            const user=await User.find();
        if(user.length<1){
            //throw new error;
            res.status(400).send("No users found");
        }
        else{
             res.send(user);

        }

        }
        catch(error){
            res.status(400).send("Something went wrong")
        }
        
       

    });

    app.delete("/delete",async function(req,res){

        const userId = req.body.userId;
        //console.log(userId);
        try{
            const opStatus = await User.findByIdAndDelete(userId);
            if (!opStatus){

                res.status(400).send("Bad Data  User Not found");
            }
            else {
                 res.send("User deleted successfully");


            }
           
    
        }
        catch(error){
            res.status(400).send("DB operation failed, something went wrong");
        }


    });
    app.patch("/patch/:emailId", async function(req, res){
        const data = req.body;
        const emailId=req.params.emailId;
        try{
            const allowedFields=["skills","about","age"];
           const isUpdateAllowed=Object.keys(data).every(key=>allowedFields.includes(key));
           //console.log("the value is" +isUpdateAllowed);
           if(req.body.skills.length>10){
            throw new Error("Skills length has exceeded the max lenght");
           }

                if(!isUpdateAllowed){
                    throw new Error("Request includes the fields that can't be modified");
                }
                
                else {
                    const updateduser= await User.findOneAndUpdate({email:emailId},data, {runValidator:true, returnDocument:'after'});
        res.send("User Updated successfully");
        console.log(updateduser);
                }

        }
        catch(error){

            res.status(400).send("Seomthing went wrong in updating the user: " + error.message);
        }
        


    });













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

