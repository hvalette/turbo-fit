import { Card } from './ui/card';
import { Skeleton } from './ui/skeleton';

export function ActivityCardSkeleton() {
  return (
    <Card className="p-4 flex flex-col gap-2 h-28 justify-between">
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
  );
}
