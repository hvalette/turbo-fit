import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const take = request.nextUrl.searchParams.get('take') || '15';
  const skip = request.nextUrl.searchParams.get('skip') || '0';

  const activities = await prisma.activity.findMany({
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
  const { duration, score, date, sportId, userId } = await request.json();
  if (!duration || !score || !date || !sportId || !userId) {
    return NextResponse.json(
      { error: 'Missing required fields' },
      { status: 400 }
    );
  }
  const activity = await prisma.activity.create({
    data: {
      duration,
      score,
      date,
      sportId,
      userId,
    },
  });
  return NextResponse.json(activity);
}
