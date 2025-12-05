const mongoose = require('mongoose');

const bookingSchema = mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        },
        carId: {
            type: Number, // Matching the ID type from frontend data
            required: true,
        },
        carName: {
            type: String,
            required: true,
        },
        carImage: {
            type: String,
            required: true,
        },
        startDate: {
            type: Date,
            required: true,
        },
        endDate: {
            type: Date,
            required: true,
        },
        totalPrice: {
            type: Number,
            required: true,
        },
        status: {
            type: String,
            required: true,
            default: 'Pending', // Pending, Confirmed, Cancelled, Completed
        },
        paymentMethod: {
            type: String,
            required: true,
        },
        pickupLocation: {
            type: String,
            required: true,
        }
    },
    {
        timestamps: true,
    }
);

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;
