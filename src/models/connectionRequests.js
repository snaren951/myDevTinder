const mongoose = require("mongoose");
const connectionRequestSchema= mongoose.Schema({

    fromId:{
        type:mongoose.SchemaTypes.ObjectId,
        required:true
        

    },
    toId:{
        type:mongoose.SchemaTypes.ObjectId,
        // validate(value) {
        //     if (!mongoose.Types.ObjectId.isValid(value)){
        //         throw new Error ("ID is not a valid entry");
        //     }

        // },
        required:true
        
    },
    status:{
        type:String,
        enum: {values: ['ignored','liked','accepted','rejected'],
            message: `{VALUE} is not supported`}

    }
},
{timestamps:true});


connectionRequestSchema.pre('save', function(next){
    const doc = this;
    const fromId=doc.fromId;
    const toId=doc.toId;
    if (fromId.equals(toId)){
        throw new Error (" You can't send request to self!!!")

        
    }
    next();



  
});

connectionRequestSchema.index({fromId:1, toId:1});

const ConnectionRequest = mongoose.model("ConnectionRequests",connectionRequestSchema);

module.exports = ConnectionRequest;