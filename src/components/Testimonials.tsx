
import React from 'react';
import { Star, Calendar, RefreshCw } from 'lucide-react';
import { useGoogleReviews } from '../hooks/useGoogleReviews';

const Testimonials = () => {
  const { reviews, businessRating, isLoading, error, refetch } = useGoogleReviews();

  return (
    <section className="py-20 md:py-28 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
        {/* Section Header */}
        <div className="text-center mb-16 md:mb-20">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-gray-900 mb-6 tracking-tight">
            What our customers say
          </h2>
          <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto mb-12 font-light leading-relaxed">
            Real reviews from real customers who trust us with their vehicles
          </p>
          
          {/* Google Reviews Summary */}
          <div className="flex items-center justify-center space-x-6 mb-4">
            <div className="flex space-x-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-6 h-6 text-yellow-500 fill-current" />
              ))}
            </div>
            <span className="text-gray-900 font-medium text-xl">
              {businessRating.rating.toFixed(1)} out of 5
            </span>
            {isLoading && (
              <RefreshCw className="w-4 h-4 text-gray-400 animate-spin" />
            )}
          </div>
          <p className="text-gray-500 text-sm font-medium">
            Based on {businessRating.totalReviews}+ verified Google reviews
          </p>
          {error && (
            <p className="text-red-500 text-xs mt-2">
              Unable to load live reviews. Showing cached data.
            </p>
          )}
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {isLoading && reviews.length === 0 ? (
            // Loading skeleton
            [...Array(6)].map((_, index) => (
              <div key={index} className="bg-white border border-gray-100 rounded-2xl p-6 lg:p-8 shadow-sm animate-pulse">
                <div className="flex items-start space-x-4 mb-6">
                  <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
                  <div className="flex-1">
                    <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded w-3/4"></div>
                  </div>
                </div>
                <div className="space-y-2 mb-6">
                  <div className="h-3 bg-gray-200 rounded"></div>
                  <div className="h-3 bg-gray-200 rounded"></div>
                  <div className="h-3 bg-gray-200 rounded w-5/6"></div>
                </div>
                <div className="h-3 bg-gray-200 rounded w-1/3"></div>
              </div>
            ))
          ) : (
            reviews.map((review, index) => (
            <div 
              key={index}
              className="bg-white border border-gray-100 rounded-2xl p-6 lg:p-8 shadow-sm hover:shadow-lg hover:border-gray-200 transition-all duration-300 hover:-translate-y-1"
            >
              {/* Header with Avatar and Info */}
              <div className="flex items-start space-x-4 mb-6">
                {review.profilePhoto ? (
                  <img 
                    src={review.profilePhoto} 
                    alt={review.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-12 h-12 bg-gray-900 rounded-full flex items-center justify-center text-white font-medium text-sm">
                    {review.avatar}
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-3 mb-2">
                    <h4 className="text-gray-900 font-medium text-base truncate">{review.name}</h4>
                    <div className="flex space-x-0.5">
                      {[...Array(review.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-yellow-500 fill-current" />
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center space-x-4 text-xs text-gray-500">
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-3 h-3" />
                      <span>{review.date}</span>
                    </div>
                    {review.profilePhoto && (
                      <div className="flex items-center space-x-1">
                        <span className="text-green-500">✓</span>
                        <span>Verified Review</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Review Text */}
              <blockquote className="text-gray-700 leading-relaxed text-sm mb-6 font-normal">
                "{review.text}"
              </blockquote>

              {/* Google Review Badge */}
              <div className="pt-4 border-t border-gray-100">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-400 font-medium">Google Reviews</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs text-gray-400 font-medium">Verified</span>
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>
            ))
          )}
        </div>

        {/* View More Reviews CTA */}
        <div className="text-center mt-16 lg:mt-20">
          <button 
            onClick={() => window.open('https://www.google.com/search?q=tintlabs+reviews', '_blank')}
            className="bg-gray-900 hover:bg-gray-800 text-white px-8 py-4 rounded-full font-medium text-sm transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-xl"
          >
            Leave a review
          </button>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
