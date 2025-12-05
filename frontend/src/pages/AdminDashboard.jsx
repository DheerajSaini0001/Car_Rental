import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Car, Users, Calendar, Plus, Trash2, Edit, Search } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { CARS } from '../data/cars';
import axios from 'axios';

const AdminDashboard = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('cars');
    const [cars, setCars] = useState(CARS); // Local state for now
    const [bookings, setBookings] = useState([]);

    // Redirect if not admin (basic protection)
    React.useEffect(() => {
        if (!user || user.role !== 'admin') {
            navigate('/');
        }
    }, [user, navigate]);

    React.useEffect(() => {
        if (activeTab === 'bookings') {
            const fetchBookings = async () => {
                try {
                    const config = {
                        headers: {
                            Authorization: `Bearer ${user.token}`,
                        },
                    };
                    const { data } = await axios.get('http://localhost:5001/api/bookings', config);
                    setBookings(data);
                } catch (error) {
                    console.error(error);
                }
            };
            fetchBookings();
        }
    }, [activeTab, user]);

    const handleDeleteCar = (id) => {
        if (window.confirm('Are you sure you want to delete this car?')) {
            setCars(cars.filter(car => car.id !== id));
        }
    };

    return (
        <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold">Admin Dashboard</h1>
                    <div className="flex gap-4">
                        <button
                            onClick={() => setActiveTab('cars')}
                            className={`px-4 py-2 rounded-lg transition-colors ${activeTab === 'cars' ? 'bg-accent text-primary font-bold' : 'bg-secondary text-gray-400 hover:text-white'}`}
                        >
                            Manage Cars
                        </button>
                        <button
                            onClick={() => setActiveTab('bookings')}
                            className={`px-4 py-2 rounded-lg transition-colors ${activeTab === 'bookings' ? 'bg-accent text-primary font-bold' : 'bg-secondary text-gray-400 hover:text-white'}`}
                        >
                            Bookings
                        </button>
                        <button
                            onClick={() => setActiveTab('users')}
                            className={`px-4 py-2 rounded-lg transition-colors ${activeTab === 'users' ? 'bg-accent text-primary font-bold' : 'bg-secondary text-gray-400 hover:text-white'}`}
                        >
                            Users
                        </button>
                    </div>
                </div>

                <div className="bg-secondary/30 border border-white/10 rounded-2xl p-6 min-h-[600px]">
                    {activeTab === 'cars' && (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-xl font-bold flex items-center gap-2">
                                    <Car className="text-accent" /> Car Fleet
                                </h2>
                                <button className="bg-accent text-primary px-4 py-2 rounded-lg font-bold flex items-center gap-2 hover:bg-accent/90 transition-colors">
                                    <Plus className="h-4 w-4" /> Add New Car
                                </button>
                            </div>

                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="border-b border-white/10 text-gray-400 text-sm">
                                            <th className="p-4">Car Details</th>
                                            <th className="p-4">Price/Day</th>
                                            <th className="p-4">Type</th>
                                            <th className="p-4">Rating</th>
                                            <th className="p-4 text-right">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {cars.map((car) => (
                                            <tr key={car.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                                                <td className="p-4 flex items-center gap-4">
                                                    <img src={car.image} alt={car.name} className="w-16 h-10 object-cover rounded-md" />
                                                    <div>
                                                        <p className="font-bold">{car.name}</p>
                                                        <p className="text-xs text-gray-500">{car.brand}</p>
                                                    </div>
                                                </td>
                                                <td className="p-4">${car.price}</td>
                                                <td className="p-4">{car.type}</td>
                                                <td className="p-4 flex items-center gap-1">
                                                    <span className="text-yellow-500">★</span> {car.rating}
                                                </td>
                                                <td className="p-4 text-right">
                                                    <div className="flex justify-end gap-2">
                                                        <button className="p-2 hover:bg-blue-500/20 text-blue-400 rounded-lg transition-colors">
                                                            <Edit className="h-4 w-4" />
                                                        </button>
                                                        <button
                                                            onClick={() => handleDeleteCar(car.id)}
                                                            className="p-2 hover:bg-red-500/20 text-red-400 rounded-lg transition-colors"
                                                        >
                                                            <Trash2 className="h-4 w-4" />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </motion.div>
                    )}

                    {activeTab === 'bookings' && (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-xl font-bold flex items-center gap-2">
                                    <Calendar className="text-accent" /> Recent Bookings
                                </h2>
                            </div>

                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="border-b border-white/10 text-gray-400 text-sm">
                                            <th className="p-4">Car</th>
                                            <th className="p-4">User</th>
                                            <th className="p-4">Dates</th>
                                            <th className="p-4">Total</th>
                                            <th className="p-4">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {bookings.map((booking) => (
                                            <tr key={booking._id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                                                <td className="p-4 flex items-center gap-3">
                                                    <img src={booking.carImage} alt={booking.carName} className="w-12 h-8 object-cover rounded" />
                                                    <span className="font-bold">{booking.carName}</span>
                                                </td>
                                                <td className="p-4">
                                                    <div className="text-sm">
                                                        <p className="font-bold">{booking.user?.name}</p>
                                                        <p className="text-gray-500">{booking.user?.email}</p>
                                                    </div>
                                                </td>
                                                <td className="p-4 text-sm">
                                                    <p>{new Date(booking.startDate).toLocaleDateString()} -</p>
                                                    <p>{new Date(booking.endDate).toLocaleDateString()}</p>
                                                </td>
                                                <td className="p-4 font-bold text-accent">${booking.totalPrice}</td>
                                                <td className="p-4">
                                                    <span className={`px-2 py-1 rounded text-xs font-bold ${booking.status === 'Confirmed' ? 'bg-green-500/20 text-green-400' :
                                                            booking.status === 'Pending' ? 'bg-yellow-500/20 text-yellow-400' :
                                                                'bg-red-500/20 text-red-400'
                                                        }`}>
                                                        {booking.status}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                        {bookings.length === 0 && (
                                            <tr>
                                                <td colSpan="5" className="p-8 text-center text-gray-500">
                                                    No bookings found.
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </motion.div>
                    )}

                    {activeTab === 'users' && (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-xl font-bold flex items-center gap-2">
                                    <Users className="text-accent" /> Registered Users
                                </h2>
                            </div>
                            <div className="text-center py-20 text-gray-500">
                                <p>No users found.</p>
                            </div>
                        </motion.div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
