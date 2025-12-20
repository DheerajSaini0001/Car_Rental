import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Calendar, Clock, Settings, FileText, LogOut, Car, MapPin, CreditCard } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

import axios from 'axios';

const UserDashboard = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('bookings');
    const [bookings, setBookings] = useState([]);

    React.useEffect(() => {
        if (!user) {
            navigate('/login');
        }
    }, [user, navigate]);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    React.useEffect(() => {
        if (user) {
            const fetchMyBookings = async () => {
                try {
                    const config = {
                        headers: {
                            Authorization: `Bearer ${user.token}`,
                        },
                    };
                    const { data } = await axios.get('http://localhost:5001/api/bookings/mybookings', config);
                    setBookings(data);
                } catch (error) {
                    console.error(error);
                }
            };
            fetchMyBookings();
        }
    }, [user]);

    return (
        <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    {/* Sidebar */}
                    <div className="lg:col-span-1">
                        <div className="bg-secondary/50 backdrop-blur-md border border-white/10 p-6 rounded-2xl sticky top-24">
                            <div className="flex items-center gap-4 mb-8">
                                <div className="h-16 w-16 bg-accent/10 rounded-full flex items-center justify-center text-accent">
                                    <User className="h-8 w-8" />
                                </div>
                                <div>
                                    <h2 className="text-xl font-bold">{user?.name || 'User Name'}</h2>
                                    <p className="text-sm text-gray-400">{user?.email || 'user@example.com'}</p>
                                </div>
                            </div>

                            <nav className="space-y-2">
                                <button
                                    onClick={() => setActiveTab('bookings')}
                                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'bookings' ? 'bg-accent text-primary font-bold' : 'hover:bg-white/5 text-gray-400 hover:text-white'}`}
                                >
                                    <Calendar className="h-5 w-5" />
                                    My Bookings
                                </button>
                                <button
                                    onClick={() => setActiveTab('profile')}
                                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'profile' ? 'bg-accent text-primary font-bold' : 'hover:bg-white/5 text-gray-400 hover:text-white'}`}
                                >
                                    <Settings className="h-5 w-5" />
                                    Profile Settings
                                </button>
                                <button
                                    onClick={() => setActiveTab('documents')}
                                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'documents' ? 'bg-accent text-primary font-bold' : 'hover:bg-white/5 text-gray-400 hover:text-white'}`}
                                >
                                    <FileText className="h-5 w-5" />
                                    Documents
                                </button>
                                <div className="pt-4 mt-4 border-t border-white/10">
                                    <button
                                        onClick={handleLogout}
                                        className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-red-500/10 text-red-500 transition-all"
                                    >
                                        <LogOut className="h-5 w-5" />
                                        Log Out
                                    </button>
                                </div>
                            </nav>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="lg:col-span-3">
                        <motion.div
                            key={activeTab}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            {activeTab === 'bookings' && (
                                <div className="space-y-6">
                                    <h2 className="text-2xl font-bold mb-6">My Bookings</h2>
                                    {bookings.map((booking) => (
                                        <div key={booking._id} className="bg-secondary/50 border border-white/10 rounded-2xl p-6 flex flex-col md:flex-row gap-6 hover:border-accent/30 transition-colors">
                                            <div className="w-full md:w-48 h-32 rounded-xl overflow-hidden">
                                                <img src={booking.carImage} alt={booking.carName} className="w-full h-full object-cover" />
                                            </div>
                                            <div className="flex-1">
                                                <div className="flex justify-between items-start mb-4">
                                                    <div>
                                                        <h3 className="text-xl font-bold mb-1">{booking.carName}</h3>
                                                        <p className="text-sm text-gray-400">Booking ID: {booking._id}</p>
                                                    </div>
                                                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${booking.status === 'Confirmed' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'}`}>
                                                        {booking.status}
                                                    </span>
                                                </div>

                                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-300">
                                                    <div className="flex items-center gap-2">
                                                        <Calendar className="h-4 w-4 text-accent" />
                                                        {new Date(booking.startDate).toLocaleDateString()}
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <Clock className="h-4 w-4 text-accent" />
                                                        {Math.ceil((new Date(booking.endDate) - new Date(booking.startDate)) / (1000 * 60 * 60 * 24))} Days
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <MapPin className="h-4 w-4 text-accent" />
                                                        {booking.pickupLocation}
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <div className="text-sm text-gray-400">Total</div>
                                                        <div className="font-bold text-accent">₹{booking.totalPrice}</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                    {bookings.length === 0 && (
                                        <div className="text-center py-12 text-gray-500">
                                            <p>No bookings found.</p>
                                        </div>
                                    )}
                                </div>
                            )}

                            {activeTab === 'profile' && (
                                <div className="bg-secondary/50 border border-white/10 rounded-2xl p-8">
                                    <h2 className="text-2xl font-bold mb-6">Profile Settings</h2>
                                    <form className="space-y-6">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="space-y-2">
                                                <label className="text-sm font-medium text-gray-300">Full Name</label>
                                                <input type="text" defaultValue={user?.name} className="w-full bg-primary/50 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-accent" />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-sm font-medium text-gray-300">Email Address</label>
                                                <input type="email" defaultValue={user?.email} className="w-full bg-primary/50 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-accent" disabled />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-sm font-medium text-gray-300">Phone Number</label>
                                                <input type="tel" placeholder="+1 (555) 000-0000" className="w-full bg-primary/50 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-accent" />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-sm font-medium text-gray-300">Address</label>
                                                <input type="text" placeholder="123 Main St" className="w-full bg-primary/50 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-accent" />
                                            </div>
                                        </div>
                                        <button className="bg-accent text-primary font-bold px-8 py-3 rounded-xl hover:bg-accent/90 transition-all">
                                            Save Changes
                                        </button>
                                    </form>
                                </div>
                            )}

                            {activeTab === 'documents' && (
                                <div className="bg-secondary/50 border border-white/10 rounded-2xl p-8">
                                    <h2 className="text-2xl font-bold mb-6">Documents</h2>
                                    <div className="border-2 border-dashed border-white/10 rounded-2xl p-8 text-center hover:border-accent/50 transition-colors cursor-pointer">
                                        <div className="h-16 w-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4">
                                            <FileText className="h-8 w-8 text-gray-400" />
                                        </div>
                                        <h3 className="text-lg font-bold mb-2">Upload Driving License</h3>
                                        <p className="text-gray-400 text-sm mb-4">JPG, PNG or PDF (Max 5MB)</p>
                                        <button className="text-accent font-bold hover:underline">Select File</button>
                                    </div>
                                </div>
                            )}
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserDashboard;
