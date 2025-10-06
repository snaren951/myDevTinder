const validator = require("validator");
 const validateFields= (req) => {

    const {firstName,lastName,email,password} = req.body;
   

    if(!firstName || !lastName){

        throw new Error ("Name is not valid");
    }
    else if (firstName.length<4 || firstName.length>50){
        throw new Error ("First Name didn't meet the required length");
    }
    else if (!validator.isStrongPassword(password)) {
        throw new Error ("Enter a strong password");
    }
    else if (!validator.isEmail(email)){
        throw new Error ("Enter a valid email");

    }
 }

 module.exports={validateFields};