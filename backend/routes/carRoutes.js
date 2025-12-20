const express = require('express');
const router = express.Router();
const { getCars, createCar, deleteCar } = require('../controllers/carController');
const { protect, admin } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

router.route('/')
    .get(getCars)
    .post(protect, admin, upload.single('image'), createCar);

router.route('/:id')
    .delete(protect, admin, deleteCar);

module.exports = router;
