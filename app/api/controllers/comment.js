const commentModel = require('../models/comment');
const postModel = require('../models/post');

// write comment to the post
const writecomment = async (req , res)=> {
    const id = req.params.id;
// Read comment from request body
    const {comment} = req.body;

    const newComment = new commentModel({
        comment : comment,
        postId : id,
        userId : req.userId
    });

    // find particular post id in the database 
    const post = await postModel.findOne({id});
    console.log(post)
    try {
    //When user id not equal to post id add the comment
    // Othwiser user cant comment his own post
        if (req.userId != post.userId){
            await newComment.save();
            res.status(201).json(newComment);
        } else {
            res.status(200).json("the user couldn't comment in his post");
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({message:"Something went wrong !"})
    }
}


const showcomments = async (req , res)=> {
    const id = req.params.id;
    //Search for spesfic id then will look for post is that match the entered one
    const comment = await commentModel.find({postId:id});
    res.status(201).json(comment);
}
module.exports = {writecomment,showcomments}