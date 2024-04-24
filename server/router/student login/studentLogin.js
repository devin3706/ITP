import express from 'express';
import bcrypt from 'bcrypt';
const router = express.Router();
import {Student} from '../../models/student login/StudentLogin.js';
import jwt from 'jsonwebtoken'
import nodemailer from 'nodemailer';

router.post('/signup',async (req,res) => {
    const {name,email,password, school,number,address} = req.body;
    const student = await Student.findOne({email})
    if(student) {
        return res.json({message: "student already existed"})
    }

    const hashpassword = await bcrypt.hash(password, 10)
    const newStudent = new Student({
        name,
        email,
        password:hashpassword,
        school,
        number,
        address
    });


await newStudent.save()
return res.json({status: true, message: "record registered"})

});

router.post('/Login',async (req,res) => {
    const {email,password} = req.body;
    const student = await Student.findOne({email})
    if(!student) {
        return res.json({message: "student is not registered"})
    }

    const validpassword = await bcrypt.compare(password, student.password)
    if(!validpassword) {
        return res.json({message : "password is incorrect"})
    }

    const token = jwt.sign({email: student.email}, process.env.KEY, {expiresIn: '1h'})
    res.cookie('token', token, { httpOnly: true, maxAge: 360000})
    return res.json({status: true, message: "logged in successfully"})

    });

    router.post('/forgotPassword',async (req,res) => {
        const {email} = req.body;
        try{
            const student = await Student.findOne({email})
            if(!student) {
            return res.json({message: "student is not registered"})
        }


        
        var transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: 'youremail@gmail.com',
            pass: 'yourpassword'
          }
        });
        
        var mailOptions = {
          from: 'youremail@gmail.com',
          to: 'myfriend@yahoo.com',
          subject: 'Sending Email using Node.js',
          text: 'That was easy!'
        };
        
        transporter.sendMail(mailOptions, function(error, info){
          if (error) {
            console.log(error);
          } else {
            console.log('Email sent: ' + info.response);
          }
        });
        
            
        
        }catch(err) {
            console.log(err)
        }
    });



export default router;