import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
  const sports = await prisma.sport.findMany({ orderBy: { name: 'asc' } });
  return NextResponse.json(sports);
}
