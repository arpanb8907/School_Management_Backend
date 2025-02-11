import mongoose from "mongoose";

const messageSchema = mongoose.Schema({

    sender :{type : String , required : true},
    receiver : {type : String , required : true},
    message : {type : String},
    timestap : {type: Date ,default : Date.now}

});

const message = mongoose.model('message',messageSchema)

export default message