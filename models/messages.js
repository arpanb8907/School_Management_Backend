import mongoose from "mongoose";

const messageSchema = mongoose.Schema({

    sender :{type : String , required : true},
    receiver : {type : String , required : true},
    text : {type : String},
    timestap : {type: Date ,default : Date.now}

});

const Message = mongoose.model('message',messageSchema)

export default Message