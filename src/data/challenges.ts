import { useQuery } from '@tanstack/react-query';
import { Challenge, ChallengeActivity } from '@prisma/client';

interface ChallengeWithChallengeActivities extends Challenge {
  challengeActivities: ChallengeActivity[];
}

export const fetchChallenges = async (): Promise<
  ChallengeWithChallengeActivities[]
> => {
  const response = await fetch('/api/challenges');
  return response.json();
};

export const useFetchChallenges = () => {
  return useQuery({
    queryKey: ['challenges'],
    queryFn: fetchChallenges,
    gcTime: 1000 * 60 * 60,
  });
};
