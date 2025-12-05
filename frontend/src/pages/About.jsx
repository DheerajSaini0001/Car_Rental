import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Zap, Users, Globe, Award, Clock } from 'lucide-react';

const About = () => {
    const features = [
        {
            icon: <Shield className="h-8 w-8 text-accent" />,
            title: 'Premium Safety',
            description: 'Every vehicle undergoes rigorous 150-point safety inspections before every trip.',
        },
        {
            icon: <Zap className="h-8 w-8 text-accent" />,
            title: 'Electric Fleet',
            description: 'We host the largest fleet of premium electric vehicles for a sustainable future.',
        },
        {
            icon: <Clock className="h-8 w-8 text-accent" />,
            title: '24/7 Support',
            description: 'Our dedicated support team is available round the clock to assist you.',
        },
    ];

    const stats = [
        { value: '500+', label: 'Premium Cars' },
        { value: '50k+', label: 'Happy Customers' },
        { value: '100+', label: 'Locations' },
        { value: '4.9', label: 'Average Rating' },
    ];

    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
                <div className="absolute inset-0 bg-accent/5 -skew-y-3 transform origin-top-left scale-110" />

                <div className="max-w-7xl mx-auto relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center max-w-3xl mx-auto mb-20"
                    >
                        <h1 className="text-4xl md:text-6xl font-bold mb-6">
                            Redefining the <span className="text-accent">Journey</span>
                        </h1>
                        <p className="text-xl text-gray-400 leading-relaxed">
                            Drivon isn't just a car rental company. We are a technology-first mobility platform designed to make premium travel accessible, sustainable, and effortless.
                        </p>
                    </motion.div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20">
                        {stats.map((stat, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ delay: index * 0.1 }}
                                className="bg-secondary/50 backdrop-blur-sm border border-white/10 p-8 rounded-2xl text-center hover:border-accent/30 transition-colors"
                            >
                                <h3 className="text-4xl font-bold text-white mb-2">{stat.value}</h3>
                                <p className="text-accent font-medium">{stat.label}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Vision Section */}
            <section className="py-20 bg-secondary/30">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                        >
                            <img
                                src="https://images.unsplash.com/photo-1485291571150-772bcfc10da5?q=80&w=2128&auto=format&fit=crop"
                                alt="Vision"
                                className="rounded-3xl shadow-2xl border border-white/10"
                            />
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                        >
                            <h2 className="text-3xl font-bold mb-6">Our Vision</h2>
                            <p className="text-gray-400 mb-6 leading-relaxed">
                                We envision a world where mobility is seamless, sustainable, and shared. By combining cutting-edge technology with a premium fleet, we're bridging the gap between ownership and accessibility.
                            </p>
                            <p className="text-gray-400 mb-8 leading-relaxed">
                                Whether it's a weekend getaway or a business trip, Drivon ensures you arrive in style and comfort, without the hassle of traditional rental services.
                            </p>
                            <button className="text-accent font-bold flex items-center gap-2 hover:gap-4 transition-all">
                                Join our journey <Users className="h-5 w-5" />
                            </button>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Features Grid */}
            <section className="py-20 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-3xl font-bold text-center mb-16">Why Choose Drivon</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {features.map((feature, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="bg-primary border border-white/10 p-8 rounded-2xl hover:bg-secondary/50 transition-colors"
                            >
                                <div className="bg-accent/10 w-16 h-16 rounded-xl flex items-center justify-center mb-6">
                                    {feature.icon}
                                </div>
                                <h3 className="text-xl font-bold mb-4">{feature.title}</h3>
                                <p className="text-gray-400 leading-relaxed">
                                    {feature.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default About;
