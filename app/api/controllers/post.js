const postModel = require('../models/post');
const likeModel = require('../models/like');


const createpost = async (req , res)=> {

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

const getPosts = async (req , res)=> {
  try {
    //will give us all posts in database
    const posts = await postModel.find({})

    // we must sort the posts by likes number
    //empty list we fill it later 
    const postlikesnumber = [];

    for(const i in posts){
      const like = await likeModel.find({postId:posts[i].id})
      postlikesnumber.push({"post":await postModel.find({_id:posts[i].id}),"numberlike":like.length});
    }

    res.status(200).json(postlikesnumber.sort(function(a, b){return b.numberlike - a.numberlike}));
    
  } catch (error) {
    console.log(error);
    res.status(500).json({message:"Something went wrong !"})
  }

}

const updatepost = async (req , res)=> {
  const id = req.params.id;
  const {title,description} = req.body;

  const newPost = {
    title : title,
    description : description,
    userId : req.userId
  }

  try {
    await postModel.findByIdAndUpdate(id,newPost,{new:true});
    res.status(200).json(newPost);
  } catch (error) {
    console.log(error);
    res.status(500).json({message:"Something went wrong !"})
  }

}

const deletepost = async (req , res)=> {
  const id = req.params.id;
  try {
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