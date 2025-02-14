import express from 'express'

import { fetch_studentdetails, loginuser, registeruser,sethomework,get_userslist } from '../controllers/usercontrollers.js';

import student from '../models/student.js';
import bcrypt from "bcryptjs"
import { savemsg,fetch_msg } from '../controllers/chatcontroller.js';


const router = express.Router();

router.post('/student/register', (req,res)=>registeruser(req,res,'student'));

router.post('/admin/register', (req,res)=>registeruser(req,res,'admin'));

router.post('/admin/login',(req,res)=>loginuser(req,res,'admin'));
router.post('/student/login',(req,res)=>loginuser(req,res,'student'));

router.get('/student/homework',(req,res)=> fetch_studentdetails(req,res));
router.post('/student/homework/assign',(req,res)=>sethomework(req,res));
router.get('/userslist',(req,res)=> get_userslist(req,res));
router.post('/messages', (req,res)=>savemsg(req,res));
router.get('/messages',(req,res)=> fetch_msg(req,res));
export default router