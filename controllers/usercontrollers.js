import bcrypt from 'bcryptjs';
//import student from "../models/student.js";

import  jwt from 'jsonwebtoken';
import admin from '../models/admin.js';
import Homework from '../models/homework.js';
import student from '../models/student.js';


export const registeruser = async(req,res,role)=>{

    const { name,fname, email, password, contact, address } = req.body;

    try {


        const userExists = await (role==="admin"? admin : student).findOne({email});

        if(userExists){
            res.status(400).json({message : "user has already registered"})
        }

        const hashedpwd = await bcrypt.hash(password,10)
        // save the user in database

        const user = role==='student' ? new student({
            name,
            fname,
            email,
            password : hashedpwd,
            contact,
            address,
            role

        }) : new admin({
            name,
            fname,
            email,
            password : hashedpwd,
            contact,
            address,
            role

        })

        await user.save()
        res.status(201).json({message: `${role} registered successfully`})

    } catch (error) {
        res.status(500).json({message:"server error",error})
    }
    
}

export const loginuser = async(req,res,role)=>{

    const {email,password} = req.body;

    try {
        const model = role === 'admin' ? admin : student
        const user = await model.findOne({email})

        if(!user){
            res.status(404).json({message:`${model} not found`})
        }

        const isMatch = await bcrypt.compare(password,user.password)

        if(!isMatch){
            res.status(400).json({message:'Invalid Credentials'})
        }

        // create jwt token
        const token = jwt.sign(
            {id:user._id,email:user.email,username : user.name},
            process.env.JWT_SECRET,
            {expiresIn:'1h'}
        
        );

        
        res.status(200).json({token})
    
    } catch (error) {   
        console.error(error);
        res.status(500).json({message:"Server error"})
        
    }

}

export const fetch_studentdetails = async (req,res)=>{

    try {
        const students = await student.find()
      

      const studentdata = students.map((e)=>({

        id: e._id,
        name : e.name,
        
      }));
      
      res.status(200).json(studentdata)

    } catch (error) {
        console.error("Error fetching details",error);
        res.status(500).json({message:'Internal server error'})
        
    }
}


export const sethomework = async(req,res)=>{

    const {selectedStudent,subject,submissionDate,status} = req.body;

    try {

        const exist_student = await student.findById(selectedStudent)

        if(!exist_student){
            return res.status(404).json({message:"Student not found"})
        }


        // create homework
        const home_work = new Homework({
            student : selectedStudent,
            subject,
            submissionDate,
            status
        });
    
        await home_work.save();

        // success response
        res.status(201).json({message:`Homework added for ${exist_student.name}`})
    } catch (error) {
        console.error("error adding hoework",error);
        
        res.status(500).json({message:"Internal server error"})
    }


}
