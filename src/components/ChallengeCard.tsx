import { cn, contrastIsDark } from '@/lib/utils';
import { Card } from './ui/card';
import { Challenge } from '@prisma/client';

export function ChallengeCard({ challenge }: { challenge: Challenge }) {
  const remainingDays = Math.ceil(
    (new Date(challenge.endDate).getTime() - new Date().getTime()) /
      (1000 * 60 * 60 * 24)
  );

  const textColor = contrastIsDark(challenge.color ?? '#000000')
    ? 'text-white'
    : 'text-black';

  return (
    <Card
      className={cn(
        'p-4 flex flex-col gap-1 h-28 justify-between relative',
        textColor
      )}
      style={{
        backgroundColor: challenge.color ?? undefined,
      }}
    >
      <h2 className="text-lg font-bold text-ellipsis whitespace-nowrap overflow-hidden">
        {challenge.name}
      </h2>
      <p className="">{challenge.description}</p>
      <p className="text-xs ml-auto">{remainingDays} jours restants</p>
    </Card>
  );
}
