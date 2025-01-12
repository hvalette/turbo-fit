import { useQuery } from '@tanstack/react-query';
import { Challenge } from '@prisma/client';

export const fetchChallenges = async (): Promise<Challenge[]> => {
  const response = await fetch('/api/challenges');
  return response.json();
};

export const useFetchChallenges = () => {
  return useQuery({
    queryKey: ['challenges'],
    queryFn: fetchChallenges,
    gcTime: 1000 * 60 * 60 * 12,
  });
};
