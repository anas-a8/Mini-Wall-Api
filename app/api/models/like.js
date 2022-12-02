const mongoose = require("mongoose")

const LikeSchema = mongoose.Schema({

    like : {
        type : Boolean,
        required : true
    },
    postId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Post",
        required : true
    },
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        required : true
    }
}, {timestamps : true});

module.exports = mongoose.model("Like",LikeSchema)