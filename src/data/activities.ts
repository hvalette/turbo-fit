import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Activity, User, Sport } from '@prisma/client';

interface FetchActivitiesParams {
  take?: number;
  skip?: number;
  userId?: string;
}

export interface ActivityWithUserAndSports extends Activity {
  user: User;
  sport: Sport;
}

export const fetchActivities = async ({
  take = 15,
  skip = 0,
  userId = '',
}: FetchActivitiesParams): Promise<ActivityWithUserAndSports[]> => {
  const response = await fetch(
    `/api/activities?take=${take}&skip=${skip}&userId=${userId}`
  );
  return response.json();
};

export const useFetchActivities = ({ take, skip }: FetchActivitiesParams) => {
  return useQuery({
    queryKey: ['activities'],
    queryFn: () => fetchActivities({ take, skip }),
  });
};

export const useFetchUserActivities = ({
  take,
  skip,
  userId,
}: FetchActivitiesParams) => {
  return useQuery({
    queryKey: ['activities-user'],
    queryFn: () => fetchActivities({ take, skip, userId }),
    enabled: !!userId,
  });
};

export const createActivity = async (
  activity: Partial<Activity | { userIds: string[] }>
): Promise<Activity> => {
  const response = await fetch('/api/activities', {
    method: 'POST',
    body: JSON.stringify(activity),
  });
  return response.json();
};

export const useCreateActivity = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (newActivity: Partial<Activity | { userIds: string[] }>) => {
      return createActivity(newActivity);
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ['activities'],
      });
      queryClient.invalidateQueries({
        queryKey: ['activities-user'],
      });
    },
  });
};
