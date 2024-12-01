'use client';

import { useFetchActivities } from '@/data/activities';
import { ActivityCard } from '@/components/ActivityCard';
import { ActivityCardSkeleton } from '@/components/ActivityCardSkeleton';

export default function Page() {
  const { data: activities, isLoading } = useFetchActivities({ take: 5 });

  return (
    <>
      <div className="flex flex-col gap-4 p-2">
        <section>
          <h2 className="text-2xl font-extrabold">Challenge en cours</h2>
          <p>Pas de challenge pour le moment</p>
        </section>
        <section className="flex flex-col gap-2">
          <h2 className="text-2xl font-extrabold">Dernières activités</h2>
          {isLoading
            ? Array.from(Array(5).keys()).map((i) => (
                <ActivityCardSkeleton key={i} />
              ))
            : activities?.map((activity) => (
                <ActivityCard key={activity.id} activity={activity} />
              ))}
        </section>
      </div>
    </>
  );
}
