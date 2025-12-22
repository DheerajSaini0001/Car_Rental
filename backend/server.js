const express = require('express'); // Server entry point - env updated
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

console.log('MONGO_URI loaded:', process.env.MONGO_URI ? 'Yes' : 'No');

const connectDB = require('./config/db');

connectDB();


const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

const authRoutes = require('./routes/authRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const carRoutes = require('./routes/carRoutes');
const otpRoutes = require('./routes/otpRoutes');

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/cars', carRoutes);
app.use('/api/otp', otpRoutes);

app.get('/', (req, res) => {
    res.send('Welcome to Car Rental');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
