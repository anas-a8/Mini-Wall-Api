// Importing modules
const postModel = require('../models/post');
const likeModel = require('../models/like');

// Add post
const createpost = async (req , res)=> {
// Read title and description from request body
  const {title,description} = req.body;

  const newPost = new postModel({
    title : title,
    description : description,
    userId : req.userId
  });

  try {
    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    console.log(error)
    res.status(500).json({message:"Something went wrong !"})
  }
}

// Read posts 
const getPosts = async (req , res)=> {
  try {
    //Search all posts on the database and display them
    const posts = await postModel.find({})

 
    // Sort the posts by likes number in descending order 
    //empty list we fill it later 
    const postlikesnumber = [];

    for(const i in posts){
      const like = await likeModel.find({postId:posts[i].id})
      //adds new items to the end of an array  
      postlikesnumber.push({"post":await postModel.find({_id:posts[i].id}),"numberlike":like.length});
    }
    // Sort the posts by likes number in descending order 
    res.status(200).json(postlikesnumber.sort(function(a, b){return b.numberlike - a.numberlike}));
    
  } catch (error) {
    console.log(error);
    res.status(500).json({message:"Something went wrong !"})
  }

}

//Update post
const updatepost = async (req , res)=> {
  const id = req.params.id;
  const {title,description} = req.body;

  const newPost = {
    title : title,
    description : description,
    userId : req.userId
  }

  try {
    //Search for particular  post by id to update it
    await postModel.findByIdAndUpdate(id,newPost,{new:true});
    res.status(200).json(newPost);
  } catch (error) {
    console.log(error);
    res.status(500).json({message:"Something went wrong !"})
  }

}

// Delete post
const deletepost = async (req , res)=> {
  const id = req.params.id;
  try {
//Search for particular post by id to delete it
    const post = await postModel.findByIdAndRemove(id);
    res.status(202).json(post);
  } catch (error) {
    console.log(error);
    res.status(500).json({message:"Something went wrong !"})
  }

}

module.exports = {
  createpost,
  getPosts,
  updatepost,
  deletepost
}