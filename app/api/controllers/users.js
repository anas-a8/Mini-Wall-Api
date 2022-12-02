const userModel = require('../models/users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const SECRET_KEY = 'POSTSAPI'

//register

const create = async (req , res) =>{
   const {name,email,password} = req.body;
   try {

      const existingUser = await userModel.findOne({email : email})
      if(existingUser){
         return res.status(400).json({message:"User already exists"});
      }
      
      // hash user password
      // it will wait until the hashed Password
      const hashedPassword = await bcrypt.hash(password,10);

      // will store the inpute data to mongodb 
      // it will wait until the data insert to mongodb 
      const result = await userModel.create({
         email : email,
         password : hashedPassword,
         name : name
      });
// unique email and id input so  token will be 
      const token = jwt.sign({email:result.email, id : result._id}, SECRET_KEY);
      // then resuilt will be return key( user information and the new token)
      //postman
      res.status(500).json({user : result , token:token});

   } catch (error) {
      console.log(error);
      res.status(500).json({message:"Something went wrong"})
   }
}

// Authenticate

const authenticate = async (req , res)=>{
   const {email,password} = req.body;
   try {
      const existingUser = await userModel.findOne({email:email});
      if(!existingUser){
         return res.status(404).json({message:"User not found"});
      }


      const matchPassword = await bcrypt.compare(password,existingUser.password);
      if(!matchPassword){
         return res.status(400).json({message:"Invalid Credentials"});
      }
      // unique email and 
      const token = jwt.sign({email:existingUser.email , id : existingUser._id},SECRET_KEY);
      //
      res.status(201).json({user : existingUser , token:token});


   } catch (error){
      console.log(error);
      res.status(500).json({message:"Something went wrong"});
   }
}

module.exports = { create , authenticate}