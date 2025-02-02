import { useQuery } from '@tanstack/react-query';
import { Sport } from '@prisma/client';

export const fetchSports = async (): Promise<Sport[]> => {
  const response = await fetch('/api/sports');
  return response.json();
};

export const useFetchSports = () => {
  return useQuery({
    queryKey: ['sports'],
    queryFn: fetchSports,
    gcTime: 1000 * 60 * 60,
  });
};
