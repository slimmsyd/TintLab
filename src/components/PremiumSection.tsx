import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Shield, Sun, ShieldCheck } from 'lucide-react';

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
                  With award-winning precision and record-breaking UV protection,<strong>TintLabs </strong> drivers reimagined the journey.
                </p>
              </div>
            </div>

            {/* TintLab Benefits */}
            <div className="space-y-10 pt-12 border-t border-gray-100">
              <div className="space-y-12">
                <h3 className="text-3xl md:text-4xl lg:text-5xl font-helvetica font-normal text-black leading-tight">
                  What are the benefits<br />
                  of using TintLab?
                </h3>
                
                {/* Benefits Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
                  
                  {/* Benefit 1: Lifetime Warranty */}
                  <div className="space-y-4">
                    <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center">
                      <Shield className="w-6 h-6 text-white" />
                    </div>
                    <h4 className="text-xl font-helvetica font-medium text-black">
                      100% Lifetime Manufacturer's Warranty
                    </h4>
                    <p className="text-gray-600 font-helvetica font-light leading-relaxed">
                      Including nation-wide coverage for complete peace of mind wherever your journey takes you.
                    </p>
                  </div>

                  {/* Benefit 2: Solar Performance */}
                  <div className="space-y-4">
                    <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center">
                      <Sun className="w-6 h-6 text-white" />
                    </div>
                    <h4 className="text-xl font-helvetica font-medium text-black">
                      Superior Solar Performance
                    </h4>
                    <p className="text-gray-600 font-helvetica font-light leading-relaxed">
                      Advanced heat, UV and glare protection for enhanced comfort and interior preservation.
                    </p>
                  </div>

                  {/* Benefit 3: Safety & Protection */}
                  <div className="space-y-4">
                    <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center">
                      <ShieldCheck className="w-6 h-6 text-white" />
                    </div>
                    <h4 className="text-xl font-helvetica font-medium text-black">
                      Increased Safety & Protection
                    </h4>
                    <p className="text-gray-600 font-helvetica font-light leading-relaxed">
                      Enhanced security and shatter resistance for you and your passengers' protection.
                    </p>
                  </div>
                </div>
              </div>
              
              {/* CTA Button with Better Spacing */}
              <div className="pt-8">
                <Button 
                  onClick={scrollToCTA}
                  className="bg-black hover:bg-gray-900 text-white px-10 py-4 font-helvetica font-light text-base tracking-wide transition-all duration-300 hover:scale-105 flex items-center space-x-3 shadow-lg hover:shadow-xl mx-auto lg:mx-0"
                >
                  <ArrowRight className="w-5 h-5" />
                  <span>Get Your Quote Today</span>
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