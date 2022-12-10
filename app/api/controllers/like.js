// Importing modules
const likeModel = require('../models/like');
const postModel = require('../models/post');

// Read like from request body
const do_like = async (req , res)=> {
    const id = req.params.id;
    const {like} = req.body;

    const newLike = new likeModel({
        like : like,
        postId : id,
        userId : req.userId
    });
    // Compare the post id and user id if they dont match add the comment
    // Otherwise send error message the user cant like his post 
    const post = await postModel.findOne({id});
    const likes = await likeModel.findOne({postId:id,userId:req.userId});
    console.log(likes)
    try {
        console.log(req.userId)
        console.log(post.userId)
        if (req.userId != post.userId){
            // When read remove from request body the like will be removed from the post 
            if (like == false){
                try{
                    await likeModel.findByIdAndRemove(likes._id);
                    res.status(201).json("like removed");
                } catch (error){
                    console.log(error)
                    res.status(500).json({message:"you must add like first"})                    
                }
            } else {
                await newLike.save();
                res.status(201).json(newLike);
            }
        } else {
            res.status(200).json("the user couldn't like her post");
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({message:"Something went wrong !"})
    }
}

// Show how many likes in particular post
const showlikesNumber = async (req , res)=> {
    const id = req.params.id;
    const like = await likeModel.find({postId:id});
    // Count how many likes in particular post
    res.status(201).json(like.length);
}

module.exports = {do_like,showlikesNumber}
