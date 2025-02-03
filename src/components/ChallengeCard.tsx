import { cn, contrastIsDark } from '@/lib/utils';
import { Card } from './ui/card';
import { Challenge, ChallengeActivity } from '@prisma/client';
import { differenceInDays } from 'date-fns';
import { Button } from './ui/button';
import { useCreateChallengeActivity } from '@/data/challengeActivities';
import { CircleCheckIcon, CircleXIcon } from 'lucide-react';

export function ChallengeCard({
  challenge,
}: {
  challenge: Challenge & { challengeActivities: ChallengeActivity[] };
}) {
  const createChallengeActivity = useCreateChallengeActivity();

  const remainingDays = differenceInDays(
    new Date(challenge.endDate),
    new Date()
  );

  const textColor = contrastIsDark(challenge.color ?? '#000000')
    ? 'text-white'
    : 'text-black';

  const handleChallengeClick = (success: boolean) => {
    createChallengeActivity.mutate({
      challengeId: challenge.id,
      success,
    });
  };

  const ChallengeActivity = challenge.challengeActivities?.[0];

  return (
    <Card
      className={cn('p-4 flex flex-col gap-1 min-h-28 relative', textColor)}
      style={{
        backgroundColor: challenge.color ?? undefined,
      }}
    >
      <h2 className="text-lg font-bold text-ellipsis whitespace-nowrap overflow-hidden">
        {challenge.name}
      </h2>
      <p>{challenge.description}</p>

      {ChallengeActivity && (
        <div className="absolute inset-0 grid place-items-center backdrop-blur-sm">
          {ChallengeActivity.success ? (
            <CircleCheckIcon size="48" />
          ) : (
            <CircleXIcon size="48" />
          )}
        </div>
      )}

      {!ChallengeActivity && remainingDays > 0 && remainingDays <= 7 && (
        <p className="text-xs ml-auto mt-auto">
          {remainingDays} jours restants
        </p>
      )}
      {!ChallengeActivity && remainingDays === 0 && (
        <p className="text-xs ml-auto mt-auto">Dernier jour</p>
      )}
      {!ChallengeActivity && remainingDays < 0 && (
        <div className="flex gap-4 justify-center mt-auto">
          <Button
            className="basis-full"
            variant="default"
            onClick={() => handleChallengeClick(true)}
          >
            Réussi
          </Button>
          <Button
            className="basis-full"
            variant="secondary"
            onClick={() => handleChallengeClick(false)}
          >
            Échoué
          </Button>
        </div>
      )}
    </Card>
  );
}
