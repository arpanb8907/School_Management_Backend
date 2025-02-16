import Payment from '../models/Payment.js';
import StudentFee from '../models/StudentFee.js';

export const makeOfflinePayment = async (req, res) => {
	try {
		const { selectedMonths, offlineDetails } = req.body;
		let { studentId } = req.query;

		if (!studentId){
			studentId = req.studentId; // Extracted from token via middleware
		}
	
		if (!selectedMonths || selectedMonths.length === 0) {
		  return res.status(400).json({ error: "No months selected for payment." });
		}
	
		let studentFee = await StudentFee.findOne({ studentId });

		console.log(studentFee)

		if (!studentFee) {
		  return res.status(404).json({ error: "Student fee record not found." });
		}
	
		const alreadyPaidMonths = studentFee.paymentHistory
		  .filter((record) => selectedMonths.includes(record.month))
		  .map((record) => record.month);
	
		if (alreadyPaidMonths.length > 0) {
		  return res.status(400).json({
			error: `Payment already recorded for the following months: ${alreadyPaidMonths.join(", ")}`,
		  });
		}
	
		const newPayments = selectedMonths.map((month) => ({
		  month,
		  amountPaid: studentFee.totalDue / 12, // Assuming monthly fee is totalDue divided by 12
		  paymentMethod: "Offline",
		  paymentDate: new Date(),
		  status: "Completed",
		  offlineDetails,
		}));
	
		// Append new payment records to the paymentHistory
		studentFee.paymentHistory.push(...newPayments);
	
		await studentFee.save();
	
		res.status(200).json({
		  message: "Offline payment recorded successfully.",
		  updatedPaymentHistory: studentFee.paymentHistory,
		});
	  } catch (error) {
		console.error("Error processing offline payment:", error);
		res.status(500).json({ error: "Failed to process offline payment." });
	  }
}