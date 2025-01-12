'use client';

import { useFetchUserActivities } from '@/data/activities';
import { ActivityCard } from '@/components/ActivityCard';
import { ActivityCardSkeleton } from '@/components/ActivityCardSkeleton';
import { useSession } from 'next-auth/react';
import { useFetchChallenges } from '@/data/challenges';
import { ChallengeCard } from '@/components/ChallengeCard';

export default function Page() {
  const activityCount = 3;
  const { data: session } = useSession();
  const { data: activities, isLoading } = useFetchUserActivities({
    take: activityCount,
    userId: session?.user?.id,
  });
  const { data: challenges } = useFetchChallenges();

  return (
    <>
      <div className="flex flex-col gap-4 p-2">
        <section>
          <h2 className="text-2xl font-extrabold">Challenge en cours</h2>
          {challenges?.length === 0 ? (
            <p>Pas de challenge en ce moment</p>
          ) : (
            challenges?.map((challenge) => (
              <ChallengeCard key={challenge.id} challenge={challenge} />
            ))
          )}
        </section>
        <section className="flex flex-col gap-2">
          <h2 className="text-2xl font-extrabold">Mes dernières activités</h2>
          {isLoading
            ? Array.from(Array(activityCount).keys()).map((i) => (
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
