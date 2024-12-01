'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useFetchUsersWithScore } from '@/data/users';

export default function Page() {
  const { data: users } = useFetchUsersWithScore();

  return (
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
            <TableCell className="font-medium">{index + 1}</TableCell>
            <TableCell>{user.name}</TableCell>
            <TableCell className="text-right">{user.score}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
