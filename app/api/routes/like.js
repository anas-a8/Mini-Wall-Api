const express = require('express');
const router = express.Router();
const likeController = require('../controllers/like');
const auth = require("../middleware/auth")

router.post('/:id/like',auth, likeController.do_like);
router.get('/:id/likes',auth, likeController.showlikesNumber);

module.exports = router;