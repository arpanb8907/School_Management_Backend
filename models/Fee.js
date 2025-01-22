import mongoose from 'mongoose';

const FeeSchema = new mongoose.Schema({
  grade: { type: String, required: true },
  monthlyAmount: { type: Number, required: true },
  description: { type: String, default: "" },
}, { timestamps: true });

export default mongoose.model('Fee', FeeSchema);
