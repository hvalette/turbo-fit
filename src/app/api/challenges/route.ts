import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
  const today = new Date();
  const threeDaysAgo = new Date();
  threeDaysAgo.setDate(today.getDate() - 3);
  const challenge = await prisma.challenge.findMany({
    where: {
      startDate: {
        lte: today,
      },
      endDate: {
        gte: threeDaysAgo,
      },
    },
  });
  return NextResponse.json(challenge);
}
