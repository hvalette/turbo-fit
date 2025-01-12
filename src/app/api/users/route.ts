import { prisma } from '@/lib/prisma';
import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const score = request.nextUrl.searchParams.get('score') === 'true';
  if (score) {
    const activitiesScore = await prisma.activity.groupBy({
      by: ['userId'],
      _sum: {
        score: true,
      },
      orderBy: {
        _sum: {
          score: 'desc',
        },
      },
    });
    const users = await prisma.user.findMany();
    const usersWithScores = activitiesScore.map((activity) => {
      const user = users.find((user) => user.id === activity.userId);
      return {
        ...user,
        score: activity._sum?.score || 0,
      };
    });
    return NextResponse.json(usersWithScores);
  }
  const users = await prisma.user.findMany({ orderBy: { name: 'asc' } });

  const token = await getToken({ req: request });
  const connectedUserId = token?.sub as string;
  const connectedUser = users.find((user) => user.id === connectedUserId);
  if (connectedUser) {
    users.splice(users.indexOf(connectedUser), 1);
    users.unshift(connectedUser);
  }

  return NextResponse.json(users);
}
