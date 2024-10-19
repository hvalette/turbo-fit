import {
  Bike,
  Icon,
  Sofa,
  Waves,
  Dumbbell,
  Mountain,
  Music2,
} from 'lucide-react';
import {
  sneaker,
  tennisRacket,
  skis,
  soccerBall,
  jacketSports,
  braSports,
  flowerLotus,
} from '@lucide/lab';
import { cn } from '@/lib/utils';

export function SportIcon({
  sport,
  className,
}: {
  sport: string;
  className?: string;
}) {
  switch (sport) {
    case 'running':
      return <Icon iconNode={sneaker} className={cn('rotate-45', className)} />;
    case 'cycling':
      return <Bike className={className} />;
    case 'swimming':
      return <Waves className={className} />;
    case 'walking':
      return <Icon iconNode={sneaker} className={className} />;
    case 'ski':
      return <Icon iconNode={skis} className={className} />;
    case 'yoga':
      return <Icon iconNode={flowerLotus} className={className} />;
    case 'climbing':
      return <Mountain className={className} />;
    case 'football':
      return <Icon iconNode={soccerBall} className={className} />;
    case 'crossfit':
      return <Dumbbell className={className} />;
    case 'fight':
      return <Icon iconNode={jacketSports} className={className} />;
    case 'fitness':
      return <Icon iconNode={braSports} className={className} />;
    case 'dance':
      return <Music2 className={className} />;
    case 'tennis':
      return <Icon iconNode={tennisRacket} className={className} />;
    default:
      return <Sofa className={className} />;
  }
}
