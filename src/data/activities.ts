import { useMutation, useQuery } from '@tanstack/react-query';
import { Activity, User, Sport } from '@prisma/client';

interface FetchActivitiesParams {
  take?: number;
  skip?: number;
}

export interface ActivityWithUserAndSports extends Activity {
  user: User;
  sport: Sport;
}

export const fetchActivities = async ({
  take = 15,
  skip = 0,
}: FetchActivitiesParams): Promise<ActivityWithUserAndSports[]> => {
  const response = await fetch(`/api/activities?take=${take}&skip=${skip}`);
  return response.json();
};

export const useFetchActivities = ({ take, skip }: FetchActivitiesParams) => {
  return useQuery({
    queryKey: ['activities', { take, skip }],
    queryFn: () => fetchActivities({ take, skip }),
  });
};

export const createActivity = async (
  activity: Partial<Activity>
): Promise<Activity> => {
  const response = await fetch('/api/activities', {
    method: 'POST',
    body: JSON.stringify(activity),
  });
  return response.json();
};

export const useCreateActivity = () => {
  return useMutation({
    mutationFn: (newActivity: Partial<Activity>) => {
      return createActivity(newActivity);
    },
  });
};
