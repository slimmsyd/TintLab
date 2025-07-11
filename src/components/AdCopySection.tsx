import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const AdCopySection = () => {
  const scrollToCTA = () => {
    document.getElementById('cta')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="tint-section" className="bg-automotive-black py-32 md:py-40 lg:py-48">
      <div className="max-w-7xl mx-auto px-8 md:px-16 lg:px-24 xl:px-32">
        
        {/* Section Indicator */}
        <div className="mb-16 md:mb-20">
          <p className="text-xs font-helvetica font-light tracking-[0.3em] text-white/60 uppercase mb-8">
            SUNTEK WINDOW FILMS
          </p>
        </div>

        {/* Top Section - Copy Left, Image Right */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 xl:gap-20 mb-20 lg:mb-32">
          
          {/* Left Column - Main Copy */}
          <div className="space-y-8">
            <h2 className="font-helvetica font-light text-white leading-[1.1] tracking-tight text-4xl md:text-5xl lg:text-6xl">
              As leaders in the protection arts, our films are hard to ignore.
            </h2>
            
            <p className="text-white/80 font-helvetica font-light text-base lg:text-lg leading-relaxed max-w-lg">
              We have a history of taking tinting to new dimensions. Experience proven technology with lifetime manufacturer's warranty that includes fading protection. We proudly offer the complete SunTek lineup, including their premium Evolve ceramic series.
            </p>
            
            <div className="pt-4">
              <Button 
                onClick={scrollToCTA}
                className="bg-transparent border border-white/30 hover:bg-white/10 text-white px-8 py-3 font-helvetica font-light text-sm tracking-wide transition-all duration-300 uppercase"
              >
                Read More
              </Button>
            </div>
          </div>

          {/* Right Column - Featured Image */}
          <div className="relative">
            <div className="aspect-[4/3] bg-gradient-to-br from-automotive-charcoal to-automotive-black rounded-lg overflow-hidden">
              {/* Placeholder for main vehicle image */}
              <div className="w-full h-full flex items-center justify-center">
                <div className="text-center">
                  <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4 backdrop-blur-sm border border-white/20">
                    <div className="w-10 h-10 bg-white/20 rounded-full"></div>
                  </div>
                  <p className="text-white/50 text-sm font-helvetica font-light">SunTek Protection Showcase</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section - Three SunTek Product Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          
          {/* Card 1 - SunTek Carbon */}
          <div className="space-y-6">
            <div className="aspect-[4/3] bg-gradient-to-br from-automotive-charcoal to-automotive-black rounded-lg overflow-hidden">
              <div className="w-full h-full flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-3 backdrop-blur-sm border border-red-500/30">
                    <div className="w-8 h-8 bg-red-500/40 rounded-full"></div>
                  </div>
                  <p className="text-white/40 text-xs font-helvetica font-light">SunTek Carbon</p>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <h3 className="font-helvetica font-light text-white text-xl lg:text-2xl leading-tight">
                PROVEN TECHNOLOGY
              </h3>
              <div className="space-y-3">
                <p className="text-white/70 font-helvetica font-light text-sm leading-relaxed">
                  • Innovative Carbon technology
                </p>
                <p className="text-white/70 font-helvetica font-light text-sm leading-relaxed">
                  • Non-reflective, "black" finish
                </p>
                <p className="text-white/70 font-helvetica font-light text-sm leading-relaxed">
                  • Great solar performance with advanced UV protection
                </p>
                <p className="text-white/70 font-helvetica font-light text-sm leading-relaxed">
                  • Signal enabling technology
                </p>
              </div>
              <button className="text-white/60 hover:text-white font-helvetica font-light text-sm tracking-wide transition-colors duration-300 underline underline-offset-4">
                Read More
              </button>
            </div>
          </div>

          {/* Card 2 - SunTek CXP */}
          <div className="space-y-6">
            <div className="aspect-[4/3] bg-gradient-to-br from-automotive-charcoal to-automotive-black rounded-lg overflow-hidden">
              <div className="w-full h-full flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-3 backdrop-blur-sm border border-red-500/30">
                    <div className="w-8 h-8 bg-red-500/40 rounded-full"></div>
                  </div>
                  <p className="text-white/40 text-xs font-helvetica font-light">SunTek CXP</p>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <h3 className="font-helvetica font-light text-white text-xl lg:text-2xl leading-tight">
                A NEXT GENERATION WINDOW FILM
              </h3>
              <div className="space-y-3">
                <p className="text-white/70 font-helvetica font-light text-sm leading-relaxed">
                  • Non-metal, nano-hybrid, Carbon technology
                </p>
                <p className="text-white/70 font-helvetica font-light text-sm leading-relaxed">
                  • Non-reflective, "black" finish that will not fade
                </p>
                <p className="text-white/70 font-helvetica font-light text-sm leading-relaxed">
                  • Superior heat, infrared, and UV rejection
                </p>
                <p className="text-white/70 font-helvetica font-light text-sm leading-relaxed">
                  • Signal enabling technology
                </p>
              </div>
              <button className="text-white/60 hover:text-white font-helvetica font-light text-sm tracking-wide transition-colors duration-300 underline underline-offset-4">
                Read More
              </button>
            </div>
          </div>

          {/* Card 3 - SunTek Evolve */}
          <div className="space-y-6">
            <div className="aspect-[4/3] bg-gradient-to-br from-automotive-charcoal to-automotive-black rounded-lg overflow-hidden">
              <div className="w-full h-full flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-3 backdrop-blur-sm border border-blue-500/30">
                    <div className="w-8 h-8 bg-blue-500/40 rounded-full"></div>
                  </div>
                  <p className="text-white/40 text-xs font-helvetica font-light">SunTek Evolve</p>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <h3 className="font-helvetica font-light text-white text-xl lg:text-2xl leading-tight">
                BLOCKS UP TO 94% IR HEAT
              </h3>
              <p className="text-red-400 font-helvetica font-medium text-sm tracking-wide uppercase">
                OUR BEST HEAT-BLOCKING TINT
              </p>
              <div className="space-y-2">
                <p className="text-white/70 font-helvetica font-light text-sm leading-relaxed">
                  • HeatResist™ ceramic technology filters higher levels of infrared rays
                </p>
                <p className="text-white/70 font-helvetica font-light text-sm leading-relaxed">
                  • Rejects over 99% ultraviolet rays
                </p>
                <p className="text-white/70 font-helvetica font-light text-sm leading-relaxed">
                  • Reduces glare and increases safety
                </p>
              </div>
              <button 
                onClick={scrollToCTA}
                className="text-red-400 hover:text-red-300 font-helvetica font-light text-sm tracking-wide transition-colors duration-300 underline underline-offset-4"
              >
                Get Evolve Installed
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdCopySection; 