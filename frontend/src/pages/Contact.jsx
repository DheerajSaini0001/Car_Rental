import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, MessageSquare } from 'lucide-react';
import { toast } from 'react-hot-toast';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        // Simulate form submission
        toast.success('Message sent successfully! We will get back to you soon.');
        setFormData({ name: '', email: '', subject: '', message: '' });
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <div className="min-h-screen py-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-16"
                >
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">Get in Touch</h1>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        Have questions about our fleet or services? We're here to help. Reach out to us via phone, email, or visit one of our locations.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Contact Info */}
                    <div className="space-y-8">
                        <div className="bg-secondary/50 backdrop-blur-sm border border-white/10 p-8 rounded-2xl">
                            <h3 className="text-xl font-bold mb-6">Contact Information</h3>

                            <div className="space-y-6">
                                <div className="flex items-start gap-4">
                                    <div className="bg-accent/10 p-3 rounded-lg">
                                        <Phone className="h-6 w-6 text-accent" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-400 mb-1">Phone</p>
                                        <p className="font-medium">+1 (555) 123-4567</p>
                                        <p className="font-medium">+1 (555) 987-6543</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="bg-accent/10 p-3 rounded-lg">
                                        <Mail className="h-6 w-6 text-accent" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-400 mb-1">Email</p>
                                        <p className="font-medium">support@drivon.com</p>
                                        <p className="font-medium">partners@drivon.com</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="bg-accent/10 p-3 rounded-lg">
                                        <MapPin className="h-6 w-6 text-accent" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-400 mb-1">Headquarters</p>
                                        <p className="font-medium">123 Innovation Drive</p>
                                        <p className="font-medium">Silicon Valley, CA 94025</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* FAQ Teaser */}
                        <div className="bg-accent/10 border border-accent/20 p-8 rounded-2xl">
                            <div className="flex items-center gap-3 mb-4">
                                <MessageSquare className="h-6 w-6 text-accent" />
                                <h3 className="text-lg font-bold">Quick Support</h3>
                            </div>
                            <p className="text-gray-400 text-sm mb-4">
                                Check our Frequently Asked Questions for quick answers to common queries about booking, insurance, and more.
                            </p>
                            <button className="text-accent font-bold text-sm hover:underline">
                                Visit Help Center
                            </button>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="lg:col-span-2">
                        <motion.form
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 }}
                            onSubmit={handleSubmit}
                            className="bg-secondary/30 backdrop-blur-md border border-white/10 p-8 rounded-2xl"
                        >
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-300">Your Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        className="w-full bg-primary/50 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-accent transition-colors"
                                        placeholder="John Doe"
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-300">Email Address</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="w-full bg-primary/50 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-accent transition-colors"
                                        placeholder="john@example.com"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="space-y-2 mb-6">
                                <label className="text-sm font-medium text-gray-300">Subject</label>
                                <input
                                    type="text"
                                    name="subject"
                                    value={formData.subject}
                                    onChange={handleChange}
                                    className="w-full bg-primary/50 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-accent transition-colors"
                                    placeholder="How can we help?"
                                    required
                                />
                            </div>

                            <div className="space-y-2 mb-8">
                                <label className="text-sm font-medium text-gray-300">Message</label>
                                <textarea
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    rows="6"
                                    className="w-full bg-primary/50 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-accent transition-colors resize-none"
                                    placeholder="Write your message here..."
                                    required
                                ></textarea>
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-accent text-primary font-bold py-4 rounded-xl hover:bg-accent/90 transition-all flex items-center justify-center gap-2 group"
                            >
                                Send Message
                                <Send className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                            </button>
                        </motion.form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;
