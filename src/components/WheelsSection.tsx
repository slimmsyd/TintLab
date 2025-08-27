import React, { useState } from 'react';
import { Button } from '@/components/ui/button';

const WheelsSection = () => {
  const [hoveredWheel, setHoveredWheel] = useState<number | null>(null);
  
  const scrollToCTA = () => {
    document.getElementById('cta')?.scrollIntoView({ behavior: 'smooth' });
  };
  const navigateToContact = () => {
    window.location.href = '/contact';
  };

  const wheelShowcase = [
    {
      id: 1,
      image: "/Wheels/Wheel_1.JPG",
      // name: "FORGIATO ELITE",
      // category: "Luxury Forged",
      // description: "Premium custom forged wheels with distinctive spoke design",
      // price: "Contact for Pricing",
      // features: ["Forged Construction", "Custom Finishes", "Premium Quality"]
    },
    {
      id: 2,
      image: "/Wheels/Wheel_2.JPG",
      // name: "VOSSEN PRECISION",
      // category: "Performance Flow Formed",
      // description: "Precision engineered wheel designs for ultimate performance",
      // price: "Contact for Pricing",
      // features: ["Flow Formed", "Lightweight", "Racing Inspired"]
    },
    {
      id: 3,
      image: "/Wheels/Wheel_3.JPG",
      // name: "ROHANA MOTORSPORT",
      // category: "Rotary Forged",
      // description: "Motorsport inspired styling with aggressive aesthetics",
      // price: "Contact for Pricing",
      // features: ["Rotary Forged", "Track Ready", "Bold Design"]
    },
    {
      id: 4,
      image: "/Wheels/Wheel_4.JPG",
      // name: "FUEL EXTREME",
      // category: "Truck & SUV",
      // description: "Built for extreme performance and rugged terrain",
      // price: "Contact for Pricing",
      // features: ["Heavy Duty", "Off-Road", "Durable Finish"]
    },
    {
      id: 5,
      image: "/Wheels/Wheel_5.JPG",
      // name: "AMERICAN HERITAGE",
      // category: "Classic Performance",
      // description: "Legendary racing heritage with timeless design",
      // price: "Contact for Pricing",
      // features: ["Classic Design", "Racing Heritage", "Proven Performance"]
    },
    {
      id: 6,
      image: "/Wheels/Wheel_6.JPG",
      // name: "METHOD ADVENTURE",
      // category: "Off-Road Racing",
      // description: "Purpose-built for adventure and extreme conditions",
      // price: "Contact for Pricing",
      // features: ["Adventure Ready", "Extreme Durability", "Proven Design"]
    },
    {
      id: 7,
      image: "/Wheels/Wheel_7.JPG",
      // name: "PREMIUM COLLECTION",
      // category: "Luxury Series",
      // description: "Exclusive premium collection with sophisticated styling",
      // price: "Contact for Pricing",
      // features: ["Exclusive Design", "Premium Materials", "Limited Edition"]
    }
  ];

  return (
    <section id="wheels-section" className="bg-automotive-black py-24 md:py-32 lg:py-40">
      <div className="max-w-7xl mx-auto px-8 md:px-16 lg:px-24 xl:px-32">
        
        {/* Section Header */}
        <div className="mb-16 md:mb-20">
          <p className="text-xs font-helvetica font-light tracking-[0.3em] text-white/60 uppercase mb-8">
            PREMIUM COLLECTION
          </p>
          <div className="max-w-4xl">
            <h2 className="font-helvetica font-light text-white leading-[1.1] tracking-tight text-4xl md:text-5xl lg:text-6xl mb-8">
              Exquisite Wheel Gallery
            </h2>
            <p className="text-white/80 font-helvetica font-light text-base lg:text-lg leading-relaxed mb-6">
              Discover our handpicked collection of premium wheels, each piece carefully selected for its exceptional craftsmanship, performance, and aesthetic excellence.
            </p>
            <p className="text-red-400 font-helvetica font-medium text-sm tracking-wide uppercase">
              Expert curation • Premium brands • Personalized consultation
            </p>
          </div>
        </div>

        {/* Featured Wheel Hero */}
        <div className="mb-20">
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-automotive-charcoal/50 to-automotive-black border border-white/10">
            <div className="grid grid-cols-1 lg:grid-cols-2 items-center">
              <div className="p-12 lg:p-16 space-y-8">
                <div>
                  <p className="text-red-400 font-helvetica font-medium text-sm tracking-wide uppercase mb-4">
                    Featured Collection
                  </p>
                  <h3 className="font-helvetica font-light text-white text-3xl lg:text-4xl leading-tight mb-6">
                    Premium Wheel Showcase
                  </h3>
                  <p className="text-white/70 font-helvetica font-light text-lg leading-relaxed mb-8">
                    From luxury forged masterpieces to performance-driven designs, explore wheels that transform your vehicle into a statement of excellence.
                  </p>
                </div>
                <div className="flex flex-wrap gap-3">
                  <span className="bg-white/10 text-white/80 px-4 py-2 rounded-full text-sm font-light">Forged Excellence</span>
                  <span className="bg-white/10 text-white/80 px-4 py-2 rounded-full text-sm font-light">Custom Finishes</span>
                  <span className="bg-white/10 text-white/80 px-4 py-2 rounded-full text-sm font-light">Performance Ready</span>
                </div>
              </div>
              <div className="relative h-[400px] lg:h-[500px] overflow-hidden">
                <img 
                  src="/Wheels/Wheel_1.JPG" 
                  alt="Featured Premium Wheel"
                  className="w-full h-full object-cover object-center transition-transform duration-700 hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-automotive-black/20"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Wheel Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12 mb-16">
          {wheelShowcase.slice(1).map((wheel) => (
            <div 
              key={wheel.id} 
              className="group relative cursor-pointer"
              onMouseEnter={() => setHoveredWheel(wheel.id)}
              onMouseLeave={() => setHoveredWheel(null)}
            >
              {/* Wheel Image Container */}
              <div className="relative aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-automotive-charcoal/30 to-automotive-black border border-white/5 group-hover:border-red-400/30 transition-all duration-500">
                <img 
                  src={wheel.image} 
                  // alt={wheel.name}
                  className="w-full h-full object-cover object-center transition-all duration-700 group-hover:scale-110"
                  loading="lazy"
                />
                
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-automotive-black via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500"></div>
                
                {/* Hover Information Overlay */}
                <div className={`absolute inset-0 bg-automotive-black/90 backdrop-blur-sm transition-all duration-500 ${
                  hoveredWheel === wheel.id ? 'opacity-100' : 'opacity-0 pointer-events-none'
                }`}>
                  <div className="p-8 h-full flex flex-col justify-center text-center space-y-4">
                    <div>
                        {/* <h4 className="font-helvetica font-light text-white text-xl mb-2">{wheel.name}</h4> */}
                      <p className="text-red-400 font-helvetica font-medium text-sm tracking-wide uppercase mb-4">
                        {/* {wheel.category} */}
                      </p>
                      <p className="text-white/80 font-helvetica font-light text-sm leading-relaxed mb-6">
                        {/* {wheel.description} */}
                      </p>
                    </div>
                    
                    <div className="space-y-4">
                      {/* <div className="flex flex-wrap justify-center gap-2">

                   {wheel.features.map((feature, index) => (
                          <span 
                            key={index}
                            className="bg-red-400/20 text-red-400 px-3 py-1 rounded-full text-xs font-light border border-red-400/30"
                          >
                            {feature}
                          </span>
                        ))}
                      </div> */}
                      {/* <p className="text-white font-helvetica font-medium text-lg">{wheel.price}</p> */}
                    </div>
                  </div>
                </div>

                
                
                {/* Minimal Info Bar (Always Visible) */}
                <div className="absolute bottom-0 left-0 right-0 p-6 space-y-3">
                  <h4 className="font-helvetica font-light text-white text-lg lg:text-xl leading-tight">
                    {/* {wheel.name} */}
                  </h4>
                  <div className="flex justify-between items-center">
                    <p className="text-red-400 font-helvetica font-medium text-xs tracking-wide uppercase">
                      {/* {wheel.category} */}
                    </p>
                    <p className="text-white/90 font-helvetica font-medium text-sm">
                      {/* {wheel.price} */}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Premium CTA Section */}
        <div className="text-center bg-gradient-to-r from-automotive-charcoal/30 to-automotive-black rounded-2xl p-12 border border-white/10">
          <div className="max-w-2xl mx-auto space-y-6">
            <h3 className="font-helvetica font-light text-white text-2xl lg:text-3xl leading-tight">
              Transform Your Drive
            </h3>
            <p className="text-white/70 font-helvetica font-light text-base lg:text-lg leading-relaxed">
              Ready to elevate your vehicle with premium wheels? Our experts are here to guide you through our complete collection and provide personalized recommendations.
            </p>
            <div className="space-y-4">
              <Button 
                onClick={navigateToContact}
                className="bg-red-500 hover:bg-red-600 text-white px-12 py-4 font-helvetica font-light text-base tracking-wide transition-all duration-300 uppercase rounded-lg hover:scale-105 hover:shadow-xl"
              >
                Explore Collection
              </Button>
              <p className="text-white/50 font-helvetica font-light text-sm">
                • Expert Consultation • Custom Fitting • Premium Installation
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WheelsSection; 