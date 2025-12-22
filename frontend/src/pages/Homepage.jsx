import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, MapPin, Calendar, Car, ArrowRight, Star } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import { CARS } from '../data/cars';
import LocationPicker from '../components/LocationPicker';
import CustomDatePicker from '../components/CustomDatePicker';

const Homepage = () => {
    const navigate = useNavigate();
    const [pickupLocation, setPickupLocation] = useState('');
    const [date, setDate] = useState(null);
    return (
        <div className="overflow-hidden">
            {/* Hero Section */}
            <section className="relative min-h-[90vh] flex items-center justify-center px-4 sm:px-6 lg:px-8">
                {/* Background Elements */}
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute -top-1/2 -right-1/2 w-[1000px] h-[1000px] rounded-full bg-accent/5 blur-[120px]" />
                    <div className="absolute -bottom-1/2 -left-1/2 w-[800px] h-[800px] rounded-full bg-blue-600/10 blur-[100px]" />
                </div>

                <div className="relative z-10 max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6">
                            Drive the <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-blue-500">Future</span> Today
                        </h1>
                        <p className="text-gray-400 text-lg mb-8 max-w-lg">
                            Experience the thrill of modern driving with our premium fleet of electric and luxury vehicles. Instant booking, zero paperwork.
                        </p>

                        {/* Search Bar */}
                        <div className="bg-white/5 backdrop-blur-lg border border-white/10 p-2 rounded-2xl flex flex-col md:flex-row gap-2">
                            {/* 
                            <div className="flex-1 bg-primary/50 rounded-xl px-4 py-2 flex items-center gap-3 border border-white/5 focus-within:border-accent/50 transition-colors">
                                <LocationPicker 
                                    value={pickupLocation} 
                                    onChange={setPickupLocation}
                                    placeholder="Pickup Location"
                                />
                            </div> 
                            */}
                            <div className="flex-1 bg-primary/50 rounded-xl px-4 py-2 flex items-center gap-3 border border-white/5 focus-within:border-accent/50 transition-colors">
                                <CustomDatePicker
                                    selected={date}
                                    onChange={(d) => setDate(d)}
                                    placeholder="Date & Time"
                                />
                            </div>
                            <button className="bg-accent text-primary font-bold px-8 py-3 rounded-xl hover:bg-accent/90 transition-all hover:shadow-[0_0_20px_rgba(0,234,255,0.3)]">
                                Search
                            </button>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="relative"
                    >
                        {/* Placeholder for 3D Car Model or High-Quality Image */}
                        <img
                            src="https://images.unsplash.com/photo-1617788138017-80ad40651399?q=80&w=2070&auto=format&fit=crop"
                            alt="Luxury Car"
                            className="w-full h-auto object-contain drop-shadow-[0_20px_50px_rgba(0,234,255,0.15)]"
                        />
                    </motion.div>
                </div>
            </section>

            {/* Categories Section */}
            <section className="py-20 bg-secondary/30">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-end mb-12">
                        <div>
                            <h2 className="text-3xl font-bold mb-2">Browse by Category</h2>
                            <p className="text-gray-400">Find the perfect vehicle for your journey</p>
                        </div>
                        <button className="text-accent flex items-center gap-2 hover:gap-4 transition-all">
                            View All <ArrowRight className="h-4 w-4" />
                        </button>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {['SUV', 'Sedan', 'Luxury', 'Electric'].map((category, index) => (
                            <motion.div
                                key={category}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                whileHover={{ y: -5 }}
                                onClick={() => navigate('/cars', { state: { type: category } })}
                                className="bg-white/5 border border-white/10 p-6 rounded-2xl cursor-pointer hover:border-accent/50 transition-all group"
                            >
                                <div className="h-12 w-12 bg-accent/10 rounded-full flex items-center justify-center mb-4 group-hover:bg-accent group-hover:text-primary transition-colors">
                                    <Car className="h-6 w-6 text-accent group-hover:text-primary" />
                                </div>
                                <h3 className="text-xl font-bold mb-1">{category}</h3>
                                <p className="text-sm text-gray-500">Starting at ₹4000/day</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Featured Cars */}
            <section className="py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-bold mb-12 text-center">Trending Near You</h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {CARS.slice(0, 3).map((car) => (
                            <div key={car.id} className="bg-secondary rounded-2xl overflow-hidden border border-white/5 hover:border-accent/30 transition-all group">
                                <div className="relative h-48 overflow-hidden">
                                    <img
                                        src={car.image}
                                        alt={car.name}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                    />
                                    <div className="absolute top-4 right-4 bg-primary/80 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold border border-white/10">
                                        ₹{car.price}/day
                                    </div>
                                </div>
                                <div className="p-6">
                                    <div className="flex justify-between items-start mb-4">
                                        <div>
                                            <h3 className="text-xl font-bold">{car.name}</h3>
                                            <p className="text-gray-400 text-sm">{car.type} • Automatic</p>
                                        </div>
                                        <div className="flex items-center gap-1 text-yellow-500">
                                            <Star className="h-4 w-4 fill-current" />
                                            <span className="text-sm font-bold text-white">{car.rating}</span>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4 mb-6 text-sm text-gray-400">
                                        <div className="flex items-center gap-2">
                                            <div className="w-2 h-2 rounded-full bg-accent" />
                                            0-60 in {car.specs.acceleration}
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <div className="w-2 h-2 rounded-full bg-accent" />
                                            {car.specs.range} Range
                                        </div>
                                    </div>
                                    <Link
                                        to={`/cars/${car.id}`}
                                        className="block w-full text-center py-3 rounded-xl border border-white/10 hover:bg-accent hover:text-primary hover:border-accent transition-all font-bold"
                                    >
                                        View Details
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Homepage;
