const express = require('express');
const router = express.Router();
const userController = require('../controllers/User');
const auth = require('../middleware/auth')

router.post('/signup', userController.Signup);
router.post('/login', userController.Login);
router.post('/logout',auth, userController.Logout);
router.post('/update-user',auth, userController.UpdateUser);
router.post('/update-password',auth, userController.ChangePassword);
router.post('/forgot-password', userController.ForgotPassword);
router.get('/logged-user',auth, userController.getLoggedUser);
router.get('/one-user',auth, userController.getUser);
router.get('/all-users',auth, userController.getUsers);
router.post('/add-doctor', auth, userController.AddDoctor);
router.post('/delete-doctor', auth, userController.DeleteDoctor);
router.post('/notify-doctor', auth, userController.Notify);

module.exports = router;