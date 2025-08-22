
import React from 'react';
import { Button } from '@/components/ui/button';
import { Shield, Star, ArrowDown, Award } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero = () => {
  const scrollToBenefits = () => {
    document.getElementById('tint-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToCTA = () => {
    document.getElementById('cta')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Video Background */}
      <video
        className="absolute inset-0 w-full h-full object-cover z-0"
        autoPlay
        muted
        loop
        playsInline
        poster="/Tint-Lab-BG.png"
      >
        <source src="/Car.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Dark Overlay for Content Readability */}
      <div className="absolute inset-0 bg-black/50 z-10"></div>

      {/* Content positioned with enhanced mobile-first responsive design */}
      <div className="absolute inset-x-4 sm:inset-x-6 md:left-16 lg:left-24 xl:left-32 top-1/2 transform -translate-y-1/2 z-30 max-w-5xl xl:max-w-6xl 2xl:max-w-7xl w-full pr-4 sm:pr-6 md:pr-8 lg:pr-12 xl:pr-16">
        
        {/* Brand Identity with improved mobile spacing */}
        <div className="mb-8 sm:mb-10 md:mb-12 animate-fade-in">
          <div className="flex items-center mb-4 sm:mb-6 md:mb-6">
            <img 
              src="/Tint_Lab_Logo.webp" 
              alt="TintLab Logo" 
              className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 mr-2 sm:mr-3 md:mr-3" 
            />
            <h1 className="text-lg sm:text-xl md:text-xl lg:text-2xl font-helvetica font-light text-white tracking-wider">
              TINT<span className="text-gray-300 font-normal">LAB</span>
            </h1>
          </div>
        </div>

        {/* Main Headline with enhanced mobile spacing */}
        <div className="mb-12 sm:mb-14 md:mb-16 animate-fade-in" style={{ animationDelay: '0.2s' }}>
          <h2 className="font-helvetica font-light text-white leading-[1.1] mb-8 sm:mb-10 md:mb-10">
            <span className="block text-2xl sm:text-3xl md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl mb-2 sm:mb-3 md:mb-4">
              Premium Window Tinting
            </span>
            <span className="block text-2xl sm:text-3xl md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-300 font-normal">
                Sleek, Private, Cooler Ride.
              </span>
            </span>
          </h2>

          {/* Enhanced Description with better mobile spacing */}
          <div className="max-w-2xl md:max-w-3xl space-y-3 sm:space-y-4 md:space-y-4">
            <p className="text-base sm:text-lg md:text-lg lg:text-xl text-gray-300 font-light leading-relaxed">
              Enhance your car's privacy, UV protection, and look with precision-cut carbon window tinting.
            </p>
            <p className="text-sm sm:text-base md:text-base lg:text-lg text-white/80 font-light italic leading-relaxed">
              "Protecting you from the world outside"
            </p>
          </div>
        </div>

        {/* Trust Indicators with enhanced mobile spacing */}
        <div className="mb-12 sm:mb-14 md:mb-14 animate-fade-in" style={{ animationDelay: '0.4s' }}>
          <div className="flex flex-col space-y-3 sm:space-y-4 md:space-y-4 lg:flex-row lg:space-y-0 lg:space-x-12 xl:space-x-16">
            <div className="flex items-center space-x-3 sm:space-x-4 md:space-x-3">
              <Shield className="w-4 h-4 sm:w-5 sm:h-5 md:w-5 md:h-5 text-gray-300" />
              <span className="text-white font-light text-xs sm:text-sm md:text-sm tracking-wide">LIFETIME WARRANTY</span>
            </div>
            <div className="flex items-center space-x-3 sm:space-x-4 md:space-x-3">
              <Star className="w-4 h-4 sm:w-5 sm:h-5 md:w-5 md:h-5 text-yellow-400" />
              <span className="text-white font-light text-xs sm:text-sm md:text-sm tracking-wide">5-STAR RATED</span>
            </div>
            <div className="flex items-center space-x-3 sm:space-x-4 md:space-x-3">
            <Award className="w-5 h-5" />
              <span className="text-white font-light text-xs sm:text-sm md:text-sm tracking-wide">PREMIUM INSTALLATION</span>
            </div>
          </div>
        </div>

        {/* Enhanced Mobile-Optimized CTA Buttons with improved spacing and touch targets */}
        <div className="mb-12 sm:mb-14 md:mb-16 animate-fade-in" style={{ animationDelay: '0.6s' }}>
          <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 md:space-x-6 max-w-md sm:max-w-none">
            <Link to="/contact"
              className="bg-white text-black hover:bg-gray-100 px-6 sm:px-8 md:px-10 py-3 sm:py-4 md:py-3 rounded-none font-helvetica font-light text-sm sm:text-sm md:text-sm tracking-wider transition-all duration-300 hover:scale-105 text-center min-h-[44px] sm:min-h-[48px] flex items-center justify-center flex-1 sm:flex-initial"
            >
              GET FREE QUOTE
            </Link>
            <Button 
              onClick={scrollToBenefits}
              className="bg-transparent border border-white text-white hover:bg-white hover:text-black px-6 sm:px-8 md:px-10 py-3 sm:py-4 md:py-3 rounded-none font-helvetica font-light text-sm sm:text-sm md:text-sm tracking-wider transition-all duration-300 min-h-[44px] sm:min-h-[48px] flex-1 sm:flex-initial"
            >
              VIEW SERVICES
            </Button>
          </div>
        </div>

        {/* Enhanced Mobile-Optimized Scroll Indicator with better spacing */}
        <div 
          className="flex items-center space-x-3 sm:space-x-4 md:space-x-4 cursor-pointer animate-fade-in group opacity-70 hover:opacity-100 transition-opacity duration-300"
          style={{ animationDelay: '0.8s' }}
          onClick={scrollToBenefits}
        >
          <div className="w-px h-8 sm:h-10 md:h-10 bg-white/30"></div>
          <ArrowDown className="w-3 h-3 sm:w-4 sm:h-4 md:w-4 md:h-4 text-white group-hover:translate-y-1 transition-transform duration-300" />
          <p className="text-white text-xs sm:text-xs font-light tracking-widest uppercase">Discover More</p>
        </div>
      </div>

      {/* Subtle Gradient Overlay */}
      <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-black/30 to-transparent z-20"></div>
    </section>
  );
};

export default Hero;
