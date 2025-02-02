import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Activity, ChallengeActivity } from '@prisma/client';

export const createChallengeActivity = async (
  challengeActivity: Partial<ChallengeActivity>
): Promise<Activity> => {
  const response = await fetch('/api/challenge_activities', {
    method: 'POST',
    body: JSON.stringify(challengeActivity),
  });
  return response.json();
};

export const useCreateChallengeActivity = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (newChallengeActivity: Partial<ChallengeActivity>) => {
      return createChallengeActivity(newChallengeActivity);
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ['challenges'],
      });
    },
  });
};
