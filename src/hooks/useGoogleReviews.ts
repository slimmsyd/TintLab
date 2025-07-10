import { useQuery } from '@tanstack/react-query';
import { googleReviewsService, FormattedReview } from '../services/googleReviews';

export interface BusinessRating {
  rating: number;
  totalReviews: number;
}

export function useGoogleReviews() {
  const {
    data: reviews,
    isLoading: reviewsLoading,
    error: reviewsError,
    refetch: refetchReviews,
  } = useQuery<FormattedReview[]>({
    queryKey: ['google-reviews'],
    queryFn: () => googleReviewsService.fetchGoogleReviews(),
    staleTime: 1000 * 60 * 60, // 1 hour
    gcTime: 1000 * 60 * 60 * 2, // 2 hours (formerly cacheTime)
    retry: 2,
    refetchOnWindowFocus: false,
  });

  const {
    data: businessRating,
    isLoading: ratingLoading,
    error: ratingError,
    refetch: refetchRating,
  } = useQuery<BusinessRating>({
    queryKey: ['business-rating'],
    queryFn: () => googleReviewsService.getBusinessRating(),
    staleTime: 1000 * 60 * 60, // 1 hour
    gcTime: 1000 * 60 * 60 * 2, // 2 hours
    retry: 2,
    refetchOnWindowFocus: false,
  });

  return {
    reviews: reviews || [],
    businessRating: businessRating || { rating: 4.9, totalReviews: 127 },
    isLoading: reviewsLoading || ratingLoading,
    error: reviewsError || ratingError,
    refetch: () => {
      refetchReviews();
      refetchRating();
    },
  };
} 