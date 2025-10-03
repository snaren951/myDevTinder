const auth=(req,res,next)=>{
const token ="xyz123";
if(token==="xyz"){
    console.log("Authentication Passed");

    next();
}
else {
    console.log("Unauthorized request");

    res.status(401).send("Unauthorized Request");
}

}

module.exports={auth};