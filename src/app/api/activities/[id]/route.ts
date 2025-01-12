import { prisma } from '@/lib/prisma';
import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const token = await getToken({ req: request });
  const userId = token?.sub as string;
  const id = (await params).id;
  if (!id) {
    return NextResponse.json(
      { error: 'Missing required fields' },
      { status: 400 }
    );
  }
  await prisma.activity.delete({ where: { id: id as string, userId } });
  return NextResponse.json({ success: true });
}
