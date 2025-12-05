const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();
const connectDB = require('./config/db');

connectDB();


const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

const authRoutes = require('./routes/authRoutes');

// Routes
app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
    res.send('Welcome to Car Rental');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
