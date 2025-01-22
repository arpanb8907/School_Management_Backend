import express from 'express';
import { makeOfflinePayment } from '../controllers/paymentController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/offline', protect, makeOfflinePayment);

export default router;
