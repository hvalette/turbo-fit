import { prisma } from '@/lib/prisma';
import { User } from '@prisma/client';
import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const token = await getToken({ req: request });
  const user = token?.user as User;
  const userId = user?.id;
  const { challengeId, success } = await request.json();
  if (!challengeId || success === undefined || !userId) {
    return NextResponse.json(
      { error: 'Missing required fields' },
      { status: 400 }
    );
  }

  const challenge = await prisma.challenge.findUnique({
    where: { id: challengeId },
  });

  const score = (success ? challenge?.value : 0) ?? 0;

  const challengeActivity = await prisma.challengeActivity.create({
    data: {
      challengeId,
      userId,
      success,
      score,
    },
  });
  return NextResponse.json(challengeActivity);
}
