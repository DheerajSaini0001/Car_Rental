import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Car, Users, Calendar, Plus, Trash2, Edit, Search } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { CARS } from '../data/cars';
import axios from 'axios';

// ... (imports remain the same, ensure axios is imported)

const AdminDashboard = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('cars');
    const [cars, setCars] = useState([]);
    const [bookings, setBookings] = useState([]);

    // Modal State
    const [showAddCarModal, setShowAddCarModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [newCar, setNewCar] = useState({
        name: '',
        brand: '',
        type: '',
        price: '',
        rating: 5,
        image: null
    });
    const [previewImage, setPreviewImage] = useState(null);

    // Fetch Cars from API
    const fetchCars = async () => {
        try {
            const { data } = await axios.get('http://localhost:5001/api/cars');
            setCars(data);
        } catch (error) {
            console.error('Error fetching cars:', error);
        }
    };

    React.useEffect(() => {
        if (!user || user.role !== 'admin') {
            navigate('/');
        }
        fetchCars(); // Fetch cars on mount
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

    const handleDeleteCar = async (id) => {
        if (window.confirm('Are you sure you want to delete this car?')) {
            try {
                const config = {
                    headers: {
                        Authorization: `Bearer ${user.token}`,
                    },
                };
                await axios.delete(`http://localhost:5001/api/cars/${id}`, config);
                fetchCars();
            } catch (error) {
                console.error('Error deleting car:', error);
                alert('Failed to delete car');
            }
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setNewCar({ ...newCar, image: file });
            setPreviewImage(URL.createObjectURL(file));
        }
    };

    const handleAddCar = async (e) => {
        e.preventDefault();
        setLoading(true); // Start loading
        const formData = new FormData();
        formData.append('name', newCar.name);
        formData.append('brand', newCar.brand);
        formData.append('type', newCar.type);
        formData.append('price', newCar.price);
        formData.append('rating', newCar.rating);
        formData.append('image', newCar.image);

        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                    'Content-Type': 'multipart/form-data',
                },
            };
            await axios.post('http://localhost:5001/api/cars', formData, config);
            setShowAddCarModal(false);
            setNewCar({ name: '', brand: '', type: '', price: '', rating: 5, image: null });
            setPreviewImage(null);
            fetchCars();
        } catch (error) {
            console.error('Error adding car:', error);
            alert('Failed to add car');
        } finally {
            setLoading(false); // Stop loading regardless of success/fail
        }
    };

    return (
        <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Header and Tabs */}
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold">Admin Dashboard</h1>
                    <div className="flex gap-4">
                        {['cars', 'bookings', 'users'].map(tab => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`px-4 py-2 rounded-lg transition-colors capitalize ${activeTab === tab ? 'bg-accent text-primary font-bold' : 'bg-secondary text-gray-400 hover:text-white'}`}
                            >
                                {tab === 'cars' ? 'Manage Cars' : tab}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="bg-secondary/30 border border-white/10 rounded-2xl p-6 min-h-[600px]">
                    {activeTab === 'cars' && (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-xl font-bold flex items-center gap-2">
                                    <Car className="text-accent" /> Car Fleet
                                </h2>
                                <button
                                    onClick={() => setShowAddCarModal(true)}
                                    className="bg-accent text-primary px-4 py-2 rounded-lg font-bold flex items-center gap-2 hover:bg-accent/90 transition-colors"
                                >
                                    <Plus className="h-4 w-4" /> Add New Car
                                </button>
                            </div>

                            {/* Add Car Modal */}
                            {showAddCarModal && (
                                <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
                                    <div className="bg-secondary p-8 rounded-2xl w-full max-w-md border border-white/10">
                                        <h3 className="text-2xl font-bold mb-6">Add New Car</h3>
                                        <form onSubmit={handleAddCar} className="space-y-4">
                                            <input
                                                type="text"
                                                placeholder="Car Name"
                                                className="w-full bg-primary/50 text-white rounded-lg p-3 border border-white/10 focus:border-accent outline-none"
                                                value={newCar.name}
                                                onChange={(e) => setNewCar({ ...newCar, name: e.target.value })}
                                                required
                                            />
                                            <div className="flex gap-4">
                                                <input
                                                    type="text"
                                                    placeholder="Brand"
                                                    className="w-full bg-primary/50 text-white rounded-lg p-3 border border-white/10 focus:border-accent outline-none"
                                                    value={newCar.brand}
                                                    onChange={(e) => setNewCar({ ...newCar, brand: e.target.value })}
                                                    required
                                                />
                                                <select
                                                    className="w-full bg-primary/50 text-white rounded-lg p-3 border border-white/10 focus:border-accent outline-none"
                                                    value={newCar.type}
                                                    onChange={(e) => setNewCar({ ...newCar, type: e.target.value })}
                                                    required
                                                >
                                                    <option value="" disabled>Type</option>
                                                    <option value="Sedan">Sedan</option>
                                                    <option value="SUV">SUV</option>
                                                    <option value="Luxury">Luxury</option>
                                                    <option value="Sports">Sports</option>
                                                </select>
                                            </div>
                                            <div className="flex gap-4">
                                                <input
                                                    type="number"
                                                    placeholder="Price per day"
                                                    className="w-full bg-primary/50 text-white rounded-lg p-3 border border-white/10 focus:border-accent outline-none"
                                                    value={newCar.price}
                                                    onChange={(e) => setNewCar({ ...newCar, price: e.target.value })}
                                                    required
                                                />
                                                <input
                                                    type="number"
                                                    placeholder="Rating (1-5)"
                                                    max="5"
                                                    step="0.1"
                                                    className="w-full bg-primary/50 text-white rounded-lg p-3 border border-white/10 focus:border-accent outline-none"
                                                    value={newCar.rating}
                                                    onChange={(e) => setNewCar({ ...newCar, rating: e.target.value })}
                                                />
                                            </div>

                                            <div className="border border-dashed border-white/20 rounded-lg p-4 text-center cursor-pointer hover:border-accent transition-colors relative">
                                                <input
                                                    type="file"
                                                    onChange={handleImageChange}
                                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                                    accept="image/*"
                                                    required
                                                />
                                                {previewImage ? (
                                                    <img src={previewImage} alt="Preview" className="h-32 mx-auto object-cover rounded" />
                                                ) : (
                                                    <div className="text-gray-400">
                                                        <Plus className="h-8 w-8 mx-auto mb-2" />
                                                        <span>Upload Car Image</span>
                                                    </div>
                                                )}
                                            </div>

                                            <div className="flex gap-4 mt-6">
                                                <button
                                                    type="button"
                                                    onClick={() => setShowAddCarModal(false)}
                                                    className="flex-1 bg-gray-600/50 hover:bg-gray-600 text-white py-3 rounded-xl font-bold transition-colors"
                                                >
                                                    Cancel
                                                </button>
                                                <button
                                                    type="submit"
                                                    disabled={loading}
                                                    className={`flex-1 py-3 rounded-xl font-bold transition-colors ${loading ? 'bg-gray-500 cursor-not-allowed' : 'bg-accent text-primary hover:bg-accent/90'}`}
                                                >
                                                    {loading ? 'Adding...' : 'Add Car'}
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            )}

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
                                            <tr key={car._id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
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
                                                            onClick={() => handleDeleteCar(car._id)}
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
// ... (rest of the component for bookings and users tabs)

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
