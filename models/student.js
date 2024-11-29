// import mongoose from "mongoose";

// const userSchema = mongoose.Schema({
//     name: { type: String, required: true },
//     email: { type: String, required: true, unique: true },
//     password: { type: String, required: true },
//     contact: { type: String, required: true },
//     address: { type: String, required: true },
//   }, {
//     timestamps: true,
    
//   });

// const student = mongoose.model('student',userSchema)

// export default student


import mongoose from "mongoose";

// Define the schema for a user (or student in this case)
const userSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    contact: { type: String, required: true },
    address: { type: String, required: true },
  },
  {
    timestamps: true,  // Automatically adds `createdAt` and `updatedAt` fields
  }
);

// Define the model, use capitalized model name as convention
const student = mongoose.model("Student", userSchema);  // Mongoose model name is 'Student', which will map to 'students' collection in MongoDB

export default student;
