const express = require('express');
const router = express.Router();
const PostController = require('../controllers/Post');
const auth = require('../middleware/auth');

router.post('/create',auth ,PostController.Create);
router.post('/delete',auth ,PostController.Delete);
router.post('/like',auth ,PostController.Like);
router.post('/unlike',auth ,PostController.Unlike);
router.get('/get',auth ,PostController.Get);
router.get('/meditation-post',auth ,PostController.GetMeditation);

module.exports = router;