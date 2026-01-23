import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const userInfo = localStorage.getItem('userInfo');
        if (userInfo) {
            setUser(JSON.parse(userInfo));
        }
        setLoading(false);
    }, []);

    const login = async (email, password) => {
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                },
            };

            const { data } = await axios.post(
                'http://localhost:5201/api/auth/login',
                { email, password },
                config
            );

            localStorage.setItem('userInfo', JSON.stringify(data));
            setUser(data);
            toast.success('Login successful!');
            return true;
        } catch (error) {
            toast.error(
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message
            );
            return false;
        }
    };

    const signup = async (name, email, password, phone, licenseFile) => {
        try {
            const formData = new FormData();
            formData.append('name', name);
            formData.append('email', email);
            formData.append('password', password);
            formData.append('phone', phone);
            if (licenseFile) {
                formData.append('license', licenseFile);
            }

            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            };

            const { data } = await axios.post(
                'http://localhost:5201/api/auth/signup',
                formData,
                config
            );

            // Do not login immediately, wait for OTP verification
            // localStorage.setItem('userInfo', JSON.stringify(data));
            // setUser(data);

            toast.success(data.message || 'OTP sent to email!');
            return { success: true, message: data.message };
        } catch (error) {
            console.error('Signup error:', error);
            toast.error(
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message
            );
            return { success: false };
        }
    };

    const verifyOtp = async (email, otp) => {
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                },
            };

            const { data } = await axios.post(
                'http://localhost:5201/api/auth/verify-otp',
                { email, otp },
                config
            );

            localStorage.setItem('userInfo', JSON.stringify(data));
            setUser(data);
            toast.success('Email verified & Login successful!');
            return true;
        } catch (error) {
            toast.error(
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message
            );
            return false;
        }
    };

    const googleLogin = async (token) => {
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                },
            };

            const { data } = await axios.post(
                'http://localhost:5201/api/auth/google',
                { token },
                config
            );

            localStorage.setItem('userInfo', JSON.stringify(data));
            setUser(data);
            toast.success('Google Login successful!');
            return true;
        } catch (error) {
            toast.error(
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message
            );
            return false;
        }
    };

    const forgotPassword = async (email) => {
        try {
            await axios.post('http://localhost:5201/api/auth/forgot-password', { email });
            toast.success('OTP sent to your email');
            return true;
        } catch (error) {
            toast.error(error.response?.data?.message || 'Error executing request');
            return false;
        }
    };

    const resetPassword = async (email, otp, newPassword) => {
        try {
            await axios.post('http://localhost:5201/api/auth/reset-password', { email, otp, newPassword });
            toast.success('Password reset successfully! Please login.');
            return true;
        } catch (error) {
            toast.error(error.response?.data?.message || 'Error executing request');
            return false;
        }
    };

    const sendLoginOtp = async (email) => {
        try {
            await axios.post('http://localhost:5201/api/auth/send-login-otp', { email });
            toast.success('OTP sent to your email');
            return true;
        } catch (error) {
            toast.error(error.response?.data?.message || 'Error executing request');
            return false;
        }
    };

    const loginWithOtp = async (email, otp) => {
        try {
            const { data } = await axios.post('http://localhost:5201/api/auth/login-otp', { email, otp });
            localStorage.setItem('userInfo', JSON.stringify(data));
            setUser(data);
            toast.success('Logged in successfully!');
            return true;
        } catch (error) {
            toast.error(error.response?.data?.message || 'Error executing request');
            return false;
        }
    };


    const logout = () => {
        localStorage.removeItem('userInfo');
        setUser(null);
        toast.success('Logged out successfully');
    };

    return (
        <AuthContext.Provider value={{
            user,
            login,
            signup,
            verifyOtp,
            googleLogin,
            logout,
            loading,
            forgotPassword,
            resetPassword,
            sendLoginOtp,
            loginWithOtp
        }}>
            {children}
        </AuthContext.Provider>
    );
};
