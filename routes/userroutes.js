import express from 'express'

import { registeruser } from '../controllers/usercontrollers.js';

import student from '../models/student.js';
import bcrypt from "bcryptjs"


const router = express.Router();

router.post('/register', registeruser);

export default router