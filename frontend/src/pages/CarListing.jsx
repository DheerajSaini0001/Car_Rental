import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Filter, Search, Car, Fuel, Settings, Users, Star } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

import { CARS } from '../data/cars';

const CarListing = () => {
    const location = useLocation();
    const [filters, setFilters] = useState({
        type: location.state?.type || 'All',
        priceRange: 500,
    });

    const [sortOption, setSortOption] = useState('Recommended');

    const filteredCars = CARS.filter((car) => {
        const matchesType = filters.type === 'All' || car.type === filters.type;
        const matchesPrice = car.price <= filters.priceRange;
        return matchesType && matchesPrice;
    }).sort((a, b) => {
        if (sortOption === 'Price: Low to High') {
            return a.price - b.price;
        } else if (sortOption === 'Price: High to Low') {
            return b.price - a.price;
        }
        return 0; // Default (Recommended)
    });

    return (
        <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Sidebar Filters */}
                    <aside className="w-full lg:w-64 space-y-8">
                        <div className="bg-secondary/50 backdrop-blur-md border border-white/10 p-6 rounded-2xl sticky top-24">
                            <div className="flex items-center gap-2 mb-6">
                                <Filter className="h-5 w-5 text-accent" />
                                <h2 className="text-xl font-bold">Filters</h2>
                            </div>

                            {/* Price Range */}
                            <div className="mb-6">
                                <label className="block text-sm font-medium mb-2">Max Price: ${filters.priceRange}/day</label>
                                <input
                                    type="range"
                                    min="50"
                                    max="500"
                                    value={filters.priceRange}
                                    onChange={(e) => setFilters({ ...filters, priceRange: Number(e.target.value) })}
                                    className="w-full accent-accent"
                                />
                            </div>

                            {/* Car Type */}
                            <div className="mb-6">
                                <h3 className="text-sm font-medium mb-3">Car Type</h3>
                                <div className="space-y-2">
                                    {['All', 'SUV', 'Sedan', 'Luxury', 'Electric', 'Sports'].map((type) => (
                                        <label key={type} className="flex items-center gap-2 cursor-pointer">
                                            <input
                                                type="radio"
                                                name="type"
                                                checked={filters.type === type}
                                                onChange={() => setFilters({ ...filters, type })}
                                                className="accent-accent"
                                            />
                                            <span className="text-gray-400 text-sm">{type}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            <button
                                onClick={() => setFilters({ type: 'All', priceRange: 500 })}
                                className="w-full bg-white/5 hover:bg-white/10 text-white py-2 rounded-lg transition-colors text-sm font-medium"
                            >
                                Reset Filters
                            </button>
                        </div>
                    </aside>

                    {/* Car Grid */}
                    <div className="flex-1">
                        <div className="flex justify-between items-center mb-6">
                            <h1 className="text-2xl font-bold">Available Vehicles</h1>
                            <div className="flex items-center gap-2 text-sm text-gray-400">
                                <span>Sort by:</span>
                                <select
                                    value={sortOption}
                                    onChange={(e) => setSortOption(e.target.value)}
                                    className="bg-transparent border-none focus:ring-0 text-white font-medium cursor-pointer"
                                >
                                    <option className="bg-secondary text-white" value="Recommended">Recommended</option>
                                    <option className="bg-secondary text-white" value="Price: Low to High">Price: Low to High</option>
                                    <option className="bg-secondary text-white" value="Price: High to Low">Price: High to Low</option>
                                </select>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                            {filteredCars.map((car) => (
                                <motion.div
                                    key={car.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    className="bg-secondary/50 backdrop-blur-sm border border-white/5 rounded-2xl overflow-hidden hover:border-accent/30 transition-all group"
                                >
                                    <div className="relative h-48 overflow-hidden">
                                        <img
                                            src={car.image}
                                            alt={car.name}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                        />
                                        <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-md px-2 py-1 rounded-lg flex items-center gap-1 text-xs font-bold text-yellow-400 border border-white/10">
                                            <Star className="h-3 w-3 fill-current" />
                                            {car.rating}
                                        </div>
                                    </div>

                                    <div className="p-5">
                                        <div className="flex justify-between items-start mb-2">
                                            <div>
                                                <p className="text-accent text-xs font-bold uppercase tracking-wider mb-1">{car.brand}</p>
                                                <h3 className="text-lg font-bold leading-tight">{car.name}</h3>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-xl font-bold">${car.price}</p>
                                                <p className="text-xs text-gray-400">/day</p>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-3 gap-2 my-4">
                                            <div className="bg-white/5 rounded-lg p-2 text-center">
                                                <Fuel className="h-4 w-4 mx-auto mb-1 text-gray-400" />
                                                <p className="text-[10px] text-gray-300">{car.specs.fuel}</p>
                                            </div>
                                            <div className="bg-white/5 rounded-lg p-2 text-center">
                                                <Settings className="h-4 w-4 mx-auto mb-1 text-gray-400" />
                                                <p className="text-[10px] text-gray-300">{car.specs.transmission}</p>
                                            </div>
                                            <div className="bg-white/5 rounded-lg p-2 text-center">
                                                <Users className="h-4 w-4 mx-auto mb-1 text-gray-400" />
                                                <p className="text-[10px] text-gray-300">{car.specs.seats} Seats</p>
                                            </div>
                                        </div>

                                        <Link
                                            to={`/cars/${car.id}`}
                                            className="block w-full text-center bg-accent text-primary font-bold py-2.5 rounded-xl hover:bg-accent/90 transition-colors"
                                        >
                                            View Details
                                        </Link>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CarListing;
