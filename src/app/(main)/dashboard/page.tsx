'use client';

import { SportIcon } from '@/components/sport-icon';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { db } from '@/lib/firebase';
import { formatActivityDuration } from '@/lib/utils';
import { format } from 'date-fns';
import { collection, getDoc, getDocs, limit, query } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { Activity } from '../activities/page';

export default function Page() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [pending, setPending] = useState(true);

  useEffect(() => {
    getDocs(query(collection(db, 'activities'), limit(5))).then(
      async (snapshot) => {
        const dataPromise = snapshot.docs.map(async (data) => {
          const activity = data.data();
          const userDoc = await getDoc(activity.userRef);
          const sportDoc = await getDoc(activity.sportRef);
          console.group(userDoc);
          // const sportDoc = await await getDoc(doc(db, activity.sport));
          return {
            ...activity,
            id: data.id,
            date: activity.date.toDate(),
            user: userDoc.data(),
            sport: sportDoc.data(),
          };
        });

        Promise.all(dataPromise).then((data) => {
          console.log(data);
          setActivities(data as Activity[]);
          setPending(false);
        });
      }
    );
  }, []);

  return (
    <>
      <div className="flex flex-col gap-4 p-2">
        <section>
          <h2 className="text-2xl font-extrabold">Challenge en cours</h2>
          <p>Pas de challenge pour le moment</p>
        </section>
        <section className="flex flex-col gap-2">
          <h2 className="text-2xl font-extrabold">Dernières activités</h2>
          {pending
            ? Array.from(Array(5).keys()).map((i) => (
                <Card
                  key={i}
                  className="p-4 flex flex-col gap-2 h-28 justify-between"
                >
                  <div className="flex gap-2">
                    <Skeleton className="h-10 w-10 rounded-full"></Skeleton>
                    <div className="flex flex-col gap-2 justify-center">
                      <Skeleton className="h-5 w-[100px]" />
                      <Skeleton className="h-3 w-[150px]" />
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <div className="flex items-center gap-1">
                      <Skeleton className="h-5 w-[150px]" />
                    </div>
                    <Skeleton className="h-5 w-[50px]" />
                  </div>
                </Card>
              ))
            : activities.map((activity) => (
                <Card
                  key={activity.id}
                  className="p-4 flex flex-col gap-2 h-28 justify-between"
                >
                  <div className="flex gap-2">
                    <Avatar>
                      <AvatarFallback>{activity.user.name[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col justify-center">
                      <h2 className="font-bold">{activity.user.name}</h2>
                      <p className="text-xs">{format(activity.date, 'PPP')}</p>
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <div className="flex items-center gap-1">
                      <SportIcon sport={activity.sport.icon} className="h-4" />
                      <span>{activity.sport.name}</span>
                    </div>
                    <span className="font-semibold">
                      {formatActivityDuration(activity.duration)}
                    </span>
                  </div>
                </Card>
              ))}
        </section>
      </div>
    </>
  );
}
