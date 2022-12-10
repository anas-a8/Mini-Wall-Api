// Importing modules
const userModel = require('../models/users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const SECRET_KEY = 'POSTSAPI'

//register
const create = async (req , res) =>{
// Read username, email and password from request body
   const {name,email,password} = req.body;
   try {

      const existingUser = await userModel.findOne({email : email})
      if(existingUser){
         return res.status(400).json({message:"User already exists"});
      }
      
// Hash user password
      const hashedPassword = await bcrypt.hash(password,10);

// Will store the inpute data to mongodb  
      const result = await userModel.create({
         email : email,
         password : hashedPassword,
         name : name
      });
// Generate an access token
      const token = jwt.sign({email:result.email, id : result._id}, SECRET_KEY);
      res.status(500).json({user : result , token:token});

   } catch (error) {
      console.log(error);
      res.status(500).json({message:"Something went wrong"})
   }
}

// Authenticate
// Log in 
const authenticate = async (req , res)=>{
// Read username and password from request body
   const {email,password} = req.body;
   try {
//Check if the user exist
      const existingUser = await userModel.findOne({email:email});
      if(!existingUser){
         return res.status(404).json({message:"User not found"});
      }

//Verify that the password entered matches the user's existing password
      const matchPassword = await bcrypt.compare(password,existingUser.password);
      if(!matchPassword){
         return res.status(400).json({message:"Invalid Credentials"});
      }
//Creating jwt token 
      const token = jwt.sign({email:existingUser.email , id : existingUser._id},SECRET_KEY);
      res.status(201).json({user : existingUser , token:token});


   } catch (error){
      console.log(error);
      res.status(500).json({message:"Something went wrong"});
   }
}

module.exports = { create , authenticate}