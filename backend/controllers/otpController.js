const nodemailer = require('nodemailer');

// Temporary in-memory store for OTPs (In production, use Redis or DB with expiration)
const otpStore = new Map();

// Generate a random 6-digit number
const generateOTP = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
};

const sendOTP = async (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ message: 'Email is required' });
    }

    const otp = generateOTP();
    const expiresAt = Date.now() + 10 * 60 * 1000; // 10 minutes from now

    // Store OTP
    otpStore.set(email, { otp, expiresAt });

    console.log(`[DEV MODE] OTP for ${email}: ${otp}`);

    // Configure Nodemailer
    // NOTE: For real sending, you need valid credentials in .env
    // process.env.EMAIL_USER and process.env.EMAIL_PASS
    try {
        if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
            const transporter = nodemailer.createTransport({
                service: 'gmail', // or your preferred service
                auth: {
                    user: process.env.EMAIL_USER,
                    pass: process.env.EMAIL_PASS,
                },
            });

            await transporter.sendMail({
                from: process.env.EMAIL_USER,
                to: email,
                subject: 'Your Car Rental OTP',
                text: `Your One-Time Password (OTP) for booking confirmation is: ${otp}. It expires in 10 minutes.`,
            });

            res.status(200).json({ message: 'OTP sent successfully' });
        } else {
            // Fallback for dev without credentials
            res.status(200).json({ message: 'OTP generated (Check server console)', devMode: true });
        }
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ message: 'Failed to send OTP' });
    }
};

const verifyOTP = async (req, res) => {
    const { email, otp } = req.body;

    if (!email || !otp) {
        return res.status(400).json({ message: 'Email and OTP are required' });
    }

    const storedData = otpStore.get(email);

    if (!storedData) {
        return res.status(400).json({ message: 'OTP not found or expired' });
    }

    if (Date.now() > storedData.expiresAt) {
        otpStore.delete(email);
        return res.status(400).json({ message: 'OTP has expired' });
    }

    if (storedData.otp === otp) {
        // OTP is valid
        otpStore.delete(email); // Invalidate after use
        return res.status(200).json({ message: 'OTP verified successfully' });
    } else {
        return res.status(400).json({ message: 'Invalid OTP' });
    }
};

module.exports = {
    sendOTP,
    verifyOTP
};
