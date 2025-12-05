import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star, MapPin, Calendar, Shield, Zap, Users, Fuel, Settings, CheckCircle, ArrowLeft } from 'lucide-react';

const CarDetails = () => {
    const { id } = useParams();
    const [selectedImage, setSelectedImage] = useState(0);

    // Mock Data (In real app, fetch by ID)
    const car = {
        id: 1,
        name: 'Tesla Model S Plaid',
        brand: 'Tesla',
        price: 150,
        rating: 4.9,
        reviews: 128,
        description: 'Experience the pinnacle of electric performance. The Tesla Model S Plaid offers ludicrous acceleration, cutting-edge technology, and a premium interior that redefines luxury.',
        images: [
            'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=2070&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1560958089-b8a1929cea89?q=80&w=2071&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1617788138017-80ad40651399?q=80&w=2070&auto=format&fit=crop',
        ],
        features: ['Autopilot', 'Premium Sound', 'Glass Roof', 'Supercharging', '21" Wheels', 'Yoke Steering'],
        specs: {
            range: '396 mi',
            acceleration: '1.99s',
            topSpeed: '200 mph',
            power: '1020 hp',
        }
    };

    return (
        <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <Link to="/cars" className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-6 transition-colors">
                    <ArrowLeft className="h-4 w-4" /> Back to Fleet
                </Link>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column: Images & Info */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Image Gallery */}
                        <div className="space-y-4">
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="aspect-video rounded-2xl overflow-hidden border border-white/10 relative"
                            >
                                <img
                                    src={car.images[selectedImage]}
                                    alt={car.name}
                                    className="w-full h-full object-cover"
                                />
                            </motion.div>
                            <div className="grid grid-cols-3 gap-4">
                                {car.images.map((img, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => setSelectedImage(idx)}
                                        className={`aspect-video rounded-xl overflow-hidden border-2 transition-all ${selectedImage === idx ? 'border-accent' : 'border-transparent opacity-70 hover:opacity-100'}`}
                                    >
                                        <img src={img} alt="Thumbnail" className="w-full h-full object-cover" />
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Car Info */}
                        <div>
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <h1 className="text-3xl md:text-4xl font-bold mb-2">{car.name}</h1>
                                    <div className="flex items-center gap-4 text-sm text-gray-400">
                                        <span className="bg-white/10 px-3 py-1 rounded-full text-white">{car.brand}</span>
                                        <div className="flex items-center gap-1 text-yellow-500">
                                            <Star className="h-4 w-4 fill-current" />
                                            <span className="font-bold text-white">{car.rating}</span>
                                            <span className="text-gray-500">({car.reviews} reviews)</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-3xl font-bold text-accent">${car.price}</p>
                                    <p className="text-gray-400">per day</p>
                                </div>
                            </div>

                            <p className="text-gray-300 leading-relaxed mb-8">
                                {car.description}
                            </p>

                            {/* Specs Grid */}
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                                {Object.entries(car.specs).map(([key, value]) => (
                                    <div key={key} className="bg-secondary/50 p-4 rounded-xl border border-white/5 text-center">
                                        <p className="text-gray-400 text-xs uppercase tracking-wider mb-1">{key}</p>
                                        <p className="text-lg font-bold">{value}</p>
                                    </div>
                                ))}
                            </div>

                            {/* Features */}
                            <h3 className="text-xl font-bold mb-4">Premium Features</h3>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                {car.features.map((feature) => (
                                    <div key={feature} className="flex items-center gap-2 text-gray-300">
                                        <CheckCircle className="h-5 w-5 text-accent" />
                                        <span>{feature}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Booking Form */}
                    <div className="lg:col-span-1">
                        <div className="bg-secondary/50 backdrop-blur-md border border-white/10 p-6 rounded-2xl sticky top-24">
                            <h3 className="text-xl font-bold mb-6">Book this Car</h3>

                            <div className="space-y-4 mb-6">
                                <div>
                                    <label className="block text-sm font-medium mb-2 text-gray-300">Pick-up Location</label>
                                    <div className="bg-primary/50 border border-white/10 rounded-xl px-4 py-3 flex items-center gap-3">
                                        <MapPin className="text-gray-500 h-5 w-5" />
                                        <input type="text" placeholder="Enter city or airport" className="bg-transparent w-full focus:outline-none text-sm" />
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium mb-2 text-gray-300">Start Date</label>
                                        <div className="bg-primary/50 border border-white/10 rounded-xl px-4 py-3 flex items-center gap-3">
                                            <Calendar className="text-gray-500 h-5 w-5" />
                                            <input type="date" className="bg-transparent w-full focus:outline-none text-sm text-gray-400" />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-2 text-gray-300">End Date</label>
                                        <div className="bg-primary/50 border border-white/10 rounded-xl px-4 py-3 flex items-center gap-3">
                                            <Calendar className="text-gray-500 h-5 w-5" />
                                            <input type="date" className="bg-transparent w-full focus:outline-none text-sm text-gray-400" />
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-2 text-gray-300">Add-ons</label>
                                    <div className="space-y-2">
                                        <label className="flex items-center justify-between p-3 rounded-xl border border-white/5 hover:bg-white/5 cursor-pointer transition-colors">
                                            <div className="flex items-center gap-3">
                                                <input type="checkbox" className="accent-accent w-4 h-4" />
                                                <span className="text-sm">Full Insurance</span>
                                            </div>
                                            <span className="text-sm font-bold">+$25</span>
                                        </label>
                                        <label className="flex items-center justify-between p-3 rounded-xl border border-white/5 hover:bg-white/5 cursor-pointer transition-colors">
                                            <div className="flex items-center gap-3">
                                                <input type="checkbox" className="accent-accent w-4 h-4" />
                                                <span className="text-sm">Child Seat</span>
                                            </div>
                                            <span className="text-sm font-bold">+$10</span>
                                        </label>
                                    </div>
                                </div>
                            </div>

                            <div className="border-t border-white/10 pt-4 mb-6">
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-gray-400">Total (3 days)</span>
                                    <span className="font-bold">$450</span>
                                </div>
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-gray-400">Insurance</span>
                                    <span className="font-bold">$25</span>
                                </div>
                                <div className="flex justify-between items-center text-lg font-bold mt-4 pt-4 border-t border-white/10">
                                    <span>Grand Total</span>
                                    <span className="text-accent">$475</span>
                                </div>
                            </div>

                            <button className="w-full bg-accent text-primary font-bold py-4 rounded-xl hover:bg-accent/90 transition-all hover:shadow-[0_0_20px_rgba(0,234,255,0.3)]">
                                Proceed to Booking
                            </button>

                            <p className="text-center text-xs text-gray-500 mt-4">
                                Free cancellation up to 24 hours before pickup.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CarDetails;
