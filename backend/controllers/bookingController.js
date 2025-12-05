const Booking = require('../models/Booking');

// @desc    Create new booking
// @route   POST /api/bookings
// @access  Private
const createBooking = async (req, res) => {
    const {
        carId,
        carName,
        carImage,
        startDate,
        endDate,
        totalPrice,
        paymentMethod,
        pickupLocation
    } = req.body;

    try {
        const booking = new Booking({
            user: req.user._id,
            carId,
            carName,
            carImage,
            startDate,
            endDate,
            totalPrice,
            paymentMethod,
            pickupLocation,
            status: 'Confirmed' // Auto-confirm for now
        });

        const createdBooking = await booking.save();
        res.status(201).json(createdBooking);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Get all bookings (Admin)
// @route   GET /api/bookings
// @access  Private/Admin
const getAllBookings = async (req, res) => {
    try {
        const bookings = await Booking.find({}).populate('user', 'id name email');
        res.json(bookings);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get logged in user bookings
// @route   GET /api/bookings/mybookings
// @access  Private
const getMyBookings = async (req, res) => {
    try {
        const bookings = await Booking.find({ user: req.user._id });
        res.json(bookings);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    createBooking,
    getAllBookings,
    getMyBookings,
};
