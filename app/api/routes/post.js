const express = require('express');
const router = express.Router();
const postController = require('../controllers/post');
const auth = require("../middleware/auth")

router.get('/',auth, postController.getPosts);
router.post('/',auth, postController.createpost);
router.put('/:id',auth, postController.updatepost);
router.delete('/:id',auth, postController.deletepost);

module.exports = router;