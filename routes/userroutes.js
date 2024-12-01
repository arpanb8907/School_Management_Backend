import express from 'express'

import { loginstudent, registeruser } from '../controllers/usercontrollers.js';

import student from '../models/student.js';
import bcrypt from "bcryptjs"


const router = express.Router();

router.post('/register', registeruser);

router.post('/login',loginstudent);

export default router