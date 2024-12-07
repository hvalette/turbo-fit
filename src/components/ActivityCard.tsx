import { Card } from './ui/card';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { format } from 'date-fns';
import { SportIcon } from './SportIcon';
import { formatActivityDuration } from '@/lib/utils';
import { ActivityWithUserAndSports } from '@/data/activities';
import { Badge } from './ui/badge';

export function ActivityCard({
  activity,
}: {
  activity: ActivityWithUserAndSports;
}) {
  return (
    <Card className="p-4 flex flex-col gap-2 h-28 justify-between">
      <div className="flex gap-2">
        <Avatar>
          <AvatarImage
            src={activity.user.image ?? undefined}
            alt={activity.user.name ?? ''}
          />
          <AvatarFallback>{activity.user.name?.[0]}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col justify-center overflow-hidden">
          <h2 className="font-bold text-ellipsis whitespace-nowrap overflow-hidden">
            {activity.user.name}
          </h2>
          <p className="text-xs">{format(activity.date, 'PPP')}</p>
        </div>
        <div className="ml-auto">
          <Badge className="text-md" variant="default">
            +{activity.score}
          </Badge>
        </div>
      </div>
      <div className="flex justify-between">
        <div className="flex items-center gap-1">
          <SportIcon sport={activity.sport.icon} className="h-4" />
          <span>{activity.sport.name}</span>
        </div>
        <span className="font-bold">
          {formatActivityDuration(activity.duration)}
        </span>
      </div>
    </Card>
  );
}
