const express = require('express');
const router = express.Router();
const JournalController = require('../controllers/Journal');
const auth = require('../middleware/auth');

router.post('/create',auth ,JournalController.Create);
router.post('/edit' ,auth ,JournalController.Edit);
router.post('/delete',auth ,JournalController.Delete);
router.get('/get',auth ,JournalController.Get);

module.exports = router;