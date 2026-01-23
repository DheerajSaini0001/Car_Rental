import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';
import { User, Mail, Lock, Phone, ArrowRight } from 'lucide-react';



const Signup = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        phone: '',
    });
    const [otpSent, setOtpSent] = useState(false);
    const [otp, setOtp] = useState('');
    const [loading, setLoading] = useState(false);
    const [licenseFile, setLicenseFile] = useState(null);

    const { signup, verifyOtp } = useAuth();
    const navigate = useNavigate();



    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        setLicenseFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        if (otpSent) {
            // Verify OTP
            const success = await verifyOtp(formData.email, otp);
            if (success) {
                navigate('/');
            }
        } else {
            // Signup first
            const result = await signup(
                formData.name,
                formData.email,
                formData.password,
                formData.phone,
                licenseFile
            );
            if (result.success) {
                setOtpSent(true);
            }
        }
        setLoading(false);
    };

    return (
        <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-md bg-secondary/50 backdrop-blur-lg border border-white/10 p-8 rounded-2xl shadow-2xl"
            >
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold mb-2">Create Account</h2>
                    <p className="text-gray-400">Join Drivon today</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {otpSent ? (
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-300">Enter Verification Code</label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" />
                                    <input
                                        type="text"
                                        name="otp"
                                        value={otp}
                                        onChange={(e) => setOtp(e.target.value)}
                                        className="w-full bg-primary/50 border border-white/10 rounded-xl py-3 pl-10 pr-4 focus:outline-none focus:border-accent transition-colors"
                                        placeholder="Enter 6-digit code"
                                        required
                                    />
                                </div>
                                <p className="text-xs text-gray-400">
                                    We sent a verification code to {formData.email}
                                </p>
                            </div>
                            <button
                                type="submit"
                                disabled={loading}
                                className={`w-full bg-accent text-primary font-bold py-3 rounded-xl hover:bg-accent/90 transition-all flex items-center justify-center gap-2 group mt-4 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
                            >
                                {loading ? 'Verifying...' : 'Verify Email'}
                                {!loading && <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />}
                            </button>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-300">Full Name</label>
                                <div className="relative">
                                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" />
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        className="w-full bg-primary/50 border border-white/10 rounded-xl py-3 pl-10 pr-4 focus:outline-none focus:border-accent transition-colors"
                                        placeholder="John Doe"
                                        required
                                        disabled={loading}
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-300">Email Address</label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" />
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="w-full bg-primary/50 border border-white/10 rounded-xl py-3 pl-10 pr-4 focus:outline-none focus:border-accent transition-colors"
                                        placeholder="you@example.com"
                                        required
                                        disabled={loading}
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-300">Phone Number</label>
                                <div className="relative">
                                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" />
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        className="w-full bg-primary/50 border border-white/10 rounded-xl py-3 pl-10 pr-4 focus:outline-none focus:border-accent transition-colors"
                                        placeholder="+1 234 567 890"
                                        disabled={loading}
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-300">Password</label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" />
                                    <input
                                        type="password"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        className="w-full bg-primary/50 border border-white/10 rounded-xl py-3 pl-10 pr-4 focus:outline-none focus:border-accent transition-colors"
                                        placeholder="••••••••"
                                        required
                                        disabled={loading}
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-300">Driving License</label>
                                <div className="relative">
                                    <input
                                        type="file"
                                        name="license"
                                        onChange={handleFileChange}
                                        className="w-full bg-primary/50 border border-white/10 rounded-xl py-3 px-4 focus:outline-none focus:border-accent transition-colors text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-accent file:text-primary hover:file:bg-accent/90"
                                        accept="image/*"
                                        required
                                        disabled={loading}
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className={`w-full bg-accent text-primary font-bold py-3 rounded-xl hover:bg-accent/90 transition-all flex items-center justify-center gap-2 group mt-4 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
                            >
                                {loading ? 'Creating Account...' : 'Create Account'}
                                {!loading && <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />}
                            </button>
                        </div>
                    )}


                </form>

                <p className="mt-6 text-center text-gray-400 text-sm">
                    Already have an account?{' '}
                    <Link to="/login" className="text-accent hover:underline">
                        Log in
                    </Link>
                </p>
            </motion.div>
        </div>
    );
};

export default Signup;
