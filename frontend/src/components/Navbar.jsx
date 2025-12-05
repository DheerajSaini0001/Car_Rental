import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, Car, User as UserIcon, LogOut } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const toggleMenu = () => setIsOpen(!isOpen);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'Cars', path: '/cars' },
        { name: 'About', path: '/about' },
        { name: 'Contact', path: '/contact' },
    ];

    return (
        <nav className="fixed w-full z-50 bg-primary/80 backdrop-blur-md border-b border-white/10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-2">
                        <Car className="h-8 w-8 text-accent" />
                        <span className="text-2xl font-bold tracking-tighter">
                            Driv<span className="text-accent">on</span>
                        </span>
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-8">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    to={link.path}
                                    className="hover:text-accent transition-colors duration-300 px-3 py-2 rounded-md text-sm font-medium"
                                >
                                    {link.name}
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Auth Buttons */}
                    <div className="hidden md:flex items-center gap-4">
                        {user ? (
                            <div className="flex items-center gap-4">
                                <div className="flex items-center gap-2 text-sm font-medium">
                                    <UserIcon className="h-4 w-4 text-accent" />
                                    <span>{user.name}</span>
                                </div>
                                <button
                                    onClick={handleLogout}
                                    className="text-gray-400 hover:text-white transition-colors"
                                    title="Logout"
                                >
                                    <LogOut className="h-5 w-5" />
                                </button>
                            </div>
                        ) : (
                            <>
                                <Link to="/login" className="text-sm font-medium hover:text-accent transition-colors">
                                    Log In
                                </Link>
                                <Link
                                    to="/signup"
                                    className="bg-accent text-primary px-5 py-2 rounded-full font-bold hover:bg-accent/90 transition-transform hover:scale-105"
                                >
                                    Sign Up
                                </Link>
                            </>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="-mr-2 flex md:hidden">
                        <button
                            onClick={toggleMenu}
                            className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-white/10 focus:outline-none"
                        >
                            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-primary border-b border-white/10"
                    >
                        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    to={link.path}
                                    className="block px-3 py-2 rounded-md text-base font-medium hover:text-accent hover:bg-white/5"
                                    onClick={toggleMenu}
                                >
                                    {link.name}
                                </Link>
                            ))}
                            <div className="mt-4 flex flex-col gap-2 px-3">
                                {user ? (
                                    <>
                                        <div className="flex items-center gap-2 py-2 text-sm font-medium text-accent">
                                            <UserIcon className="h-4 w-4" />
                                            <span>{user.name}</span>
                                        </div>
                                        <button
                                            onClick={() => {
                                                handleLogout();
                                                toggleMenu();
                                            }}
                                            className="block w-full text-left py-2 text-gray-400 hover:text-white"
                                        >
                                            Log Out
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <Link
                                            to="/login"
                                            className="block text-center py-2 border border-white/20 rounded-md hover:bg-white/5"
                                            onClick={toggleMenu}
                                        >
                                            Log In
                                        </Link>
                                        <Link
                                            to="/signup"
                                            className="block text-center py-2 bg-accent text-primary font-bold rounded-md hover:bg-accent/90"
                                            onClick={toggleMenu}
                                        >
                                            Sign Up
                                        </Link>
                                    </>
                                )}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
