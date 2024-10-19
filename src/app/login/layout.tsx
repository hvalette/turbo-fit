'use client';

import { useRouter } from 'next/navigation';
import { useUser } from '@/hook/useUser';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { user } = useUser();

  if (user) {
    router.push('/dashboard');
  }

  return <main>{children}</main>;
}
