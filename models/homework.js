import mongoose from "mongoose";


const userSchema = mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'student',
      required: true,
    },
    subject: {
      type: String,
      required: true,
    },
    submissionDate: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      enum: ["Assigned", "Pending", "Submitted"], // Status can be one of these
      default: "Assigned",
    },
  },
  { timestamps: true }
);


const Homework = mongoose.model('Homework',userSchema)
export default Homework