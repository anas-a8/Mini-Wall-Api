const express = require('express');
const router = express.Router();
const commentController = require('../controllers/comment');
const auth = require("../middleware/auth")

router.post('/:id/comment',auth, commentController.writecomment);
router.get('/:id/comments',auth, commentController.showcomments);

module.exports = router;