import { prisma } from '@/lib/prisma';
import { User } from '@prisma/client';
import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const token = await getToken({ req: request });
  const user = token?.user as User;
  const userId = user?.id;
  const role = user?.role;
  const id = (await params).id;
  if (!id) {
    return NextResponse.json(
      { error: 'Missing required fields' },
      { status: 400 }
    );
  }
  if (role === 'ADMIN') {
    await prisma.activity.delete({ where: { id: id as string } });
  }
  await prisma.activity.delete({ where: { id: id as string, userId } });
  return NextResponse.json({ success: true });
}
