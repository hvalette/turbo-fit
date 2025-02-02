import { prisma } from '@/lib/prisma';
import { User } from '@prisma/client';
import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const token = await getToken({ req: request });
  const user = token?.user as User;
  const userId = user?.id;

  const today = new Date();
  const threeDaysAgo = new Date();
  threeDaysAgo.setDate(today.getDate() - 3);
  const challenges = await prisma.challenge.findMany({
    where: {
      startDate: {
        lte: today,
      },
      endDate: {
        gte: threeDaysAgo,
      },
    },
    include: {
      challengeActivities: {
        where: {
          userId,
        },
      },
    },
  });
  return NextResponse.json(challenges);
}
