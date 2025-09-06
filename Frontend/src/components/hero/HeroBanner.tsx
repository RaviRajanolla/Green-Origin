import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '../shared/Button';
import { ArrowRight, Leaf, Shield, Truck } from 'lucide-react';

import ghee1 from '../../assets/ghee1.png';
import ghee2 from '../../assets/ghee2.png';
import honey1 from '../../assets/honey1.png';
import honey2 from '../../assets/honey2.png';
import heroVideo from '../../assets/hero-video.mp4';


export const HeroBanner: React.FC = () => {
  const sliderImages = [

    ghee1, ghee2, honey1, honey2

  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto slide every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % sliderImages.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [sliderImages.length]);

  return (
    <>
      <section className="w-full h-[650px] relative overflow-hidden bg-white flex items-center justify-center rounded-xl shadow-lg">
        <img
          src={sliderImages[currentIndex]}
          alt={`Slide ${currentIndex + 1}`}
          className="w-full h-[650px] object-cover transition-all duration-700"
        />

        {/* Navigation Dots */}
        <div className="absolute top-1/2 right-5 transform -translate-y-1/2 flex flex-col space-y-3">
          {sliderImages.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`w-4 h-4 rounded-full transition-all duration-300 ${currentIndex === idx ? 'bg-purple-600' : 'bg-white/70'
                }`}
            />
          ))}
        </div>
      </section>


      {/* Main Hero Content */}
      <section className="relative bg-gradient-to-br from-purple-50 via-white to-green-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center lg:text-left"
            >
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
                Pure <span className="text-purple-600">Organic</span>
                <br />
                Goodness for
                <br />
                <span className="text-green-600">Healthy Living</span>
              </h1>

              <p className="text-xl text-gray-600 mb-8 max-w-lg mx-auto lg:mx-0">
                Discover premium organic products sourced directly from sustainable farms.
                Nourish your body with nature's finest ingredients.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-12">
                <Link to="/collections">
                  <Button size="lg" className="w-full sm:w-auto">
                    Shop Now <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link to="/our-story">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto">
                    Learn More
                  </Button>
                </Link>
              </div>

              {/* Features */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center lg:text-left">
                <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-2 sm:space-y-0 sm:space-x-3">
                  <div className="bg-green-100 p-2 rounded-full">
                    <Leaf className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">100% Organic</h3>
                    <p className="text-sm text-gray-600">Certified & Pure</p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-2 sm:space-y-0 sm:space-x-3">
                  <div className="bg-purple-100 p-2 rounded-full">
                    <Shield className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Quality Assured</h3>
                    <p className="text-sm text-gray-600">Lab Tested</p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-2 sm:space-y-0 sm:space-x-3">
                  <div className="bg-blue-100 p-2 rounded-full">
                    <Truck className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Fast Delivery</h3>
                    <p className="text-sm text-gray-600">2-5 Days</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Hero Image */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative z-100">
                <video
                  src={heroVideo}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-[450px] rounded-2xl shadow-2xl object-cover"
                />
              </div>
              {/* Floating elements */}
              <motion.div
                animate={{ y: [0, -20, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute top-4 right-4 bg-white p-3 rounded-full shadow-lg"
              >
                <Leaf className="h-6 w-6 text-green-500" />
              </motion.div>
              <motion.div
                animate={{ y: [0, 20, 0] }}
                transition={{ duration: 3, repeat: Infinity, delay: 1.5 }}
                className="absolute bottom-4 left-4 bg-purple-600 p-3 rounded-full shadow-lg"
              >
                <Shield className="h-6 w-6 text-white" />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
};
