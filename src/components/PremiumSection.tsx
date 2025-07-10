import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const PremiumSection = () => {
  const scrollToCTA = () => {
    document.getElementById('cta')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="bg-white py-32 md:py-40 lg:py-48">
      <div className="max-w-7xl mx-auto px-8 md:px-16 lg:px-24 xl:px-32">
        
        {/* Section Indicator - More Elegant */}
        <div className="mb-24 md:mb-32">
          <div className="flex items-center space-x-6">
            <div className="h-0.5 bg-black w-20"></div>
            <div className="h-0.5 bg-gray-300 w-40"></div>
          </div>
          <p className="text-xs font-helvetica font-light tracking-[0.2em] text-black mt-6 uppercase">
            / Premium Services
          </p>
        </div>

        {/* Stacked Layout - Video Above Text */}
        <div className="space-y-20 lg:space-y-32">
          
     
          {/* Text Content Section */}
          <div className="max-w-5xl mx-auto text-center lg:text-left">
            
            {/* Main Headline with Proper Spacing */}
            <div className="space-y-12 mb-16">
              <h2 className="font-helvetica font-light text-black leading-[1.1] tracking-tight">
                <span className="block text-4xl md:text-5xl lg:text-6xl xl:text-7xl mb-6">
                  2025 marked a new era in
                </span>
                <span className="block text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-normal mb-6">
                  automotive protection,
                </span>
                <span className="block text-4xl md:text-5xl lg:text-6xl xl:text-7xl mb-6">
                  TintLabs proved that luxury 
                </span>
                <span className="block text-4xl md:text-5xl lg:text-6xl xl:text-7xl mb-6">
                  doesn't pause for
                </span>
                <span className="block text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-normal">
                  limits.
                </span>
              </h2>
              
              <div className="max-w-3xl mx-auto lg:mx-0">
                <p className="text-xl md:text-2xl text-gray-500 font-helvetica font-light leading-relaxed">
                  With award-winning precision and record-breaking UV protection, TintLabs drivers reimagined the journey.
                </p>
              </div>
            </div>

            {/* Secondary Content Block with Better Hierarchy */}
            <div className="space-y-10 pt-12 border-t border-gray-100">
              <div className="space-y-8">
                <h3 className="text-3xl md:text-4xl lg:text-5xl font-helvetica font-normal text-black leading-tight">
                  Crafted for Comfort.<br />
                  Built for Presence.
                </h3>
                
                <div className="max-w-3xl mx-auto lg:mx-0">
                  <p className="text-lg text-gray-600 font-helvetica font-light leading-relaxed">
                    Step into a sanctuary of sustainable luxury — featuring precision-cut ceramic films, adaptive heat rejection, and a panoramic view that's perfectly balanced.
                  </p>
                </div>
                
                <div className="max-w-3xl mx-auto lg:mx-0">
                  <p className="text-lg text-gray-600 font-helvetica font-light leading-relaxed">
                    With seamless installation and lifetime warranty, every detail is centered around you.
                  </p>
                </div>
              </div>
              
              {/* CTA Button with Better Spacing */}
              <div className="pt-8">
                <Button 
                  onClick={scrollToCTA}
                  className="bg-primary hover:bg-primary/90 text-white px-10 py-4 rounded-full font-helvetica font-light text-base tracking-wide transition-all duration-300 hover:scale-105 flex items-center space-x-3 shadow-lg hover:shadow-xl mx-auto lg:mx-0"
                >
                  <ArrowRight className="w-5 h-5" />
                  <span>Explore Our Services</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PremiumSection; 