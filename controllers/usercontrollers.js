import bcrypt from 'bcryptjs';
import student from "../models/student.js";

export const registeruser = async(req,res)=>{

    const { name,fname, email, password, contact, address } = req.body;

    try {
        const studentExists = await student.findOne({email});

        if(studentExists){
            res.status(400).json({message :"Student has already registered"})
        }

        const hashedpwd = await bcrypt.hash(password,10)
        // save the user in database

        const newstudent = new student({
            name,
            fname,
            email,
            password : hashedpwd,
            contact,
            address,

        })

        await newstudent.save()
        res.status(201).json({message: "Student registered successfully"})

    } catch (error) {
        res.status(500).json({message:"server error",error})
    }
    
}