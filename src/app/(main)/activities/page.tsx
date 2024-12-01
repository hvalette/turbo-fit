'use client';

import { ActivityCard } from '@/components/ActivityCard';
import { ActivityCardSkeleton } from '@/components/ActivityCardSkeleton';
import { useFetchActivities } from '@/data/activities';

export default function Page() {
  const { data: activities, isLoading } = useFetchActivities({ take: 15 });

  return (
    <>
      <section className="flex flex-col gap-2 p-2">
        {isLoading
          ? Array.from(Array(10).keys()).map((i) => (
              <ActivityCardSkeleton key={i} />
            ))
          : activities?.map((activity) => (
              <ActivityCard key={activity.id} activity={activity} />
            ))}
      </section>
    </>
  );
}
