const express = require('express');
const router = express.Router();
const {
    registerUser,
    loginUser,
    getUserProfile,
    googleLogin,
    verifyOtp,
    forgotPassword,
    resetPassword,
    sendLoginOtp,
    loginWithOtp,
} = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

const upload = require('../middleware/uploadMiddleware');

router.post('/signup', upload.single('license'), registerUser);
router.post('/verify-otp', verifyOtp);
router.post('/login', loginUser);
router.post('/google', googleLogin);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);
router.post('/send-login-otp', sendLoginOtp);
router.post('/login-otp', loginWithOtp);
router.get('/profile', protect, getUserProfile);

module.exports = router;
