const Car = require('../models/Car');
const { uploadToCloudinary } = require('../config/cloudinary');

// @desc    Get all cars
// @route   GET /api/cars
// @access  Public
const getCars = async (req, res) => {
    try {
        const cars = await Car.find({});
        res.json(cars);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Create a new car
// @route   POST /api/cars
// @access  Private/Admin
const createCar = async (req, res) => {
    try {
        const { name, brand, type, price, rating } = req.body;
        let imageUrl = '';

        if (req.file) {
            const result = await uploadToCloudinary(req.file.buffer);
            imageUrl = result.secure_url;
        }

        const car = new Car({
            name,
            brand,
            type,
            price,
            rating: rating || 0,
            image: imageUrl,
        });

        const createdCar = await car.save();
        res.status(201).json(createdCar);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Delete a car
// @route   DELETE /api/cars/:id
// @access  Private/Admin
const deleteCar = async (req, res) => {
    try {
        const car = await Car.findById(req.params.id);

        if (car) {
            await car.deleteOne();
            res.json({ message: 'Car removed' });
        } else {
            res.status(404).json({ message: 'Car not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getCars,
    createCar,
    deleteCar,
};
