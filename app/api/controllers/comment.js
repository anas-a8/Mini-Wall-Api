const commentModel = require('../models/comment');
const postModel = require('../models/post');

const writecomment = async (req , res)=> {
    const id = req.params.id;
    const {comment} = req.body;

    const newComment = new commentModel({
        comment : comment,
        postId : id,
        userId : req.userId
    });

    const post = await postModel.findOne({id});
    console.log(post)
    try {
        if (req.userId != post.userId){
            await newComment.save();
            res.status(201).json(newComment);
        } else {
            res.status(200).json("the user couldn't comment in her post");
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({message:"Something went wrong !"})
    }
}


const showcomments = async (req , res)=> {
    const id = req.params.id;
    const comment = await commentModel.find({postId:id});
    res.status(201).json(comment);
}
module.exports = {writecomment,showcomments}