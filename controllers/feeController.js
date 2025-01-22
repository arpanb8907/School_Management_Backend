import Fee from '../models/Fee.js';
import StudentFee from '../models/StudentFee.js';

export const createFee = async (req, res) => {
  try {
    const fee = new Fee(req.body);
    await fee.save();
    res.status(201).json(fee);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getFees = async (req, res) => {
  try {
    const fees = await Fee.find();
    res.status(200).json(fees);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getStudentFeeDetails = async (req, res) => {
    try {
      const studentId = req.studentId; // Extracted from token via middleware
  
      // Attempt to fetch the student's fee details
      let studentFee = await StudentFee.findOne({ studentId });
  
      // If no record is found, create a default one
      if (!studentFee) {
        studentFee = new StudentFee({
          studentId,
          grade: '6', // Default grade
          totalDue: 2000 * 12, // Assuming 12 months of fees
          paymentHistory: [], // No payment history initially
        });
  
        await studentFee.save(); // Save the new record
      }
  
      const response = {
        studentId: studentFee.studentId,
        grade: studentFee.grade,
        monthlyFee: studentFee.totalDue / 12, // Assuming totalDue is for 12 months
        paymentStatus: Array.from({ length: 12 }, (_, i) => {
          const month = new Date(0, i).toLocaleString('default', { month: 'long' });
      
          // Check if the month is present in paymentHistory
          const paymentRecord = studentFee.paymentHistory.find((p) => p.month === month);
      
          return { month, paid: !!paymentRecord };
        }),
      };
      
  
      res.status(200).json(response);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  