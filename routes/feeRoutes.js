import express from 'express';
import { createFee, getFees, getStudentFeeDetails } from '../controllers/feeController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/create', createFee);
router.get('/studentFee', protect, getStudentFeeDetails);
router.get('/admin/studentFee', getStudentFeeDetails);
router.get('/', getFees);

export default router;
