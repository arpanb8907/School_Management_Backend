import bcrypt from 'bcryptjs';
import student from "../models/student.js";
import  jwt from 'jsonwebtoken';

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

export const loginstudent = async(req,res)=>{

    const {email,password} = req.body;

    try {
        const user = await student.findOne({email})

        if(!user){
            res.status(404).json({message:"Student not found"})
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