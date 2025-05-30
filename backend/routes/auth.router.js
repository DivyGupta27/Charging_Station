const express=require('express')
const router=express.Router()
const authuser= require('../models/auth.model')
const bcrypt=require('bcrypt')
const jwt =require('jsonwebtoken')
require('dotenv').config();
const secretKey = process.env.SECRET_KEY;

router.post('/signup',async(req,res)=>{
    const {name,email,password}=req.body
    
    try{
        let user=await authuser.findOne({email:email})
        if(user){
            res.send({
                status:false,
                message:"user already exists"
            })
        }
        let salt=await bcrypt.genSalt(10)
        let hashPassword= await bcrypt.hash(password,salt)

        let newUser={
            name:name,
            email:email,
            password:hashPassword
        }
        res.send({
            success: true,
            message: "account created successfully",
            userData: user,
          });

        user =await authuser.create(newUser)
    }
    catch(error){
            res.status(500).send({
              success: false,
              message: "internal server error",
            });
    }
})

router.post("/login", async (req, res) => {
    const { email, password } = req.body;
  
    try {
      let user = await authuser.findOne({ email: email });
      console.log(user);
      if (!user) {
        res.status(400).send({
          success: false,
          message: "email does not exist",
        });
      }
  
      const isMatch = await bcrypt.compare(password, user.password);
      console.log(isMatch);
      if (!isMatch) {
        res.status(400).send({
          success: false,
          message: "invalid email or password",
        });
      }
  
      const data = {
        id: user._id,
      };
  
      const token = jwt.sign(data, secretKey);
  
      console.log(token);
      // console.log(token);
  
      res.send({
        success: true,
        message: "login successfully",
        userData: user,
        token: token,
      });
    } catch (error) {
      res.status(500).send({
        success: false,
        message: "internal server error",
      });
    }
  });     
  
  module.exports = router;