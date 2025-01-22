import mongoose from 'mongoose';

const StudentFeeSchema = new mongoose.Schema({
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
  grade: { type: String, required: true },
  totalDue: { type: Number, required: true },
  paymentHistory: [
    {
      month: { type: String, required: true },
      amountPaid: { type: Number, required: true },
      paymentDate: { type: Date, default: Date.now },
      paymentMethod: { type: String, enum: ['Online', 'Offline'], required: true },
      transactionId: { type: String, default: null },
      status: { type: String, enum: ['Pending', 'Completed', 'Failed'], default: 'Completed' },
      offlineDetails: {
        receivedBy: { type: String, default: null },
        receiptNumber: { type: String, default: null },
      },
    },
  ],
}, { timestamps: true });

export default mongoose.model('StudentFee', StudentFeeSchema);
