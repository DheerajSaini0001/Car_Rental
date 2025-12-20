const mongoose = require('mongoose');

const carSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        brand: {
            type: String,
            required: true,
        },
        type: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        rating: {
            type: Number,
            default: 0,
        },
        image: {
            type: String,
            required: true,
        },
        available: {
            type: Boolean,
            default: true,
        },
    },
    {
        timestamps: true,
    }
);

const Car = mongoose.model('Car', carSchema);

module.exports = Car;
