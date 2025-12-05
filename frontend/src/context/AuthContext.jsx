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
                'http://localhost:5000/api/auth/login',
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

    const signup = async (name, email, password, phone) => {
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                },
            };

            const { data } = await axios.post(
                'http://localhost:5000/api/auth/signup',
                { name, email, password, phone },
                config
            );

            localStorage.setItem('userInfo', JSON.stringify(data));
            setUser(data);
            toast.success('Registration successful!');
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

    const logout = () => {
        localStorage.removeItem('userInfo');
        setUser(null);
        toast.success('Logged out successfully');
    };

    return (
        <AuthContext.Provider value={{ user, login, signup, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};
