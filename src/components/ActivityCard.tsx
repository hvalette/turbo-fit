import { Card } from './ui/card';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { format } from 'date-fns';
import { SportIcon } from './SportIcon';
import { formatActivityDuration } from '@/lib/utils';
import {
  ActivityWithUserAndSports,
  useDeleteActivity,
} from '@/data/activities';
import { Badge } from './ui/badge';
import { XIcon } from 'lucide-react';
import { Button } from './ui/button';
import { useSession } from 'next-auth/react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from './ui/alert-dialog';
import { Role } from '@prisma/client';

export function ActivityCard({
  activity,
}: {
  activity: ActivityWithUserAndSports;
}) {
  const { data: session } = useSession();
  const deleteActivity = useDeleteActivity();

  const handleDelete = () => {
    deleteActivity.mutate(activity.id);
  };

  return (
    <Card className="p-4 flex flex-col gap-2 h-28 justify-between relative">
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
        <div className="ml-auto flex">
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
        <div className="flex items-center">
          <span className="font-bold">
            {formatActivityDuration(activity.duration)}
          </span>
        </div>
      </div>
      {(session?.user?.id === activity.userId ||
        session?.user?.role === Role.ADMIN) && (
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button
              className="absolute top-0 right-0 rounded-full h-6 w-6 p-0 flex items-center justify-center translate-x-1/3 -translate-y-1/3"
              variant="secondary"
            >
              <XIcon size="14"></XIcon>
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                Êtes-vous sûr de vouloir supprimer cette activité ?
              </AlertDialogTitle>
              <AlertDialogDescription>
                Cette action est définitive et ne peut pas être annulée.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Annuler</AlertDialogCancel>
              <AlertDialogAction asChild>
                <Button onClick={handleDelete} variant="destructive">
                  Supprimer
                </Button>
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </Card>
  );
}
