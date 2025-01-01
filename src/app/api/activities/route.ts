import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const take = request.nextUrl.searchParams.get('take') || '15';
  const skip = request.nextUrl.searchParams.get('skip') || '0';
  const userId = request.nextUrl.searchParams.get('userId');

  const activities = await prisma.activity.findMany({
    where: userId ? { userId } : {},
    orderBy: [{ date: 'desc' }, { createdAt: 'desc' }],
    take: Number(take),
    skip: Number(skip),
    include: {
      sport: true,
      user: true,
    },
  });
  return NextResponse.json(activities);
}

export async function POST(request: NextRequest) {
  const { duration, score, date, sportId, userIds } = await request.json();
  if (!duration || !score || !date || !sportId || !userIds) {
    return NextResponse.json(
      { error: 'Missing required fields' },
      { status: 400 }
    );
  }

  const computedScore =
    score * (Math.min(userIds.length, 2) + (userIds.length / 5 - 0.2));

  const activity = await prisma.activity.createMany({
    data: userIds?.map((userId: string) => ({
      duration,
      participants: userIds.length,
      score: computedScore,
      date,
      sportId,
      userId,
    })),
  });
  return NextResponse.json(activity);
}
