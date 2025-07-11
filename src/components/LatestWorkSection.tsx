import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Calendar, Play } from 'lucide-react';
import { Link } from 'react-router-dom';


const LatestWorkSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const sliderRef = useRef<HTMLDivElement>(null);

  // Update current slide based on scroll position
  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    const handleScroll = () => {
      // Update current slide based on scroll position
      const slideWidth = slider.clientWidth * 0.65; // Approximate slide width
      const newSlide = Math.round(slider.scrollLeft / slideWidth);
      setCurrentSlide(Math.min(newSlide, workItems.length - 1));
    };

    slider.addEventListener('scroll', handleScroll);

    return () => {
      slider.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Work items with actual gallery images
  const workItems = [
    {
      id: 1,
      title: "Chevrolet Corvette C8 - Ceramic IR Series",
      category: "Sports Car",
      image: "/Gallery/Car_1.jpg",
      type: "image",
      description: "Premium ceramic tinting with superior heat rejection for America's supercar"
    },
    {
      id: 2,
      title: "BMW 5 Series - SunTek CXP",
      category: "Luxury Sedan",
      image: "/Gallery/Car_2.jpg",
      type: "image",
      description: "Crystal-clear protection with 99% UV blocking for ultimate driving comfort"
    },
    {
      id: 3,
      title: "BMW M4 - Performance Tint Package",
      category: "Performance Coupe",
      image: "/Gallery/Car_3.jpg",
      type: "image",
      description: "Track-ready ceramic tinting designed for high-performance driving"
    },
    {
      id: 4,
      title: "Rivian R1T - Electric Vehicle Specialist",
      category: "Electric Truck",
      image: "/Gallery/Car_4.jpg",
      type: "image",
      description: "Advanced nano-ceramic technology optimized for electric vehicle efficiency"
    },
    {
      id: 6,
      title: "Porsche Panamera - Precision Install",
      category: "Luxury Sports Sedan",
      image: "/Gallery/Car_6.jpg",
      type: "image",
      description: "Meticulous hand-cut installation showcasing our expert craftsmanship"
    },
    {
      id: 7,
      title: "Mercedes EQS - Premium Electric",
      category: "Electric Luxury",
      image: "/Gallery/Car_7.jpg",
      type: "image",
      description: "State-of-the-art ceramic tinting for Mercedes' flagship electric sedan"
    },
    {
      id: 8,
      title: "BMW M6 - Carbon Series Tint",
      category: "Grand Tourer",
      image: "/Gallery/Car_8.jpg",
      type: "image",
      description: "Professional-grade carbon tinting with lifetime warranty coverage"
    }
  ];

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    if (sliderRef.current) {
      const slider = sliderRef.current;
      const slideWidth = slider.clientWidth * 0.65; // Match our slide width percentage
      slider.scrollTo({
        left: index * slideWidth,
        behavior: 'smooth'
      });
    }
  };

  const nextSlide = () => {
    const newIndex = (currentSlide + 1) % workItems.length;
    goToSlide(newIndex);
  };

  const scrollToCTA = () => {
    document.getElementById('cta')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="latest-work" className="bg-white py-16 md:py-20 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12 xl:px-16">
        
        {/* Section Header */}
        <div className="mb-12 md:mb-16">
          <div className="flex items-center space-x-6 mb-8">
            <div className="h-0.5 bg-black w-20"></div>
            <div className="h-0.5 bg-gray-300 w-40"></div>
          </div>
          <div className="max-w-4xl">
            <h2 className="font-helvetica font-light text-black leading-[1.1] tracking-tight text-4xl md:text-5xl lg:text-6xl mb-8">
              Check out our latest work
            </h2>
            <p className="text-xl md:text-2xl text-gray-500 font-helvetica font-light leading-relaxed max-w-2xl mb-4">
              Experience the precision and quality that sets TintLabs apart. Each installation showcases our commitment to excellence.
            </p>
            <p className="text-sm text-gray-400 font-helvetica font-light">
              Drag to scroll or click arrow to go to next
            </p>
          </div>
        </div>

        {/* Slider Container */}
        <div className="relative -mx-4 md:-mx-8 lg:-mx-12 xl:-mx-16">
          
          {/* Main Slider */}
          <div 
            ref={sliderRef}
            className="flex overflow-x-auto scrollbar-hide snap-x snap-mandatory gap-6 md:gap-8 pb-4 px-4 md:px-8 lg:px-12 xl:px-16 scroll-smooth"
            style={{ 
              scrollbarWidth: 'none', 
              msOverflowStyle: 'none',
              scrollBehavior: 'smooth'
            }}
          >
            {workItems.map((item, index) => (
              <div 
                key={item.id}
                className="flex-none w-[75vw] md:w-[65vw] lg:w-[60vw] xl:w-[55vw] snap-center"
              >
                <div className="group cursor-pointer">
                  {/* Image Container */}
                  <div className="aspect-[4/3] bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 relative">
                    {/* Actual work photo */}
                    <img 
                      src={item.image} 
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    
                    {/* Hover Overlay - Only show play button for videos */}
                    {item.type === "video" && (
                      <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                          <Play className="w-6 h-6 text-white" />
                        </div>
                      </div>
                    )}
                  </div>
                  
                  {/* Content */}
                  <div className="pt-6 space-y-3">
                    <div className="flex items-center space-x-3">
                      <span className="text-xs font-helvetica font-medium tracking-wide text-gray-400 uppercase">
                        {item.category}
                      </span>
                      <div className="h-1 w-1 bg-gray-300 rounded-full"></div>
                      <span className="text-xs font-helvetica font-medium tracking-wide text-gray-400 uppercase">
                        2024
                      </span>
                    </div>
                    <h3 className="font-helvetica font-light text-black text-xl leading-tight">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 font-helvetica font-light text-sm leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Arrows - Desktop */}
          <div className="hidden md:block">
            <button 
              onClick={nextSlide}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-6 w-12 h-12 bg-white shadow-lg rounded-full flex items-center justify-center hover:shadow-xl transition-all duration-300 group"
            >
              <ArrowRight className="w-5 h-5 text-gray-600 group-hover:text-black transition-colors duration-300" />
            </button>
          </div>
        </div>

        {/* Slider Indicators */}
        <div className="flex justify-center space-x-3 mt-12">
          {workItems.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentSlide 
                  ? 'bg-black w-8' 
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
            />
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16 lg:mt-20">
          
    <Link 
              to="/contact"
              className="inline-flex items-center bg-black hover:bg-gray-800 text-white px-10 py-4 rounded-none font-helvetica font-light text-base tracking-wide transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
            >
              <Calendar className="w-4 h-4" />
              <span className="ml-2">
                Get Your Free Quote
              </span>
            </Link>            
          
        </div>
      </div>
    </section>
  );
};

export default LatestWorkSection; 