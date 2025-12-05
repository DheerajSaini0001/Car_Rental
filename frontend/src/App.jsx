import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import MainLayout from './layouts/MainLayout';
import Homepage from './pages/Homepage';
import Login from './pages/Login';
import Signup from './pages/Signup';
import CarListing from './pages/CarListing';
import CarDetails from './pages/CarDetails';
import About from './pages/About';
import Contact from './pages/Contact';
import UserDashboard from './pages/UserDashboard';
import AdminDashboard from './pages/AdminDashboard';
import BookingPage from './pages/BookingPage';

import ScrollToTop from './components/ScrollToTop';

function App() {
  return (
    <AuthProvider>
      <Router>
        <ScrollToTop />
        <MainLayout>
          <Toaster position="top-center" />
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/cars" element={<CarListing />} />
            <Route path="/cars/:id" element={<CarDetails />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/dashboard" element={<UserDashboard />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/booking/:id" element={<BookingPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
        </MainLayout>
      </Router>
    </AuthProvider>
  );
}

export default App;
