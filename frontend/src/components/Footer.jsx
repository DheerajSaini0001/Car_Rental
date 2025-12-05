import React from 'react';
import { Car, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-secondary pt-16 pb-8 border-t border-white/10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                    {/* Brand */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-2">
                            <Car className="h-8 w-8 text-accent" />
                            <span className="text-2xl font-bold tracking-tighter">
                                Driv<span className="text-accent">on</span>
                            </span>
                        </div>
                        <p className="text-gray-400 text-sm leading-relaxed">
                            Experience the future of car rental. Premium fleet, instant booking, and seamless journeys await you.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-lg font-semibold mb-6 text-white">Quick Links</h3>
                        <ul className="space-y-3 text-gray-400 text-sm">
                            <li><a href="#" className="hover:text-accent transition-colors">About Us</a></li>
                            <li><a href="#" className="hover:text-accent transition-colors">Car Fleet</a></li>
                            <li><a href="#" className="hover:text-accent transition-colors">Pricing</a></li>
                            <li><a href="#" className="hover:text-accent transition-colors">Contact</a></li>
                        </ul>
                    </div>

                    {/* Support */}
                    <div>
                        <h3 className="text-lg font-semibold mb-6 text-white">Support</h3>
                        <ul className="space-y-3 text-gray-400 text-sm">
                            <li><a href="#" className="hover:text-accent transition-colors">Help Center</a></li>
                            <li><a href="#" className="hover:text-accent transition-colors">Terms of Service</a></li>
                            <li><a href="#" className="hover:text-accent transition-colors">Privacy Policy</a></li>
                            <li><a href="#" className="hover:text-accent transition-colors">FAQs</a></li>
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div>
                        <h3 className="text-lg font-semibold mb-6 text-white">Newsletter</h3>
                        <p className="text-gray-400 text-sm mb-4">Subscribe for latest offers and updates.</p>
                        <div className="flex gap-2">
                            <input
                                type="email"
                                placeholder="Email address"
                                className="bg-primary border border-white/10 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-accent w-full"
                            />
                            <button className="bg-accent text-primary px-4 py-2 rounded-lg font-bold hover:bg-accent/90 transition-colors">
                                Go
                            </button>
                        </div>
                    </div>
                </div>

                <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-gray-500 text-sm">© 2024 Drivon. All rights reserved.</p>
                    <div className="flex gap-6">
                        <a href="#" className="text-gray-400 hover:text-accent transition-colors"><Facebook className="h-5 w-5" /></a>
                        <a href="#" className="text-gray-400 hover:text-accent transition-colors"><Twitter className="h-5 w-5" /></a>
                        <a href="#" className="text-gray-400 hover:text-accent transition-colors"><Instagram className="h-5 w-5" /></a>
                        <a href="#" className="text-gray-400 hover:text-accent transition-colors"><Linkedin className="h-5 w-5" /></a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
