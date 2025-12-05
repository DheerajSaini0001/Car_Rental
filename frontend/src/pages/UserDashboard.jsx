import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Calendar, Clock, Settings, FileText, LogOut, Car, MapPin, CreditCard } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const UserDashboard = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('bookings');

    React.useEffect(() => {
        if (!user) {
            navigate('/login');
        }
    }, [user, navigate]);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    // Mock Bookings Data
    const bookings = [
        {
            id: 'BK-12345',
            car: 'Tesla Model S Plaid',
            image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=2070&auto=format&fit=crop',
            startDate: '2024-03-15',
            endDate: '2024-03-18',
            status: 'Active',
            total: 450,
            location: 'SFO Airport'
        },
        {
            id: 'BK-98765',
            car: 'BMW M4 Competition',
            image: 'https://images.unsplash.com/photo-1617788138017-80ad40651399?q=80&w=2070&auto=format&fit=crop',
            startDate: '2024-01-10',
            endDate: '2024-01-12',
            status: 'Completed',
            total: 300,
            location: 'Downtown LA'
        }
    ];

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
                                        <div key={booking.id} className="bg-secondary/50 border border-white/10 rounded-2xl p-6 flex flex-col md:flex-row gap-6 hover:border-accent/30 transition-colors">
                                            <div className="w-full md:w-48 h-32 rounded-xl overflow-hidden">
                                                <img src={booking.image} alt={booking.car} className="w-full h-full object-cover" />
                                            </div>
                                            <div className="flex-1">
                                                <div className="flex justify-between items-start mb-4">
                                                    <div>
                                                        <h3 className="text-xl font-bold mb-1">{booking.car}</h3>
                                                        <p className="text-sm text-gray-400">Booking ID: {booking.id}</p>
                                                    </div>
                                                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${booking.status === 'Active' ? 'bg-green-500/20 text-green-400' : 'bg-gray-500/20 text-gray-400'}`}>
                                                        {booking.status}
                                                    </span>
                                                </div>

                                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-300">
                                                    <div className="flex items-center gap-2">
                                                        <Calendar className="h-4 w-4 text-accent" />
                                                        {booking.startDate}
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <Clock className="h-4 w-4 text-accent" />
                                                        3 Days
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <MapPin className="h-4 w-4 text-accent" />
                                                        {booking.location}
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <CreditCard className="h-4 w-4 text-accent" />
                                                        ${booking.total}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
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
