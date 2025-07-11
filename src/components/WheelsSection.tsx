import React from 'react';
import { Button } from '@/components/ui/button';

const WheelsSection = () => {
  const scrollToCTA = () => {
    document.getElementById('cta')?.scrollIntoView({ behavior: 'smooth' });
  };

  const wheelBrands = [
    {
      name: "FORGIATO",
      category: "Luxury Forged",
      description: "Premium custom forged wheels"
    },
    {
      name: "VOSSEN",
      category: "Performance Flow Formed",
      description: "Precision engineered wheel designs"
    },
    {
      name: "ROHANA",
      category: "Rotary Forged",
      description: "Motorsport inspired styling"
    },
    {
      name: "FUEL OFF-ROAD",
      category: "Truck & SUV",
      description: "Built for extreme performance"
    },
    {
      name: "AMERICAN RACING",
      category: "Classic Performance",
      description: "Legendary racing heritage"
    },
    {
      name: "METHOD RACE",
      category: "Off-Road Racing",
      description: "Purpose-built for adventure"
    }
  ];

  return (
    <section className="bg-automotive-black py-24 md:py-32 lg:py-40">
      <div className="max-w-7xl mx-auto px-8 md:px-16 lg:px-24 xl:px-32">
        
        {/* Section Header */}
        <div className="mb-16 md:mb-20">
          <p className="text-xs font-helvetica font-light tracking-[0.3em] text-white/60 uppercase mb-8">
            MORE PRODUCTS
          </p>
          <div className="max-w-4xl">
            <h2 className="font-helvetica font-light text-white leading-[1.1] tracking-tight text-4xl md:text-5xl lg:text-6xl mb-8">
              Premium Wheel Brands
            </h2>
            <p className="text-white/80 font-helvetica font-light text-base lg:text-lg leading-relaxed mb-6">
              Upgrade your ride with our curated selection of premium wheel brands. From luxury forged to performance flow-formed, we carry the industry's most respected names.
            </p>
            <p className="text-red-400 font-helvetica font-medium text-sm tracking-wide uppercase">
              This is a partial inventory, visit in-store for personalized recommendations.
            </p>
          </div>
        </div>

        {/* Wheel Brands Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12 mb-16">
          {wheelBrands.map((brand, index) => (
            <div key={index} className="group space-y-6">
              {/* Wheel Image Placeholder */}
              <div className="aspect-square bg-gradient-to-br from-automotive-charcoal to-automotive-black rounded-lg overflow-hidden relative">
                <div className="w-full h-full flex items-center justify-center">
                  <div className="text-center">
                    {/* Wheel Icon Representation */}
                    <div className="w-24 h-24 border-2 border-white/30 rounded-full flex items-center justify-center mx-auto mb-4 relative group-hover:border-red-400/50 transition-colors duration-300">
                      <div className="w-16 h-16 border border-white/20 rounded-full flex items-center justify-center group-hover:border-red-400/30 transition-colors duration-300">
                        <div className="w-3 h-3 bg-white/40 rounded-full group-hover:bg-red-400/60 transition-colors duration-300"></div>
                      </div>
                      {/* Spokes */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-12 h-0.5 bg-white/20 absolute rotate-0 group-hover:bg-red-400/30 transition-colors duration-300"></div>
                        <div className="w-12 h-0.5 bg-white/20 absolute rotate-45 group-hover:bg-red-400/30 transition-colors duration-300"></div>
                        <div className="w-12 h-0.5 bg-white/20 absolute rotate-90 group-hover:bg-red-400/30 transition-colors duration-300"></div>
                        <div className="w-12 h-0.5 bg-white/20 absolute rotate-[-45deg] group-hover:bg-red-400/30 transition-colors duration-300"></div>
                      </div>
                    </div>
                    <p className="text-white/40 text-xs font-helvetica font-light">{brand.name}</p>
                  </div>
                </div>
              </div>
              
              {/* Brand Info */}
              <div className="space-y-3">
                <h3 className="font-helvetica font-light text-white text-xl lg:text-2xl leading-tight">
                  {brand.name}
                </h3>
                <p className="text-red-400 font-helvetica font-medium text-sm tracking-wide uppercase">
                  {brand.category}
                </p>
                <p className="text-white/70 font-helvetica font-light text-sm leading-relaxed">
                  {brand.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <div className="inline-flex flex-col items-center space-y-4">
            <p className="text-white/60 font-helvetica font-light text-sm max-w-md">
              Ready to transform your vehicle? Visit our showroom to see our complete wheel inventory and get expert recommendations.
            </p>
            <Button 
              onClick={scrollToCTA}
              className="bg-red-500 hover:bg-red-600 text-white px-8 py-3 font-helvetica font-light text-sm tracking-wide transition-all duration-300 uppercase"
            >
              Shop Wheels
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WheelsSection; 