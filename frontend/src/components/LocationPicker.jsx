import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import { MapPin, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default marker icon in React-Leaflet
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

// Component to handle map clicks
const MapEvents = ({ onLocationSelect }) => {
    useMapEvents({
        click(e) {
            onLocationSelect(e.latlng);
        },
    });
    return null;
};

const LocationPicker = ({ value, onChange, placeholder = "Select Location", className }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedCoords, setSelectedCoords] = useState(null);
    const [address, setAddress] = useState(value || '');

    // Reset internal state if external value changes
    useEffect(() => {
        setAddress(value || '');
    }, [value]);

    const handleLocationSelect = (latlng) => {
        setSelectedCoords(latlng);
        // In a real app, you'd perform reverse geocoding here.
        // For now, we'll simulate an address based on coords or just generic text.
        const mockAddress = `Lat: ${latlng.lat.toFixed(4)}, Lng: ${latlng.lng.toFixed(4)}`;
        setAddress(mockAddress);
        onChange(mockAddress);
        // Optional: Close modal after selection or keep open for refinement
        // setIsOpen(false); 
    };

    const confirmSelection = () => {
        setIsOpen(false);
    };

    return (
        <>
            <div
                onClick={() => setIsOpen(true)}
                className={`cursor-pointer ${className}`}
            >
                <div className="flex items-center gap-3 w-full">
                    <MapPin className="text-gray-500 h-5 w-5 flex-shrink-0" />
                    <span className={`block w-full truncate ${!address ? 'text-gray-400' : 'text-white'}`}>
                        {address || placeholder}
                    </span>
                </div>
            </div>

            <AnimatePresence>
                {isOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="bg-secondary w-full max-w-2xl rounded-2xl overflow-hidden border border-white/10 shadow-2xl"
                        >
                            <div className="p-4 border-b border-white/10 flex justify-between items-center bg-secondary">
                                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                                    <MapPin className="text-accent" /> Select Pickup Location
                                </h3>
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="p-1 hover:bg-white/10 rounded-lg transition-colors"
                                >
                                    <X className="h-5 w-5 text-gray-400" />
                                </button>
                            </div>

                            <div className="h-[400px] w-full relative">
                                <MapContainer
                                    center={[37.7749, -122.4194]} // Default to SF
                                    zoom={13}
                                    style={{ height: '100%', width: '100%' }}
                                    className="z-10"
                                >
                                    <TileLayer
                                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                    />
                                    <MapEvents onLocationSelect={handleLocationSelect} />
                                    {selectedCoords && <Marker position={selectedCoords} />}
                                </MapContainer>
                            </div>

                            <div className="p-4 border-t border-white/10 bg-secondary flex justify-between items-center">
                                <p className="text-sm text-gray-400">
                                    {selectedCoords
                                        ? `Selected: ${selectedCoords.lat.toFixed(4)}, ${selectedCoords.lng.toFixed(4)}`
                                        : "Click on map to select a location"}
                                </p>
                                <button
                                    onClick={confirmSelection}
                                    className="bg-accent text-primary font-bold px-6 py-2 rounded-xl hover:bg-accent/90 transition-colors"
                                >
                                    Confirm Location
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </>
    );
};

export default LocationPicker;
