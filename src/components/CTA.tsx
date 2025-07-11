
import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Instagram, Youtube, ArrowRight } from 'lucide-react';

const CTA = () => {
  const [currentVideo, setCurrentVideo] = useState(0);
  const sliderRef = useRef<HTMLDivElement>(null);

  const socialVideos = [
    { 
      id: 1, 
      src: '/Videos/TintLabs_Promo.mp4',
      title: 'TintLabs Promo'
    },
  
    { 
      id: 3, 
      src: '/Videos/Tint_Labs_Promo_2.mp4',
      title: 'Professional Installation'
    },
    { 
      id: 4, 
      src: '/Videos/Tint_Lab_Promo_3.mp4',
      title: 'Premium Service'
    }
  ];

  const socialPlatforms = [
    {
      name: "Instagram",
      icon: Instagram,
      followers: "24.5K",
      handle: "@tintlabs"
    },
    {
      name: "TikTok",
      icon: () => (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-.88-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z"/>
        </svg>
      ),
      followers: "18.2K",
      handle: "@tintlabs"
    },
    {
      name: "YouTube",
      icon: Youtube,
      followers: "12.8K",
      handle: "TintLabs"
    }
  ];

  const nextVideo = () => {
    const newIndex = (currentVideo + 1) % socialVideos.length;
    setCurrentVideo(newIndex);
    if (sliderRef.current) {
      const slideWidth = sliderRef.current.clientWidth * 0.35;
      sliderRef.current.scrollTo({
        left: newIndex * slideWidth,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section id="cta" className="py-20 md:py-28 lg:py-32 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
        {/* Section Header */}
        <div className="text-center mb-16 md:mb-20">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-gray-900 mb-6 tracking-tight">
            Follow our journey
          </h2>
          <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto font-light leading-relaxed mb-12">
            See our latest work, behind-the-scenes content, and customer transformations
          </p>
          
          {/* Social Platform Stats */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-12 mb-16">
            {socialPlatforms.map((platform, index) => (
              <div key={index} className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gray-900 rounded-xl flex items-center justify-center">
                  <platform.icon className="w-6 h-6 text-white" />
                </div>
                <div className="text-left">
                  <p className="text-gray-900 font-medium">{platform.followers} followers</p>
                  <p className="text-gray-500 text-sm">{platform.handle}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Video Slider */}
        <div className="relative mb-16">
          <div 
            ref={sliderRef}
            className="flex overflow-x-auto scrollbar-hide snap-x snap-mandatory gap-6 pb-4"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {socialVideos.map((video, index) => (
              <div 
                key={video.id}
                className="flex-none w-[280px] md:w-[320px] snap-center"
              >
                <div className="group cursor-pointer">
                  {/* Video Container */}
                  <div className="aspect-[9/16] bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 relative">
                    <video
                      className="w-full h-full object-cover"
                      autoPlay
                      muted
                      loop
                      playsInline
                      preload="metadata"
                    >
                      <source src={video.src} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                    
                    {/* Video overlay with title */}
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/50 to-transparent p-4">
                      <p className="text-white text-sm font-medium">{video.title}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation hint */}
          <div className="flex justify-center mt-8">
            <button 
              onClick={nextVideo}
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors duration-200"
            >
              <span className="text-sm font-medium">See more content</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Follow CTAs */}
        <div className="text-center">
          <h3 className="text-2xl md:text-3xl font-light text-gray-900 mb-8">
            Follow us for daily content
          </h3>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            {socialPlatforms.map((platform, index) => (
              <Button
                key={index}
                className="bg-gray-900 hover:bg-gray-800 text-white px-8 py-4 rounded-xl font-medium text-sm transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-xl flex items-center space-x-2"
              >
                <platform.icon className="w-5 h-5" />
                <span>Follow on {platform.name}</span>
              </Button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
