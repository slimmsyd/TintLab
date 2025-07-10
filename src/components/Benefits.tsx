
import React from 'react';
import { Shield, Sun, Eye, Thermometer, Diamond, Zap } from 'lucide-react';

const Benefits = () => {
  const benefits = [
    {
      icon: Shield,
      title: "Ultimate Protection",
      description: "Block 99% of harmful UV rays and reduce heat by up to 70%. Protect your investment and your health."
    },
    {
      icon: Eye,
      title: "Enhanced Privacy",
      description: "Premium tinting provides superior privacy while maintaining perfect visibility from the inside."
    },
    {
      icon: Thermometer,
      title: "Climate Control",
      description: "Significantly reduce interior temperature and AC usage, saving fuel and increasing comfort."
    },
    {
      icon: Diamond,
      title: "Scratch Resistant",
      description: "Military-grade film technology that resists scratches, chips, and everyday wear and tear."
    },
    {
      icon: Sun,
      title: "Glare Reduction",
      description: "Eliminate dangerous sun glare for safer driving in all weather and lighting conditions."
    },
    {
      icon: Zap,
      title: "Quick Installation",
      description: "Professional installation completed in 2-4 hours with precision and attention to detail."
    }
  ];

  return (
    <section id="benefits" className="section-padding bg-automotive-charcoal">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-helvetica font-bold text-white mb-6">
            WHY CHOOSE <span className="text-primary">TINTLABS</span>
          </h2>
          <p className="text-xl text-automotive-silver max-w-3xl mx-auto">
            Experience the perfect blend of technology, craftsmanship, and premium materials
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <div 
              key={index}
              className="glass-effect p-8 rounded-xl hover:scale-105 transition-all duration-300 group animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="mb-6">
                <benefit.icon className="w-12 h-12 text-primary group-hover:text-accent transition-colors duration-300" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-4 font-helvetica">
                {benefit.title}
              </h3>
              <p className="text-automotive-silver leading-relaxed">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { number: "10+", label: "Years Experience" },
            { number: "5000+", label: "Cars Tinted" },
            { number: "99%", label: "UV Protection" },
            { number: "100%", label: "Satisfaction Rate" }
          ].map((stat, index) => (
            <div key={index} className="text-center animate-fade-in" style={{ animationDelay: `${0.8 + index * 0.1}s` }}>
              <div className="text-4xl md:text-5xl font-helvetica font-black text-primary mb-2">
                {stat.number}
              </div>
              <div className="text-automotive-silver font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Benefits;
