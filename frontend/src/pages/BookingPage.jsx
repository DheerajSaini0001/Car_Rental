import React, { useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle, CreditCard, Calendar, MapPin, Shield, User } from 'lucide-react';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const BookingPage = () => {
    const { id } = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    const [step, setStep] = useState(1);

    // Mock car data if not passed via state (fallback)
    const car = location.state?.car || {
        name: 'Tesla Model S',
        price: 120,
        image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=2070&auto=format&fit=crop',
    };

    const bookingDetails = location.state?.bookingDetails || {
        startDate: '2024-03-20',
        endDate: '2024-03-23',
        pickupLocation: 'SFO Airport',
        totalDays: 3,
        totalPrice: 450,
    };

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        cardNumber: '',
        expiry: '',
        cvc: '',
    });

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleNext = () => {
        setStep(step + 1);
    };

    const { user } = useAuth(); // Get user for token if needed, though axios interceptor is better. 
    // But since we don't have interceptor yet, we'll use local storage or context.
    // Actually AuthContext doesn't expose token directly in user object usually, let's check.
    // In AuthContext, user object has token.

    const handleConfirm = async () => {
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${user.token}`,
                },
            };

            const bookingData = {
                carId: car.id,
                carName: car.name,
                carImage: car.image,
                startDate: bookingDetails.startDate,
                endDate: bookingDetails.endDate,
                totalPrice: bookingDetails.totalPrice,
                paymentMethod: 'Credit Card', // Hardcoded for now based on UI
                pickupLocation: bookingDetails.pickupLocation,
            };

            await axios.post('http://localhost:5001/api/bookings', bookingData, config);

            toast.success('Booking Confirmed! Check your dashboard.');
            navigate('/dashboard');
        } catch (error) {
            console.error(error);
            toast.error(error.response?.data?.message || 'Booking failed');
        }
    };

    return (
        <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* Left Column: Booking Steps */}
                    <div className="lg:col-span-2">
                        {/* Progress Steps */}
                        <div className="flex items-center justify-between mb-8 relative">
                            <div className="absolute left-0 top-1/2 w-full h-1 bg-white/10 -z-10" />
                            {[1, 2, 3].map((s) => (
                                <div
                                    key={s}
                                    className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-colors ${step >= s ? 'bg-accent text-primary' : 'bg-secondary border border-white/20 text-gray-400'}`}
                                >
                                    {step > s ? <CheckCircle className="h-6 w-6" /> : s}
                                </div>
                            ))}
                        </div>

                        <div className="bg-secondary/50 backdrop-blur-md border border-white/10 rounded-2xl p-8">
                            {step === 1 && (
                                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                                    <h2 className="text-2xl font-bold mb-6">Personal Details</h2>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-gray-300">First Name</label>
                                            <input
                                                type="text"
                                                name="firstName"
                                                value={formData.firstName}
                                                onChange={handleInputChange}
                                                className="w-full bg-primary/50 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-accent"
                                                placeholder="John"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-gray-300">Last Name</label>
                                            <input
                                                type="text"
                                                name="lastName"
                                                value={formData.lastName}
                                                onChange={handleInputChange}
                                                className="w-full bg-primary/50 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-accent"
                                                placeholder="Doe"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-gray-300">Email Address</label>
                                            <input
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleInputChange}
                                                className="w-full bg-primary/50 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-accent"
                                                placeholder="john@example.com"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-gray-300">Phone Number</label>
                                            <input
                                                type="tel"
                                                name="phone"
                                                value={formData.phone}
                                                onChange={handleInputChange}
                                                className="w-full bg-primary/50 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-accent"
                                                placeholder="+1 (555) 000-0000"
                                            />
                                        </div>
                                    </div>
                                    <div className="mt-8 flex justify-end">
                                        <button onClick={handleNext} className="bg-accent text-primary font-bold px-8 py-3 rounded-xl hover:bg-accent/90 transition-all">
                                            Next Step
                                        </button>
                                    </div>
                                </motion.div>
                            )}

                            {step === 2 && (
                                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                                    <h2 className="text-2xl font-bold mb-6">Payment Method</h2>
                                    <div className="space-y-6">
                                        <div className="p-4 border border-accent/50 bg-accent/5 rounded-xl flex items-center gap-4">
                                            <CreditCard className="h-6 w-6 text-accent" />
                                            <div>
                                                <p className="font-bold">Credit / Debit Card</p>
                                                <p className="text-sm text-gray-400">Secure encrypted payment</p>
                                            </div>
                                            <div className="ml-auto w-4 h-4 rounded-full bg-accent" />
                                        </div>

                                        <div className="space-y-4">
                                            <div className="space-y-2">
                                                <label className="text-sm font-medium text-gray-300">Card Number</label>
                                                <input
                                                    type="text"
                                                    name="cardNumber"
                                                    value={formData.cardNumber}
                                                    onChange={handleInputChange}
                                                    className="w-full bg-primary/50 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-accent"
                                                    placeholder="0000 0000 0000 0000"
                                                />
                                            </div>
                                            <div className="grid grid-cols-2 gap-6">
                                                <div className="space-y-2">
                                                    <label className="text-sm font-medium text-gray-300">Expiry Date</label>
                                                    <input
                                                        type="text"
                                                        name="expiry"
                                                        value={formData.expiry}
                                                        onChange={handleInputChange}
                                                        className="w-full bg-primary/50 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-accent"
                                                        placeholder="MM/YY"
                                                    />
                                                </div>
                                                <div className="space-y-2">
                                                    <label className="text-sm font-medium text-gray-300">CVC</label>
                                                    <input
                                                        type="text"
                                                        name="cvc"
                                                        value={formData.cvc}
                                                        onChange={handleInputChange}
                                                        className="w-full bg-primary/50 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-accent"
                                                        placeholder="123"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mt-8 flex justify-between">
                                        <button onClick={() => setStep(1)} className="text-gray-400 hover:text-white font-medium">
                                            Back
                                        </button>
                                        <button onClick={handleNext} className="bg-accent text-primary font-bold px-8 py-3 rounded-xl hover:bg-accent/90 transition-all">
                                            Review Order
                                        </button>
                                    </div>
                                </motion.div>
                            )}

                            {step === 3 && (
                                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                                    <h2 className="text-2xl font-bold mb-6">Confirm Booking</h2>
                                    <div className="space-y-6 mb-8">
                                        <div className="bg-white/5 rounded-xl p-4 flex items-start gap-4">
                                            <User className="h-5 w-5 text-accent mt-1" />
                                            <div>
                                                <p className="text-sm text-gray-400">Driver Details</p>
                                                <p className="font-bold">{formData.firstName} {formData.lastName}</p>
                                                <p className="text-sm text-gray-400">{formData.email}</p>
                                                <p className="text-sm text-gray-400">{formData.phone}</p>
                                            </div>
                                        </div>
                                        <div className="bg-white/5 rounded-xl p-4 flex items-start gap-4">
                                            <CreditCard className="h-5 w-5 text-accent mt-1" />
                                            <div>
                                                <p className="text-sm text-gray-400">Payment Method</p>
                                                <p className="font-bold">Visa ending in {formData.cardNumber.slice(-4) || '0000'}</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-2 mb-8">
                                        <input type="checkbox" className="accent-accent w-4 h-4" id="terms" />
                                        <label htmlFor="terms" className="text-sm text-gray-400">
                                            I agree to the <span className="text-accent hover:underline cursor-pointer">Terms and Conditions</span> and <span className="text-accent hover:underline cursor-pointer">Privacy Policy</span>.
                                        </label>
                                    </div>

                                    <div className="flex justify-between">
                                        <button onClick={() => setStep(2)} className="text-gray-400 hover:text-white font-medium">
                                            Back
                                        </button>
                                        <button onClick={handleConfirm} className="bg-accent text-primary font-bold px-8 py-3 rounded-xl hover:bg-accent/90 transition-all hover:shadow-[0_0_20px_rgba(0,234,255,0.3)]">
                                            Confirm & Pay ${bookingDetails.totalPrice}
                                        </button>
                                    </div>
                                </motion.div>
                            )}
                        </div>
                    </div>

                    {/* Right Column: Order Summary */}
                    <div className="lg:col-span-1">
                        <div className="bg-secondary/50 backdrop-blur-md border border-white/10 p-6 rounded-2xl sticky top-24">
                            <h3 className="text-xl font-bold mb-6">Order Summary</h3>

                            <div className="mb-6">
                                <img src={car.image} alt={car.name} className="w-full h-40 object-cover rounded-xl mb-4" />
                                <h4 className="text-lg font-bold">{car.name}</h4>
                                <p className="text-gray-400 text-sm">{car.brand}</p>
                            </div>

                            <div className="space-y-4 border-t border-white/10 pt-4 mb-6">
                                <div className="flex items-start gap-3">
                                    <Calendar className="h-5 w-5 text-accent" />
                                    <div>
                                        <p className="text-sm text-gray-400">Pick-up Date</p>
                                        <p className="font-medium">{bookingDetails.startDate}</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <Calendar className="h-5 w-5 text-accent" />
                                    <div>
                                        <p className="text-sm text-gray-400">Drop-off Date</p>
                                        <p className="font-medium">{bookingDetails.endDate}</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <MapPin className="h-5 w-5 text-accent" />
                                    <div>
                                        <p className="text-sm text-gray-400">Location</p>
                                        <p className="font-medium">{bookingDetails.pickupLocation}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="border-t border-white/10 pt-4">
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-gray-400">Car Rental ({bookingDetails.totalDays} days)</span>
                                    <span className="font-bold">₹{car.price * bookingDetails.totalDays}</span>
                                </div>
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-gray-400">Taxes & Fees</span>
                                    <span className="font-bold">₹50</span>
                                </div>
                                <div className="flex justify-between items-center text-lg font-bold mt-4 pt-4 border-t border-white/10">
                                    <span>Total</span>
                                    <span className="text-accent">₹{bookingDetails.totalPrice}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default BookingPage;
