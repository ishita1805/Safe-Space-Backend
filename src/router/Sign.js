const express = require('express');
const router = express.Router();
const SignController = require('../controllers/Sign');
const auth = require('../middleware/auth');

router.post('/create',auth ,SignController.Create);
router.post('/delete',auth ,SignController.Delete);
router.get('/get',auth ,SignController.Get);
router.get('/get-random',auth ,SignController.GetRandom);

module.exports = router;