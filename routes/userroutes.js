import express from 'express'

import { loginuser, registeruser } from '../controllers/usercontrollers.js';

import student from '../models/student.js';
import bcrypt from "bcryptjs"


const router = express.Router();

router.post('/student/register', (req,res)=>registeruser(req,res,'student'));

router.post('/admin/register', (req,res)=>registeruser(req,res,'admin'));

router.post('/admin/login',(req,res)=>loginuser(req,res,'admin'));
router.post('/student/login',(req,res)=>loginuser(req,res,'student'));

export default router