'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useFetchUsersWithScore, UserWithScore } from '@/data/users';
import { cn } from '@/lib/utils';
import { Trophy } from 'lucide-react';

const Podium = ({
  user,
  position,
}: {
  user: UserWithScore;
  position: number;
}) => {
  const classPosition = [
    'bg-amber-400 h-3/5',
    'bg-slate-300 h-2/5',
    'bg-amber-700 h-1/5',
  ];

  return (
    <div className="h-full flex flex-col justify-end gap-4 overflow-hidden">
      <div className="flex flex-col justify-center items-center gap-2">
        <Avatar>
          <AvatarImage src={user.image ?? undefined} alt={user.name ?? ''} />
          <AvatarFallback>{user.name?.[0]}</AvatarFallback>
        </Avatar>
      </div>
      <div
        className={cn(
          'grid place-items-center font-black text-2xl rounded-tl-md rounded-tr-md text-black',
          classPosition[position - 1]
        )}
      >
        {position}
      </div>
    </div>
  );
};

export default function Page() {
  const { data: users } = useFetchUsersWithScore();

  const showPosition = (position: number) => {
    if (position === 1) {
      return <Trophy className="text-amber-400 h-4 w-4" />;
    }
    if (position === 2) {
      return <Trophy className="text-slate-300  h-4 w-4" />;
    }
    if (position === 3) {
      return <Trophy className="text-amber-700  h-4 w-4" />;
    }
    return position;
  };

  return (
    <div className="flex flex-col gap-4">
      {users && users?.length >= 3 && (
        <div className="h-64 grid grid-cols-3 px-4">
          <Podium user={users[1]} position={2} />
          <Podium user={users[0]} position={1} />
          <Podium user={users[2]} position={3} />
        </div>
      )}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>#</TableHead>
            <TableHead>Athlète</TableHead>
            <TableHead className="text-right">Score</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users?.map((user, index) => (
            <TableRow key={user.id}>
              <TableCell className="font-medium">
                {showPosition(index + 1)}
              </TableCell>
              <TableCell>{user.name}</TableCell>
              <TableCell className="text-right">{user.score}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
