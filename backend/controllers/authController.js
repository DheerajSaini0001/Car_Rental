const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Generate JWT
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    });
};

// @desc    Register new user
// @route   POST /api/auth/signup
// @access  Public
const { uploadToCloudinary } = require('../config/cloudinary');
const { OAuth2Client } = require('google-auth-library');
const crypto = require('crypto');
const sendEmail = require('../utils/sendEmail');

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// @desc    Register new user
// @route   POST /api/auth/signup
// @access  Public
const registerUser = async (req, res) => {
    const { name, email, password, phone } = req.body;

    try {
        let user = await User.findOne({ email });

        if (user && user.isVerified) {
            return res.status(400).json({ message: 'User already exists' });
        }

        let licenseUrl = '';
        if (req.file) {
            try {
                const result = await uploadToCloudinary(req.file.buffer);
                licenseUrl = result.secure_url;
            } catch (uploadError) {
                console.error('Cloudinary upload failed:', uploadError);
            }
        }

        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const otpExpires = Date.now() + 10 * 60 * 1000; // 10 minutes

        if (user && !user.isVerified) {
            // Update existing unverified user
            user.name = name;
            user.password = password; // Will be hashed by pre-save
            user.phone = phone;
            user.otp = otp;
            user.otpExpires = otpExpires;
            if (licenseUrl) {
                user.documents.license = licenseUrl;
            }
            await user.save();
        } else {
            // Create new user
            user = await User.create({
                name,
                email,
                password,
                phone,
                documents: {
                    license: licenseUrl
                },
                otp,
                otpExpires,
            });
        }

        // Send OTP Email
        try {
            await sendEmail({
                email: user.email,
                subject: 'Verify your email - Drivon',
                message: `Hi ${user.name},\n\nYour verification code is: ${otp}\n\nIt expires in 10 minutes.`,
            });
            console.log(`OTP sent to ${user.email}: ${otp}`); // For debugging
        } catch (emailError) {
            console.error('Email send failed:', emailError);
            // Even if email fails, we return success so user can retry or contact support. 
            // Ideally we might want to fail the request or provide a resend option.
        }

        res.status(200).json({
            message: 'OTP sent to email',
            email: user.email
        });

    } catch (error) {
        console.error('Error in registerUser:', error);
        res.status(500).json({ message: error.message });
    }
};

// @desc    Verify OTP
// @route   POST /api/auth/verify-otp
// @access  Public
const verifyOtp = async (req, res) => {
    const { email, otp } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }

        if (user.isVerified) {
            return res.status(400).json({ message: 'User already verified. Please login.' });
        }

        if (user.otp === otp && user.otpExpires > Date.now()) {
            user.isVerified = true;
            user.otp = undefined;
            user.otpExpires = undefined;
            await user.save();

            // Send Welcome Email
            try {
                await sendEmail({
                    email: user.email,
                    subject: 'Welcome to Drivon',
                    message: `Hi ${user.name},\n\nWelcome to Drivon! We are excited to have you on board.`,
                });
            } catch (emailError) {
                console.error('Email send failed:', emailError);
            }

            res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                token: generateToken(user._id),
                license: user.documents.license
            });
        } else {
            res.status(400).json({ message: 'Invalid or expired OTP' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Authenticate a user
// @route   POST /api/auth/login
// @access  Public
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (user && (await user.matchPassword(password))) {
            // Send Login Alert Email
            try {
                await sendEmail({
                    email: user.email,
                    subject: 'Login Alert',
                    message: `Hi ${user.name},\n\nYou have successfully logged in to your Drivon account.`,
                });
            } catch (emailError) {
                console.error('Email send failed:', emailError);
            }

            res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                token: generateToken(user._id),
            });
        } else {
            res.status(401).json({ message: 'Invalid email or password' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Google Login
// @route   POST /api/auth/google
// @access  Public
const googleLogin = async (req, res) => {
    const { token } = req.body;

    try {
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: process.env.GOOGLE_CLIENT_ID,
        });

        const { name, email, picture } = ticket.getPayload();

        let user = await User.findOne({ email });

        if (user) {
            // User exists, log them in
            try {
                await sendEmail({
                    email: user.email,
                    subject: 'Login Alert (Google)',
                    message: `Hi ${user.name},\n\nYou have successfully logged in via Google.`,
                });
            } catch (emailError) {
                console.error('Email send failed:', emailError);
            }

            res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                token: generateToken(user._id),
            });
        } else {
            // Create new user
            const randomPassword = crypto.randomBytes(10).toString('hex');

            user = await User.create({
                name,
                email,
                password: randomPassword,
                // You might want to save the picture if your model supports it
            });

            try {
                await sendEmail({
                    email: user.email,
                    subject: 'Welcome to Drivon',
                    message: `Hi ${user.name},\n\nWelcome to Drivon! You have successfully signed up via Google.`,
                });
            } catch (emailError) {
                console.error('Email send failed:', emailError);
            }

            res.status(201).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                token: generateToken(user._id),
            });
        }

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Forgot Password - Send OTP
// @route   POST /api/auth/forgot-password
// @access  Public
const forgotPassword = async (req, res) => {
    const { email } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const otpExpires = Date.now() + 10 * 60 * 1000; // 10 minutes

        user.otp = otp;
        user.otpExpires = otpExpires;
        await user.save();

        try {
            await sendEmail({
                email: user.email,
                subject: 'Reset Password OTP - Drivon',
                message: `Hi ${user.name},\n\nYour password reset code is: ${otp}\n\nIt expires in 10 minutes.`,
            });
        } catch (emailError) {
            console.error('Email send failed:', emailError);
        }

        res.json({ message: 'OTP sent to email' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Reset Password
// @route   POST /api/auth/reset-password
// @access  Public
const resetPassword = async (req, res) => {
    const { email, otp, newPassword } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (user.otp === otp && user.otpExpires > Date.now()) {
            user.password = newPassword; // Will be hashed by pre-save
            user.otp = undefined;
            user.otpExpires = undefined;
            await user.save();

            res.json({ message: 'Password updated successfully' });
        } else {
            res.status(400).json({ message: 'Invalid or expired OTP' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Send Login OTP
// @route   POST /api/auth/send-login-otp
// @access  Public
const sendLoginOtp = async (req, res) => {
    const { email } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const otpExpires = Date.now() + 10 * 60 * 1000; // 10 minutes

        user.otp = otp;
        user.otpExpires = otpExpires;
        await user.save();

        try {
            await sendEmail({
                email: user.email,
                subject: 'Login OTP - Drivon',
                message: `Hi ${user.name},\n\nYour login verification code is: ${otp}\n\nIt expires in 10 minutes.`,
            });
        } catch (emailError) {
            console.error('Email send failed:', emailError);
        }

        res.json({ message: 'OTP sent to email' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Login with OTP
// @route   POST /api/auth/login-otp
// @access  Public
const loginWithOtp = async (req, res) => {
    const { email, otp } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (user.otp === otp && user.otpExpires > Date.now()) {
            user.otp = undefined;
            user.otpExpires = undefined;
            await user.save();

            try {
                await sendEmail({
                    email: user.email,
                    subject: 'Login Alert',
                    message: `Hi ${user.name},\n\nYou have successfully logged in to your Drivon account using OTP.`,
                });
            } catch (emailError) {
                console.error('Email send failed:', emailError);
            }

            res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                token: generateToken(user._id),
            });
        } else {
            res.status(400).json({ message: 'Invalid or expired OTP' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get user profile
// @route   GET /api/auth/profile
// @access  Private
const getUserProfile = async (req, res) => {
    const user = await User.findById(req.user._id);

    if (user) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            phone: user.phone,
            documents: user.documents,
            isVerified: user.isVerified
        });
    } else {
        res.status(404).json({ message: 'User not found' });
    }
};

module.exports = {
    registerUser,
    loginUser,
    getUserProfile,
    googleLogin,
    verifyOtp,
    forgotPassword,
    resetPassword,
    sendLoginOtp,
    loginWithOtp
};
