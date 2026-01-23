import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';
import { Mail, Lock, ArrowRight } from 'lucide-react';



const Login = () => {
    // View states: 'login', 'otpLogin', 'forgotPassword'
    const [view, setView] = useState('login');

    // Form states
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [otp, setOtp] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [otpSent, setOtpSent] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const { login, sendLoginOtp, loginWithOtp, forgotPassword, resetPassword } = useAuth();
    const navigate = useNavigate();



    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        const success = await login(email, password);
        setIsSubmitting(false);
        if (success) {
            navigate('/');
        }
    };

    const handleOtpLoginSubmit = async (e) => {
        e.preventDefault();
        if (isSubmitting) return;

        setIsSubmitting(true);
        if (otpSent) {
            const success = await loginWithOtp(email, otp);
            setIsSubmitting(false);
            if (success) navigate('/');
        } else {
            const success = await sendLoginOtp(email);
            setIsSubmitting(false);
            if (success) setOtpSent(true);
        }
    };

    const handleForgotPasswordSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        if (otpSent) {
            const success = await resetPassword(email, otp, newPassword);
            setIsSubmitting(false);
            if (success) {
                setView('login');
                setOtpSent(false);
            }
        } else {
            const success = await forgotPassword(email);
            setIsSubmitting(false);
            if (success) setOtpSent(true);
        }
    };

    const renderForm = () => {
        switch (view) {
            case 'otpLogin':
                return (
                    <form onSubmit={handleOtpLoginSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-300">Email Address</label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" />
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full bg-primary/50 border border-white/10 rounded-xl py-3 pl-10 pr-4 focus:outline-none focus:border-accent transition-colors"
                                    placeholder="you@example.com"
                                    required
                                    disabled={otpSent || isSubmitting}
                                />
                            </div>
                        </div>

                        {otpSent && (
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-300">Enter OTP</label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" />
                                    <input
                                        type="text"
                                        value={otp}
                                        onChange={(e) => setOtp(e.target.value)}
                                        className="w-full bg-primary/50 border border-white/10 rounded-xl py-3 pl-10 pr-4 focus:outline-none focus:border-accent transition-colors"
                                        placeholder="Enter 6-digit code"
                                        required
                                        disabled={isSubmitting}
                                    />
                                </div>
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className={`w-full bg-accent text-primary font-bold py-3 rounded-xl hover:bg-accent/90 transition-all flex items-center justify-center gap-2 group ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                        >
                            {isSubmitting ? 'Processing...' : (otpSent ? 'Login' : 'Send OTP')}
                            {!isSubmitting && <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />}
                        </button>

                        <button
                            type="button"
                            onClick={() => { setView('login'); setOtpSent(false); }}
                            className="w-full text-gray-400 hover:text-white text-sm"
                        >
                            Back to Password Login
                        </button>
                    </form>
                );

            case 'forgotPassword':
                return (
                    <form onSubmit={handleForgotPasswordSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-300">Email Address</label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" />
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full bg-primary/50 border border-white/10 rounded-xl py-3 pl-10 pr-4 focus:outline-none focus:border-accent transition-colors"
                                    placeholder="you@example.com"
                                    required
                                    disabled={otpSent}
                                />
                            </div>
                        </div>

                        {otpSent && (
                            <>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-300">Enter OTP</label>
                                    <div className="relative">
                                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" />
                                        <input
                                            type="text"
                                            value={otp}
                                            onChange={(e) => setOtp(e.target.value)}
                                            className="w-full bg-primary/50 border border-white/10 rounded-xl py-3 pl-10 pr-4 focus:outline-none focus:border-accent transition-colors"
                                            placeholder="Enter 6-digit code"
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-300">New Password</label>
                                    <div className="relative">
                                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" />
                                        <input
                                            type="password"
                                            value={newPassword}
                                            onChange={(e) => setNewPassword(e.target.value)}
                                            className="w-full bg-primary/50 border border-white/10 rounded-xl py-3 pl-10 pr-4 focus:outline-none focus:border-accent transition-colors"
                                            placeholder="New password"
                                            required
                                        />
                                    </div>
                                </div>
                            </>
                        )}

                        <button
                            type="submit"
                            className="w-full bg-accent text-primary font-bold py-3 rounded-xl hover:bg-accent/90 transition-all flex items-center justify-center gap-2 group"
                        >
                            {otpSent ? 'Reset Password' : 'Send Reset OTP'}
                            <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                        </button>

                        <button
                            type="button"
                            onClick={() => { setView('login'); setOtpSent(false); }}
                            className="w-full text-gray-400 hover:text-white text-sm"
                        >
                            Back to Login
                        </button>
                    </form>
                );

            default: // login
                return (
                    <form onSubmit={handleLoginSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-300">Email Address</label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" />
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full bg-primary/50 border border-white/10 rounded-xl py-3 pl-10 pr-4 focus:outline-none focus:border-accent transition-colors"
                                    placeholder="you@example.com"
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-300">Password</label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" />
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full bg-primary/50 border border-white/10 rounded-xl py-3 pl-10 pr-4 focus:outline-none focus:border-accent transition-colors"
                                    placeholder="••••••••"
                                    required
                                />
                            </div>
                        </div>

                        <div className="flex justify-between items-center text-sm">
                            <button
                                type="button"
                                onClick={() => { setView('forgotPassword'); setOtpSent(false); }}
                                className="text-accent hover:underline"
                            >
                                Forgot Password?
                            </button>
                            <button
                                type="button"
                                onClick={() => { setView('otpLogin'); setOtpSent(false); }}
                                className="text-accent hover:underline"
                            >
                                Login with OTP
                            </button>
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-accent text-primary font-bold py-3 rounded-xl hover:bg-accent/90 transition-all flex items-center justify-center gap-2 group"
                        >
                            Sign In
                            <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                        </button>
                    </form>
                );
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-secondary p-4">
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-secondary p-8 rounded-2xl shadow-lg w-full max-w-md border border-white/10"
            >
                <h2 className="text-3xl font-bold text-white text-center mb-6">Login</h2>

                {renderForm()}

                <p className="mt-6 text-center text-gray-400 text-sm">
                    Don't have an account?{' '}
                    <Link to="/signup" className="text-accent hover:underline">
                        Sign up
                    </Link>
                </p>
            </motion.div >
        </div >
    );
};

export default Login;
