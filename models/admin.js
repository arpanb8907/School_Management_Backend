import mongoose from "mongoose";

const AdminSchema  = mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    contact: { type: String, required: true },
    address: { type: String, required: true },
    role : {type : String, default : 'admin'}
},

{
    timestamps: true,  // Automatically adds `createdAt` and `updatedAt` fields
  }

);

const admin = mongoose.model('Admin',AdminSchema)

export default admin
